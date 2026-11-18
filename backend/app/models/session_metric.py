"""SQLAlchemy model for Session Kinematic and Biomechanical Metrics."""

import uuid
from typing import Optional, Dict, Any, TYPE_CHECKING
from sqlalchemy import String, Integer, Float, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import GUID, TimestampMixin

if TYPE_CHECKING:
    from app.models.movement_session import MovementSession


class SessionMetric(Base, TimestampMixin):
    """Stores quantitative features extracted from an exercise session."""

    __tablename__ = "session_metrics"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        primary_key=True,
        default=uuid.uuid4,
    )
    session_id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        ForeignKey("movement_sessions.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    metric_name: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
        index=True,
    )
    value: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )
    unit: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="",
    )
    confidence: Mapped[float] = mapped_column(
        Float,
        nullable=False,
        default=1.0,
    )
    repetition_index: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )
    timestamp_offset_ms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )
    extra_metadata: Mapped[Optional[Dict[str, Any]]] = mapped_column(
        JSON,
        nullable=True,
    )

    # Relationships
    session: Mapped["MovementSession"] = relationship(
        "MovementSession",
        back_populates="metrics",
    )

    def __repr__(self) -> str:
        return (
            f"<SessionMetric id={self.id} session_id={self.session_id} "
            f"metric={self.metric_name} value={self.value} {self.unit}>"
        )

