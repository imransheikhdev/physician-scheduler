# Physician Appointment Scheduler – Nextera Backend Assignment

This project is a modular backend microservice built using **NestJS** and **PostgreSQL**, designed to recommend physician appointment slots based on availability, appointments, and billing gap rules.

---

## 🏥 Project Overview

This scheduling service:

- Recommends the **top 10 least disruptive slots** for a patient.
- Considers physician **availability**, **existing appointments**, and **gap rules** (buffer before/after and between slots).
- Supports a multi-clinic, multi-physician architecture.

---

## 🧠 Features

- Slot recommendation engine with buffer-aware conflict detection.
- Disruption scoring to prioritize minimally invasive time slots.
- Designed for scalability and easy future extension (e.g. multiple clinics).

---

## 📊 ERD

Key entities:

- `physician(id, name, specialization, clinicId)`
- `patient(id, name, contact)`
- `clinic(id, name, location)`
- `availability(id, date, start_time, end_time, physicianId, clinicId)`
- `appointment(id, start_time, end_time, status, physicianId, patientId, clinicId)`
- `billing_rule(id, gap_before_minutes, gap_after_minutes, min_gap_between_appointments, physicianId)`

> Refer to the `Scheduler Design Doc` in the repo for the complete ERD image and relationships.

---

## 🚀 API

### POST `/api/appointments/recommend`

**Request:**

```json
{
  "clinicId": "c001",
  "physicianId": "p001",
  "patientId": "u123",
  "preferredDate": "2025-07-01",
  "durationMinutes": 15
}
```

**Response:**

```json
{
  "status": "success",
  "recommendedSlots": [
    "2025-07-01T09:00:00",
    "2025-07-01T10:00:00",
    ...
  ]
}
```

---

## ⚙️ Scheduling Algorithm Highlights

- Loops over available slots from `start_time` to `end_time`.
- Each slot checked against all appointments including buffer zones (before/after).
- If valid, disruption score calculated to measure how spaced out the slot is.
- Top 10 slots sorted by least disruption are returned.

---

## 🧾 Assumptions

- All times are in UTC and use ISO string formats.
- One billing rule per physician.
- Appointments are non-overlapping and status-independent for conflict detection.

---

## 🧪 Testing

- Postman collection included in `/postman/collection.json`.
- Unit-tested slot generation algorithm.

---

## 📂 Folder Structure

```
src/
├── core/
│   ├── appointment/
│   ├── availability/
│   ├── billing-rule/
│   ├── clinic/
│   ├── patient/
│   └── physician/
├── scheduler/
│   └── scheduler.service.ts
```

---

## 🛠️ Tech Stack

- **NestJS** (modular backend framework)
- **PostgreSQL** (via TypeORM)
- **Docker** (optional for DB)
- **Postman** (for API testing)

---
