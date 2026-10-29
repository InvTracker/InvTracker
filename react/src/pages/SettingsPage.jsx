import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const SettingsPage = () => {
  const { currentUser, loggedIn, login, logout } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  // Switches
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const handleCustomLogin = () => {
    if (!emailInput.trim()) return;
    login({
      name: nameInput.trim() || 'Campus Member',
      email: emailInput.trim(),
      year: '2nd year',
      rollNo: '2503A52924',
      studentId: '2503A52924',
      phone: '9876543210'
    });
    setEmailInput('');
    setNameInput('');
  };

  const userRole = (currentUser && currentUser.role) || 'user';
  const isAdmin = userRole === 'admin';
  const isKitchen = userRole === 'kitchen';

  return (
    <div className="page active">
      <div className="two-col">
        {/* Account & Permissions Panel */}
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div className="panel-title">Active Campus Session</div>
              <div className="panel-sub">Role permissions and dashboard feature access</div>
            </div>
            <span
              className={`status-badge ${isAdmin ? 'available' : isKitchen ? 'low' : 'available'}`}
              style={{ fontWeight: 600, padding: '4px 10px', borderRadius: '9999px' }}
            >
              {userRole.toUpperCase()}
            </span>
          </div>

          {loggedIn && currentUser ? (
            <div className="account-grid">
              <div className="account-field">
                <div className="al">Full Name</div>
                <div className="av">{currentUser.name}</div>
              </div>
              <div className="account-field">
                <div className="al">Campus Email</div>
                <div className="av">{currentUser.email || 'user@student.campus.edu'}</div>
              </div>
              <div className="account-field">
                <div className="al">Role Type</div>
                <div className="av">
                  {isAdmin
                    ? 'Administrator (Full Access & Switcher)'
                    : isKitchen
                    ? 'Kitchen Staff (Back of House Only)'
                    : 'Campus User (Dining & Store Only)'}
                </div>
              </div>
              <div className="account-field">
                <div className="al">Campus ID</div>
                <div className="av">{currentUser.studentId || currentUser.rollNo || 'USR-2503'}</div>
              </div>
            </div>
          ) : (
            <div style={{ padding: '12px 0', color: 'var(--md-sys-color-on-surface-variant)' }}>
              No active session. Please sign in below.
            </div>
          )}

          {/* Permissions Matrix */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--md-sys-color-outline-variant)' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--md-sys-color-on-surface)', marginBottom: '4px' }}>
              Permitted Features Matrix
            </div>
            <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '12px' }}>
              Your authenticated role determines what features appear on your dashboard.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-small)' }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>User Features (Dining & Store)</strong>
                  <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>Live menu, food ordering, spending, express store</div>
                </div>
                <span className={`perm-pill ${!isKitchen ? 'granted' : 'restricted'}`}>
                  <span>{!isKitchen ? '✓ Permitted' : '🔒 Restricted'}</span>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-small)' }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>Kitchen Features (Back of House)</strong>
                  <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>Kanban ticket queue, counter POS billing, complaints</div>
                </div>
                <span className={`perm-pill ${isAdmin || isKitchen ? 'granted' : 'restricted'}`}>
                  <span>{isAdmin || isKitchen ? '✓ Permitted' : '🔒 Restricted'}</span>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-small)' }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>Adjust Stock Quantities</strong>
                  <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>Update what item has how much stock left</div>
                </div>
                <span className={`perm-pill ${isAdmin || isKitchen ? 'granted' : 'restricted'}`}>
                  <span>{isAdmin || isKitchen ? '✓ Permitted' : '🔒 Restricted'}</span>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-small)' }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>Admin Features & Menu Catalog Editing</strong>
                  <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>Executive overview, audit CSV, add/edit items</div>
                </div>
                <span className={`perm-pill ${isAdmin ? 'granted' : 'restricted'}`}>
                  <span>{isAdmin ? '✓ Permitted' : '🔒 Admin Only'}</span>
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-small)' }}>
                <div style={{ fontSize: '12.5px' }}>
                  <strong>Top Bar Persona Switcher</strong>
                  <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>Toggle role views directly in top bar</div>
                </div>
                <span className={`perm-pill ${isAdmin ? 'granted' : 'restricted'}`}>
                  <span>{isAdmin ? '✓ Visible (Admin)' : '🔒 Hidden'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Sign In / Account Switcher Panel */}
        <div className="panel">
          <div className="panel-title">Campus Sign In & Role Access</div>
          <div className="panel-sub">Sign in with an email to automatically authenticate into your role. Permissions and dashboard features adapt immediately.</div>

          {/* Quick 1-Click Role Logins */}
          <div style={{ marginTop: '14px', marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quick One-Click Sign In:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              <button
                className="dev-btn"
                onClick={() =>
                  login({
                    name: 'Rohan Sharma',
                    email: 'user@student.campus.edu',
                    role: 'user',
                    year: '2nd year',
                    studentId: '2503A52924'
                  })
                }
                style={{ justifyContent: 'flex-start', padding: '10px 14px', border: '1px solid var(--md-sys-color-outline-variant)', borderRadius: 'var(--md-sys-shape-corner-medium)', textAlign: 'left' }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>school</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '12.5px' }}>Sign In as User / Student</strong>
                  <span style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>user@student.campus.edu · Access: User features only</span>
                </div>
              </button>

              <button
                className="dev-btn"
                onClick={() =>
                  login({
                    name: 'Chef Rajesh Kumar',
                    email: 'kitchen@campus.edu',
                    role: 'kitchen',
                    year: 'Kitchen Staff',
                    studentId: 'KIT-104'
                  })
                }
                style={{ justifyContent: 'flex-start', padding: '10px 14px', border: '1px solid var(--md-sys-color-outline-variant)', borderRadius: 'var(--md-sys-shape-corner-medium)', textAlign: 'left' }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-secondary)' }}>skillet</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '12.5px' }}>Sign In as Kitchen Staff</strong>
                  <span style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>kitchen@campus.edu · Access: Kitchen features only</span>
                </div>
              </button>

              <button
                className="dev-btn"
                onClick={() =>
                  login({
                    name: 'Dr. Vikram Malhotra',
                    email: 'admin@campus.edu',
                    role: 'admin',
                    year: 'Faculty / Admin',
                    studentId: 'ADM-2026'
                  })
                }
                style={{ justifyContent: 'flex-start', padding: '10px 14px', border: '1px solid var(--md-sys-color-primary)', background: 'rgba(0,104,116,0.06)', borderRadius: 'var(--md-sys-shape-corner-medium)', textAlign: 'left' }}
              >
                <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-primary)' }}>admin_panel_settings</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <strong style={{ fontSize: '12.5px', color: 'var(--md-sys-color-primary)' }}>Sign In as Administrator</strong>
                  <span style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>admin@campus.edu · Access: User + Kitchen + Admin + Switcher</span>
                </div>
              </button>
            </div>
          </div>

          {/* Custom Email Form */}
          <div style={{ paddingTop: '14px', borderTop: '1px solid var(--md-sys-color-outline-variant)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Or Sign In with Any Campus Email:
            </div>
            <div className="field">
              <label>Campus Email</label>
              <input
                type="email"
                placeholder="e.g. user@student.campus.edu, kitchen@campus.edu, admin@campus.edu"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <div style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '4px' }}>
                💡 Emails containing &quot;admin&quot; get Admin access; &quot;kitchen&quot; gets Kitchen only; student emails get User store only.
              </div>
            </div>
            <div className="field">
              <label>Full Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Rohan Sharma"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button className="auth-submit" onClick={handleCustomLogin} style={{ flex: 1 }}>
                Sign In
              </button>
              {loggedIn && (
                <button className="dev-btn" onClick={logout} style={{ padding: '10px 16px' }}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
