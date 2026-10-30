# ⚛️ InvenTrack — Source Tier

The **Source** directory contains the component-driven React 18 architecture and modular application state engine.

## 📁 Structure

```text
source/
├── App.jsx                  # Main application router, shell & navigation drawer
├── main.jsx                 # React 18 DOM mount point
├── index.css                # Material Design 3 tokens & adaptive styling
├── app.js                   # Unified reactive state engine & store methods
├── package.json             # React & Vite workspace configuration
├── vite.config.js           # Vite development server & production bundler
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx      # Dynamic M3 navigation drawer with role filtering
│   │   ├── Topbar.jsx       # Global search, theme switcher, notifications & role switch
│   │   ├── NotificationPanel.jsx
│   │   └── ToastContainer.jsx
│   └── common/
│       ├── RecCard.jsx      # AI meal recommendation cards
│       ├── StatusBadge.jsx  # Semantic status chips (Available, Low Stock, Depleted)
│       └── StockGauge.jsx   # Visual capacity bar gauges
│
├── context/
│   └── AppContext.jsx       # React context provider, permissions & actions
│
├── data/
│   └── initialData.js       # Seed campus dining menu & order fixtures
│
└── pages/
    ├── HomePage.jsx         # Live digital token tracker & menu showcase
    ├── MenuPage.jsx         # Full categorical menu explorer
    ├── CartPage.jsx         # Multi-tender checkout & balance payment
    ├── OrdersPage.jsx       # Order history & thermal receipt modal
    ├── SpendingPage.jsx     # Weekly budget & spending analytics
    ├── ForYouPage.jsx       # AI-driven meal recommendations
    ├── SettingsPage.jsx     # Account credentials & permission audit
    └── FeedbackPage.jsx     # Student dining ratings & feedback feed
```

