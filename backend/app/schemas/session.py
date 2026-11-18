"""Pydantic schemas for Movement Sessions and Metrics."""

import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, ConfigDict


class SessionMetricRead(BaseModel):
    """Schema for individual movement features."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    session_id: uuid.UUID
    metric_name: str
    value: float
    unit: str
    confidence: float
    repetition_index: Optional[int] = None
    timestamp_offset_ms: Optional[int] = None
    extra_metadata: Optional[Dict[str, Any]] = None
    created_at: datetime


class MovementSessionRead(BaseModel):
    """Schema for reading a movement assessment session."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    user_id: uuid.UUID
    reviewer_id: Optional[uuid.UUID] = None
    exercise_type: str
    protocol_name: str
    status: str
    target_duration_sec: int
    actual_duration_sec: Optional[float] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    metrics: List[SessionMetricRead] = []

