"""Initial database schema for users, movement sessions, and session metrics.

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-11-18 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0001_initial_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create users table
    op.create_table(
        "users",
        sa.Column("id", sa.CHAR(36), primary_key=True, nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=True),
        sa.Column("full_name", sa.String(length=120), nullable=False, server_default=""),
        sa.Column("role", sa.String(length=30), nullable=False, server_default="participant"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)

    # 2. Create movement_sessions table
    op.create_table(
        "movement_sessions",
        sa.Column("id", sa.CHAR(36), primary_key=True, nullable=False),
        sa.Column("user_id", sa.CHAR(36), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("reviewer_id", sa.CHAR(36), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
        sa.Column("exercise_type", sa.String(length=50), nullable=False, server_default="sit_to_stand"),
        sa.Column("protocol_name", sa.String(length=80), nullable=False, server_default="30_second_chair_stand"),
        sa.Column("status", sa.String(length=30), nullable=False, server_default="scheduled"),
        sa.Column("target_duration_sec", sa.Integer(), nullable=False, server_default="30"),
        sa.Column("actual_duration_sec", sa.Float(), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(op.f("ix_movement_sessions_user_id"), "movement_sessions", ["user_id"], unique=False)
    op.create_index(op.f("ix_movement_sessions_reviewer_id"), "movement_sessions", ["reviewer_id"], unique=False)

    # 3. Create session_metrics table
    op.create_table(
        "session_metrics",
        sa.Column("id", sa.CHAR(36), primary_key=True, nullable=False),
        sa.Column("session_id", sa.CHAR(36), sa.ForeignKey("movement_sessions.id", ondelete="CASCADE"), nullable=False),
        sa.Column("metric_name", sa.String(length=80), nullable=False),
        sa.Column("value", sa.Float(), nullable=False),
        sa.Column("unit", sa.String(length=30), nullable=False, server_default=""),
        sa.Column("confidence", sa.Float(), nullable=False, server_default="1.0"),
        sa.Column("repetition_index", sa.Integer(), nullable=True),
        sa.Column("timestamp_offset_ms", sa.Integer(), nullable=True),
        sa.Column("extra_metadata", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(op.f("ix_session_metrics_session_id"), "session_metrics", ["session_id"], unique=False)
    op.create_index(op.f("ix_session_metrics_metric_name"), "session_metrics", ["metric_name"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_session_metrics_metric_name"), table_name="session_metrics")
    op.drop_index(op.f("ix_session_metrics_session_id"), table_name="session_metrics")
    op.drop_table("session_metrics")

    op.drop_index(op.f("ix_movement_sessions_reviewer_id"), table_name="movement_sessions")
    op.drop_index(op.f("ix_movement_sessions_user_id"), table_name="movement_sessions")
    op.drop_table("movement_sessions")

    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")

