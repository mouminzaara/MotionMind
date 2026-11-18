"""Pydantic schemas for health and system diagnostic responses."""

from datetime import datetime
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field


class DatabaseHealthStatus(BaseModel):
    """Database connectivity details."""

    status: str = Field(..., description="'connected' or 'disconnected'")
    dialect: Optional[str] = Field(None, description="Database dialect, e.g. postgresql, sqlite")
    details: Optional[str] = Field(None, description="Diagnostic diagnostic details or message")


class HealthResponse(BaseModel):
    """Complete system health payload."""

    status: str = Field(..., description="'healthy' or 'degraded'")
    app_name: str = Field(..., description="Application name")
    version: str = Field(..., description="Current semantic release version")
    environment: str = Field(..., description="Running environment")
    database: DatabaseHealthStatus
    timestamp: datetime = Field(..., description="UTC server timestamp")

