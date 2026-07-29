from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import datetime

class StartAssessmentRequest(BaseModel):
    tenant_id: int
    framework: str
    criteria: str
    connector: str

class StartAssessmentResponse(BaseModel):
    assessment_id: int
    status: str

class NormalizedEvidence(BaseModel):
    assessment_id: int
    connector: str
    resource_type: str
    resource_name: str
    control_id: str
    evidence_type: str
    status: str
    raw_data: Dict[str, Any]

class RiskResponse(BaseModel):
    likelihood: str
    impact: str
    severity: str

class DashboardResponse(BaseModel):
    assessment_id: int
    framework: str
    criteria: str
    overall_score: float
    passed_controls: int
    partial_controls: int
    failed_controls: int
    evidence_count: int
    risk_count: int
    top_risks: List[Dict[str, Any]] = []
    recent_activities: List[Dict[str, Any]] = []
    controls: List[Dict[str, Any]] = []
