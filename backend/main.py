"""
UniVibe — FastAPI ML Backend
============================
Handles movie metadata, user profiles, and hybrid (RL + Content) recommendations.
Uses SQLite for persistence.
"""

from fastapi import FastAPI, HTTPException, Depends, Query, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import sqlite3
import pandas as pd
import pickle
import numpy as np
import os
import uvicorn
import time
import random
from contextlib import asynccontextmanager
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, UniqueConstraint, func
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.pool import QueuePool

# ──────────────────────────────────────────────
# CONFIGURATION & SCALING SETTINGS
# ──────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# PostgreSQL ready (Use env variable for production)
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{os.path.join(BASE_DIR, 'backend', 'data', 'univibe.db')}")

# Scaling defaults
POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "10"))
MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "20"))
PREF_CACHE_TTL = 60  # Cache user preference vectors for 60 seconds

# Initializing Engine with Pooling
# Note: For SQLite, pooling works differently; we optimize for concurrent reads.
engine_args = {
    "pool_size": POOL_SIZE,
    "max_overflow": MAX_OVERFLOW,
    "poolclass": QueuePool,
} if not DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ──────────────────────────────────────────────
# DATABASE MODELS (SQLAlchemy)
# ──────────────────────────────────────────────
class RLQTable(Base):
    __tablename__ = "rl_qtable"
    id = Column(Integer, primary_key=True, index=True)
    user_uid = Column(String, index=True)
    state_key = Column(String)
    movie_id = Column(Integer)
    q_value = Column(Float, default=0.0)
    visit_count = Column(Integer, default=0)
    last_reward = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    __table_args__ = (UniqueConstraint('user_uid', 'state_key', 'movie_id', name='_user_state_movie_uc'),)

class Interaction(Base):
    __tablename__ = "interactions"
    id = Column(Integer, primary_key=True, index=True)
    user_uid = Column(String, index=True)
    movie_id = Column(Integer, index=True)
    event_type = Column(String, index=True)
    event_value = Column(String)
    context_genre = Column(String, default="")
    context_experience = Column(String, default="")
    context_source = Column(String, default="")
    duration_ms = Column(Integer, default=0)
    created_at = Column(DateTime, default=func.now())

# ──────────────────────────────────────────────
# CACHE SYSTEM (In-Memory for Low Latency)
# ──────────────────────────────────────────────
class UserPrefCache:
    def __init__(self, ttl: int):
        self.cache: Dict[str, Dict] = {}
        self.ttl = ttl

    def get(self, user_id: str):
        if user_id in self.cache:
            entry = self.cache[user_id]
            if time.time() - entry['timestamp'] < self.ttl:
                return entry['vector']
            else:
                del self.cache[user_id]
        return None

    def set(self, user_id: str, vector: np.ndarray):
        self.cache[user_id] = {
            'vector': vector,
            'timestamp': time.time()
        }

PREF_CACHE = UserPrefCache(ttl=PREF_CACHE_TTL)


# ──────────────────────────────────────────────
# MODEL LOADING & DATA
# ──────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'backend', 'data', 'univibe.db')
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'similarity.pkl')
DATASET_PATH = os.path.join(BASE_DIR, 'ml', 'dataset.csv')

# Globals to hold our models
SIM_MODEL = None
MOVIES_DF = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model and dataset on startup (Immutable in memory)
    global SIM_MODEL, MOVIES_DF
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                SIM_MODEL = pickle.load(f)
        if os.path.exists(DATASET_PATH):
            MOVIES_DF = pd.read_csv(DATASET_PATH)
            print(f"Loaded similarity model for {len(MOVIES_DF)} movies.")
        else:
            MOVIES_DF = pd.DataFrame()
            print("Dataset not found. Initializing empty catalog.")
    except Exception as e:
        print(f"Startup Error: {e}")
        MOVIES_DF = pd.DataFrame()
    yield
    # No dynamic cleanup needed for this model size

app = FastAPI(title="UniVibe ML Backend — Scaled Engine", lifespan=lifespan)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# SIMPLE RATE LIMITING MIDDLEWARE
# ──────────────────────────────────────────────
RATE_LIMIT_STORE = {}
@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    # Simple IP-based rate limiting (100 req/min)
    client_ip = request.client.host
    now = time.time()
    if client_ip not in RATE_LIMIT_STORE:
        RATE_LIMIT_STORE[client_ip] = []
    
    # Prune old timestamps
    RATE_LIMIT_STORE[client_ip] = [ts for ts in RATE_LIMIT_STORE[client_ip] if now - ts < 60]
    
    if len(RATE_LIMIT_STORE[client_ip]) > 100:
        return HTTPException(status_code=429, detail="Too many requests. Peak threshold reached.")
    
    RATE_LIMIT_STORE[client_ip].append(now)
    
    # Global cleanup of dead IPs optionally (to prevent memory leaks from one-off IPs)
    if random.random() < 0.01:
        dead_ips = [ip for ip, times in RATE_LIMIT_STORE.items() if not times]
        for ip in dead_ips: del RATE_LIMIT_STORE[ip]
        
    return await call_next(request)


# ──────────────────────────────────────────────
# DATABASE UTILS
# ──────────────────────────────────────────────
# Dependency to get SQL session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ──────────────────────────────────────────────
# SCHEMAS (Pydantic Models)
# ──────────────────────────────────────────────
class Movie(BaseModel):
    movie_id: int
    title: str
    genre: str
    year: int
    rating_percent: int
    popularity_score: float
    synopsis: str
    director: str = "Unknown"
    cast: str = "Unknown"
    keywords: str = ""


class MovieRecommendation(Movie):
    score: float
    reason: str
    similarity: float = 0.0
    user_pref: float = 0.0


class UserProfile(BaseModel):
    user_uid: str
    username: str
    display_name: Optional[str] = None
    age: int = 18
    preferred_genres: List[str] = []
    preferred_experience: str = ""


# ──────────────────────────────────────────────
# API ENDPOINTS
# ──────────────────────────────────────────────

@app.get("/movies", response_model=List[Movie])
async def get_movies(limit: int = 20, offset: int = 0):
    """Returns the movie catalog."""
    if MOVIES_DF is None or MOVIES_DF.empty:
        raise HTTPException(status_code=404, detail="Movie catalog not found.")
    
    # Return a sample for the catalog
    movies = MOVIES_DF.iloc[offset:offset+limit].to_dict(orient='records')
    return [Movie(**m) for m in movies]


@app.get("/movie/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    """Returns metadata of a specific movie. Optimized via in-memory dataframe."""
    if MOVIES_DF is None or MOVIES_DF.empty:
        raise HTTPException(status_code=404, detail="Movie catalog not found.")
    
    movie_row = MOVIES_DF[MOVIES_DF['movie_id'] == movie_id]
    if movie_row.empty:
        raise HTTPException(status_code=404, detail=f"Movie {movie_id} not found.")
    
    return movie_row.iloc[0].to_dict()

# ──────────────────────────────────────────────
# BACKGROUND TASKS & RL ENGINE (Asynchronous Queueing)
# ──────────────────────────────────────────────
class RLEngine:
    CONFIG = {
        "learning_rate": 0.1,
        "discount_factor": 0.95,
        "rewards": {
            "click": 1.0, "view": 0.5, "search": 0.3, "recommend_click": 1.5,
            "watchlist": 1.2, "dwell": 0.8, "rating_positive": 2.0,
            "rating_neutral": 0.5, "rating_negative": -1.0, "ignore": -0.2
        }
    }
    
    @classmethod
    def calculate_reward(cls, event_type: str, event_value: str = '') -> float:
        if event_type == "rating":
            try:
                rating = int(event_value)
                if rating >= 4: return cls.CONFIG["rewards"]["rating_positive"]
                if rating == 3: return cls.CONFIG["rewards"]["rating_neutral"]
                return cls.CONFIG["rewards"]["rating_negative"]
            except: pass
        return cls.CONFIG["rewards"].get(event_type, 0.0)

    @staticmethod
    def encode_state(db: Session, user_uid: str) -> str:
        import datetime
        from collections import Counter
        from sqlalchemy import text
        import json
        
        recent = db.execute(text("SELECT context_genre, context_experience FROM interactions WHERE user_uid = :uid ORDER BY created_at DESC LIMIT 50"), {"uid": user_uid}).fetchall()
        
        dominant_genre = 'general'
        dominant_exp = 'any'
        
        if recent:
            genres = [r[0] for r in recent if r[0]]
            exps = [r[1] for r in recent if r[1]]
            if genres: dominant_genre = Counter(genres).most_common(1)[0][0]
            if exps: dominant_exp = Counter(exps).most_common(1)[0][0]
        else:
            prof = db.execute(text("SELECT preferred_genres, preferred_experience FROM users WHERE user_uid = :uid"), {"uid": user_uid}).fetchone()
            if prof:
                try:
                    p_genres = json.loads(prof[0])
                    if p_genres: dominant_genre = p_genres[0]
                except: pass
                if prof[1]: dominant_exp = prof[1]
                
        hour = datetime.datetime.now().hour
        if 5 <= hour < 12: time_slot = 'morning'
        elif 12 <= hour < 17: time_slot = 'afternoon'
        elif 17 <= hour < 21: time_slot = 'evening'
        else: time_slot = 'night'
            
        return f"{dominant_genre}|{dominant_exp}|{time_slot}"

    @classmethod
    def update_q_value(cls, db: Session, user_uid: str, state_key: str, movie_id: int, reward: float):
        from sqlalchemy import text
        existing = db.execute(text("SELECT q_value, visit_count FROM rl_qtable WHERE user_uid = :uid AND state_key = :state AND movie_id = :mid"), 
                              {"uid": user_uid, "state": state_key, "mid": movie_id}).fetchone()
        
        current_q = existing[0] if existing else 0.0
        visit_count = existing[1] if existing else 0
        
        top_future = db.execute(text("SELECT q_value FROM rl_qtable WHERE user_uid = :uid AND state_key = :state ORDER BY q_value DESC LIMIT 1"),
                                {"uid": user_uid, "state": state_key}).fetchone()
        max_future_q = top_future[0] if top_future else 0.0
        
        td_target = reward + cls.CONFIG["discount_factor"] * max_future_q
        td_error = td_target - current_q
        new_q = current_q + cls.CONFIG["learning_rate"] * td_error
        
        if existing:
            db.execute(text("UPDATE rl_qtable SET q_value=:q, visit_count=:v, last_reward=:r, updated_at=CURRENT_TIMESTAMP WHERE user_uid=:uid AND state_key=:state AND movie_id=:mid"),
                       {"q": new_q, "v": visit_count + 1, "r": float(reward), "uid": user_uid, "state": state_key, "mid": movie_id})
        else:
            db.execute(text("INSERT INTO rl_qtable (user_uid, state_key, movie_id, q_value, visit_count, last_reward) VALUES (:uid, :state, :mid, :q, :v, :r)"),
                       {"uid": user_uid, "state": state_key, "mid": movie_id, "q": new_q, "v": 1, "r": float(reward)})
        db.commit()

def background_update_rl(user_id: str, movie_id: int, event_type: str, event_value: str = ''):
    """Offline RL training logic via DB connection pooling"""
    db = SessionLocal()
    try:
        reward = RLEngine.calculate_reward(event_type, event_value)
        state_key = RLEngine.encode_state(db, user_id)
        RLEngine.update_q_value(db, user_id, state_key, movie_id, reward)
        print(f"BG RL Update: User {user_id} | State {state_key} | Movie {movie_id} | Reward {reward:.2f}")
    except Exception as e:
        print(f"BG Update Error: {e}")
    finally:
        db.close()

@app.post("/track")
async def track_interaction(request: Request, bg: BackgroundTasks, db: Session = Depends(get_db)):
    """Logs interactions perfectly and triggers offline RL."""
    try:
        data = await request.json()
        uid = data.get('user_uid') or data.get('userUid')
        m_id = data.get('movie_id') or data.get('movieId')
        event_type = str(data.get('eventType') or data.get('event_type') or 'view')
        event_value = str(data.get('eventValue') or data.get('event_value') or '')
        context = data.get('context', {})
        
        if not uid or not m_id: return {"ok": False, "error": "Missing uid or m_id"}
        
        # Save to SQL interactions table
        interaction = Interaction(
            user_uid=str(uid), 
            movie_id=int(m_id), 
            event_type=event_type,
            event_value=event_value,
            context_genre=context.get('genre', ''),
            context_experience=context.get('experience', ''),
            context_source=context.get('source', ''),
            duration_ms=context.get('duration', 0)
        )
        db.add(interaction)
        db.commit()

        # Offload RL update to background queue exactly as requested
        bg.add_task(background_update_rl, str(uid), int(m_id), event_type, event_value)
        return {"status": "queued"}
    except Exception as e:
        return {"ok": False, "error": str(e)}


@app.get("/recommend", response_model=List[MovieRecommendation])
async def get_general_recommendations(user_id: str, db: Session = Depends(get_db), count: int = 8):
    """
    Generates general recommendations with Preference Vector Caching.
    """
    if MOVIES_DF is None or MOVIES_DF.empty:
        raise HTTPException(status_code=500, detail="Movie catalog not loaded.")

    # 1. Fetch User Preference Scores (From Cache or DB)
    user_pref_scores = PREF_CACHE.get(user_id)
    
    if user_pref_scores is None:
        count_movies = len(MOVIES_DF) if MOVIES_DF is not None else 0
        user_pref_scores = np.zeros(count_movies)
        
        if count_movies > 0:
            # Use SQLAlchemy for pooled query
            q_rows = db.query(RLQTable.movie_id, RLQTable.q_value).filter(RLQTable.user_uid == user_id).all()
            
            if q_rows and SIM_MODEL:
                for m_id, q_val in q_rows:
                    if m_id in SIM_MODEL['id_to_idx']:
                        m_idx = SIM_MODEL['id_to_idx'][m_id]
                        if m_idx < count_movies:
                            user_pref_scores[m_idx] = q_val * 2.5
            
            PREF_CACHE.set(user_id, user_pref_scores)
    
    if MOVIES_DF is None or MOVIES_DF.empty:
        raise HTTPException(status_code=500, detail="Dataframe empty")
    
    # 2. Compute Quality baseline for Cold Start
    quality_scores = (MOVIES_DF['popularity_score'] * 0.7) + (MOVIES_DF['rating_percent'] / 100.0 * 0.3)
    
    # 3. Final Hybrid Score
    # For general recs, we combine RL preferences with the quality baseline.
    final_scores = user_pref_scores + quality_scores.values

    # Determine If Cold Start (no interaction history)
    is_cold_start = np.sum(user_pref_scores) == 0

    # Get top items
    indices = np.argpartition(final_scores, -count)[-count:]
    indices = indices[np.argsort(final_scores[indices])][::-1]

    recommendations = []
    for idx in indices:
        movie_row = MOVIES_DF.iloc[idx].to_dict()
        pref_score = float(user_pref_scores[idx])
        
        # Explainability
        if is_cold_start:
            # Fallback reasoning for cold start
            reason = "Trending and highly rated globally"
        else:
            if pref_score > 1.5:
                reason = "Strongly aligns with your movie history"
            elif pref_score > 0.5:
                reason = "Matches your growing taste profile"
            else:
                reason = "Trending choice you might enjoy"

        rec = {
            **movie_row,
            "score": float(final_scores[idx]),
            "user_pref": pref_score,
            "reason": f"🤖 {reason}"
        }
        recommendations.append(MovieRecommendation(**rec))

    return recommendations


@app.get("/recommend/{movie_id}", response_model=List[MovieRecommendation])
async def get_movie_recommendations(movie_id: int, user_id: str, count: int = 5):
    """
    Generates recommendations using:
    1. Content-based similarity matrix.
    2. Reinforcement learning user preferences.
    
    Hybrid Score = similarity_score + user_preference_score
    """
    if SIM_MODEL is None or MOVIES_DF is None:
        raise HTTPException(status_code=500, detail="Models not loaded.")

    if movie_id not in SIM_MODEL['id_to_idx']:
        raise HTTPException(status_code=404, detail=f"Movie {movie_id} not in similarity model.")

    movie_idx = SIM_MODEL['id_to_idx'][movie_id]
    
    # 1. Content-based Similarity (Cosine Scores)
    sim_scores = SIM_MODEL['similarity_matrix'][movie_idx]
    
    # 2. Reinforcement Learning Preference Vector (Cached)
    user_pref_scores = PREF_CACHE.get(user_id)
    if user_pref_scores is None:
        count_movies = len(MOVIES_DF) if MOVIES_DF is not None else 0
        user_pref_scores = np.zeros(count_movies)
        q_rows = db.query(RLQTable.movie_id, RLQTable.q_value).filter(RLQTable.user_uid == user_id).all()
        if q_rows and count_movies > 0:
            for m_id, q_val in q_rows:
                if m_id in SIM_MODEL['id_to_idx']:
                    m_idx = SIM_MODEL['id_to_idx'][m_id]
                    if m_idx < count_movies:
                        user_pref_scores[m_idx] = q_val * 0.2
        PREF_CACHE.set(user_id, user_pref_scores)

    # Calculate Hybrid Score
    if len(user_pref_scores) != len(sim_scores):
        # Resilience check
        min_len = min(len(user_pref_scores), len(sim_scores))
        hybrid_scores = sim_scores[:min_len] + user_pref_scores[:min_len]
    else:
        hybrid_scores = sim_scores + user_pref_scores
    
    # Get top items, excluding target movie
    # argpartition is more efficient than argsort for top K
    indices = np.argpartition(hybrid_scores, -(count + 1))[-(count + 1):]
    indices = indices[np.argsort(hybrid_scores[indices])][::-1]  # Sort partition
    
    top_recommendations = []
    source_movie = MOVIES_DF.iloc[movie_idx]
    
    for idx in indices:
        m_id = SIM_MODEL['idx_to_id'][idx]
        if m_id == movie_id:
            continue
        
        movie_row = MOVIES_DF.iloc[idx].to_dict()
        score = float(hybrid_scores[idx])
        sim_score = float(sim_scores[idx])
        pref_score = float(user_pref_scores[idx])
        
        # Build explanation (ML reasoning)
        reason_parts = []
        # Content reasoning
        if sim_score > 0.4:
            # Check for specific overlaps for better explainability
            shared_genres = set(source_movie['genre'].split('|')).intersection(set(movie_row['genre'].split('|')))
            if shared_genres:
                reason_parts.append(f"similar {list(shared_genres)[0]} style")
            if source_movie['director'] == movie_row['director'] and source_movie['director'] != "Various Directors":
                reason_parts.append(f"same director ({source_movie['director']})")
        
        # Preference reasoning
        if pref_score > 0.3:
            reason_parts.append("matches your history")
            
        if not reason_parts:
            reason = "selected for overall similarity"
        else:
            reason = " and ".join(reason_parts)
            
        rec = {
            **movie_row,
            "score": score,
            "similarity": sim_score,
            "user_pref": pref_score,
            "reason": f"🤖 {reason.capitalize()}"
        }
        top_recommendations.append(MovieRecommendation(**rec))
        
        if len(top_recommendations) >= count:
            break
            
    return top_recommendations


@app.get("/metrics")
async def get_metrics():
    """Returns model effectiveness metrics."""
    metrics_path = os.path.join(BASE_DIR, 'models', 'metrics.pkl')
    try:
        with open(metrics_path, 'rb') as f:
            metrics = pickle.load(f)
        return metrics
    except:
        return {"error": "Metrics not computed yet."}


if __name__ == "__main__":
    # Ensure tables in database-url target exist
    Base.metadata.create_all(bind=engine)
    # Start server with scaling-ready settings using multiple workers
    import multiprocessing
    workers = min(4, multiprocessing.cpu_count())
    uvicorn.run("main:app", host="127.0.0.1", port=8000, workers=workers, reload=False)
