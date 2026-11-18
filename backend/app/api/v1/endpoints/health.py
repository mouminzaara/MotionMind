"""Health check endpoint implementation."""

from datetime import datetime, timezone
from fastapi import APIRouter, status
from app.core.config import settings
from app.core.database import check_database_connectivity
from app.schemas.health import HealthResponse, DatabaseHealthStatus

router = APIRouter()


@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="System Health & Diagnostic Status",
    description="Returns real-time vitality status of the API, environment metadata, and database connectivity probe.",
)
def get_health() -> HealthResponse:
    """Probes database and returns comprehensive vitality report."""
    db_result = check_database_connectivity()
    db_status = DatabaseHealthStatus(
        status=db_result.get("status", "disconnected"),
        dialect=db_result.get("dialect"),
        details=db_result.get("details"),
    )

    overall_status = "healthy" if db_status.status == "connected" else "degraded"

    return HealthResponse(
        status=overall_status,
        app_name=settings.APP_NAME,
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
        database=db_status,
        timestamp=datetime.now(timezone.utc),
    )

