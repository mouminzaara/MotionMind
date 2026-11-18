# MotionMind Backend API

FastAPI service handling movement session synchronization, database persistence, and system vitality for the MotionMind platform.

## Features
- **FastAPI 0.110+**: Asynchronous, performant, and schema-validated.
- **SQLAlchemy 2.0 & Alembic**: Relational data modeling for participants, movement sessions, and kinematic metrics.
- **Configurable**: Environment-driven settings using Pydantic Settings.
- **Health Monitoring**: Real vitality endpoint at `/api/v1/health` with dynamic database probe.
- **Phase 1 Boundary**: Explicitly free of fake ML pipelines, mock analytics, or fake patient records.

## Setup Instructions

### 1. Create and Activate Virtual Environment
```bash
python -m venv venv

# Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Linux / macOS:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
```

### 4. Run the Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Health Check: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- OpenAPI Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 5. Run Backend Tests
```bash
pytest
```

