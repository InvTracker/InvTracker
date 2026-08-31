import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const SettingsPage = () => {
  const { currentUser, loggedIn, login, logout } = useApp();
  const [authTab, setAuthTab] = useState('login');

  // Login form state
  const [loginId, setLoginId] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Signup form state
  const [suName, setSuName] = useState('');
  const [suRoll, setSuRoll] = useState('');
  const [suYear, setSuYear] = useState('2nd year');
  const [suId, setSuId] = useState('');
  const [suPhone, setSuPhone] = useState('');
  const [suError, setSuError] = useState(false);

  // Switches
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const handleLoginSubmit = () => {
    if (!loginId.trim() || !loginPhone.trim()) {
      setLoginError(true);
      return;
    }
    setLoginError(false);
    login({
      name: 'Nivedita',
      year: '2nd year',
      rollNo: '2503A52924',
      studentId: loginId.trim(),
      phone: loginPhone.trim(),
    });
  };

  const handleSignupSubmit = () => {
    if (!suName.trim() || !suRoll.trim() || !suId.trim() || !suPhone.trim()) {
      setSuError(true);
      return;
    }
    setSuError(false);
    login({
      name: suName.trim(),
      year: suYear,
      rollNo: suRoll.trim(),
      studentId: suId.trim(),
      phone: suPhone.trim(),
    });
  };

  return (
    <div className="page active">
      <div className="two-col">
        {/* Account / Auth Panel */}
        <div className="panel">
          {loggedIn ? (
            <div>
              <div className="panel-title">Student Profile</div>
              <div className="panel-sub">Active session details</div>

              <div className="account-grid">
                <div className="account-field">
                  <div className="al">Full Name</div>
                  <div className="av">{currentUser.name}</div>
                </div>
                <div className="account-field">
                  <div className="al">Academic Year</div>
                  <div className="av">{currentUser.year}</div>
                </div>
                <div className="account-field">
                  <div className="al">Roll Number</div>
                  <div className="av">{currentUser.rollNo}</div>
                </div>
                <div className="account-field">
                  <div className="al">Student ID</div>
                  <div className="av">{currentUser.studentId}</div>
                </div>
                <div className="account-field" style={{ gridColumn: '1 / -1' }}>
                  <div className="al">Phone Number</div>
                  <div className="av">{currentUser.phone}</div>
                </div>
              </div>

              <button className="logout-btn" onClick={logout}>
                Log out of account
              </button>
            </div>
          ) : (
            <div>
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${authTab === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthTab('login')}
                >
                  Log In
                </button>
                <button
                  className={`auth-tab ${authTab === 'signup' ? 'active' : ''}`}
                  onClick={() => setAuthTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {authTab === 'login' ? (
                <div>
                  <div className="auth-sub">Access your campus canteen account</div>
                  <div className="field">
                    <label>Student ID / Roll No</label>
                    <input
                      type="text"
                      placeholder="e.g. 2503A52924"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Registered phone number"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                    />
                  </div>

                  <div className={`auth-error ${loginError ? 'show' : ''}`}>
                    Please fill out all login fields.
                  </div>

                  <button className="auth-submit" onClick={handleLoginSubmit}>
                    Log In →
                  </button>
                </div>
              ) : (
                <div>
                  <div className="auth-sub">Register new student canteen profile</div>
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Nivedita Sharma"
                      value={suName}
                      onChange={(e) => setSuName(e.target.value)}
                    />
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label>Roll Number</label>
                      <input
                        type="text"
                        placeholder="2503A52924"
                        value={suRoll}
                        onChange={(e) => setSuRoll(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Year</label>
                      <select value={suYear} onChange={(e) => setSuYear(e.target.value)}>
                        <option>1st year</option>
                        <option>2nd year</option>
                        <option>3rd year</option>
                        <option>4th year</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Student ID</label>
                    <input
                      type="text"
                      placeholder="Campus ID string"
                      value={suId}
                      onChange={(e) => setSuId(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={suPhone}
                      onChange={(e) => setSuPhone(e.target.value)}
                    />
                  </div>

                  <div className={`auth-error ${suError ? 'show' : ''}`}>
                    Please fill out all registration fields.
                  </div>

                  <button className="auth-submit" onClick={handleSignupSubmit}>
                    Create Account →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preferences Panel */}
        <div className="panel">
          <div className="panel-title">Notification Preferences</div>
          <div className="panel-sub">Manage canteen status alerts</div>

          <div className="setting-row">
            <div>
              <div className="setting-name">Order Status Popups</div>
              <div className="setting-sub">Alert when order transitions to Ready</div>
            </div>
            <div
              className={`switch ${orderAlerts ? 'on' : ''}`}
              onClick={() => setOrderAlerts(!orderAlerts)}
            >
              <div className="knob"></div>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-name">Low Stock Warnings</div>
              <div className="setting-sub">Alert when favorite dishes drop below 5</div>
            </div>
            <div
              className={`switch ${stockAlerts ? 'on' : ''}`}
              onClick={() => setStockAlerts(!stockAlerts)}
            >
              <div className="knob"></div>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="setting-name">Weekly Spend Summary</div>
              <div className="setting-sub">Send email summary every Sunday</div>
            </div>
            <div
              className={`switch ${emailDigest ? 'on' : ''}`}
              onClick={() => setEmailDigest(!emailDigest)}
            >
              <div className="knob"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
