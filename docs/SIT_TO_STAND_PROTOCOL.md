# Sit-to-Stand (STS) Assessment Protocol & Biomechanical Specifications

## 1. Clinical Context & Background

The **30-Second Chair Stand Test (30CST)** and the **Five Times Sit-to-Stand (5XSTS)** are widely validated clinical and functional assessments used by physical therapists and exercise physiologists to measure lower body functional strength, muscular endurance, and postural balance.

MotionMind provides the digital instrumentation layer to record and quantify these assessments with spatial fidelity.

---

## 2. Standardized Test Setup

1. **Chair Requirements**:
   - Standard height: 17 inches (approx. 43 cm) without armrests or with armrests left unused.
   - Chair positioned against a secure wall to prevent slippage.
2. **Subject Posture**:
   - Arms crossed across the chest at the wrists (hands resting on opposite shoulders).
   - Feet flat on the floor, shoulder-width apart.
   - Back upright against the chair backrest at starting point.
3. **Camera Placement**:
   - Frontal or 45-degree anterolateral view at a distance of 6–8 feet (2–2.5 meters).
   - Camera lens set at approximately mid-torso height to minimize optical parallax.
   - Full body from feet to head clearly visible throughout the complete excursion.

---

## 3. Repetition State Machine

A single valid repetition consists of three distinct phases:

```
[State: Seated]
      │
      ▼ (Hip & Knee Extension initiated, vertical torso velocity > threshold)
[State: Concentric Ascent]
      │
      ▼ (Full Hip & Knee Extension reached; knee angle >= 165°)
[State: Standing Apex]
      │
      ▼ (Hip & Knee Flexion initiated, downward torso velocity)
[State: Eccentric Descent]
      │
      ▼ (Thighs horizontal, pelvis re-contacts chair surface)
[State: Seated Repetition Complete]
```

---

## 4. Key Quantitative Metrics Measured

| Metric Identifier | Units | Clinical Significance |
| :--- | :--- | :--- |
| `repetition_count` | count | Total completed repetitions within standard time window (e.g., 30 seconds). |
| `concentric_duration_sec` | seconds | Mean time to transition from seated to full vertical extension; reflects peak power. |
| `eccentric_duration_sec` | seconds | Mean time to transition from standing to controlled seat contact; reflects motor control. |
| `cadence_rpm` | reps/min | Rate of completed cycles per minute. |
| `trunk_flexion_peak_deg` | degrees | Peak forward torso lean utilized to generate forward momentum before lift-off. |
| `bilateral_symmetry_index` | ratio (-1 to 1) | Balance of left-to-right knee and hip excursion angles during the ascent phase. |

