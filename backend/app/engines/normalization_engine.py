class NormalizationEngine:
    def normalize(self, assessment_id: int, extracted_data: dict) -> list:
        normalized_evidence = []
        connector = extracted_data.get("connector", "unknown")
        
        if connector == "github":
            # Repositories
            for repo in extracted_data.get("repositories", []):
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "github", "Repository", repo.get("name"), "CC6.1", "Repository Config", "PASS", repo
                ))
            # Branch Protection
            for bp in extracted_data.get("branch_protection", []):
                status = "PASS" if bp.get("requires_approvals") else "FAIL"
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "github", "Branch", bp.get("repository"), "CC6.2", "Branch Protection", status, bp
                ))
            # Secret Scanning
            for ss in extracted_data.get("secret_scanning", []):
                status = "PASS" if ss.get("secret_scanning_enabled") else "FAIL"
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "github", "Repository", ss.get("repository"), "CC6.6", "Secret Scanning", status, ss
                ))

        elif connector == "aws":
            # IAM Users
            for user in extracted_data.get("iam_users", []):
                status = "PASS" if user.get("mfa_active") else "FAIL"
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "aws", "User", user.get("user"), "CC6.1", "MFA", status, user
                ))
            # CloudTrail
            for trail in extracted_data.get("cloudtrail", []):
                status = "PASS" if trail.get("is_multi_region_trail") else "PARTIAL"
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "aws", "Trail", trail.get("trail_name"), "CC6.8", "Audit Logging", status, trail
                ))
                
        elif connector == "jira":
            # Workflow
            for wf in extracted_data.get("workflows", []):
                status = "PASS" if wf.get("requires_manager_approval") else "FAIL"
                normalized_evidence.append(self._build_evidence(
                    assessment_id, "jira", "Project", wf.get("project"), "CC6.4", "Workflow Approvals", status, wf
                ))

        return normalized_evidence

    def _build_evidence(self, assessment_id, connector, r_type, r_name, control_id, e_type, status, raw):
        return {
            "assessment_id": assessment_id,
            "connector": connector,
            "resource_type": r_type,
            "resource_name": r_name,
            "control_id": control_id,
            "evidence_type": e_type,
            "status": status,
            "raw_data": raw
        }
