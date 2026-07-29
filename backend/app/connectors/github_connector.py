import json
import os
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent.parent / "sample_data" / "github"

class GitHubConnector:
    def _load_json(self, filename: str):
        filepath = DATA_DIR / filename
        if not filepath.exists():
            return []
        with open(filepath, "r") as f:
            return json.load(f)

    def load_repositories(self):
        return self._load_json("repositories.json")

    def load_collaborators(self):
        return self._load_json("collaborators.json")

    def load_branch_protection(self):
        return self._load_json("branch_protection.json")

    def load_secret_scanning(self):
        return self._load_json("secret_scanning.json")
