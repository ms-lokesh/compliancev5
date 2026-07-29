import json
import os
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent.parent / "sample_data" / "aws"

class AWSConnector:
    def _load_json(self, filename: str):
        filepath = DATA_DIR / filename
        if not filepath.exists():
            return []
        with open(filepath, "r") as f:
            return json.load(f)

    def load_iam(self):
        return self._load_json("iam_users.json")

    def load_roles(self):
        return self._load_json("roles.json")

    def load_cloudtrail(self):
        return self._load_json("cloudtrail.json")

    def load_security_groups(self):
        return self._load_json("security_groups.json")
