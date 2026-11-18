# MotionMind Data Models Specification

This document defines the core relational database schema implemented in SQLAlchemy 2.0 with PostgreSQL.

---

## Entity Relationship Overview

```
┌─────────────────────────┐
│          users          │
│─────────────────────────│
│ id: UUID (PK)           │
│ email: VARCHAR(255)     │◀──────────┐
│ hashed_password: VARCHAR│           │
│ full_name: VARCHAR(120) │           │
│ role: VARCHAR(30)       │           │
│ is_active: BOOLEAN      │           │
│ created_at: TIMESTAMPTZ │           │
│ updated_at: TIMESTAMPTZ │           │
└────────────┬────────────┘           │
             │ 1                      │ (Optional Reviewer Association)
             │                        │
             │ N                      │
┌────────────▼────────────┐           │
│    movement_sessions    │           │
│─────────────────────────│           │
│ id: UUID (PK)           │           │
│ user_id: UUID (FK)      │           │
│ reviewer_id: UUID (FK)──┼───────────┘
│ exercise_type: VARCHAR  │
│ status: VARCHAR(30)     │
│ protocol_name: VARCHAR  │
│ target_duration_sec: INT│
│ actual_duration_sec: FLT│
│ started_at: TIMESTAMPTZ │
│ completed_at: TIMESTAMPT│
│ notes: TEXT             │
│ created_at: TIMESTAMPTZ │
│ updated_at: TIMESTAMPTZ │
└────────────┬────────────┘
             │ 1
             │
             │ N
┌────────────▼────────────┐
│     session_metrics     │
│─────────────────────────│
│ id: UUID (PK)           │
│ session_id: UUID (FK)   │
│ metric_name: VARCHAR(80)│
│ value: DOUBLE PRECISION │
│ unit: VARCHAR(30)       │
│ confidence: DOUBLE PREC │
│ repetition_index: INT   │
│ timestamp_offset_ms: INT│
│ extra_metadata: JSONB   │
│ created_at: TIMESTAMPTZ │
└─────────────────────────┘
```

---

## Detailed Model Definitions

### 1. `users` Table
Stores authenticated participant and reviewer identities.
- `id` (UUID, Primary Key, generated via standard UUID4)
- `email` (String, unique, indexed, case-insensitive normalization)
- `hashed_password` (String, bcrypt/argon2 hash storage; nullable for Phase 1 preview)
- `full_name` (String, max 120 chars)
- `role` (String: `participant`, `reviewer`, `admin`)
- `is_active` (Boolean, default `True`)
- `created_at` (DateTime with timezone, UTC)
- `updated_at` (DateTime with timezone, UTC)

### 2. `movement_sessions` Table
Tracks individual movement assessment sessions.
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key referencing `users.id`, indexed)
- `reviewer_id` (UUID, nullable Foreign Key referencing `users.id`)
- `exercise_type` (String, default: `sit_to_stand`)
- `protocol_name` (String: `30_second_chair_stand`, `5_repetition_sit_to_stand`, `freeform`)
- `status` (String: `scheduled`, `in_progress`, `completed`, `aborted`, default: `scheduled`)
- `target_duration_sec` (Integer, e.g. 30 seconds)
- `actual_duration_sec` (Float, elapsed assessment duration)
- `started_at` (DateTime with timezone, nullable)
- `completed_at` (DateTime with timezone, nullable)
- `notes` (Text, optional participant or reviewer observational comments)
- `created_at` (DateTime with timezone, UTC)
- `updated_at` (DateTime with timezone, UTC)

### 3. `session_metrics` Table
Normalized time-series and aggregate kinematic features extracted from video frames.
- `id` (UUID, Primary Key)
- `session_id` (UUID, Foreign Key referencing `movement_sessions.id`, indexed)
- `metric_name` (String, e.g., `repetition_count`, `concentric_duration_sec`, `eccentric_duration_sec`, `peak_trunk_flexion_deg`)
- `value` (Double Precision, numerical measurement)
- `unit` (String, e.g., `count`, `seconds`, `degrees`, `ratio`)
- `confidence` (Double Precision, 0.0 - 1.0 landmark tracking confidence)
- `repetition_index` (Integer, nullable, links a metric to a specific rep number)
- `timestamp_offset_ms` (Integer, millisecond offset from session start)
- `extra_metadata` (JSONB, auxiliary kinematic details such as joint coordinate vectors)
- `created_at` (DateTime with timezone, UTC)

