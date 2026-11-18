"""Tests for system health and vitality endpoints."""

from fastapi.testclient import TestClient


def test_root_endpoint(client: TestClient):
    """Verify root info endpoint returns service descriptors."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "MotionMind API"
    assert "version" in data
    assert data["status"] == "online"
    assert "/health" in data["health"]


def test_health_endpoint_structure(client: TestClient):
    """Verify GET /api/v1/health returns full vitality schema."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()

    assert data["app_name"] == "MotionMind API"
    assert data["version"] == "0.1.0"
    assert data["status"] in ("healthy", "degraded")
    assert "environment" in data
    assert "timestamp" in data

    # Database sub-object validation
    assert "database" in data
    db_info = data["database"]
    assert "status" in db_info
    assert db_info["status"] in ("connected", "disconnected")


def test_cors_headers(client: TestClient):
    """Verify CORS middleware responds with appropriate headers."""
    response = client.options(
        "/api/v1/health",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "GET",
        },
    )
    # FastApi / Starlette CORS responds 200 with Allow headers
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:3000"

