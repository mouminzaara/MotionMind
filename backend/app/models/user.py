"""SQLAlchemy model for Users."""

import uuid
from typing import List, TYPE_CHECKING
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.base import GUID, TimestampMixin

if TYPE_CHECKING:
    from app.models.movement_session import MovementSession


class User(Base, TimestampMixin):
    """User account model for movement assessment participants and reviewers."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        GUID,
        primary_key=True,
        default=uuid.uuid4,
    )
    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )
    hashed_password: Mapped[str] = mapped_column(
        String(255),
        nullable=True,  # Nullable during Phase 1 foundation preview
    )
    full_name: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
        default="",
    )
    role: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="participant",  # participant, reviewer, admin
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    # Relationships
    sessions: Mapped[List["MovementSession"]] = relationship(
        "MovementSession",
        back_populates="user",
        foreign_keys="MovementSession.user_id",
        cascade="all, delete-orphan",
    )
    reviewed_sessions: Mapped[List["MovementSession"]] = relationship(
        "MovementSession",
        back_populates="reviewer",
        foreign_keys="MovementSession.reviewer_id",
    )

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} role={self.role}>"

