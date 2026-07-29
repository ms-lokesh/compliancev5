import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Use Supabase PostgreSQL URL if provided, otherwise fallback to local SQLite for MVP testing
SUPABASE_URL = os.getenv("SUPABASE_DB_URL")
if SUPABASE_URL:
    SQLALCHEMY_DATABASE_URL = SUPABASE_URL
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./compliance.db"
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
