from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import relationship
import datetime
from app.database.session import Base

class Tenant(Base):
    __tablename__ = "tenants"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    assessments = relationship("Assessment", back_populates="tenant")

class Assessment(Base):
    __tablename__ = "assessments"
    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"))
    framework = Column(String)
    criteria = Column(String)
    connector = Column(String)
    status = Column(String, default="Running")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    tenant = relationship("Tenant", back_populates="assessments")
    evidence = relationship("Evidence", back_populates="assessment")
    control_results = relationship("ControlResult", back_populates="assessment")
    dashboard_summary = relationship("DashboardSummary", back_populates="assessment", uselist=False)

class Evidence(Base):
    __tablename__ = "connector_evidence"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    connector = Column(String)
    resource_type = Column(String)
    resource_name = Column(String)
    control_id = Column(String)
    evidence_type = Column(String)
    status = Column(String)
    raw_data = Column(JSON)
    
    assessment = relationship("Assessment", back_populates="evidence")

class ControlResult(Base):
    __tablename__ = "control_results"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    control_id = Column(String)
    status = Column(String) # PASS, FAIL, PARTIAL, NOT_APPLICABLE
    
    assessment = relationship("Assessment", back_populates="control_results")
    gaps = relationship("Gap", back_populates="control_result")

class Gap(Base):
    __tablename__ = "gaps"
    id = Column(Integer, primary_key=True, index=True)
    control_result_id = Column(Integer, ForeignKey("control_results.id"))
    expected = Column(String)
    collected = Column(String)
    gap_description = Column(String)
    
    control_result = relationship("ControlResult", back_populates="gaps")
    risk = relationship("Risk", back_populates="gap", uselist=False)

class Risk(Base):
    __tablename__ = "risk_results"
    id = Column(Integer, primary_key=True, index=True)
    gap_id = Column(Integer, ForeignKey("gaps.id"))
    likelihood = Column(String)
    impact = Column(String)
    severity = Column(String)
    
    gap = relationship("Gap", back_populates="risk")

class DashboardSummary(Base):
    __tablename__ = "dashboard_summary"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    overall_score = Column(Float)
    passed_controls = Column(Integer)
    partial_controls = Column(Integer)
    failed_controls = Column(Integer)
    evidence_count = Column(Integer)
    risk_count = Column(Integer)
    
    assessment = relationship("Assessment", back_populates="dashboard_summary")

class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, index=True)
    title = Column(String, default="New Chat")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(String, primary_key=True, index=True)
    session_id = Column(String, ForeignKey("chat_sessions.id"))
    role = Column(String) # 'user', 'assistant', 'system'
    content = Column(Text)
    retrieval_snapshot = Column(JSON, nullable=True) # Store EnterpriseResponse JSON here
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    session = relationship("ChatSession", back_populates="messages")
