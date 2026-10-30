# ⚙️ InvenTrack — Backend Tier

The **Backend** directory provides the REST API microservices, controllers, and state management engine for InvenTrack.

## 📁 Architecture

```text
backend/
├── server.js                # Express entrypoint with CORS, JSON parsing & routing
├── package.json             # Backend dependencies and scripts
│
├── models/
│   └── dataStore.js         # Unified in-memory and persistent state model
│
├── controllers/
│   ├── authController.js    # Multi-role authentication & session handling
│   ├── inventoryController.js# Real-time stock queries & capacity adjustments
│   ├── orderController.js   # Order placement, token generation & Kanban advancement
│   └── auditController.js   # Revenue KPI analytics & CSV audit generation
│
└── routes/
    ├── authRoutes.js        # POST /api/auth/login, POST /api/auth/register
    ├── inventoryRoutes.js   # GET /api/inventory/items, PATCH /api/inventory/items/:id/stock
    ├── orderRoutes.js       # GET /api/orders, POST /api/orders/place, PATCH /api/orders/:id/status
    └── auditRoutes.js       # GET /api/audit/overview, GET /api/audit/export-csv
```

## 🚀 Quickstart

```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000` with live health check at `/api/health`.

