from app.connectors.github_connector import GitHubConnector
from app.connectors.aws_connector import AWSConnector
from app.connectors.jira_connector import JiraConnector

class ExtractionAgent:
    def __init__(self):
        self.github = GitHubConnector()
        self.aws = AWSConnector()
        self.jira = JiraConnector()

    def extract_github(self):
        return {
            "connector": "github",
            "repositories": self.github.load_repositories(),
            "collaborators": self.github.load_collaborators(),
            "branch_protection": self.github.load_branch_protection(),
            "secret_scanning": self.github.load_secret_scanning()
        }

    def extract_aws(self):
        return {
            "connector": "aws",
            "iam_users": self.aws.load_iam(),
            "roles": self.aws.load_roles(),
            "cloudtrail": self.aws.load_cloudtrail(),
            "security_groups": self.aws.load_security_groups()
        }

    def extract_jira(self):
        return {
            "connector": "jira",
            "projects": self.jira.load_projects(),
            "users": self.jira.load_users(),
            "permissions": self.jira.load_permissions(),
            "workflows": self.jira.load_workflows()
        }

    def extract_all_for_connector(self, connector_name: str):
        if connector_name.lower() == "github":
            return self.extract_github()
        elif connector_name.lower() == "aws":
            return self.extract_aws()
        elif connector_name.lower() == "jira":
            return self.extract_jira()
        return {}
