# MotionMind Architecture & System Design

## 1. Executive Summary

MotionMind is an edge-first movement intelligence platform designed to measure human biomechanics during standard sit-to-stand protocols using standard consumer webcams. By conducting pose estimation and biomechanical extraction on the client device (using MediaPipe Pose Landmarker inside a Web Worker), video streams never leave the user's browser, preserving user privacy and providing zero-latency visual feedback.

The backend acts as an audit trail, longitudinal metrics store, and secure synchronization plane for structured movement features and reviewer reports.

---

## 2. Core Pillars

```
┌─────────────────────────────────────────────────────────────────┐
│                       Browser Client (Next.js)                  │
│                                                                 │
│  ┌────────────────────┐    ┌─────────────────────────────────┐  │
│  │ UI & Navigation    │    │ Web Worker (MediaPipe Landmarker│  │
│  │ - Landing & Auth   │    │ - 33 Landmark Real-Time Stream  │  │
│  │ - Dashboard Preview│    │ - Sit-to-Stand State Machine    │  │
│  │ - Report Viewer    │    │ - Feature Extraction Engine     │  │
│  └─────────▲──────────┘    └────────────────▲────────────────┘  │
│            │                                │                   │
│            │ Local Session Metrics Buffer   │ Raw Camera Frames │
│            └────────────────────────────────┴───────────┐       │
│                                                         │       │
└─────────────────────────────────┬───────────────────────┼───────┘
                                  │ HTTPS / JSON          ▼
                                  │ (Aggregated Metrics Only;
                                  │  No Raw Video Upload)
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FastAPI Backend Service                      │
│                                                                 │
│  ┌────────────────────┐    ┌─────────────────────────────────┐  │
│  │ API Endpoints (v1) │    │ Core Services                   │  │
│  │ - Health & Status  │    │ - Session Validator             │  │
│  │ - Users & Roles    │    │ - Metric Ingestion              │  │
│  │ - Movement Sessions│    │ - Reviewer Access Control       │  │
│  └─────────▲──────────┘    └────────────────▲────────────────┘  │
│            │                                │                   │
│            └────────────────────────────────┘                   │
│                            │                                    │
│                            ▼                                    │
│           SQLAlchemy 2.0 ORM + Alembic Migrations               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
              PostgreSQL Relational Storage
```

---

## 3. Technology Choices

| Domain | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js (App Router, React 19) | Server-side rendering for landing and static pages; client-side reactivity for real-time canvas rendering. |
| **Styling System** | Tailwind CSS | Utility-first styling enabling a disciplined, accessible lavender and slate design token system. |
| **Client-Side CV (Phase 2)** | MediaPipe Pose Landmarker | 33 3D landmarks running on WebAssembly/WebGL with 30+ FPS on consumer laptops without GPU server costs. |
| **Backend API** | FastAPI (Python 3.11+) | Asynchronous, high-performance API framework with automated OpenAPI documentation and Pydantic validation. |
| **ORM & Migrations** | SQLAlchemy 2.0 & Alembic | Industry-standard typed ORM and version-controlled database schema migrations. |
| **Primary Database** | PostgreSQL | Robust ACID compliance for user accounts, session metadata, and indexed time-series biomechanical metrics. |

---

## 4. Movement Measurement vs. Diagnostic System

A fundamental design constraint of MotionMind is the distinction between **measurement** and **diagnosis**:

- **Allowed Scope (Measurement)**:
  - Timestamped repetition counting.
  - Concentric duration (time taken to stand up).
  - Eccentric duration (time taken to sit down).
  - Peak coronal trunk deviation and bilateral knee symmetry.
  - Longitudinal variability across sessions.
- **Explicit Non-Scope (Diagnostic & Medical Triage)**:
  - Diagnosing musculoskeletal conditions, frailty syndromes, or neurological disorders.
  - Recommending medication, invasive therapies, or unvalidated physical interventions.
  - Making automated clinical determinations without human therapist oversight.

