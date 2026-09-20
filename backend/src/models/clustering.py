import pandas as pd
from sklearn.cluster import KMeans
from backend.src.config import PROCESSED_DATA_DIR

class TeamBehaviorClustering:
    def __init__(self, n_clusters: int = 3):
        self.n_clusters = n_clusters
        self.model = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)

    def cluster_contributors(self):
        csv_path = PROCESSED_DATA_DIR / "features.csv"
        if not csv_path.exists():
            raise FileNotFoundError("Processed features.csv not found. Run feature engineering first.")

        df = pd.read_csv(csv_path)
        if df.empty or len(df) < self.n_clusters:
            # Fallback if too few samples
            df["cluster"] = 0
            return df

        features = df[["commit_count", "pr_count", "issue_count"]]
        df["cluster"] = self.model.fit_predict(features)
        return df