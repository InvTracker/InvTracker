# InvenTrack - Material Design 3 Campus Food & Inventory Platform

[![React 18](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material Design 3](https://img.shields.io/badge/Google-Material%20Design%203-006874?logo=google&logoColor=white)](https://m3.material.io/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?logo=vercel&logoColor=white)](https://invtracker-henna.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**InvenTrack** is a modern, **Google Material Design 3 (Material You)** campus food ordering, cafe POS, and inventory management platform. Built specifically to eliminate the chaos of university dining halls, campus cafeterias, and student food courts, InvenTrack synchronizes **Students**, **Kitchen Chefs**, **Counter Cashiers**, and **Campus Administrators** in a real-time, responsive ecosystem.

Live Production Deployment: **https://invtracker-henna.vercel.app/**

---

## Table of Contents

- [The InvenTrack Vision](#the-inventrack-vision)
- [Role-Based Workflows](#role-based-workflows)
  - [1. Student Dining Portal](#1-student-dining-portal)
  - [2. Kitchen Back-of-House (BOH) & KDS](#2-kitchen-back-of-house-boh--kds)
  - [3. Counter POS & Cashier Terminal](#3-counter-pos--cashier-terminal)
  - [4. Campus Admin & Executive Suite](#4-campus-admin--executive-suite)
- [Key Features & Upgrades](#key-features--upgrades)
  - [Unified Dining & Express Flow](#unified-dining--express-flow)
  - [Mobile-First PWA Navigation & Sticky Cart](#mobile-first-pwa-navigation--sticky-cart)
  - [Persistent Floating Token Pill & QR Sheet](#persistent-floating-token-pill--qr-sheet)
  - [Native UPI Intent Deep-Linking & Desktop QR](#native-upi-intent-deep-linking--desktop-qr)
  - [Dynamic Canteen Rush Meter & Break Pre-Orders](#dynamic-canteen-rush-meter--break-pre-orders)
  - [High-Speed "Order Again" Combo Shelf](#high-speed-order-again-combo-shelf)
  - [Cart Item Cooking Requests (60-Char Notes)](#cart-item-cooking-requests-60-char-notes)
  - [Kitchen Kanban Audio Ding, Aging Badges & Note Chips](#kitchen-kanban-audio-ding-aging-badges--note-chips)
  - [Optimistic UI Updates & Offline Storage Hydration](#optimistic-ui-updates--offline-storage-hydration)
- [System Architecture](#system-architecture)
- [Codebase & Directory Structure](#codebase--directory-structure)
- [Data Models & Schema](#data-models--schema)
- [Quickstart & Installation](#quickstart--installation)
- [Deployment](#deployment)
- [Technology Stack](#technology-stack)
- [License](#license)

---

## The InvenTrack Vision

Campus dining spaces typically suffer from distinct operational pain points:
* **Students** endure unpredictable wait times, arrive at counters only to discover their favorite items sold out, and face confusing token pickup calls.
* **Kitchen Staff** juggle messy paper receipts, lose track of order aging, and miss special preparation requests during peak rush hours.
* **Cashiers** require rapid counter registers that support mixed student tenders (Campus UPI QR, Meal Passes, Cards, Cash).
* **Administrators** lack unified oversight over revenue, rush-hour demand curves, and supplier procurement thresholds.

**InvenTrack eliminates these bottlenecks** by combining live stock gauges, persistent token tracking, rapid cashier POS, interactive kitchen kanbans, and automated inventory audit exports into one cohesive, accessible platform.

---

## Role-Based Workflows

```text
       +-------------------------------------------------------------+
       |               INVENTRACK MULTI-ROLE ECOSYSTEM               |
       +------------------------------+------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                                                         |
         v                                                         v
   +-----------+                                             +-----------+
   |  STUDENT  | <----------- Front of House ------------>   |  COUNTER  |
   |  PORTAL   |                                             |    POS    |
   +-----------+                                             +-----------+
         |                                                         |
         v                                                         v
   +-----------+                                             +-----------+
   |  KITCHEN  | <----------- Back of House ------------->   |   ADMIN   |
   | (BOH) KDS |                                             | EXECUTIVE |
   +-----------+                                             +-----------+
```

### 1. Student Dining Portal
Designed for students ordering meals from mobile devices or laptops:
* **Unified Dining Menu**: Seamless discovery across all counters and categories with instant live search.
* **Dietary & Urgency Badges**: Pure Veg and Non-Veg indicators, spice level markers (Mild, Medium, Hot), and animated stock urgency tags (`Only X left!`).
* **Customization Notes**: Attach optional 60-character preparation notes to items (e.g., "Less ice", "Extra spicy", "No onion").
* **Multi-Tender Payment**: Support for **Campus UPI Intent (GPay/PhonePe/Paytm)**, desktop dynamic QR, **Meal Pass** with instant balance deduction, and **Cash at Counter**.
* **Order Tracking & Token Pill**: Persistent floating bottom pill with live status stepping (`Placed -> Preparing -> Ready for Pickup -> Picked Up`) and slide-up QR pickup sheet.
* **Weekly Spending Analytics**: Interactive expense chart identifying day-by-day spending patterns.
* **Interactive Feedback**: Submit 5-star ratings and comments across categories (Food Quality, Packaging, Wait Time, Hygiene) directly to the kitchen team.

### 2. Kitchen Back-of-House (BOH) & KDS
Tailored for kitchen managers and line cooks:
* **Interactive Kanban Queue**: Real-time tickets organized across 4 stages: `Placed`, `Preparing`, `Ready`, and `Picked up`.
* **New Order Audio Chimes & Entry Pulse**: Audible chimes and pulsing animations when new tickets arrive in the queue, with a one-click header mute toggle.
* **Elapsed Time Tracker & Visual Aging**: Live duration counters with automatic visual transitions:
  * 0 to 5 minutes: Normal subtle theme border.
  * 5 to 10 minutes: Amber border with "Prep delay" warning badge.
  * 10+ minutes: Pulsing red border with urgent "Priority pickup needed" badge.
* **Prominent Customization Note Chips**: Highlighted amber chips displaying student preparation instructions directly on the ticket.
* **Real-Time Stock Adjuster**: Quick increment (`+`), decrement (`-`), or out-of-stock toggles that reflect immediately on student menus.

### 3. Counter POS & Cashier Terminal
Fast cashier register for counter walk-ins and rapid sales:
* **Rapid Item Search & Counter Selector**: Search by name or category, select designated service counter, and add items with one tap.
* **Flexible Tender Options**: Process UPI, Meal Pass, Card, or Cash transactions with automated packaging fee calculations.
* **One-Click Token Printing**: Printable token slips formatted for thermal receipt printers.

### 4. Campus Admin & Executive Suite
Equipped for cafeteria managers, facility supervisors, and procurement leads:
* **Executive Overview Dashboard**: Real-time KPI summary cards displaying Total Gross Revenue, Total Order Volume, Critical Low Stock Count, and Active In-Flight Orders.
* **Demand Matrix & Re-Order Velocity**: Hourly meal distribution charts highlighting peak rush windows alongside top-velocity reordered items.
* **Procurement & Inventory Audit Table**: Threshold alarm monitors, restock urgency badges, and inline restock controls.
* **Export Audit CSV**: One-click export downloading current inventory counts, threshold deficits, and restock urgencies into a CSV spreadsheet.
* **Catalog Manager**: Dynamic form to add new items into the live catalog (specifying name, icon, category, counter, price, initial stock, threshold, and restock time).

---

## Key Features & Upgrades

### Unified Dining & Express Flow
* Merged previously separated shopping carts and sections into a single global cart state and persistent checkout flow.
* Top category filter bar featuring: `[All, Express / Grab & Go, Hot Meals, Quick Bites, Beverages, Desserts]`.
* Every card includes standardized dietary tags (Pure Veg green square icon, Non-Veg red/brown icon), spice level badges, and live portion stock counters.
* Animated urgency tag `Only X left!` automatically displays when inventory drops to 5 or fewer items.

### Mobile-First PWA Navigation & Sticky Cart
* Optimized mobile viewport layout styled with Google Material Design 3 tokens.
* Replaced cumbersome scrolling with an app-like sticky bottom bar displaying `[Total Items | Total Price | View Order]` for instant cart access.
* Haptic feedback cues (`navigator.vibrate(50)`) on cart additions, quantity changes, and checkout actions.

### Persistent Floating Token Pill & QR Sheet
* While an order is active in the kitchen, a persistent floating pill stays visible at the bottom of the screen:
  ```text
  Token #A-042 - Placed - Counter 2
  ```
* Tapping the pill smoothly slides up an interactive bottom sheet displaying the high-resolution QR token, assigned pickup counter, and complete item breakdown.
* An audio chime automatically alerts students when their ticket advances to **Ready for Pickup**.

### Native UPI Intent Deep-Linking & Desktop QR
* **Mobile Devices**: Tapping "Pay via any UPI App" launches installed payment apps (Google Pay, PhonePe, Paytm, BHIM) via a generated URI scheme:
  ```text
  upi://pay?pa=canteenupi@bank&pn=CampusCanteen&am={totalAmount}&cu=INR&tn=Order_{orderId}
  ```
* **Desktop Devices**: Dynamically renders a client-side QR code encoding the same UPI intent alongside a live 5-minute countdown timer.
* Fully supports **Meal Pass** instant deduction with live remaining balance displays, and **Cash at Counter** with collection notes.

### Dynamic Canteen Rush Meter & Break Pre-Orders
* Real-time kitchen queue analysis displays an active status banner at the top of the menu:
  * [Green] **Canteen Quiet**: < 5 active tickets, estimated wait 3-5 mins.
  * [Yellow] **Moderate Rush**: 5-15 active tickets, estimated wait 8-12 mins.
  * [Red] **Peak Rush Hour**: > 15 active tickets, estimated wait 15-20 mins.
* Pre-order dropdown under checkout (`Pickup Time: [Instant / In 15 mins / In 30 mins]`) allows students to schedule pickups during upcoming class breaks.

### High-Speed "Order Again" Combo Shelf
* Positioned directly below the home greeting and search bar as a horizontal scroll shelf (`Quick Re-Order` / `Order Again`).
* Automatically surfaces the student's 3 most frequently ordered items or last meal combo with direct "+ Add" buttons.
* Includes a one-click **"Re-order Entire Combo"** button to re-add multi-item meals to the cart instantly.

### Cart Item Cooking Requests (60-Char Notes)
* Under each item in the cart drawer, an expandable link allows students to add cooking instructions.
* Concise input field with placeholder examples (`e.g., Less ice, Extra spicy, No onion`) with a live `X/60 max` character counter.
* Students can edit or delete their saved instructions anytime before placing the order.
* Order item schemas (`items: [{ id, name, qty, price, note }]`) preserve and transmit cooking notes to the backend.

### Kitchen Kanban Audio Ding, Aging Badges & Note Chips
* **Audio & Visual Arrivals**: Plays an audible ding (`/notification.mp3` with Web Audio oscillator fallback) and triggers a green pulse animation when new tickets enter the "Placed" column.
* **Elapsed Time Tracker**: Calculates live elapsed time (`Placed 4m ago`).
* **Visual Aging States**: Dynamically updates card styling to alert chefs to aging tickets:
  * Normal border for fresh orders (< 5 mins).
  * Amber warning border with a `Prep delay` badge (5-10 mins).
  * Pulsing red border with a `Priority pickup needed` badge (10+ mins).
* **Highlighted Note Chips**: Cooking requests render prominently in bold yellow highlight chips (`.kanban-item-note-chip`) so line cooks notice customizations at a glance.

### Optimistic UI Updates & Offline Storage Hydration
* Instant UI updates when adding, incrementing, or removing items from the cart, backed by immediate `localStorage` synchronization.
* If an inventory check fails or an item runs out of stock, the UI rolls back gracefully with an inline alert: `"Item currently out of stock"`.
* Persists active tokens and cart states across page reloads or campus Wi-Fi drops.

---

## System Architecture

```text
+-----------------------------------------------------------------------------------+
|                           INVENTRACK APPLICATION SHELL                            |
|                                                                                   |
|  [ M3 Navigation Bar ]  [ Persona Navigation ]  [ Mobile Bottom Bar & Token Pill ]|
+-----------------------------------------------------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                       CENTRAL STATE ENGINE & DATA FLOW                            |
|                                                                                   |
|  * menuCatalog (Stock, Prices, Counters, Dietary Tags, Urgency Flags)             |
|  * cartState & cartNotes (Item Map, Quantities, 60-Char Preparation Notes)        |
|  * orderTickets (Tokens, Stages: Placed->Preparing->Ready->Picked, Notes)        |
|  * rushMeter (Queue Ticket Velocity, Estimated Wait Times)                        |
|  * offlineHydration (localStorage: cart, cart_notes, active_token)                |
+-----------------------------------------------------------------------------------+
                                          |
         +--------------------------------+--------------------------------+
         |                                                                 |
         v                                                                 v
+----------------------------------+             +----------------------------------+
|      STUDENT CONSUMER FLOW       |             |      BACK OF HOUSE OPERATIONS    |
|                                  |             |                                  |
|  * Menu & Dietary Filters        |             |  * Live Kitchen Kanban Board     |
|  * Quick Re-Order Combo Shelf    |             |  * Elapsed Prep Timers & Aging   |
|  * Cart with Cooking Requests    |             |  * New Order Chime & Note Chips  |
|  * UPI Deep-Link & Desktop QR    |             |  * Rapid Counter POS Billing     |
|  * Break Pre-Order Scheduling    |             |  * Stock Capacity Adjustments    |
|  * Floating Token Bottom Sheet   |             |  * Executive KPI Audit Export    |
+----------------------------------+             +----------------------------------+
```

---

## Codebase & Directory Structure

```text
InvenTrack/
+-- frontend/                        # Web Presentation Tier
|   +-- index.html                   # Multi-role M3 application shell
|   +-- landing.html                 # Landing page with role selector & live queue demo
|   +-- signin.html                  # Authentication portal (SSO / Register / Login)
|   +-- student-dashboard.html       # Standalone all-in-one student diner dashboard
|   +-- css/
|   |   +-- styles.css               # Complete M3 token system & responsive layout
|   +-- js/
|       +-- app.js                   # Client-side state engine & UI controllers
|
+-- backend/                         # Backend Service Tier (Node.js / TypeScript)
|   +-- src/
|   |   +-- controllers/             # Order, inventory, auth, and audit controllers
|   |   +-- schemas/                 # Zod validation schemas (orderItemSchema with note)
|   |   +-- services/                # Concurrency-safe atomic stock deduction & order service
|   |   +-- types/                   # OrderCartItem, Order, User type definitions
|   +-- server.js                    # Express REST API microservice with CORS & health checks
|   +-- package.json                 # Backend dependencies & build scripts
|
+-- source/                          # Modular Application Source Tier (React 18 / ES6)
|   +-- App.jsx                      # Main application router & layout shell
|   +-- main.jsx                     # React DOM mount point
|   +-- index.css                    # Material Design 3 tokens & styling
|   +-- app.js                       # Core reactive store engine
|   +-- package.json                 # React dependencies & build scripts
|   +-- vite.config.js               # Vite build configuration
|
+-- apis/                            # API Services & Integration Tier
|   +-- index.js                     # Unified barrel export for API services
|   +-- apiClient.js                 # Central HTTP client with headers & error handling
|   +-- ordersApi.js                 # Live order submission & ticket stepping
|   +-- inventoryApi.js              # Catalog querying & stock modification
|   +-- auditApi.js                  # Executive overview & CSV audit exports
|   +-- api-spec.json                # OpenAPI 3.0 specification for all REST endpoints
|
+-- index.html                       # Root landing page (introduces InvenTrack & Auth entry)
+-- student-dashboard.html           # Root student dashboard entrypoint
+-- landing.html                     # Root landing page mirror
+-- signin.html                      # Root sign-in mirror
+-- vercel.json                      # Vercel SPA routing configuration
+-- LICENSE                          # MIT License
+-- README.md                        # Project documentation (this file)
```

---

## Data Models & Schema

### 1. Menu Item Model
```javascript
{
  id: "item-1",
  name: "Chicken Dum Biryani",
  emoji: "restaurant",
  price: 185,
  cat: "Hot Meals",
  counter: "Counter 1 (Hot Meals)",
  stock: 25,
  lowThreshold: 8,
  restockTime: "15 min",
  diet: "non-veg", // "veg" | "non-veg"
  spice: "Medium", // "Mild" | "Medium" | "Hot"
  isExpress: false
}
```

### 2. Order Item Schema (with Customization Note)
```javascript
{
  id: "item-1",
  name: "Chicken Dum Biryani",
  qty: 1,
  price: 185,
  note: "Extra spicy, less oil" // Optional 60-character cooking request
}
```

### 3. Order Ticket Model
```javascript
{
  id: "ord-1730000000",
  token: "#A-042",
  customerName: "Rohan Sharma",
  role: "Student",
  items: [
    { id: "item-1", name: "Chicken Dum Biryani", qty: 1, price: 185, note: "Extra spicy, less oil" },
    { id: "item-8", name: "Artisan Cold Coffee", qty: 1, price: 45, note: "Less ice" }
  ],
  subtotal: 230,
  packing: 10,
  total: 240,
  paymentMethod: "Campus UPI",
  pickupTime: "In 15 mins",
  status: "Preparing",
  stageIndex: 1, // 0: Placed | 1: Preparing | 2: Ready | 3: Picked up
  counter: "Counter 1 (Hot Meals)",
  createdAt: "2026-11-01T11:00:00.000Z"
}
```

---

## Quickstart & Installation

You can run InvenTrack in either of two ways:

### Option A: Running the Standalone Web Version (Recommended)

InvenTrack provides a self-contained, zero-dependency browser setup:

1. Open `student-dashboard.html` or `index.html` directly in any modern web browser:
   * **Windows**: Double-click `student-dashboard.html` or run `start student-dashboard.html` in PowerShell.
   * **macOS / Linux**: Run `open student-dashboard.html` or `xdg-open student-dashboard.html`.
   * **VS Code**: Right-click `student-dashboard.html` and select **"Open with Live Server"**.

No Node.js or compiler required to run the client!

---

### Option B: Running the Node.js / TypeScript Backend

To run the REST API microservice:

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build TypeScript source**:
   ```bash
   npm run build
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   The backend service starts at `http://localhost:3000` with CORS enabled.

---

## Deployment

### Deploying to Vercel

InvenTrack is pre-configured with `vercel.json` SPA rewrites:

1. Push your repository to GitHub.
2. Link the repository on [Vercel](https://vercel.com/).
3. Set the Root Directory to `./` and deploy.
4. Vercel automatically hosts the progressive web application with instant CDN edge caching.

---

## Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend Platform** | **Vanilla ES6+ & HTML5 PWA** | Zero-dependency, ultra-fast client-side reactive store |
| **Component SPA** | **React 18 & Vite 5** | High-performance modular component architecture |
| **Design System** | **Google Material Design 3 (M3)** | Dynamic tonal palette, surface elevation, and typography |
| **Icons & Visuals** | **Material Symbols Outlined** | Scalable, semantic vector iconography |
| **Backend API** | **Node.js, Express & TypeScript** | Strict schema validation with Zod and concurrency locking |
| **Payment Integration**| **Native UPI Intent & Dynamic QR** | Deep-links for GPay, PhonePe, Paytm, and BHIM |
| **Hosting & Cloud** | **Vercel** | SPA rewrites, zero 404 routing, and instant edge CDN |

---

## License

This project is licensed under the [MIT License](LICENSE).
