# InvenTrack Production Backend API Server

Production-grade, crash-resilient campus dining & inventory backend engine engineered with **TypeScript (strict mode)**, **Express.js**, **Zod runtime validation**, and **Firebase Admin Authentication**.

---

## 1. System Architecture

```
backend/
├── src/
│   ├── config/
│   │   ├── env.ts                   # Strict environment variable validation with Zod
│   │   ├── firebase.ts              # Firebase Admin SDK initialization
│   │   └── redis.ts                 # Redis connection & distributed lock adapter
│   ├── types/
│   │   ├── auth.ts                  # User roles ('student' | 'kitchen' | 'admin') & AuthRequest
│   │   ├── order.ts                 # Order items, statuses & interfaces
│   │   ├── inventory.ts             # Catalog items & audit structures
│   │   └── api.ts                   # Standardized ApiResponse & ApiErrorResponse
│   ├── schemas/
│   │   ├── order.schema.ts          # Zod validation schemas for order endpoints
│   │   └── inventory.schema.ts      # Zod validation schemas for catalog & stock
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # authenticateUser & requireRole RBAC guards
│   │   ├── validate.middleware.ts   # Compile/runtime validation rejecting invalid requests with 400
│   │   ├── error.middleware.ts      # Strongly typed global Express error handler
│   │   ├── rateLimiter.middleware.ts# express-rate-limit traffic throttling
│   │   ├── requestId.middleware.ts  # Crypto UUID request tracing (X-Request-Id)
│   │   └── idempotency.middleware.ts# Idempotency token deduplication
│   ├── services/
│   │   ├── lock.service.ts          # Distributed Redis mutex with in-memory fallback
│   │   ├── inventory.service.ts     # Atomic multi-item stock deduction & race condition guards
│   │   ├── order.service.ts         # Concurrency-safe order creation & token generation
│   │   └── audit.service.ts         # Revenue analytics & CSV export generator
│   ├── controllers/
│   │   ├── health.controller.ts     # System health, memory & uptime probe
│   │   ├── auth.controller.ts       # Session profile & permission inspection
│   │   ├── inventory.controller.ts  # Catalog queries, stock adjustments & additions
│   │   ├── order.controller.ts      # Concurrency-safe order placement & KDS status updates
│   │   └── audit.controller.ts      # Management analytics & CSV reporting
│   ├── routes/
│   │   ├── health.routes.ts         # GET /health & GET /api/health
│   │   ├── auth.routes.ts           # GET /api/auth/profile
│   │   ├── inventory.routes.ts      # GET, POST, PATCH /api/inventory
│   │   ├── order.routes.ts          # GET, POST, PATCH /api/orders
│   │   ├── audit.routes.ts          # GET /api/audit/overview & /api/audit/export-csv
│   │   └── index.ts                 # Master router aggregation
│   ├── utils/
│   │   ├── errors.ts                # AppError, BadRequestError, ForbiddenError, ConflictError
│   │   └── logger.ts                # Structured Pino logger with header redaction
│   ├── app.ts                       # Express pipeline (Helmet, CORS, Payload limits, Rate limiter)
│   └── index.ts                     # Process guards, clustering, and graceful shutdown
├── ecosystem.config.cjs             # PM2 cluster configuration (auto-restart at 500MB)
├── Dockerfile                       # Multi-stage production container build
├── docker-compose.yml               # Production API + Redis compose setup
├── tsconfig.json                    # Strict TypeScript configuration
└── package.json
```

---

## 2. Crash Resilience & Concurrency Guarantees

1. **Process Crash Guards**:
   - `process.on('uncaughtException')` and `process.on('unhandledRejection')` intercept unhandled errors, prevent process dropouts, log structured diagnostic telemetry via Pino, and trigger orderly draining.
   - `SIGTERM` and `SIGINT` signals initiate graceful shutdown, stopping new connections, completing in-flight HTTP requests, closing Redis pools, and exiting cleanly within a 10s timeout budget.

2. **Distributed Locks & Atomic Stock Deduction**:
   - `LockService.withMultiLock()` acquires atomic mutexes on affected item IDs before checking or deducting inventory.
   - If stock is insufficient, orders fail immediately with `409 Conflict`, guaranteeing negative inventory and double-allocation are mathematically prevented under high parallel concurrency.

3. **Idempotency Protection**:
   - Passing `Idempotency-Key: <unique_client_token>` or `clientOrderToken` in the payload ensures duplicate button clicks return the cached response without double-charging or placing duplicate tickets.

4. **Role-Based Access Control (RBAC)**:
   - `authenticateUser` verifies Firebase ID tokens.
   - `requireRole('admin')` and `requireRole('kitchen', 'admin')` strictly block unauthorized student accounts with structured `403 Forbidden` responses.

---

## 3. Quick Start & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or pnpm
- (Optional) Redis server or Docker

### Installation
```bash
cd backend
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Development Server
Runs with hot-reload via `tsx`:
```bash
npm run dev
```

### Build & Production Run
```bash
# Type check and compile to dist/
npm run build

# Start production server
npm start
```

### Run with PM2 Clustering
```bash
npm run pm2:start
npm run pm2:logs
npm run pm2:reload
npm run pm2:stop
```

### Run with Docker Compose
```bash
docker compose up --build -d
```

---

## 4. API Endpoints Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | System uptime, memory metrics, Redis & Firebase status |
| `GET` | `/api/auth/profile` | Authenticated | Current user claims and role permissions |
| `GET` | `/api/inventory` | Public | Live menu catalog with stock levels and counter stations |
| `PATCH` | `/api/inventory/:id/stock` | `kitchen`, `admin` | Concurrency-safe atomic stock adjustment |
| `POST` | `/api/inventory` | `admin` | Add new item to catalog |
| `GET` | `/api/orders` | Authenticated | List orders (filtered by student ownership or kitchen queue) |
| `POST` | `/api/orders` | Authenticated | Place order with atomic stock deduction and idempotency |
| `PATCH` | `/api/orders/:id/status` | `kitchen`, `admin` | Advance order status (`Preparing`, `Ready`, `Picked up`) |
| `GET` | `/api/audit/overview` | `admin` | Real-time sales, order count, and low-stock alerts |
| `GET` | `/api/audit/export-csv` | `admin` | Download inventory audit spreadsheet in CSV format |
