# 🍽️ InvenTrack — Material Design 3 Campus Food & Inventory Platform

[![React 18](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material Design 3](https://img.shields.io/badge/Google-Material%20Design%203-006874?logo=google&logoColor=white)](https://m3.material.io/)
[![Vercel Deployment Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-black?logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**InvenTrack** is a next-generation, **Google Material Design 3 (Material You)** campus food ordering, cafe POS, and inventory management platform. Built to solve the chaos of university dining halls, campus cafeterias, and student food courts, InvenTrack connects **Students**, **Express Shoppers**, **Kitchen Chefs**, and **Campus Administrators** in a real-time, synchronized ecosystem.

Whether deployed as a **high-performance React 18 Single-Page Application (SPA)** or accessed as a **zero-dependency vanilla HTML5/CSS3/ES6 web platform**, InvenTrack delivers live inventory tracking, queue token management, rapid POS billing, kitchen kanban processing, and procurement auditing.

---

## 📌 Table of Contents

- [🌟 The InvenTrack Vision](#-the-invenTrack-vision)
- [👥 Four Role-Adaptive Personas](#-four-role-adaptive-personas)
  - [1. 🎓 Student Dining Portal](#1--student-dining-portal)
  - [2. ⚡ Express Shopper Portal](#2--express-shopper-portal)
  - [3. 🍳 Kitchen & Back of House (BOH)](#3--kitchen--back-of-house-boh)
  - [4. 👔 Campus Admin & Executive Suite](#4--campus-admin--executive-suite)
- [✨ Recent & Key Features](#-recent--key-features)
  - [🎲 Clean Schema & Dynamic Example Data Injection](#-clean-schema--dynamic-example-data-injection)
  - [🎨 Strict Google Material Design 3 (M3) Theming](#-strict-google-material-design-3-m3-theming)
  - [🌓 Dual Theme Engine (Front vs. Back of House)](#-dual-theme-engine-front-vs-back-of-house)
  - [🧾 Digital Receipt Modal & Printable Tokens](#-digital-receipt-modal--printable-tokens)
  - [🚀 Cloud-Ready Vercel SPA Routing](#-cloud-ready-vercel-spa-routing)
- [🏗️ System Architecture](#️-system-architecture)
- [📁 Codebase & Directory Structure](#-codebase--directory-structure)
- [📊 Data Models & Schema](#-data-models--schema)
- [🚀 Quickstart & Installation](#-quickstart--installation)
  - [Option A: Running the React 18 Application](#option-a-running-the-react-18-application)
  - [Option B: Running the Standalone Web Version](#option-b-running-the-standalone-web-version)
- [☁️ Deployment](#️-deployment)
- [🛠️ Technology Stack](#️-technology-stack)
- [🤝 Contributing & License](#-contributing--license)

---

## 🌟 The InvenTrack Vision

Campus dining spaces typically suffer from distinct operational pain points:
* **Students** endure unpredictable wait times, arrive at counters only to discover their favorite items sold out, and face confusing token pickup calls.
* **Kitchen Staff** juggle messy paper receipts, lose track of order aging, and cannot quickly communicate real-time stock runouts.
* **Cashiers** require rapid counter registers that support mixed student tenders (Campus UPI QR, Meal Passes, Cards, Cash).
* **Administrators** lack unified oversight over revenue, rush-hour demand curves, and supplier procurement thresholds.

**InvenTrack eliminates these bottlenecks** by unifying real-time stock gauges, live digital token stepping, rapid cashier POS, interactive kitchen kanbans, and automated inventory audit exports into one cohesive, accessible platform.

---

## 👥 Four Role-Adaptive Personas

InvenTrack features an instant **Role-Switcher** located in the top navigation bar. Switching personas dynamically updates the navigation drawer, viewports, and action bars tailored to that persona's workflow.

```
       ┌─────────────────────────────────────────────────────────────┐
       │              INVENTRACK MULTI-ROLE ECOSYSTEM                │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
         ┌───────────────┬────────────┴───┬────────────────┐
         ▼               ▼                ▼                ▼
   ┌───────────┐   ┌───────────┐    ┌───────────┐    ┌───────────┐
   │  STUDENT  │   │  SHOPPER  │    │  KITCHEN  │    │   ADMIN   │
   │  PORTAL   │   │  EXPRESS  │    │ (BOH) POS │    │ EXECUTIVE │
   └───────────┘   └───────────┘    └───────────┘    └───────────┘
```

### 1. 🎓 Student Dining Portal
Designed for students ordering meals from their laptops or mobile devices:
* **Live Digital Token Stepper**: Live tracker showing token numbers (e.g., `#A-042`) with real-time stage progression (**Placed → Preparing → Ready for Pickup → Picked Up**) and dynamic pickup ETAs.
* **Real-Time Stock Gauges**: Visual meters and semantic badges (`AVAIL`, `LOW`, `OUT`) displaying exact remaining portions.
* **Counter-Categorized Menu**: Browse meals filtered by counter (**Counter 1: Hot Meals**, **Counter 2: Quick Bites**, **Counter 3: Cafe & Drinks**) or category (**Mains, Snacks, Beverages, Desserts**) with instant search.
* **Smart Cart & Interactive Checkout**: Add/remove items, adjust quantities, calculate subtotal and campus packaging fees, and choose pickup counters.
* **Multi-Tender Payment**: Support for **Campus UPI (GPay/PhonePe QR)**, **Meal Pass** (with live balance tracking), **Debit/Credit Card**, and **Cash at Counter**.
* **Weekly Spending Analytics**: Interactive day-by-day expense bar chart identifying spending patterns and peak budget days.
* **"For You" Recommendation Engine**: Curated food suggestions based on frequent meal pairings and popular combos.
* **Interactive 5-Star Feedback**: Submit ratings and comments across categories (**Food Quality, Packaging, Wait Time, Hygiene**) that dispatch directly to the kitchen dashboard.
* **Student Profile & Auth**: Mock campus authentication (Student ID, Roll No, Year, Branch, Phone) with customizable notification preferences.

### 2. ⚡ Express Shopper Portal
Streamlined for fast-track walk-ins, faculty, and grab-and-go guests:
* **Fast-Track Store**: Single-click item discovery for high-frequency snacks, coffee, and daily specials.
* **Express Cart**: Quick order submission with customer name/reference tagging.
* **Instant Digital Token Receipts**: Generates printable token slips immediately upon order completion.

### 3. 🍳 Kitchen & Back of House (BOH)
Tailored for kitchen managers, line cooks, and counter cashiers:
* **Live Interactive Kanban Queue Board**: Drag-and-drop / one-click stage advancement across 4 columns:
  1. `Placed` (Incoming tickets)
  2. `Preparing` (Orders currently cooking)
  3. `Ready for Pickup` (Customer notified / chime sound)
  4. `Picked up` (Completed orders)
  * Includes counter filtering and instant count badges.
* **Real-Time Stock Adjuster**: Data table allowing line cooks to increment (`+`), decrement (`-`), or toggle items **Out of Stock** with one tap, instantly updating student menus.
* **Counter POS & Rapid Billing Terminal**: Fast cashier terminal for counter sales with real-time search, counter selection, customer tagging, multiple tenders, and one-click token printing.
* **Incoming Complaint & Feedback Feed**: Live stream of student ratings, wait-time reports, and packaging complaints to guide kitchen quality control.

### 4. 👔 Campus Admin & Executive Suite
Equipped for cafeteria managers, facility supervisors, and procurement leads:
* **Executive Overview Dashboard**: Real-time KPI summary cards displaying:
  * 💰 **Total Gross Revenue**
  * 📋 **Total Order Volume**
  * ⚠️ **Critical Low Stock Count**
  * 🍳 **In-Flight Active Orders**
* **Demand Matrix & Re-Order Velocity**: Hourly meal distribution charts highlighting peak rush windows (e.g., `12:00 - 14:00` lunch rush) alongside top-velocity reordered items.
* **Procurement & Inventory Audit Table**: Threshold alarm monitors, restock urgency badges, and inline restock controls.
* **Export Audit CSV**: One-click export downloading current inventory counts, threshold deficits, and restock urgencies into a CSV spreadsheet.
* **Food Catalog Item Manager**: Dynamic form to inject new items into the live catalog (specifying name, emoji/icon, category, service counter, price, initial stock, low-stock threshold, and restock time).

---

## ✨ Recent & Key Features

### 🎲 Clean Schema & Dynamic Example Data Injection
InvenTrack adopts an enterprise-grade **zero-hardcoded data policy**:
* **Empty Schema Default**: On fresh startup, the app initializes with a clean, empty state (`[]` - 0 items, 0 orders, ₹0 revenue).
* **"Enter Example Data" Generator**: Integrated into both the Topbar and Dev Fixture Bar. Clicking this button dynamically generates a rich, realistic campus catalog of 7–9 randomized meals, realistic stock counts (`available`, `low`, `out`), counter assignments, price variances, and active order tickets in various preparation stages.
* **"Clear Data" Button**: One-click reset back to a clean empty schema for testing edge states.

### 🎨 Strict Google Material Design 3 (M3) Theming
Built according to Google's official Material Design 3 guidelines:
* **M3 Dynamic Tonal Palette**: Primary cyan/teal tones (`#006874`), tonal containers (`#9eeffd`), surface container elevation levels (`lowest` to `highest`), and outline variants.
* **Semantic Status Roles**: M3-compliant tones for food inventory:
  * 🟢 **Available (`--md-sys-color-avail` / `#1e6c38`)**: Healthy stock levels.
  * 🟠 **Low Stock (`--md-sys-color-low` / `#855300`)**: At or below threshold.
  * 🔴 **Out of Stock (`--md-sys-color-out` / `#ba1a1a`)**: Exhausted portions.
* **M3 Typography & Icons**: Powered by Google Fonts `Roboto`, `Roboto Flex`, and `Material Symbols Outlined`.

### 🌓 Dual Theme Engine (Front vs. Back of House)
* **Front of House (Light Mode)**: Clean, high-clarity daylight theme optimized for student mobile devices and counter ordering tablets.
* **Back of House (Dark / Kitchen Mode)**: High-contrast, dark slate layout (`[data-theme="kitchen"]`) engineered for kitchen display systems (KDS) in warm, low-light kitchen environments.

### 🧾 Digital Receipt Modal & Printable Tokens
Whenever an order is placed (via Student checkout, Express Shopper, or Counter POS), InvenTrack triggers an interactive **Digital Receipt Modal** containing:
* Official Token Number (e.g., `#A-042`)
* Assigned Service Counter
* Itemized breakdown with pricing
* Total amount paid & timestamp
* Native **Print Receipt** trigger formatted for thermal receipt printers.

### 🚀 Cloud-Ready Vercel SPA Routing
Pre-configured with `vercel.json` rewrite rules:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```
Ensures zero 404 errors on deep linking, client-side routing, and page reloads when deployed to Vercel, Netlify, or GitHub Pages.

---

## 🏗️ System Architecture

```text
+-----------------------------------------------------------------------------------+
|                           INVENTRACK APPLICATION SHELL                            |
|                                                                                   |
|  [ M3 Navigation Drawer ]  [ Topbar: Persona Switcher | Data Fixtures | Theme ]   |
+-----------------------------------------------------------------------------------+
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
|                       CENTRAL STATE ENGINE & DATA FLOW                            |
|                                                                                   |
|  • menuCatalog (Stock, Prices, Counters, Status, Thresholds)                      |
|  • orderTickets (Tokens, Stages: Placed->Preparing->Ready->Picked, Counter)       |
|  • cartState (Item ID -> Quantity Map & Counters)                                 |
|  • activePersona ('student' | 'shopper' | 'kitchen' | 'admin')                    |
|  • themeMode ('counter' / Light  |  'kitchen' / Dark)                             |
|  • studentProfile & authSession                                                   |
+-----------------------------------------------------------------------------------+
                                          │
         ┌───────────────────┬────────────┴───────┬────────────────────┐
         ▼                   ▼                    ▼                    ▼
   ┌───────────┐       ┌───────────┐        ┌───────────┐        ┌───────────┐
   │  STUDENT  │       │  SHOPPER  │        │  KITCHEN  │        │   ADMIN   │
   ├───────────┤       ├───────────┤        ├───────────┤        ├───────────┤
   │ • Home    │       │ • Fast-   │        │ • Live    │        │ • Exec    │
   │ • Menu    │       │   Track   │        │   Kanban  │        │   Overview│
   │ • Cart    │       │ • Express │        │ • Stock   │        │ • Audit & │
   │ • Orders  │       │   Cart    │        │   Adjust  │        │   CSV Exp │
   │ • Spending│       │ • Digital │        │ • Counter │        │ • Catalog │
   │ • For You │       │   Receipt │        │   POS     │        │   Manager │
   │ • Feedback│       └───────────┘        │ • Feedback│        └───────────┘
   │ • Account │                            │   Feed    │
   └───────────┘                            └───────────┘
```

---

## 📁 Codebase & Directory Structure

InvenTrack is structured into four dedicated, modular tiers:

```text
InvenTrack/
├── frontend/                        # Web Presentation Tier
│   ├── index.html                   # Multi-role M3 application shell (User, Kitchen, Admin)
│   ├── landing.html                 # Landing page with role selector & live queue simulation
│   ├── signin.html                  # Role-adaptive authentication portal (SSO / Register / Login)
│   ├── student-dashboard.html       # Standalone all-in-one student diner dashboard
│   ├── css/
│   │   └── styles.css               # Complete M3 token system & responsive layout
│   └── js/
│       └── app.js                   # Client-side state engine & UI controllers
│
├── backend/                         # Backend Service Tier
│   ├── server.js                    # Express REST API microservice with CORS & health checks
│   ├── package.json                 # Backend dependencies & scripts
│   ├── models/
│   │   └── dataStore.js             # Data models & persistent in-memory data store
│   ├── controllers/
│   │   ├── authController.js        # Authentication & role-based session logic
│   │   ├── inventoryController.js   # Stock capacity adjustments & item manager
│   │   ├── orderController.js       # Live order tokens & Kanban advancement
│   │   └── auditController.js       # Executive revenue KPIs & CSV export
│   └── routes/
│       ├── authRoutes.js            # POST /api/auth/login, POST /api/auth/register
│       ├── inventoryRoutes.js       # GET /api/inventory/items, PATCH /api/inventory/items/:id/stock
│       ├── orderRoutes.js           # GET /api/orders, POST /api/orders/place
│       └── auditRoutes.js           # GET /api/audit/overview, GET /api/audit/export-csv
│
├── source/                          # Modular Application Source Tier (React 18 / ES6)
│   ├── App.jsx                      # Main application router & layout shell
│   ├── main.jsx                     # React DOM mount point
│   ├── index.css                    # Material Design 3 tokens & styling
│   ├── app.js                       # Core reactive store engine
│   ├── package.json                 # React dependencies & build scripts
│   ├── vite.config.js               # Vite build configuration
│   ├── context/
│   │   └── AppContext.jsx           # Central React Context state store & hooks
│   ├── data/
│   │   └── initialData.js           # Menu items & order fixtures
│   ├── components/
│   │   ├── layout/                  # Sidebar, Topbar, NotificationPanel, ToastContainer
│   │   └── common/                  # StockGauge, StatusBadge, RecCard
│   └── pages/                       # Home, Menu, Cart, Orders, Spending, ForYou, Settings, Feedback
│
├── apis/                            # API Services & Integration Tier
│   ├── index.js                     # Unified barrel export for API services
│   ├── apiClient.js                 # Central HTTP client with headers & error handling
│   ├── authApi.js                   # Authentication & profile endpoints
│   ├── inventoryApi.js              # Catalog querying & stock modification
│   ├── ordersApi.js                 # Live order submission & ticket stepping
│   ├── auditApi.js                  # Executive overview & CSV audit exports
│   └── api-spec.json                # OpenAPI 3.0 specification for all REST endpoints
│
├── index.html                       # Root application entrypoint (with Auth Guard)
├── landing.html                     # Root landing page mirror
├── signin.html                      # Root sign-in mirror
├── vercel.json                      # Vercel SPA routing configuration
├── LICENSE                          # MIT License
└── README.md                        # Project documentation (this file)
```
        │       └── RecCard.jsx      # Food pairing & recommendation card
        │
        └── pages/
            ├── HomePage.jsx         # Live token stepper, gauges, spending preview
            ├── MenuPage.jsx         # Menu grid with category & counter filters
            ├── CartPage.jsx         # Cart items, bill breakdown, multi-tender
            ├── OrdersPage.jsx       # Live & historical ticket list
            ├── SpendingPage.jsx     # Spending bar chart analytics
            ├── ForYouPage.jsx       # Personalization & combo cards
            ├── FeedbackPage.jsx     # 5-star rating & complaint dispatch
            └── SettingsPage.jsx     # Student auth, profile & notification toggles
```

---

## 📊 Data Models & Schema

### 🍲 1. Menu Item Model
```javascript
{
  id: 'item-1730000000-1',
  name: 'Chicken Dum Biryani',
  emoji: '🍲',
  price: 180,
  cat: 'Mains',
  counter: 'Counter 1 (Hot Meals)',
  stock: 24,
  maxStock: 50,
  threshold: 8,
  restockTime: '15 min',
  status: 'available' // 'available' | 'low' | 'out'
}
```

### 🎫 2. Order Ticket Model
```javascript
{
  id: 'ord-1730000000-1',
  token: '#A-042',
  title: 'Chicken Dum Biryani + Artisan Cold Coffee',
  icon: '🍲',
  amt: 235,
  when: 'Just now',
  status: 'Preparing',
  stageIndex: 1, // 0: Placed | 1: Preparing | 2: Ready | 3: Picked up
  live: true,
  customerName: 'Rohan Sharma',
  counter: 'Counter 1 (Hot Meals)'
}
```

### 💬 3. Feedback Model
```javascript
{
  id: 'fb-101',
  rating: 5,
  category: 'Food Quality', // 'Food Quality' | 'Packaging' | 'Wait Time' | 'Hygiene'
  text: 'Biryani was freshly served and piping hot!',
  time: '2 mins ago',
  student: 'Rohan Sharma (2503A52924)'
}
```

---

## 🚀 Quickstart & Installation

You can run InvenTrack in either of two ways:

### Option A: Running the React 18 Application

1. **Navigate into the React project directory**:
   ```bash
   cd react
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to the local address displayed in your terminal (typically `http://localhost:5173`).

5. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

---

### Option B: Running the Standalone Web Version

InvenTrack also provides a 100% self-contained, zero-dependency version:

1. Simply open `index.html` or `student-dashboard.html` directly in any modern browser:
   * **Windows**: Double-click `index.html` or run `start index.html` in PowerShell.
   * **macOS**: Run `open index.html` in Terminal.
   * **VS Code**: Right click `index.html` and select **"Open with Live Server"**.

No Node.js or compilation required!

---

## ☁️ Deployment

### Deploying to Vercel

InvenTrack includes ready-to-deploy `vercel.json` configurations for both the root directory and the `react/` directory:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import this repository:
   * **To deploy the React app**: Set the **Root Directory** to `react`. Vercel will auto-detect Vite and configure `npm run build` and `dist/`.
   * **To deploy the standalone web app**: Leave Root Directory as `./`. Vercel will serve `index.html` statically with SPA rewrites.
4. Click **Deploy**!

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **React 18** & **Vanilla ES6** | Dual implementation (Component SPA + Zero-dependency ES6) |
| **Tooling & Bundler** | **Vite 5** | Lightning-fast HMR and optimized asset bundling |
| **Design System** | **Google Material Design 3 (M3)** | Dynamic tonal color roles, surface elevation, and shape tokens |
| **Icons & Symbols** | **Google Material Symbols Outlined** | Crisp, scalable vector icon set |
| **Typography** | **Google Fonts** | `Roboto`, `Roboto Flex`, and `IBM Plex Mono` |
| **State Management** | **React Context API / ES6 Reactive Store** | Centralized uni-directional data flow |
| **Hosting & Cloud** | **Vercel** | Pre-configured SPA rewrite rules for zero-config deployment |

---

## 🎯 Summary

InvenTrack reimagines the campus cafeteria by replacing manual chaos with **real-time transparency, automated token workflows, and cross-functional operational tools**. From students wanting to grab a quick lunch without waiting in lines, to kitchen chefs coordinating busy lunch rushes, to managers auditing weekly food costs — InvenTrack delivers an intuitive, aesthetically stunning Material 3 experience.

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).
