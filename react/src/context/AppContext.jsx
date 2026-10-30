import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialMenuItems,
  initialOrders,
  initialUser,
  stages,
  recommendedIds as defaultRecommendedIds,
  generateRandomExampleData
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState(initialOrders);
  const [recommendedIds, setRecommendedIds] = useState(defaultRecommendedIds);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('invenTrack_user');
      if (stored) return JSON.parse(stored);
    } catch(e){}
    return initialUser;
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    try {
      const stored = localStorage.getItem('invenTrack_user');
      return Boolean(stored) || Boolean(initialUser);
    } catch(e) {
      return Boolean(initialUser);
    }
  });
  const [stageIndex, setStageIndex] = useState(
    initialOrders.length > 0 && initialOrders[0].live ? (initialOrders[0].stageIndex ?? 1) : 1
  );
  const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('invenTrack_theme') || 'default';
    } catch (e) {
      return 'default';
    }
  }); // 'default' or 'kitchen'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [toasts, setToasts] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [queueNo, setQueueNo] = useState(
    initialOrders.length > 0 && initialOrders[0].live ? initialOrders[0].token : '#A-042'
  );

  // Update data-theme on body, documentElement, and localStorage
  useEffect(() => {
    if (theme === 'kitchen') {
      document.documentElement.setAttribute('data-theme', 'kitchen');
      document.body.setAttribute('data-theme', 'kitchen');
      try { localStorage.setItem('invenTrack_theme', 'kitchen'); } catch(e) {}
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
      try { localStorage.setItem('invenTrack_theme', 'default'); } catch(e) {}
    }
  }, [theme]);

  // Synchronize cross-tab user authentication
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'invenTrack_user') {
        try {
          if (e.newValue) {
            const user = JSON.parse(e.newValue);
            setCurrentUser(user);
            setLoggedIn(true);
            addToast(`Welcome back, ${user.name.split(' ')[0]}!`);
          } else {
            setCurrentUser(null);
            setLoggedIn(false);
          }
        } catch(err){}
      }
    };
    window.addEventListener('storage', handleStorage);

    let authChannel = null;
    try {
      if ('BroadcastChannel' in window) {
        authChannel = new BroadcastChannel('inventrack_auth');
        authChannel.onmessage = (event) => {
          if (event.data?.type === 'AUTH_SUCCESS' && event.data?.user) {
            setCurrentUser(event.data.user);
            setLoggedIn(true);
            addToast(`Welcome back, ${event.data.user.name.split(' ')[0]}!`);
          }
        };
      }
    } catch(err){}

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (authChannel) authChannel.close();
    };
  }, []);

  // Helper for toasts
  const addToast = (msg) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  // Helper for user initials
  const initials = (name) => {
    if (!name) return 'GU';
    return (
      name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'ST'
    );
  };

  // Enter Example Data (Randomized generator)
  const enterExampleData = () => {
    const data = generateRandomExampleData();
    setMenuItems(data.menuItems);
    setRecommendedIds(data.recommendedIds);
    setOrders(data.orders);
    if (data.orders.length > 0 && data.orders[0].live) {
      setStageIndex(data.orders[0].stageIndex);
      setQueueNo(data.orders[0].token);
    }
    addToast('🎲 Random example campus data injected!');
  };

  // Clear data back to empty state
  const clearData = () => {
    setMenuItems([]);
    setRecommendedIds([]);
    setOrders([]);
    setCart({});
    setStageIndex(-1);
    setQueueNo('#---');
    addToast('🗑️ Cleared all data. Catalog is now empty.');
  };

  // Cart operations
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    addToast(`Added ${item.name} to cart`);
  };

  const changeQty = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = current + delta;
      const copy = { ...prev };
      if (next <= 0) {
        delete copy[id];
      } else {
        copy[id] = next;
      }
      return copy;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  // Order Placement
  const placeOrder = () => {
    if (cartCount === 0) return;
    const cartItemIds = Object.keys(cart);
    const subtotal = cartTotal;
    const packing = cartItemIds.length ? 10 : 0;
    const total = subtotal + packing;

    const names = cartItemIds.map((id) => menuItems.find((m) => m.id === id)?.name).filter(Boolean).join(' + ');
    const emoji = menuItems.find((m) => m.id === cartItemIds[0])?.emoji || '🍲';

    // Mark current active orders as delivered
    setOrders((prev) =>
      prev.map((o) => (o.live ? { ...o, live: false, status: 'Delivered' } : o))
    );

    const newOrder = {
      id: Date.now(),
      icon: emoji,
      title: names,
      when: 'Just now',
      amt: total,
      status: 'In progress',
      live: true,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setStageIndex(0);
    setQueueNo('#A-0' + (43 + Math.floor(Math.random() * 9)));
    setCart({});
    addToast('Order placed! Track it from Home.');
    switchPage('home');
  };

  // Stepper advance
  const advanceStage = () => {
    if (stageIndex < stages.length - 1) {
      const nextStage = stageIndex + 1;
      setStageIndex(nextStage);
      addToast(`Status updated: ${stages[nextStage]}`);

      // Update current live order status
      setOrders((prev) =>
        prev.map((o, idx) => {
          if (idx === 0 && o.live) {
            const isDone = nextStage >= 3;
            return {
              ...o,
              status: isDone ? 'Delivered' : 'In progress',
              live: !isDone,
            };
          }
          return o;
        })
      );
    }
  };

  // Navigation
  const switchPage = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login / Logout
  const login = (user) => {
    try { localStorage.setItem('invenTrack_user', JSON.stringify(user)); } catch(e){}
    setCurrentUser(user);
    setLoggedIn(true);
    switchPage('home');
    addToast(`Welcome back, ${user.name.split(' ')[0]}!`);
  };

  const logout = () => {
    try { localStorage.removeItem('invenTrack_user'); } catch(e){}
    setCurrentUser(null);
    setLoggedIn(false);
    switchPage('settings');
    addToast('Logged out');
  };

  const value = {
    menuItems,
    cart,
    orders,
    currentUser,
    loggedIn,
    stageIndex,
    activePage,
    theme,
    searchQuery,
    activeCat,
    toasts,
    notifOpen,
    queueNo,
    stages,
    recommendedIds,
    cartCount,
    cartTotal,
    enterExampleData,
    clearData,
    setMenuItems,
    setTheme,
    setSearchQuery,
    setActiveCat,
    setNotifOpen,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder,
    advanceStage,
    switchPage,
    login,
    logout,
    addToast,
    initials,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
