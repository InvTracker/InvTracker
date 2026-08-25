# 🍽️ InvenTrack — Student Canteen & Inventory Dashboard

> **InvenTrack** is a modern, responsive web application designed for campus cafeterias and student dining. It bridges the gap between students and canteen management by offering live stock visibility, digital token tracking, easy ordering, spending analytics, and personalised food recommendations.

---

## 📌 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Architecture & System Design](#-architecture--system-design)
4. [Codebase & Directory Structure](#-codebase--directory-structure)
5. [Element & Component Breakdown](#-element--component-breakdown)
6. [Data Models & State Management](#-data-models--state-management)
7. [Design System & Theming](#-design-system--theming)
8. [Getting Started](#-getting-started)

---

## 📖 Overview

In campus canteens, students often face long queues, unpredictable stock availability, and lack of order tracking. **InvenTrack** solves this by providing:
- **Real-Time Food Inventory Status**: Instant visibility into what is available, running low, or sold out.
- **Digital Token & Stepper Tracking**: Real-time status progression from order placement to counter pickup.
- **Seamless Single-Page Experience (SPA)**: Fast, zero-reload navigation between all screens.
- **Analytics & Personalization**: Insights into weekly spending habits and curated meal combos.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🏷️ **Live Inventory Gauges** | Real-time stock counters with color-coded status badges (`AVAIL`, `LOW`, `OUT`) and animated capacity gauges. |
| 🎫 **Live Order Stepper & Token System** | Interactive ticket showing digital token number (e.g., `#A-042`), stage progression (`Placed` ➔ `Preparing` ➔ `Ready` ➔ `Picked up`), and dynamic pickup ETAs. |
| 📋 **Categorized Menu & Instant Search** | Filter menu items by categories (*Mains*, *Snacks*, *Beverages*, *Desserts*) or search in real time with auto-switching to the Menu view. |
| 🛒 **Cart & Smart Bill Calculation** | Add/remove items, adjust quantities, calculate subtotal and packaging fees, and place orders with instant confirmation. |
| 📊 **Weekly Spending Analytics** | Visual bar chart displaying day-by-day student expenses and identifying peak spending days. |
| ⭐ **"For You" & Recommendation Engine** | Curated picks based on popular pairings, time of day, and student order history. |
| 💬 **Order Feedback & Rating** | Interactive 5-star rating system with optional feedback text to inform staff what to restock first. |
| 🌓 **Dual Theme Engine** | **Front of House (Light Mode)** for bright counter displays and **Back of House (Dark Mode / Kitchen)** for ambient low-light environments. |
| 👤 **Student Profile & Auth Simulation** | Switch between active student profiles (Student ID, Roll No, Year, Branch) and simulated Login/Signup flows. |

---

## 🏗️ Architecture & System Design

InvenTrack is built with a lightweight, performant **Vanilla Web Architecture** that requires zero external runtime frameworks or build steps.

```
+-------------------------------------------------------------------------------+
|                                  USER INTERFACE                               |
|   [ Sidebar Navigation ]   [ Topbar / Global Search / Theme Toggle / Alerts ] |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
|                           ROUTING & PAGE CONTROLLER                           |
|       switchPage(pageId)  ──►  Activates section & syncs navigation state    |
+-------------------------------------------------------------------------------+
        │                │               │                │              │
        ▼                ▼               ▼                ▼              ▼
  ┌──────────┐     ┌───────────┐   ┌───────────┐    ┌───────────┐  ┌───────────┐
  |   Home   |     |   Menu    |   |   Cart    |    |  Orders   |  | Spending  |
  | & Ticket |     | & Filters |   | & Summary |    | & History |  | & Profile |
  └──────────┘     └───────────┘   └───────────┘    └───────────┘  └───────────┘
        │                │               │                │              │
        └────────────────┼───────────────┼────────────────┴──────────────┘
                         │               │
                         ▼               ▼
+-------------------------------------------------------------------------------+
|                       STATE MANAGEMENT & DATA LAYER (app.js)                   |
|  • menuItems (Inventory, status, prices)    • cart (Item ID -> Qty map)       |
|  • orders (Active & historical tickets)     • currentUser (Student session)   |
|  • stageIndex (Order stepper state)         • activeCat (Filter state)        |
+-------------------------------------------------------------------------------+
                                       │
                                       ▼
+-------------------------------------------------------------------------------+
|                                 DOM RENDERERS                                 |
|  renderCounterStrip()  renderRecGrids()   renderMenuGrid()                    |
|  renderStepper()       renderCartPage()   renderOrderLists()                  |
+-------------------------------------------------------------------------------+
```

### Architectural Highlights:
1. **Single-Page Application (SPA) Controller**: All sections (`#page-home`, `#page-menu`, `#page-cart`, etc.) are rendered in [index.html](file:///c:/Users/gaura/Downloads/Inv%20Tracker/index.html) and toggled cleanly via CSS class manipulation (`.page.active`).
2. **State-Driven UI Updates**: Application state in [app.js](file:///c:/Users/gaura/Downloads/Inv%20Tracker/js/app.js) is mutated through pure helper functions which immediately trigger dedicated DOM renderer functions.
3. **Event Delegation**: Global interactions (clicking add-to-cart, quantity changes, navigation tabs, filter chips, theme switcher) are routed through high-efficiency delegated event listeners.

---

## 📁 Codebase & Directory Structure

```
Inv Tracker/
│
├── index.html            # Core HTML5 entry point: shell, sidebar, topbar, and all page views
│
├── css/
│   └── styles.css        # Complete design system: CSS custom properties (tokens),
│                         # light/dark themes, glassmorphic panels, grid systems & animations
│
├── js/
│   └── app.js            # Main application logic: state, menu catalog, cart calculations,
│                         # stepper transitions, authentication handlers & DOM rendering
│
├── LICENSE               # Open-source software license
└── README.md             # Project documentation, structure, and architecture guide
```

---

## 🧩 Element & Component Breakdown

### 1. Navigation & Shell Elements
- **Sidebar (`<aside class="sidebar">`)**:
  - `brand`: Displays the InvenTrack logo mark and role badge.
  - `nav#navList`: Navigation buttons for all app views (`Home`, `Menu`, `Cart`, `Orders`, `Spending`, `For you`, `Feedback`, `Settings`).
  - `sidebar-foot`: User quick-card showing avatar initials, name, and roll number, alongside the logout trigger.
- **Topbar (`<div class="topbar">`)**:
  - `page-title`: Dynamic heading that updates as pages change.
  - `search`: Global search input that immediately filters menu items.
  - `theme-toggle`: Toggle button switching between *Front of House* (Light) and *Back of House* (Kitchen Dark).
  - `bell`: Notification drop-down showing live canteen alerts and stock warnings.

### 2. View Modules & Pages
- **Home View (`#page-home`)**:
  - `ticket`: Hero digital order ticket with token number, total price, and live 4-stage stepper (`Placed` ➔ `Preparing` ➔ `Ready` ➔ `Picked up`).
  - `quick-grid`: Shortcut cards linking directly to high-frequency actions.
  - `counter-strip`: Live inventory stock gauges for top canteen items.
  - `rec-grid`: Recommended meal pairings.
  - `spending` preview & `feedback-strip`: Weekly spend mini-chart and quick rating prompt.
- **Menu View (`#page-menu`)**:
  - `filter-row`: Interactive category pills (`All`, `Mains`, `Snacks`, `Beverages`, `Desserts`).
  - `menu-grid`: Food cards with emoji illustrations, price, stock status badge, and add-to-cart actions.
- **Cart View (`#page-cart`)**:
  - `cartList`: Itemized list of selected dishes with increment (`+`), decrement (`−`), and delete (`✕`) controls.
  - `Order summary panel`: Subtotal, packing charge, and final total with checkout trigger.
- **Orders View (`#page-orders`)**:
  - `ordersFullList`: Complete history of active and completed tickets with statuses and quick-track actions.
- **Spending Analytics (`#page-spending`)**:
  - `bars`: Day-by-day proportional bar charts highlighting weekly totals and peak consumption days.
- **Recommendations (`#page-foryou`)**:
  - `foryouGrid`: Curated suggestions excluding out-of-stock items.
- **Feedback Module (`#page-feedback`)**:
  - `starRow`: Interactive 5-star rating selector and comments textarea.
- **Settings & Auth (`#page-settings`)**:
  - `accountPanel`: Student profile view (Name, Year, Roll No, Student ID, Phone).
  - `authPanel`: Tabbed Login and Signup forms with input validation.
  - `Preferences`: Interactive toggle switches for order alerts, stock alerts, and email digests.

---

## 📊 Data Models & State Management

All state resides in [js/app.js](file:///c:/Users/gaura/Downloads/Inv%20Tracker/js/app.js) and is managed in-memory:

```javascript
// 1. Food Item Model
{
  id: 'biryani',
  name: 'Chicken Biryani',
  emoji: '🍲',
  price: 185,
  cat: 'Mains',
  stock: 25,
  status: 'available' // 'available' | 'low' | 'out'
}

// 2. Order Ticket Model
{
  icon: '🍲',
  title: 'Chicken Biryani',
  when: 'Today, 1:04 PM',
  amt: 185,
  status: 'In progress', // 'In progress' | 'Delivered'
  live: true
}

// 3. User Session Model
{
  name: 'Nivedita',
  year: '2nd year',
  rollNo: '2503A52924',
  studentId: '2503A52924',
  phone: '91+1234567890'
}
```

---

## 🎨 Design System & Theming

The UI is styled using modern CSS variables defined in [css/styles.css](file:///c:/Users/gaura/Downloads/Inv%20Tracker/css/styles.css):

- **Typography**:
  - Headings & Display: `Space Grotesk`, sans-serif
  - Numbers, Tokens & Prices: `IBM Plex Mono`, monospace
  - Body & UI: `Inter`, sans-serif
- **Color Palette & Tokens**:
  - **Fresh / In Stock**: Emerald Green (`--fresh: #059669`)
  - **Low Stock Warning**: Amber / Ochre (`--low: #d97706`)
  - **Out of Stock / Alert**: Crimson (`--alert: #dc2626`)
  - **Primary Brand Accent**: Warm Ochre (`--accent: #d97706`)
- **Theme Modes**:
  - `Default (Light)`: Clean cream-white layout tailored for student daylight usage.
  - `[data-theme="kitchen"] (Dark)`: Dark slate layout tailored for cafeteria kitchen displays and night-time browsing.

---

## 🚀 Getting Started

Because InvenTrack is built with standard web technologies, there are no dependencies to install.

1. **Clone or Download** the repository to your local machine.
2. **Open** `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Alternatively, serve using any local static web server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js npx serve
   npx serve .
   ```
4. Access the application at `http://localhost:8000`.

---

## 📄 License
This project is open-source and available under the terms of the [MIT License](file:///c:/Users/gaura/Downloads/Inv%20Tracker/LICENSE).