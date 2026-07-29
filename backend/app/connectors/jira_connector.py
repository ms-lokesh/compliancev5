import json
import os
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent.parent / "sample_data" / "jira"

class JiraConnector:
    def _load_json(self, filename: str):
        filepath = DATA_DIR / filename
        if not filepath.exists():
            return []
        with open(filepath, "r") as f:
            return json.load(f)

    def load_projects(self):
        return self._load_json("projects.json")

    def load_users(self):
        return self._load_json("users.json")

    def load_permissions(self):
        return self._load_json("permissions.json")

    def load_workflows(self):
        return self._load_json("workflow.json")
