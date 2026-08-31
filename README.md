# 🍽️ **InvenTrack — Student Canteen & Inventory Dashboard**

**InvenTrack** is a modern, responsive web application designed for **campus cafeterias and student dining**. Built with **React 18** and **Vite**, it bridges the gap between students and canteen management by offering **live stock visibility, digital token tracking, easy ordering, spending analytics, and personalised food recommendations**.

---

## 📌 **Table of Contents**

* [📖 Overview](#-overview)
* [✨ Key Features](#-key-features)
* [🏗️ Architecture & System Design](#️-architecture--system-design)
* [📁 Codebase & Directory Structure](#-codebase--directory-structure)
* [🧩 Element & Component Breakdown](#-element--component-breakdown)
* [📊 Data Models & State Management](#-data-models--state-management)
* [🎨 Design System & Theming](#-design-system--theming)
* [🚀 Getting Started](#-getting-started)

---

## 📖 **Overview**

In campus canteens, students often face **long queues, unpredictable stock availability, and a lack of order tracking**.

**InvenTrack** solves this by providing:

* 🏷️ **Real-Time Food Inventory Status**
  Instant visibility into what is **available, running low, or sold out**.

* 🎫 **Digital Token & Stepper Tracking**
  Real-time status progression from **order placement → preparation → ready → counter pickup**.

* ⚡ **Seamless Single-Page Experience (SPA)**
  High-performance, instant view switching powered by a **React component architecture**.

* 📊 **Analytics & Personalization**
  Insights into **weekly spending habits** and curated **meal combinations**.

---

## ✨ **Key Features**

| **Feature**                              | **Description**                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏷️ **Live Inventory Gauges**            | Real-time stock counters with color-coded status badges (`AVAIL`, `LOW`, `OUT`) and animated capacity gauges.                                            |
| 🎫 **Live Order Stepper & Token System** | Interactive ticket showing digital token number such as `#A-042`, stage progression (*Placed → Preparing → Ready → Picked up*), and dynamic pickup ETAs. |
| 📋 **Categorized Menu & Instant Search** | Filter menu items by categories such as **Mains, Snacks, Beverages, and Desserts**, or search in real time with automatic switching to the Menu view.    |
| 🛒 **Cart & Smart Bill Calculation**     | Add/remove items, adjust quantities, calculate subtotal and packaging fees, and place orders with instant confirmation.                                  |
| 📊 **Weekly Spending Analytics**         | Visual bar chart displaying day-by-day student expenses and identifying peak spending days.                                                              |
| ⭐ **"For You" & Recommendation Engine**  | Curated picks based on popular pairings, time of day, and student order history.                                                                         |
| 💬 **Order Feedback & Rating**           | Interactive **5-star rating system** with optional feedback text to inform staff what to restock first.                                                  |
| 🌓 **Dual Theme Engine**                 | **Front of House — Light Mode** for bright counter displays and **Back of House — Kitchen Mode** for ambient low-light environments.                     |
| 👤 **Student Profile & Auth Simulation** | Switch between active student profiles including **Student ID, Roll No, Year, and Branch**, with simulated Login/Signup flows.                           |

---

## 🏗️ **Architecture & System Design**

InvenTrack leverages a **Component-Driven React 18 Architecture** bundled with **Vite** for fast HMR and optimized builds.

Global state is centralized using the **React Context API (`AppContext`)**, ensuring **uni-directional data flow** and seamless reactivity across all components.

### 🔄 **Application Architecture**

```text
+-----------------------------------------------------------------------------------+
|                              REACT USER INTERFACE                                 |
|                                                                                   |
|   [ Sidebar ]   [ Topbar / Global Search / Theme Switcher / Notifications ]       |
+-----------------------------------------------------------------------------------+
                                      │
                                      ▼
+-----------------------------------------------------------------------------------+
|                        REACT CONTEXT PROVIDER (AppContext)                        |
|                                                                                   |
|  • menuItems (Stock, Prices, Status)      • cart (Item ID → Qty map)              |
|  • orders (Active & Past Tickets)         • currentUser (Student Session & Auth)  |
|  • activePage (Navigation State)          • theme ('light' | 'kitchen')           |
+-----------------------------------------------------------------------------------+
                                      │
                                      ▼
             ┌────────────────────────┼────────────────────────┐
             ▼                        ▼                        ▼
   ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
   │     PAGE VIEWS      │  │   LAYOUT CONTROLS   │  │  COMMON COMPONENTS  │
   ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤
   │ • HomePage          │  │ • Sidebar           │  │ • StockGauge        │
   │ • MenuPage          │  │ • Topbar            │  │ • StatusBadge       │
   │ • CartPage          │  │ • NotificationPanel │  │ • RecCard           │
   │ • OrdersPage        │  │ • ToastContainer    │  └─────────────────────┘
   │ • SpendingPage      │  └─────────────────────┘
   │ • ForYouPage        │
   │ • FeedbackPage      │
   │ • SettingsPage      │
   └─────────────────────┘
```

### 🔑 **Architectural Highlights**

1. **Single-Page Application (SPA)**
   Seamless rendering of views such as `HomePage`, `MenuPage`, and `CartPage` based on the `activePage` state without full browser reloads.

2. **Centralized React Context (`AppContext`)**
   Manages global application state including **cart management, inventory stock decrementing, theme state, and active orders**.

3. **Reusable Modular Component System**
   Clean separation of concerns with reusable atomic components such as `StockGauge`, `StatusBadge`, and `RecCard`.

4. **Reactive UI State Flow**
   Actions such as **adding items to the cart** or **changing the theme** update the central Context and trigger targeted re-renders across dependent components.

---

## 📁 **Codebase & Directory Structure**

```text
InvenTrack/
│
├── LICENSE
├── README.md
│
└── react/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        │
        ├── context/
        │   └── AppContext.jsx
        │
        ├── data/
        │   └── initialData.js
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Sidebar.jsx
        │   │   ├── Topbar.jsx
        │   │   ├── NotificationPanel.jsx
        │   │   └── ToastContainer.jsx
        │   │
        │   └── common/
        │       ├── StockGauge.jsx
        │       ├── StatusBadge.jsx
        │       └── RecCard.jsx
        │
        └── pages/
            ├── HomePage.jsx
            ├── MenuPage.jsx
            ├── CartPage.jsx
            ├── OrdersPage.jsx
            ├── SpendingPage.jsx
            ├── ForYouPage.jsx
            ├── FeedbackPage.jsx
            └── SettingsPage.jsx
```

### 📂 **Important Files**

| **File**                | **Purpose**                                                           |
| ----------------------- | --------------------------------------------------------------------- |
| `main.jsx`              | React root mount point; renders the application inside `AppProvider`. |
| `App.jsx`               | Main application shell and conditional page-view renderer.            |
| `index.css`             | Design tokens, CSS variables, themes, and global styles.              |
| `AppContext.jsx`        | Central React Context store and custom `useApp` context hook.         |
| `initialData.js`        | Seed menu catalog, user profile, and mock initial data.               |
| `Sidebar.jsx`           | Navigation bar and student profile quick-card.                        |
| `Topbar.jsx`            | Header with search, theme switcher, and alerts.                       |
| `NotificationPanel.jsx` | Live canteen alert dropdown module.                                   |
| `ToastContainer.jsx`    | Pop-up toast feedback notification system.                            |

---

## 🧩 **Element & Component Breakdown**

### 1. 🧭 **Layout & Shell Components**

Located inside:

```text
src/components/layout/
```

* **`Sidebar.jsx`** — Displays logo, role badge, navigation links, active page indicators, cart counters, and user profile summary.
* **`Topbar.jsx`** — Contains dynamic page titles, global search, theme switching, and notification controls.
* **`NotificationPanel.jsx`** — Displays live canteen stock alerts, order updates, and announcements.
* **`ToastContainer.jsx`** — Handles floating notifications triggered by user actions.

### 2. 📄 **Page Components**

Located inside:

```text
src/pages/
```

* **`HomePage.jsx`** — Hero order ticket, order stepper, quick actions, stock gauges, spending preview, and meal pairings.
* **`MenuPage.jsx`** — Categorized menu grid, search functionality, stock status, prices, and Add to Cart controls.
* **`CartPage.jsx`** — Cart items, quantity controls, packaging fees, subtotal calculation, and checkout.
* **`OrdersPage.jsx`** — Active and past orders with digital tokens, timestamps, total cost, and live status.
* **`SpendingPage.jsx`** — Day-by-day weekly spending analytics.
* **`ForYouPage.jsx`** — Personalized meal recommendations and trending combinations.
* **`FeedbackPage.jsx`** — Interactive 5-star rating and feedback form.
* **`SettingsPage.jsx`** — Student profile information and Login/Signup forms.

---

## 📊 **Data Models & State Management**

All application state is managed centrally inside:

```text
src/context/AppContext.jsx
```

### 🍛 **1. Menu Item Model**

```javascript
{
  id: 'biryani',
  name: 'Chicken Biryani',
  emoji: '🍲',
  price: 185,
  cat: 'Mains',
  stock: 25,
  maxStock: 50,
  status: 'available'
  // 'available' | 'low' | 'out'
}
```

### 🎫 **2. Order Ticket Model**

```javascript
{
  id: 'ORD-1001',
  token: '#A-042',
  icon: '🍲',
  title: 'Chicken Biryani',
  when: 'Today, 1:04 PM',
  amt: 185,
  status: 'In progress'
  // 'In progress' | 'Delivered'

  stageIndex: 1
  // 0: Placed
  // 1: Preparing
  // 2: Ready
  // 3: Picked up

  live: true
}
```

### 👤 **3. User Session Model**

```javascript
{
  name: 'Nivedita',
  year: '2nd year',
  rollNo: '2503A52924',
  studentId: '2503A52924',
  phone: '+91 1234567890'
}
```

---

## 🎨 **Design System & Theming**

The application UI uses custom **CSS variables** defined inside:

```text
src/index.css
```

### 🔤 **Typography**

| **Purpose**                  | **Font**        |
| ---------------------------- | --------------- |
| **Headings & Display**       | `Space Grotesk` |
| **Numbers, Tokens & Prices** | `IBM Plex Mono` |
| **Body & UI Elements**       | `Inter`         |

### 🎨 **Color Palette**

* 🟢 **Fresh / In Stock:** `Emerald Green` — `--fresh: #059669`
* 🟠 **Low Stock Warning:** `Amber / Ochre` — `--low: #d97706`
* 🔴 **Out of Stock / Alert:** `Crimson` — `--alert: #dc2626`
* 🟤 **Primary Brand Accent:** `Warm Ochre` — `--accent: #d97706`

### 🌓 **Theme Modes**

**Front of House — Light Mode**

> Crisp light layout optimized for student daytime browsing.

**Kitchen Mode — Dark Mode**

> Dark slate layout using `[data-theme="kitchen"]`, designed for kitchen status screens and low-light environments.

---

## 🚀 **Getting Started**

### 📋 **Prerequisites**

Make sure you have:

* **Node.js v16+**
* **npm**
* A modern web browser

### ⚙️ **Installation & Development**

#### 1️⃣ Navigate to the React application

```bash
cd react
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Start the development server

```bash
npm run dev
```

#### 4️⃣ Open the application

Navigate to:

```text
http://localhost:5173
```

Or open the URL displayed in your terminal.

---

## 📦 **Production Build**

To create an optimized production build:

```bash
npm run build
```

### 🔍 **Preview Production Build**

```bash
npm run preview
```

---

## 🛠️ **Technology Stack**

| **Technology**           | **Purpose**                                      |
| ------------------------ | ------------------------------------------------ |
| ⚛️ **React 18**          | Component-based frontend architecture            |
| ⚡ **Vite**               | Development server and production build tooling  |
| 🧠 **React Context API** | Global state management                          |
| 🎨 **CSS Variables**     | Theming and design tokens                        |
| 📝 **JavaScript / JSX**  | Application logic and UI components              |
| 🔤 **Google Fonts**      | Typography — Space Grotesk, IBM Plex Mono, Inter |

---

## 🎯 **Project Goal**

**InvenTrack** aims to create a **faster, smarter, and more transparent campus dining experience** by combining:

> **Inventory Visibility + Digital Ordering + Token Tracking + Analytics + Personalization**

into a single modern **React-based student canteen platform**.

---

### ⭐ **Built with React • Powered by Vite • Designed for Campus Dining**
