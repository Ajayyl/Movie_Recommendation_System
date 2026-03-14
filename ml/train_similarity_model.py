"""
UniVibe — Content-Based Similarity Model Trainer (Enhanced)
============================================================
Vectorizes movie features using TF-IDF and computes cosine similarity matrix.
Stores rich metadata alongside for explainable recommendations.

Pipeline:
  dataset.csv  →  TF-IDF Vectorization  →  Cosine Similarity  →  similarity.pkl

The model pickle contains:
  - similarity_matrix: NxN cosine similarity scores
  - movie_ids: ordered list of movie IDs
  - titles: ordered list of movie titles
  - id_to_idx / idx_to_id: fast lookup maps
  - metadata: per-movie metadata dict (genres, director, cast, keywords) for XAI
  - tfidf_feature_names: vocabulary from TF-IDF for debugging
  - model_info: training metadata (timestamp, dimensions, vocabulary size)
"""

import pandas as pd
import pickle
import os
import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def train_model(dataset_path: str = None, model_output_path: str = None):
    # Determine paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    if dataset_path is None:
        dataset_path = os.path.join(base_dir, 'ml', 'dataset.csv')
    
    if model_output_path is None:
        model_output_path = os.path.join(base_dir, 'models', 'similarity.pkl')

    print(f"Loading dataset from: {dataset_path}")
    df = pd.read_csv(dataset_path)
    
    if 'combined_features' not in df.columns:
        raise ValueError("Dataset does not contain 'combined_features' column. Run feature_engineering.py first.")

    print(f"Vectorizing features for {len(df)} movies...")
    
    # Initialize TF-IDF Vectorizer
    # We use a mix of unigrams and bigrams to capture more context
    tfidf = TfidfVectorizer(
        stop_words='english',
        ngram_range=(1, 2),
        max_features=5000,  # Cap vocabulary for efficiency
        min_df=1,
        max_df=0.95,
    )
    
    # Transform textual features into a matrix of TF-IDF vectors
    tfidf_matrix = tfidf.fit_transform(df['combined_features'].fillna(''))
    
    print(f"TF-IDF Matrix shape: {tfidf_matrix.shape}")
    print(f"Vocabulary size: {len(tfidf.vocabulary_)}")

    # Compute Cosine Similarity Matrix
    print("Computing cosine similarity matrix...")
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    # Build per-movie metadata for explainability
    metadata = {}
    for _, row in df.iterrows():
        mid = row['movie_id']
        metadata[mid] = {
            'genres': set(str(row.get('genre', '')).split('|')) if row.get('genre') else set(),
            'director': str(row.get('director', 'Unknown')),
            'cast': str(row.get('cast', 'Unknown')),
            'keywords': str(row.get('keywords', '')),
            'title': str(row.get('title', '')),
            'rating_percent': float(row.get('rating_percent', 0)),
            'popularity_score': float(row.get('popularity_score', 0)),
            'experience_type': str(row.get('experience_type', '')),
        }

    # Prepare data for serialization
    model_data = {
        'similarity_matrix': cosine_sim,
        'movie_ids': df['movie_id'].tolist(),
        'titles': df['title'].tolist(),
        'id_to_idx': {movie_id: i for i, movie_id in enumerate(df['movie_id'])},
        'idx_to_id': {i: movie_id for i, movie_id in enumerate(df['movie_id'])},
        'metadata': metadata,
        'tfidf_feature_names': tfidf.get_feature_names_out().tolist()[:100],  # Top 100 for debugging
        'model_info': {
            'trained_at': datetime.datetime.now().isoformat(),
            'num_movies': len(df),
            'tfidf_dimensions': tfidf_matrix.shape[1],
            'vocabulary_size': len(tfidf.vocabulary_),
            'ngram_range': '1-2',
        }
    }

    # Save to file
    os.makedirs(os.path.dirname(model_output_path), exist_ok=True)
    with open(model_output_path, 'wb') as f:
        pickle.dump(model_data, f)
    
    print(f"Model saved successfully to: {model_output_path}")
    print(f"Total entries: {len(model_data['movie_ids'])}")
    print(f"Metadata entries: {len(metadata)}")

    # Print sample similarities for validation
    print("\n── Sample Similarity Check ──")
    for i in range(min(3, len(df))):
        sim_scores = cosine_sim[i]
        top_indices = sim_scores.argsort()[::-1][1:4]  # Top 3 excluding self
        title = df.iloc[i]['title']
        print(f"\n  '{title}' most similar to:")
        for idx in top_indices:
            sim_title = df.iloc[idx]['title']
            score = sim_scores[idx]
            print(f"    → '{sim_title}' (score: {score:.4f})")


if __name__ == '__main__':
    train_model()
