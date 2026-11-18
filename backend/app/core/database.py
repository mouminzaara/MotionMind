"""SQLAlchemy Database Engine, Session, and Health Probe Scaffolding."""

import logging
from typing import Generator, Dict, Any
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker, Session

from app.core.config import settings

logger = logging.getLogger(__name__)

# Configure connect_args based on database dialect
connect_args: Dict[str, Any] = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

# Scaffolding database engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """Dependency that provides a transactional database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_database_connectivity() -> Dict[str, Any]:
    """
    Safely probes the database connection without throwing unhandled exceptions.
    Returns status, dialect, and diagnostic detail.
    """
    dialect_name = engine.dialect.name
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "connected",
            "dialect": dialect_name,
            "details": "Connection established successfully",
        }
    except Exception as exc:
        logger.warning("Database connectivity check failed: %s", str(exc))
        return {
            "status": "disconnected",
            "dialect": dialect_name,
            "details": f"Database unavailable: {exc.__class__.__name__}",
        }

