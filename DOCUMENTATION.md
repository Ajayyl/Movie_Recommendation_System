# UniVibe - System Documentation

## Project Overview
**UniVibe** is a next-generation AI-powered movie discovery platform. It combines content-based similarity matching with a custom-built Reinforcement Learning (RL) agent to provide highly personalized movie recommendations.

---

## Architecture & Tech Stack

### 1. Frontend (The Experience)
- **Engine**: Vanilla JavaScript (Modern ES6+)
- **Recommendation Logic**: `js/recommendationEngine.js`
- **Features**: Real-time filtering (Age, Genre, Experience), Hybrid explainability system (XAI), and local tracking.

### 2. Backend (The Logic Layers)
- **Web API (Node.js/Express)**: Handles user authentication (JWT), interaction tracking, and SQLite database operations.
- **Machine Learning API (Python/FastAPI)**: The "Brain" of the project. Manages vector similarity, TF-IDF encoding, and the contextual multi-armed bandit RL agent.

### 3. Data Layer (The Foundation)
- **Database**: SQLite (managed by Node.js for auth/tracking and Python for ML telemetry).
- **Movie Catalog**: 447 precision-curated movies with official Indian OTT links (Netflix, Hotstar, Prime Video).

---

## Machine Learning Implementation

### Hybrid Recommendation Formula
UniVibe uses a weighted blending algorithm:
`Final Score = 0.6 * (Quality & Profile Match) + 0.4 * (RL & Similarity Preference)`

### Explainable AI (XAI)
Every recommendation includes a human-readable **Reason** and a structured **Factor Breakdown**, so users understand why a movie is in their feed (e.g., "Shares genre with Inception", "Matches your Interest in Sci-Fi").

---

## Deployment & Maintenance
1. **Frontend**: Serve via Node.js or simply open `index.html`.
2. **Backend**: 
   - `npm install` and `npm run dev` for the Node.js server.
   - Run `start_ml.bat` for the FastAPI machine learning server.
3. **Data Integrity**: Use `scripts/fixed_movie_data.py` to update OTT links and generate unique movie quotes.

---
*Created by Antigravity AI - System Audit Completed March 2026*
