import os
import json
import requests
from backend.src.config import RAW_DATA_DIR

class GitHubClient:
    def __init__(self, owner: str, repo: str):
        self.owner = owner
        self.repo = repo
        self.token = os.getenv("GITHUB_TOKEN")
        self.headers = {
            "Accept": "application/vnd.github.v3+json"
        }
        if self.token:
            self.headers["Authorization"] = f"token {self.token}"
        
        self.base_url = f"https://api.github.com/repos/{owner}/{repo}"
        self.repo_folder = os.path.join(RAW_DATA_DIR, f"{owner}_{repo}")
        os.makedirs(self.repo_folder, exist_ok=True)

    def fetch_paginated_data(self, endpoint: str, max_pages: int = 3):
        """Fetches data with a safe page cap to prevent long waits."""
        results = []
        page = 1
        while page <= max_pages:
            url = f"{self.base_url}/{endpoint}?per_page=100&page={page}"
            response = requests.get(url, headers=self.headers)
            if response.status_code != 200:
                print(f"Error fetching {endpoint}: {response.status_code}")
                break
            
            data = response.json()
            if not data or not isinstance(data, list):
                break
                
            results.extend(data)
            if len(data) < 100:
                break # Reached the end of available records
            page += 1
        return results

    def collect_and_save_all(self):
        print(f"Quick-collecting data for {self.owner}/{self.repo} (capped for speed)...")
        
        # Fetch limited commits, pulls, and issues safely
        commits = self.fetch_paginated_data("commits", max_pages=2)
        pulls = self.fetch_paginated_data("pulls", max_pages=2)
        issues = self.fetch_paginated_data("issues", max_pages=2)

        # Save to raw JSON files
        with open(os.path.join(self.repo_folder, "commits.json"), "w") as f:
            json.dump(commits, f, indent=4)
            
        with open(os.path.join(self.repo_folder, "pulls.json"), "w") as f:
            json.dump(pulls, f, indent=4)
            
        with open(os.path.join(self.repo_folder, "issues.json"), "w") as f:
            json.dump(issues, f, indent=4)

        print(f"Successfully saved quick snapshot: {len(commits)} commits, {len(pulls)} PRs, {len(issues)} issues.")