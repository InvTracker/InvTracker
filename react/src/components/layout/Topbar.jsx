import React from 'react';
import { useApp } from '../../context/AppContext';
import NotificationPanel from './NotificationPanel';

const pageTitles = {
  home: 'Home',
  menu: 'Menu',
  cart: 'Cart',
  orders: 'Orders',
  spending: 'Spending',
  foryou: 'For you',
  feedback: 'Feedback',
  settings: 'Settings',
};

const Topbar = () => {
  const {
    activePage,
    switchPage,
    searchQuery,
    setSearchQuery,
    theme,
    setTheme,
    notifOpen,
    setNotifOpen,
  } = useApp();

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (activePage !== 'menu') {
      switchPage('menu');
    }
  };

  const toggleNotif = (e) => {
    e.stopPropagation();
    setNotifOpen(!notifOpen);
  };

  return (
    <div className="topbar">
      <div className="page-title">{pageTitles[activePage] || ''}</div>

      <div className="search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="Search food, drinks..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="topbar-actions">
        <div className="theme-toggle">
          <div className="slider"></div>
          <button
            className={theme === 'default' ? 'on' : ''}
            onClick={() => setTheme('default')}
          >
            ☀️ Light
          </button>
          <button
            className={theme === 'kitchen' ? 'on' : ''}
            onClick={() => setTheme('kitchen')}
          >
            🌙 Dark
          </button>
        </div>

        <div className="bell" onClick={toggleNotif}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={`dot ${notifOpen ? 'hide' : ''}`}></span>
        </div>

        <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      </div>
    </div>
  );
};

export default Topbar;
