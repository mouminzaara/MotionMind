# MotionMind API Specification (v1)

Base URL: `/api/v1`

---

## 1. System Health

### `GET /api/v1/health`
Checks service vitality, configuration integrity, and database connectivity.

#### Response
```json
{
  "status": "healthy",
  "app_name": "MotionMind API",
  "version": "0.1.0",
  "environment": "development",
  "database": {
    "status": "connected",
    "dialect": "postgresql"
  },
  "timestamp": "2026-11-18T11:45:00.000000Z"
}
```

If the database is unconfigured or temporarily unreachable, the health check returns HTTP 200 with:
```json
{
  "status": "degraded",
  "app_name": "MotionMind API",
  "version": "0.1.0",
  "environment": "development",
  "database": {
    "status": "disconnected",
    "details": "Connection refused"
  },
  "timestamp": "2026-11-18T11:45:00.000000Z"
}
```

---

## 2. Planned Endpoints for Future Phases

### Authentication (Phase 2)
- `POST /api/v1/auth/register` - Create user account
- `POST /api/v1/auth/token` - Exchange credentials for JWT
- `GET /api/v1/auth/me` - Retrieve current session profile

### Movement Sessions (Phase 2 & Phase 3)
- `POST /api/v1/sessions` - Create new movement assessment session
- `GET /api/v1/sessions` - List user sessions with pagination
- `GET /api/v1/sessions/{id}` - Retrieve session detail with metrics
- `POST /api/v1/sessions/{id}/complete` - Finalize session and ingest kinematic metrics

### Reviewer Sharing (Phase 4)
- `POST /api/v1/sessions/{id}/share` - Generate reviewer invite token
- `GET /api/v1/reviews/pending` - List sessions awaiting reviewer commentary

