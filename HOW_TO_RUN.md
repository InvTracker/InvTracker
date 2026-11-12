# InvenTrack - Campus Food & Inventory Management System

Welcome to InvenTrack! This folder contains the complete, self-contained web platform.

---

## Quick Start (How to Open the Webpage)

### Option 1: 1-Click Localhost Server (Recommended)
1. Double-click **`START_LOCAL_SERVER.bat`**.
2. A local server will start automatically on `http://localhost:3000` and open in your default browser.
3. *Note: Works on any Windows PC automatically (using Python, Node.js, or Windows built-in PowerShell).*

### Option 2: Direct Offline Launch (No Server Needed)
1. Double-click **`OPEN_OFFLINE.bat`** (or simply double-click **`landing.html`**).
2. The entire webpage opens directly in your browser with full offline support.

---

## Access & Roles (How to Access Everything)

When you open the webpage, click **"Sign In"** (or open `signin.html`).
Under **"Quick One-Click Sign In"**, click any of the 3 roles to instantly access all features:

### 1. Student / Campus User
- **Email**: `rohan@student.campus.edu`
- **Features**:
  - Live Campus Menu & Specials
  - Add items to Cart with customizable quantities
  - Place demo orders with dynamic queue token generation
  - Live order tracking and digital receipt tickets

### 2. Kitchen Staff / Back of House
- **Email**: `suresh@kitchen.campus.edu`
- **Features**:
  - Real-time Kitchen Kanban Queue (`Placed` -> `Preparing` -> `Ready` -> `Picked up`)
  - Instant stock increment/decrement steppers
  - Counter billing POS register
  - Audio notifications for new incoming orders

### 3. Campus Administrator
- **Email**: `vikram@admin.campus.edu`
- **Features**:
  - **Executive Overview**: Total revenue, order volume, live demand matrix bar chart, top re-order velocity with timeframe filters (Today, This Week, All Time).
  - **Product Sales Drill-Down**: Click any product to view its units sold, total revenue, average order size, and peak order hour window.
  - **Inventory & Menu Manager**: Edit item prices inline, adjust stock levels, toggle In Stock / Out of Stock, and add new food items.
  - **Order Logs & CSV Export**: Search and filter all orders, supervisor overrides, and 1-click download of audit CSV files.
  - **Unified Navigation**: Full access to all Student and Kitchen pages directly from the left sidebar without having to log out.

---

## Technical Details
- **Frontend**: Pure HTML5, CSS3 (Google Material Design 3 / Material You), and modern JavaScript.
- **Data Storage**: Client-side resilient local storage (`localStorage`) with simulated multi-counter rush matrix, token generator, and analytics engine.
- **Backend (Optional)**: If you wish to run the Node.js/TypeScript backend API, see the `backend/` directory (`npm install` -> `npm run build` -> `npm start`).
