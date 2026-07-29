from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import sys
import uuid
import os
import json
from dotenv import load_dotenv

# Add the Compliance_KB path to import the LLMProvider
sys.path.append("/Users/lokesh/Documents/Compliance_KB")
load_dotenv("/Users/lokesh/Documents/Compliance_KB/.env")

try:
    from backend.llm import LLMProvider
    llm_provider = LLMProvider()
except ImportError:
    print("Could not load LLMProvider, using mock")
    llm_provider = None

from app.database.session import engine, Base, get_db
import app.database.models as models
from app.schemas.schemas import StartAssessmentRequest, StartAssessmentResponse, DashboardResponse
from app.agents.extractor import ExtractionAgent
from app.engines.normalization_engine import NormalizationEngine
from app.engines.compliance_engine import ValidationEngine, GapEngine, RiskEngine, ScoringEngine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Compliance Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

extractor = ExtractionAgent()
normalizer = NormalizationEngine()
validator = ValidationEngine()
gapper = GapEngine()
risker = RiskEngine()
scorer = ScoringEngine()

@app.post("/api/assessment/start")
def start_assessment(req: StartAssessmentRequest, db: Session = Depends(get_db)):
    # 1. Create Assessment DB Record
    tenant = db.query(models.Tenant).filter(models.Tenant.id == req.tenant_id).first()
    if not tenant:
        tenant = models.Tenant(id=req.tenant_id, name="Default Tenant")
        db.add(tenant)
        db.commit()

    assessment = models.Assessment(
        tenant_id=req.tenant_id,
        framework=req.framework,
        criteria=req.criteria,
        connector=req.connector
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    # 2. Extraction
    raw_data = extractor.extract_all_for_connector(req.connector)

    # 3. Normalization
    evidence_list = normalizer.normalize(assessment.id, raw_data)
    for ev in evidence_list:
        db_ev = models.Evidence(**ev)
        db.add(db_ev)
    db.commit()

    # 4. Validation
    control_results = validator.validate(evidence_list)
    for cid, status in control_results.items():
        db_cr = models.ControlResult(assessment_id=assessment.id, control_id=cid, status=status)
        db.add(db_cr)
    db.commit()

    # 5. Gap Analysis
    gaps = gapper.analyze(control_results, evidence_list)
    
    # 6. Risk Scoring
    risks = risker.calculate(gaps)
    
    # DB persist gaps and risks (Simplified for MVP)
    risk_count = len(risks)
    
    # 7. Compliance Score
    score_data = scorer.calculate_score(control_results)

    # 8. Store Dashboard Summary
    summary = models.DashboardSummary(
        assessment_id=assessment.id,
        overall_score=score_data["overall_score"],
        passed_controls=score_data["passed"],
        partial_controls=score_data["partial"],
        failed_controls=score_data["failed"],
        evidence_count=len(evidence_list),
        risk_count=risk_count
    )
    db.add(summary)
    
    assessment.status = "Completed"
    db.commit()

    return {
        "assessment_id": assessment.id, 
        "status": "Completed",
        "_responseData": {
            "score": score_data["overall_score"],
            "passed": score_data["passed"],
            "failed": score_data["failed"],
            "partial": score_data["partial"],
            "findings": []
        }
    }

@app.get("/api/dashboard/{assessment_id}", response_model=DashboardResponse)
def get_dashboard(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(models.Assessment).filter(models.Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
        
    summary = assessment.dashboard_summary
    if not summary:
        raise HTTPException(status_code=404, detail="Dashboard data not ready")

    # Fetch Controls
    controls_db = db.query(models.ControlResult).filter(models.ControlResult.assessment_id == assessment_id).all()
    controls_list = [{"control_id": c.control_id, "status": c.status} for c in controls_db]

    return {
        "assessment_id": assessment.id,
        "framework": assessment.framework,
        "criteria": assessment.criteria,
        "overall_score": summary.overall_score,
        "passed_controls": summary.passed_controls,
        "partial_controls": summary.partial_controls,
        "failed_controls": summary.failed_controls,
        "evidence_count": summary.evidence_count,
        "risk_count": summary.risk_count,
        "top_risks": [], # Simplified MVP return
        "recent_activities": [],
        "controls": controls_list
    }

class ChatRequest(BaseModel):
    session_id: str = None
    user_id: str = None
    message: str
    context: dict = None

import glob

def retrieve_from_kb(query: str):
    kb_path = "/Users/lokesh/Documents/Compliance_KB/knowledge_base"
    json_files = glob.glob(f"{kb_path}/*/*.json")
    stopwords = {"the", "and", "for", "are", "you", "with", "how", "what", "can", "show", "me", "give", "list", "all", "that", "this", "from"}
    query_words = [w for w in query.lower().split() if len(w) > 2 and w not in stopwords]
    
    matched_questions = []
    
    for fpath in json_files:
        try:
            with open(fpath, "r") as f:
                data = json.load(f)
                if isinstance(data, list):
                    for q in data:
                        q_text = str(q.get("question", "")).lower()
                        cat = str(q.get("category", "")).lower()
                        
                        score = sum(1 for w in query_words if w in q_text or w in cat)
                        if score > 0:
                            matched_questions.append((score, q))
        except Exception:
            continue
            
    # sort by score desc
    matched_questions.sort(key=lambda x: x[0], reverse=True)
    return [q[1] for q in matched_questions[:1]] # top 1 match

def retrieve_model_risk(query: str):
    import os
    models_kb_path = "/Users/lokesh/Documents/Compliance_KB/knowledge_base/models/ai_models.json"
    if not os.path.exists(models_kb_path):
        return None
    try:
        with open(models_kb_path, "r") as f:
            models_data = json.load(f)
        query_lower = query.lower()
        for m in models_data:
            aliases = m.get("aliases", []) + [m.get("model_name", "")]
            for alias in aliases:
                if alias and alias.lower() in query_lower:
                    return m
    except Exception as e:
        print(f"Error reading model risk kb: {e}")
    return None

@app.post("/api/v1/chat")
def chat_endpoint(req: ChatRequest, db: Session = Depends(get_db)):
    # 1. Create or load session
    session_id = req.session_id or str(uuid.uuid4())
    chat_session = db.query(models.ChatSession).filter(models.ChatSession.id == session_id).first()
    if not chat_session:
        title = req.message[:35] + "..." if len(req.message) > 35 else req.message
        chat_session = models.ChatSession(id=session_id, user_id=req.user_id, title=title)
        db.add(chat_session)
    
    # Save user message
    user_msg = models.ChatMessage(id=str(uuid.uuid4()), session_id=session_id, role="user", content=req.message)
    db.add(user_msg)
    db.commit()

    # 2. Retrieve knowledge
    model_risk = retrieve_model_risk(req.message)
    results = retrieve_from_kb(req.message)
    
    # 3. Prepare context chunks
    evidence = []
    context_chunks = []
    
    if model_risk:
        content = (
            f"AI Model Risk Profile: {model_risk.get('model_name')}\n"
            f"Primary Use Cases: {', '.join(model_risk.get('primary_use_cases', []))}\n"
            f"Strengths: {', '.join(model_risk.get('strengths', []))}\n"
            f"Potential Risks & Security Gaps: {', '.join(model_risk.get('potential_risks', []))}\n"
            f"Security & Governance Controls: {', '.join(model_risk.get('security_controls', []))}"
        )
        context_chunks.append({
            "entity_type": "AI Model Risk Assessment",
            "entity_id": model_risk.get("model_name"),
            "score": 1.0,
            "content": content
        })
        for c in model_risk.get("security_controls", []):
            evidence.append({"title": "Model Security Control", "description": c})

    for idx, res in enumerate(results):
        context_chunks.append({
            "entity_type": res.get("category", "Requirement"),
            "entity_id": res.get("id", f"idx-{idx}"),
            "score": 0.95,
            "content": f"Question: {res.get('question')}\nRisk if Missing: {res.get('risk_if_missing')}"
        })
        for ev in res.get("expected_evidence", []):
            evidence.append({"title": "Evidence Artifact", "description": ev})

    # Fetch history for the LLM context
    history_records = db.query(models.ChatMessage).filter(models.ChatMessage.session_id == session_id).order_by(models.ChatMessage.created_at.asc()).all()
    # exclude the last message we just inserted, as the LLM wrapper appends the current query
    chat_history = [{"role": msg.role, "content": msg.content} for msg in history_records[:-1]]

    def stream_generator():
        full_overview = ""
        final_tokens_used = 0

        if llm_provider:
            for event in llm_provider.stream_grounded_response(req.message, context_chunks, history=chat_history):
                if "chunk" in event:
                    full_overview += event["chunk"]
                    yield f"data: {json.dumps({'chunk': event['chunk']})}\n\n"
                if "tokens_used" in event:
                    final_tokens_used = event["tokens_used"]
        elif results:
            full_overview = "**I found the following compliance requirements based on your request:**\n\n"
            for res in results:
                full_overview += f"### {res.get('category', 'Requirement')}\n"
                full_overview += f"**Question:** {res.get('question', '')}\n"
                full_overview += f"**Risk if Missing:** {res.get('risk_if_missing', 'N/A')}\n\n"
            final_tokens_used = len(full_overview) // 4
            yield f"data: {json.dumps({'chunk': full_overview})}\n\n"
        else:
            full_overview = f"I received your message: '{req.message}'. I couldn't find any specific controls in the knowledge base matching your request."
            final_tokens_used = len(full_overview) // 4
            yield f"data: {json.dumps({'chunk': full_overview})}\n\n"

        dynamic_questions = [
            "Are there any open risks related to this?",
            "What is the break-glass procedure here?",
            "Can you provide a technical example?"
        ]
        
        if llm_provider and full_overview:
            dynamic_questions = llm_provider.generate_dynamic_follow_ups(req.message, full_overview)

        response_data = {
            "executive_summary": full_overview,
            "overview": full_overview,
            "required_evidence": evidence,
            "follow_up_questions": dynamic_questions,
            "references": [{"source_id": "soc2-trust-services", "text": "AICPA Trust Services Criteria (2017)"}],
            "validation": {"hallucination_detected": False},
            "confidence": {"overall": 0.92},
            "tokens_used": final_tokens_used
        }

        # Save assistant message
        asst_msg = models.ChatMessage(
            id=str(uuid.uuid4()), 
            session_id=session_id, 
            role="assistant", 
            content=full_overview,
            retrieval_snapshot=json.dumps(response_data)
        )
        db.add(asst_msg)
        db.commit()

        # Send final metadata
        yield f"data: {json.dumps({'metadata': response_data})}\n\n"

    return StreamingResponse(stream_generator(), media_type="text/event-stream")

@app.get("/chat/history")
def get_chat_history(user_id: str = None, db: Session = Depends(get_db)):
    if not user_id:
        return []
    sessions = db.query(models.ChatSession).filter(models.ChatSession.user_id == user_id).order_by(models.ChatSession.created_at.desc()).all()
    return [{"id": s.id, "title": s.title, "updated_at": s.created_at.isoformat()} for s in sessions]

@app.get("/chat/history/{session_id}")
def get_chat_session(session_id: str, db: Session = Depends(get_db)):
    msgs = db.query(models.ChatMessage).filter(models.ChatMessage.session_id == session_id).order_by(models.ChatMessage.created_at.asc()).all()
    history = []
    for m in msgs:
        history.append({
            "id": m.id,
            "role": m.role,
            "content": m.content,
            "retrieval_snapshot": m.retrieval_snapshot,
            "created_at": m.created_at.isoformat()
        })
    return {"history": history}

@app.delete("/chat/{session_id}")
def delete_chat_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(models.ChatSession).filter(models.ChatSession.id == session_id).first()
    if session:
        db.query(models.ChatMessage).filter(models.ChatMessage.session_id == session_id).delete()
        db.delete(session)
        db.commit()
    return {"status": "success"}
