class ValidationEngine:
    def validate(self, evidence_list: list) -> dict:
        # Group evidence by control_id
        control_evidence = {}
        for ev in evidence_list:
            cid = ev["control_id"]
            if cid not in control_evidence:
                control_evidence[cid] = []
            control_evidence[cid].append(ev)

        results = {}
        for cid, evs in control_evidence.items():
            fails = sum(1 for e in evs if e["status"] == "FAIL")
            passes = sum(1 for e in evs if e["status"] == "PASS")
            
            if fails > 0 and passes > 0:
                results[cid] = "PARTIAL"
            elif fails > 0:
                results[cid] = "FAIL"
            else:
                results[cid] = "PASS"
                
        return results

class GapEngine:
    def analyze(self, control_results: dict, evidence_list: list) -> list:
        gaps = []
        for cid, status in control_results.items():
            if status in ["FAIL", "PARTIAL"]:
                failed_evidence = [e for e in evidence_list if e["control_id"] == cid and e["status"] == "FAIL"]
                for ev in failed_evidence:
                    gaps.append({
                        "control_id": cid,
                        "expected": f"Expected PASS for {ev['evidence_type']} on {ev['resource_name']}",
                        "collected": f"Status is {ev['status']}",
                        "gap_description": f"Missing or failed {ev['evidence_type']} on {ev['resource_type']} {ev['resource_name']}"
                    })
        return gaps

class RiskEngine:
    def calculate(self, gaps: list) -> list:
        risks = []
        for gap in gaps:
            # Simple heuristic
            if "MFA" in gap["gap_description"] or "Secret" in gap["gap_description"]:
                risks.append({"gap": gap, "likelihood": "High", "impact": "High", "severity": "Critical"})
            else:
                risks.append({"gap": gap, "likelihood": "Medium", "impact": "Medium", "severity": "Moderate"})
        return risks

class ScoringEngine:
    def calculate_score(self, control_results: dict) -> dict:
        total = len(control_results)
        if total == 0:
            return {"overall_score": 0.0, "passed": 0, "failed": 0, "partial": 0}
            
        passes = sum(1 for s in control_results.values() if s == "PASS")
        fails = sum(1 for s in control_results.values() if s == "FAIL")
        partials = sum(1 for s in control_results.values() if s == "PARTIAL")
        
        score = (passes / total) * 100
        
        return {
            "overall_score": round(score, 1),
            "passed": passes,
            "failed": fails,
            "partial": partials
        }
