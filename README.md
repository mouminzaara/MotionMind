# MotionMind 🧘

**A production-oriented, browser-based AI movement intelligence platform.**

MotionMind helps individuals track therapist-approved sit-to-stand exercises through their webcam, measure biomechanical movement features, save structured exercise sessions, compare longitudinal progress, and optionally share objective movement summaries with an invited clinician or movement specialist.

> **Important Movement & Clinical Boundary:**  
> MotionMind is an objective movement measurement and biofeedback platform. It is strictly **not** a medical diagnostic tool, clinical triage system, or independent treatment device. All exercise targets and movement thresholds should be guided by a licensed therapist or physician.

---

## 🏗️ Monorepo Architecture

```
Motionmind/
├── frontend/             # Next.js 16 (App Router), TypeScript, Tailwind CSS
├── backend/              # Python 3.11+, FastAPI, SQLAlchemy 2.0, Alembic
├── docs/                 # Architecture, Protocol, and Data Model Specifications
│   ├── ARCHITECTURE.md
│   ├── SIT_TO_STAND_PROTOCOL.md
│   ├── DATA_MODELS.md
│   └── API_SPEC.md
├── .env.example          # Monorepo environment configuration template
├── .gitignore            # Workspace ignore rules
└── README.md             # Platform overview and getting started guide
```

---

## 🚀 Phase Implementation Roadmap

| Phase | Milestone | Status | Key Deliverables |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundation** | **Current** | Clean monorepo structure, polished lavender/slate frontend shell, navigation, preview dashboard, FastAPI backend, health check endpoint, SQLAlchemy & Alembic schema scaffolding, smoke tests. |
| **Phase 2** | **Computer Vision & In-Browser Tracking** | *Planned* | MediaPipe Pose Landmarker in Web Worker, 30-Second Chair Stand test state machine, camera calibration, real-time joint angle computations. |
| **Phase 3** | **Biomechanical Feature Pipeline** | *Planned* | Concentric/eccentric velocity phase parsing, trunk tilt angles, symmetry metrics, session summary persistence. |
| **Phase 4** | **Reviewer Sharing & Longitudinal Tracking** | *Planned* | Secure review invites, therapist-facing session reports, multi-session comparison charts, exportable movement dossiers. |

---

## 🛠️ Quickstart

### Prerequisites
- **Node.js** >= 18.17 (Node 22 LTS recommended)
- **Python** >= 3.11
- **PostgreSQL** (Optional for Phase 1 local health checks; SQLite supported for automated tests)

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the landing page, authentication preview shells, and preview dashboard.

Run verification:
```bash
npm run type-check
npm run build
npm test
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python -m uvicorn app.main:app --reload --port 8000
```

Verify backend health:
- Health check: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
- Interactive API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

Run backend tests:
```bash
pytest
```

---

## 🔒 Design & Product Principles

1. **Restrained, Professional Aesthetic**: Built with a calm lavender, clean white, and muted slate palette. No cartoonish gamification or generic AI SaaS cliches.
2. **Honest Capabilities**: Features not yet built in Phase 1 (such as webcam tracking and ML scoring) are explicitly labelled as previews rather than displaying fabricated analytics or mock data.
3. **Data Integrity & Privacy**: Movement features and video frames are treated with medical-grade caution. Phase 2 processing occurs directly on-device in the browser client.
4. **Accessible by Design**: WCAG 2.1 AA compliant contrast ratios, accessible button states, keyboard navigation, and semantic HTML elements.

