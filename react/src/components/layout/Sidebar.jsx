import React from 'react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { id: 'home', label: 'Home', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg> },
  { id: 'menu', label: 'Menu', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg> },
  { id: 'cart', label: 'Cart', badge: true, icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 6H6"/></svg> },
  { id: 'orders', label: 'Orders', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { id: 'spending', label: 'Spending', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M7 15l4-6 4 4 5-8"/></svg> },
  { id: 'foryou', label: 'For you', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.6 6.6L21 9l-5 4.4L17.4 21 12 17.3 6.6 21 8 13.4 3 9l6.4-.4z"/></svg> },
];

const secondaryNavItems = [
  { id: 'feedback', label: 'Feedback', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { id: 'settings', label: 'Settings', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

const Sidebar = () => {
  const { activePage, switchPage, cartCount, currentUser, initials, loggedIn, logout } = useApp();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">IT</div>
        <div>
          <div className="brand-name">InvenTrack</div>
          <div className="brand-sub">Student</div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => switchPage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className={`nav-badge ${cartCount === 0 ? 'hide' : ''}`}>
                {cartCount}
              </span>
            )}
          </button>
        ))}

        <div className="nav-label">Preferences</div>

        {secondaryNavItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => switchPage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div
        className="sidebar-foot"
        onClick={() => !loggedIn && switchPage('settings')}
        style={{ cursor: !loggedIn ? 'pointer' : 'default' }}
      >
        <div className="who">
          <div className="avatar">{loggedIn && currentUser ? initials(currentUser.name) : 'GU'}</div>
          <div>
            <div className="who-name">{loggedIn && currentUser ? currentUser.name : 'Guest Student'}</div>
            <div className="who-role">{loggedIn && currentUser ? `${currentUser.year} · CSE` : 'Log in / Sign up'}</div>
          </div>
          {loggedIn && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                logout();
              }}
              title="Logout"
              style={{
                marginLeft: 'auto',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: '12px',
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
