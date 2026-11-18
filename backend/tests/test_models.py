"""Tests for SQLAlchemy database models."""

import uuid
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.movement_session import MovementSession
from app.models.session_metric import SessionMetric


def test_create_user(db_session: Session):
    """Verify User model instantiation and persistence."""
    user = User(
        email="participant@example.org",
        full_name="Sarah Connor",
        role="participant",
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    assert user.id is not None
    assert isinstance(user.id, uuid.UUID)
    assert user.email == "participant@example.org"
    assert user.role == "participant"
    assert user.created_at is not None


def test_create_movement_session(db_session: Session):
    """Verify MovementSession creation with user association."""
    user = User(
        email="athlete@example.org",
        full_name="Alex River",
        role="participant",
    )
    db_session.add(user)
    db_session.commit()

    session = MovementSession(
        user_id=user.id,
        exercise_type="sit_to_stand",
        protocol_name="30_second_chair_stand",
        status="completed",
        target_duration_sec=30,
        actual_duration_sec=30.2,
        notes="Performed with crossed arms per protocol.",
    )
    db_session.add(session)
    db_session.commit()
    db_session.refresh(session)

    assert session.id is not None
    assert session.user_id == user.id
    assert session.user.email == "athlete@example.org"
    assert session.actual_duration_sec == 30.2


def test_create_session_metric(db_session: Session):
    """Verify SessionMetric creation and parent session relationship."""
    user = User(
        email="tester@example.org",
        full_name="Taylor Swift",
        role="participant",
    )
    db_session.add(user)
    db_session.commit()

    session = MovementSession(
        user_id=user.id,
        exercise_type="sit_to_stand",
        protocol_name="30_second_chair_stand",
        status="completed",
    )
    db_session.add(session)
    db_session.commit()

    metric = SessionMetric(
        session_id=session.id,
        metric_name="repetition_count",
        value=14.0,
        unit="count",
        confidence=0.98,
        repetition_index=None,
        timestamp_offset_ms=30000,
        extra_metadata={"calibration_valid": True},
    )
    db_session.add(metric)
    db_session.commit()
    db_session.refresh(metric)

    assert metric.id is not None
    assert metric.session_id == session.id
    assert metric.value == 14.0
    assert metric.session.exercise_type == "sit_to_stand"
    assert len(session.metrics) == 1
    assert session.metrics[0].metric_name == "repetition_count"

