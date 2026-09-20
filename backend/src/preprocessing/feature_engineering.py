import json
import pandas as pd
from datetime import datetime
from backend.src.config import RAW_DATA_DIR, PROCESSED_DATA_DIR

class FeatureEngineer:
    def __init__(self, repo_folder_name: str):
        self.repo_folder = RAW_DATA_DIR / repo_folder_name
        self.processed_dir = PROCESSED_DATA_DIR

    def _load_json(self, filename):
        file_path = self.repo_folder / filename
        if not file_path.exists():
            return []
        with open(file_path, "r") as f:
            return json.load(f)

    def extract_features(self):
        commits = self._load_json("commits.json")
        prs = self._load_json("pull_requests.json")
        issues = self._load_json("issues.json")

        # Basic feature aggregation per contributor/repo
        contributor_stats = {}

        for commit in commits:
            author = commit.get("author")
            author_name = author.get("login") if author else "unknown"
            if author_name not in contributor_stats:
                contributor_stats[author_name] = {"commits": 0, "prs": 0, "issues": 0}
            contributor_stats[author_name]["commits"] += 1

        for pr in prs:
            user = pr.get("user")
            user_name = user.get("login") if user else "unknown"
            if user_name not in contributor_stats:
                contributor_stats[user_name] = {"commits": 0, "prs": 0, "issues": 0}
            contributor_stats[user_name]["prs"] += 1

        for issue in issues:
            # Skip pull requests returned in issues endpoint
            if "pull_request" in issue:
                continue
            user = issue.get("user")
            user_name = user.get("login") if user else "unknown"
            if user_name not in contributor_stats:
                contributor_stats[user_name] = {"commits": 0, "prs": 0, "issues": 0}
            contributor_stats[user_name]["issues"] += 1

        # Convert to DataFrame
        data = []
        for author, stats in contributor_stats.items():
            data.append({
                "contributor": author,
                "commit_count": stats["commits"],
                "pr_count": stats["prs"],
                "issue_count": stats["issues"],
            })

        df = pd.DataFrame(data)
        
        # Rule-based risk proxy mapping for machine learning target assignment later
        if not df.empty:
            df["imbalance_score"] = df["commit_count"] / (df["commit_count"].sum() + 1e-5)
            # Dummy rule proxy: if a contributor handles > 80% of work, flag as risk contributor
            df["is_high_risk"] = (df["imbalance_score"] > 0.8).astype(int)

        self.processed_dir.mkdir(parents=True, exist_ok=True)
        output_path = self.processed_dir / "features.csv"
        df.to_csv(output_path, index=False)
        print(f"Features successfully engineered and saved to {output_path}")
        return df