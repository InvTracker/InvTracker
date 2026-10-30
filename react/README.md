# ⚛️ InvenTrack — React 18 Application

This directory contains the **React 18 + Vite** implementation of **InvenTrack**, designed with Google Material Design 3 (M3).

For complete project documentation, multi-role feature guides, and system architecture, please see the [Root README](../README.md).

---

## 🚀 Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 📁 React Directory Structure

* [`src/main.jsx`](src/main.jsx) — React entry point with `AppProvider`
* [`src/App.jsx`](src/App.jsx) — Root application shell and view router
* [`src/index.css`](src/index.css) — Material Design 3 design tokens, variables, and styling
* [`src/context/AppContext.jsx`](src/context/AppContext.jsx) — Central state store with `useApp()` hook
* [`src/data/initialData.js`](src/data/initialData.js) — Empty schema default and `generateRandomExampleData()` fixture generator
* [`src/components/layout/`](src/components/layout/) — `Sidebar`, `Topbar`, `NotificationPanel`, `ToastContainer`
* [`src/components/common/`](src/components/common/) — `StockGauge`, `StatusBadge`, `RecCard`
* [`src/pages/`](src/pages/) — Page views for Student, Shopper, Kitchen, and Admin personas

---

## ☁️ Vercel Deployment

Preconfigured with [`vercel.json`](vercel.json) rewrite rules for SPA client routing. Connect this directory directly to Vercel for instant deployments.
