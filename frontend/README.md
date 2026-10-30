# 🌐 InvenTrack — Frontend Tier

The **Frontend** directory contains the responsive, Google Material Design 3 (Material You) user-facing web platform.

## 📁 Structure

```text
frontend/
├── index.html              # Main multi-role application shell (User, Kitchen, Admin)
├── landing.html            # High-impact product landing page with live queue token simulation & role selector
├── signin.html             # Multi-role single sign-on / authentication portal
├── student-dashboard.html  # Standalone all-in-one student diner dashboard
├── css/
│   └── styles.css          # M3 dynamic design token system, elevations, colors, and layout
└── js/
    └── app.js              # Vanilla ES6 reactive client application logic and state engine
```

## 🚀 Key Highlights

* **Landing & Auth Flow First**: Requires users to select their role and authenticate before opening the dashboard.
* **Role-Adaptive Personas**:
  * **User (Diner & Student)**: Live digital tokens, menu ordering, multi-tender checkout, spending analytics.
  * **Kitchen Staff (Back of House)**: 4-stage KDS Kanban queue board, 1-tap stock capacity adjuster, counter billing POS.
  * **Campus Admin**: Executive revenue metrics, demand velocity curves, procurement audit & CSV exports.
* **Zero Dependencies**: Pure HTML5, modern CSS3, and ES6 JavaScript — runs in any modern browser without a build step.
