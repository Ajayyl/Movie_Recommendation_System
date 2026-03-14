"""
UniVibe — Model Evaluation Metrics (Enhanced)
===============================================
Computes offline recommendation quality metrics:
- Precision@K    : % of top-K recs that are relevant
- Recall@K       : % of all relevant items captured in top-K
- Hit Rate@K     : % of queries with at least 1 relevant rec
- MRR@K          : Mean Reciprocal Rank (how early is the first relevant hit)
- NDCG@K         : Normalized Discounted Cumulative Gain
- Coverage       : % of catalog that appears in any top-K list
- Avg Similarity : Mean cosine similarity of top-K recommendations

Relevance definition:
  A recommendation is "relevant" if it shares at least one genre
  OR has the same director (excluding placeholder directors).
"""

import pandas as pd
import numpy as np
import pickle
import os
import json
import datetime


def evaluate_model(model_path: str = None, dataset_path: str = None, k=5):
    # Determine paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    if model_path is None:
        model_path = os.path.join(base_dir, 'models', 'similarity.pkl')
    
    if dataset_path is None:
        dataset_path = os.path.join(base_dir, 'ml', 'dataset.csv')

    print(f"Loading model: {model_path}")
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
    
    similarity_matrix = model_data['similarity_matrix']
    movie_ids = model_data['movie_ids']
    metadata = model_data.get('metadata', {})

    print(f"Loading dataset: {dataset_path}")
    df = pd.read_csv(dataset_path)
    
    # Build metadata from dataset if not in model
    movie_metadata = {}
    for _, row in df.iterrows():
        movie_metadata[row['movie_id']] = {
            'genres': set(str(row.get('genre', '')).split('|')) if row.get('genre') else set(),
            'director': str(row.get('director', 'Unknown')),
            'title': row['title'],
            'rating_percent': float(row.get('rating_percent', 0)),
            'popularity_score': float(row.get('popularity_score', 0)),
        }

    # Merge with model metadata if available
    if metadata:
        for mid, meta in metadata.items():
            if mid in movie_metadata:
                movie_metadata[mid].update({
                    k: v for k, v in meta.items() if k not in movie_metadata[mid]
                })

    PLACEHOLDER_DIRECTORS = {'Various Directors', 'Unknown', '', 'Talented Cast'}

    def is_relevant(id1, id2):
        """Determine if movie id2 is a relevant recommendation for id1."""
        if id1 not in movie_metadata or id2 not in movie_metadata:
            return False
        m1 = movie_metadata[id1]
        m2 = movie_metadata[id2]
        
        # Genre overlap
        g1 = m1.get('genres', set())
        g2 = m2.get('genres', set())
        if isinstance(g1, list): g1 = set(g1)
        if isinstance(g2, list): g2 = set(g2)
        shared_genres = g1.intersection(g2)
        
        # Director match (excluding placeholders)
        dir1 = str(m1.get('director', ''))
        dir2 = str(m2.get('director', ''))
        same_director = (dir1 == dir2) and (dir1 not in PLACEHOLDER_DIRECTORS)
        
        return len(shared_genres) > 0 or same_director

    def dcg_at_k(relevance_list, k):
        """Discounted Cumulative Gain at K."""
        dcg = 0.0
        for i, rel in enumerate(relevance_list[:k]):
            dcg += rel / np.log2(i + 2)  # i+2 because log2(1) = 0
        return dcg

    precisions = []
    recalls = []
    mrr_scores = []
    ndcg_scores = []
    hits = 0
    all_recommended = set()
    avg_similarities = []

    print(f"Evaluating Metrics@{k} across {len(movie_ids)} movies...")

    for i, movie_id in enumerate(movie_ids):
        # Top K indices
        sim_scores = np.array(similarity_matrix[i])
        # Get indices of top K (excluding self at index i)
        indices = np.argsort(sim_scores)[::-1].tolist()
        top_k_indices = [int(idx) for idx in indices if idx != i][:k]
        top_k_ids = [movie_ids[idx] for idx in top_k_indices]
        
        # Track coverage
        all_recommended.update(top_k_ids)
        
        # Average similarity of top-K
        top_k_sims = [float(sim_scores[idx]) for idx in top_k_indices]
        if top_k_sims:
            avg_similarities.append(np.mean(top_k_sims))

        # Calculate relevance
        relevance = [1 if is_relevant(movie_id, rec_id) else 0 for rec_id in top_k_ids]
        
        # Precision@K
        p_k = sum(relevance) / k
        precisions.append(p_k)

        # Hit Rate@K
        if sum(relevance) > 0:
            hits += 1

        # MRR
        mrr = 0
        for rank, rel in enumerate(relevance, 1):
            if rel == 1:
                mrr = 1.0 / rank
                break
        mrr_scores.append(mrr)

        # NDCG@K
        dcg = dcg_at_k(relevance, k)
        # Ideal DCG: all relevant items at the top
        ideal_relevance = sorted(relevance, reverse=True)
        idcg = dcg_at_k(ideal_relevance, k)
        ndcg = dcg / idcg if idcg > 0 else 0.0
        ndcg_scores.append(ndcg)

        # Recall@K (approximation based on available peers)
        total_relevant = sum([1 for other_id in movie_ids if other_id != movie_id and is_relevant(movie_id, other_id)])
        if total_relevant > 0:
            recalls.append(sum(relevance) / min(total_relevant, k))

    # Coverage: fraction of catalog that appears in any top-K recommendation
    coverage = len(all_recommended) / len(movie_ids) if movie_ids else 0.0

    report = {
        'precision_k': round(float(np.mean(precisions)), 4),
        'recall_k': round(float(np.mean(recalls)), 4) if recalls else 0.0,
        'hit_rate_k': round(float(hits / len(movie_ids)), 4),
        'mrr': round(float(np.mean(mrr_scores)), 4),
        'ndcg_k': round(float(np.mean(ndcg_scores)), 4),
        'coverage': round(coverage, 4),
        'avg_similarity': round(float(np.mean(avg_similarities)), 4) if avg_similarities else 0.0,
        'k': k,
        'num_movies': len(movie_ids),
        'evaluated_at': datetime.datetime.now().isoformat(),
    }

    print("\n" + "="*50)
    print("       ML EVALUATION REPORT (Enhanced)")
    print("="*50)
    print(f" Precision@{k}:      {report['precision_k']:.4f}")
    print(f" Recall@{k}:         {report['recall_k']:.4f}")
    print(f" Hit Rate@{k}:       {report['hit_rate_k']:.4f}")
    print(f" MRR@{k}:            {report['mrr']:.4f}")
    print(f" NDCG@{k}:           {report['ndcg_k']:.4f}")
    print(f" Catalog Coverage:  {report['coverage']:.4f} ({len(all_recommended)}/{len(movie_ids)} movies)")
    print(f" Avg Similarity:    {report['avg_similarity']:.4f}")
    print("="*50)

    # Save metrics as both pickle and JSON
    metrics_dir = os.path.join(base_dir, 'models')
    
    # Pickle format (for backend)
    metrics_pkl_path = os.path.join(metrics_dir, 'metrics.pkl')
    with open(metrics_pkl_path, 'wb') as f:
        pickle.dump(report, f)
    print(f"Metrics (pkl) saved to: {metrics_pkl_path}")

    # JSON format (for frontend/dashboard)
    metrics_json_path = os.path.join(metrics_dir, 'metrics.json')
    with open(metrics_json_path, 'w') as f:
        json.dump(report, f, indent=2)
    print(f"Metrics (json) saved to: {metrics_json_path}")

    return report


if __name__ == '__main__':
    evaluate_model(k=5)
