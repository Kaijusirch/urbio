

# Queensland Taxi CRM Dashboard - Revised Plan

## Overview
A multi-level access CRM dashboard for taxi dispatch operations in Queensland, Australia, featuring mock login, static realistic data, and custom branding (#008db1 teal and #bdbd36 olive gold).

---

## Phase 1: Foundation & Authentication

### Mock Login System
- Login page with email/password fields
- Role selector: **Dispatch Operator**, **Manager**, **Compliance Officer**
- Each role sees appropriate dashboard modules
- Demo credentials displayed on login screen

### Core Layout
- Collapsible sidebar navigation with teal (#008db1) accents
- Header with user info, role badge, and Queensland time (AEST)
- Responsive design for desktop and tablet

---

## Phase 2: Main Dashboard (Home)

### Key Metrics Cards
- **Active Complaints** - Urgent items highlighted
- **Available Vehicles** - Fleet status at a glance
- **Open Fare Evasions** - Cases requiring follow-up
- **Pending Hearings** - Upcoming disciplinary actions

### Live Activity Feed
- Recent events feed showing complaints, incidents, lost property
- Color-coded by type and priority
- Queensland timestamps (DD/MM/YYYY, 24-hour format)

### Autocab Integration Status Panel
- Mock API connection indicator (green = synced)
- Last sync timestamp
- Quick stats: Drivers online, Vehicles active

---

## Phase 3: Driver Management Module

### Driver Records (15+ profiles)
- Queensland driver licenses (e.g., 12345678)
- QLD Taxi Driver Authorisation numbers
- Medical fitness certificate expiry dates
- Accreditation status with renewal alerts
- Australian phone format (04XX XXX XXX)
- Home suburbs: Cairns, Brisbane, Gold Coast areas

### Vehicle Assignment
- QLD taxi registration format: **T12-345**
- Vehicle make/model details
- Assigned driver information

---

## Phase 4: Complaints Management

### Complaint Cases (10+ active)
- Queensland-specific issues:
  - "Driver refused short CBD fare - Brisbane"
  - "No child restraint available - QLD law violation"
  - "Overcharged airport to Surfers Paradise"
  - "Driver used phone while driving - Cairns"
  - "Refused guide dog - Disability Discrimination Act breach"
- Priority levels: Critical, High, Medium, Low
- Investigation status tracking
- Response deadline countdowns

### Linked Booking Data (within complaints)
- Trip details: Pickup/dropoff locations (QLD suburbs)
- Fare amount in AUD
- Date/time of incident
- Driver and vehicle (T12-345 format) involved
- Booking source: App, Phone, Street Hail, Autocab

### Complaint Workflow
- New → Under Review → Resolved → Closed
- Document attachment placeholders
- Outcome categories (Warning, Fine, Suspension)

---

## Phase 5: Lost Property Registry

### Lost Items (5+ recent entries)
- Realistic items: iPhone 15, leather wallet, surfboard, prescription glasses, laptop bag
- Found in vehicle with registration (T12-345)
- Queensland locations where discovered
- Claim status and contact attempts
- Collection deadline reminders

---

## Phase 6: Fare Evasion & Incidents

### Fare Evasion Cases
- Runner incidents with QLD suburb locations
- Amount owed in AUD
- Description of passenger/incident
- Investigation status
- Police report references
- Linked driver and vehicle details

### Safety & Incident Reporting
- Queensland-specific incidents:
  - Cyclone-related service disruptions
  - Wildlife on road (cassowary, kangaroo)
  - Airport rank disputes
  - Passenger assault
  - Vehicle breakdown locations
- Incident severity classification
- Follow-up action tracking

---

## Phase 7: Compliance & Hearings

### Disciplinary Hearings Calendar
- Upcoming hearing dates and times
- Driver under review
- Alleged QLD Transport regulation breach
- Hearing outcomes (Warning, Suspension, Licence Revocation)
- Document checklist for hearings

### Queensland Regulatory Compliance
- Driver authorisation renewal tracker
- Vehicle inspection due dates
- Regulatory audit checklist
- QLD Transport compliance status

---

## Visual Design

### Color Scheme
- **Primary**: #008db1 (Teal) - Headers, active states, primary buttons
- **Accent**: #bdbd36 (Olive Gold) - Highlights, badges, success states
- **Status Colors**: Red (critical), Orange (warning), Green (resolved)
- **Background**: Clean white/light grey professional styling

### Data Formatting
- Dates: DD/MM/YYYY
- Times: 24-hour format (AEST)
- Currency: $AUD
- Phone: 04XX XXX XXX
- Vehicle Registration: T12-345

---

## Deliverables Summary

| Module | Mock Data Items |
|--------|-----------------|
| Drivers | 15+ profiles with full QLD details |
| Complaints | 10+ active cases with linked booking data |
| Lost Property | 5+ recent items |
| Fare Evasions | 3+ active investigations |
| Incidents | 5+ safety reports |
| Hearings | 3+ scheduled proceedings |

