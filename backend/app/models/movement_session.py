"""SQLAlchemy model for Movement Assessment Sessions."""

import uuid
from datetime import datetime
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, Integer, Float, Text, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import GUID, TimestampMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.session_metric import SessionMetric


class MovementSession(Base, TimestampMixin):
    """Movement tracking session representing a specific exercise test."""

    __tablename__ = "movement_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    reviewer_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        GUID,
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    exercise_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="sit_to_stand",
    )
    protocol_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
        default="30_second_chair_stand",
    )
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="scheduled",  # scheduled, in_progress, completed, aborted
    )
    target_duration_sec: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=30,
    )
    actual_duration_sec: Mapped[Optional[float]] = mapped_column(
        Float,
        nullable=True,
    )
    started_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    completed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    notes: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    # Relationships
    user: Mapped["User"] = relationship(
        "User",
        back_populates="sessions",
        foreign_keys=[user_id],
    )
    reviewer: Mapped[Optional["User"]] = relationship(
        "User",
        back_populates="reviewed_sessions",
        foreign_keys=[reviewer_id],
    )
    metrics: Mapped[List["SessionMetric"]] = relationship(
        "SessionMetric",
        back_populates="session",
        cascade="all, delete-orphan",
        order_by="SessionMetric.timestamp_offset_ms",
    )

    def __repr__(self) -> str:
        return (
            f"<MovementSession id={self.id} user_id={self.user_id} "
            f"type={self.exercise_type} status={self.status}>"
        )

