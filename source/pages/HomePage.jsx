import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import StockGauge from '../components/common/StockGauge';
import { spendingData } from '../data/initialData';

const etaMessages = [
  '~12 min to ready',
  '~7 min to ready',
  'Ready - head to Counter 2',
  'Order complete',
];

const QUICK_REORDER_ITEMS = [
  {
    id: 'item-3',
    name: 'Ghee Podi Masala Dosa',
    emoji: 'breakfast_dining',
    price: 80,
    cat: 'Mains',
    counter: 'Counter 1 (Hot Meals)',
    stock: 14,
    status: 'low',
    badge: 'Ordered 2x',
    recReason: 'Ordered 2x this week'
  },
  {
    id: 'item-1',
    name: 'Chicken Dum Biryani',
    emoji: 'restaurant',
    price: 180,
    cat: 'Mains',
    counter: 'Counter 1 (Hot Meals)',
    stock: 22,
    status: 'available',
    badge: 'Recent order',
    recReason: 'Recent order - Counter 1'
  },
  {
    id: 'item-8',
    name: 'Artisan Cold Coffee',
    emoji: 'local_cafe',
    price: 50,
    cat: 'Beverages',
    counter: 'Counter 3 (Cafe & Drinks)',
    stock: 28,
    status: 'available',
    badge: 'Recent order',
    recReason: 'Recent order - Cafe Counter 3'
  }
];

const HomePage = () => {
  const {
    menuItems,
    orders,
    stageIndex,
    stages,
    queueNo,
    recommendedIds,
    advanceStage,
    switchPage,
    currentUser,
    addToCart,
  } = useApp();

  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (id) => {
    addToCart(id);
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [id]: false }));
    }, 700);
  };

  const handleReorderCombo = () => {
    QUICK_REORDER_ITEMS.forEach((it) => {
      addToCart(it.id);
    });
  };

  const currentLiveOrder = orders.find((o) => o.live);
  const done = stageIndex >= stages.length - 1;

  const activeTicketTitle = currentLiveOrder ? currentLiveOrder.title : 'No active order';
  const activeTicketDesc = currentLiveOrder ? 'Placed just now - Counter 2' : 'Browse the menu and place an order to get a live token';
  const activeTicketAmt = currentLiveOrder ? currentLiveOrder.amt : 0;
  const userName = (currentUser && currentUser.name) || 'Rohan Sharma';

  return (
    <div className="page active">
      {/* Home Welcome Hero Header */}
      <div className="home-hero-banner" style={{ marginBottom: '24px' }}>
        <h1 className="welcome-heading display" style={{ fontSize: '26px', fontWeight: 800, color: 'var(--md-sys-color-on-surface)', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
          Welcome back, {userName}!
        </h1>
        <p className="welcome-sub" style={{ fontSize: '14.5px', color: 'var(--md-sys-color-on-surface-variant)', margin: 0 }}>
          High-speed re-order for your frequent cafeteria favorites.
        </p>
      </div>

      {/* Quick Re-Order Section */}
      <div className="quick-reorder-section" style={{ marginBottom: '32px' }}>
        <div className="section-head" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
            <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span>Quick Re-Order</span>
          </div>
          <button
            className="reorder-combo-btn"
            id="reorderComboBtn"
            type="button"
            onClick={handleReorderCombo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 20px',
              borderRadius: '100px',
              background: 'var(--md-sys-color-primary, #006a6a)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 106, 106, 0.28)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>sync</span>
            <span>Re-order Entire Combo (3 items)</span>
          </button>
        </div>

        {/* Real Food Cards Grid */}
        <div className="menu-grid" id="quickReorderGrid">
          {QUICK_REORDER_ITEMS.map((it) => {
            const isAdded = addedIds[it.id];
            return (
              <div key={it.id} className="menu-card">
                <div className="menu-emoji"><span className="material-symbols-outlined">{it.emoji}</span></div>
                <div className="menu-info">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span className="swiggy-ribbon trending" style={{ fontSize: '10.5px' }}>{it.badge}</span>
                    <span style={{ fontSize: '11px', color: 'var(--md-sys-color-on-surface-variant)' }}>{it.counter}</span>
                  </div>
                  <div className="mn">{it.name}</div>
                  <div className="mc">{it.cat}</div>
                  <div className="mrow">
                    <span className="rec-price mono">Rs {it.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StatusBadge status={it.status} />
                      <button
                        className={`add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAdd(it.id)}
                      >
                        {isAdded ? 'Added' : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Ticket */}
      <div className="ticket">
        <div className="ticket-main">
          <div className="ticket-eyebrow">Active Order - Digital Token</div>
          <div className="ticket-title">{activeTicketTitle}</div>
          <div className="ticket-desc">{activeTicketDesc}</div>

          <div className="stepper">
            {stages.map((st, i) => {
              let cls = '';
              if (stageIndex >= 0) {
                if (i < stageIndex) cls = 'done';
                else if (i === stageIndex) cls = 'now';
              }
              return (
                <div key={st} className={`step ${cls}`}>
                  <div className="step-dot"></div>
                  <div className="step-line"></div>
                  <div className="step-label">{st}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ticket-stub">
          <div className="punch top"></div>
          <div className="punch bottom"></div>

          <div className="stub-row">
            <span className="stub-label">Token No</span>
            <span className="stub-value mono">{currentLiveOrder ? 'Counter 2' : '---'}</span>
          </div>

          <div className="queue-no">{queueNo}</div>

          <div className="stub-row">
            <span className="stub-label">Paid</span>
            <span className="stub-value mono">Rs {activeTicketAmt}</span>
          </div>

          <div className="eta-pill">{stageIndex >= 0 ? etaMessages[stageIndex] : 'No active order'}</div>

          <button
            className="advance-btn"
            onClick={advanceStage}
            disabled={stageIndex < 0 || done}
          >
            {stageIndex < 0 ? 'No active order' : done ? 'Picked up Added' : `Mark "${stages[stageIndex + 1]}" ->`}
          </button>
        </div>
      </div>

      {/* Quick Grid Shortcuts */}
      <div className="quick-grid">
        <div className="quick-card" onClick={() => switchPage('menu')}>
          <div className="quick-icon"><span className="material-symbols-outlined">assignment</span></div>
          <div className="quick-title">Browse Menu</div>
          <div className="quick-sub">Filter by Mains, Snacks & Drinks</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('cart')}>
          <div className="quick-icon"><span className="material-symbols-outlined">shopping_cart</span></div>
          <div className="quick-title">View Cart</div>
          <div className="quick-sub">Review items & checkout</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('orders')}>
          <div className="quick-icon"><span className="material-symbols-outlined">confirmation_number</span></div>
          <div className="quick-title">Order History</div>
          <div className="quick-sub">Track active & past tokens</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('spending')}>
          <div className="quick-icon"><span className="material-symbols-outlined">bar_chart</span></div>
          <div className="quick-title">Spending Log</div>
          <div className="quick-sub">Weekly canteen expense overview</div>
        </div>
      </div>

      {/* Live Inventory Counter Strip */}
      <div className="section-head">
        <div className="section-title">Live Canteen Stock Gauges</div>
        <button className="section-link" onClick={() => switchPage('menu')}>
          View all menu ->
        </button>
      </div>

      <div className="counter-strip">
        {menuItems.slice(0, 6).map((it) => (
          <div key={it.id} className="counter-item">
            <div className="counter-meta">
              <span className="counter-name">{it.name}</span>
              <StatusBadge status={it.status} />
            </div>
            <div className="stock-count">{it.stock} servings left</div>
            <StockGauge stock={it.stock} status={it.status} />
          </div>
        ))}
      </div>

      {/* Recommended Meal Pairings */}
      <div className="section-head">
        <div className="section-title">You may also like - Frequent pairings</div>
        <button className="section-link" onClick={() => switchPage('foryou')}>
          See personalized picks ->
        </button>
      </div>

      <div className="menu-grid">
        {recommendedIds.map((id) => {
          const item = menuItems.find((m) => m.id === id);
          if (!item) return null;
          const isAdded = addedIds[item.id];
          return (
            <div key={item.id} className="menu-card">
              <div className="menu-emoji"><span className="material-symbols-outlined">{item.emoji}</span></div>
              <div className="menu-info">
                <div className="mn">{item.name}</div>
                <div className="mc">{item.cat}</div>
                <div className="mrow">
                  <span className="rec-price mono">Rs {item.price}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StatusBadge status={item.status} />
                    <button
                      className={`add-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAdd(item.id)}
                    >
                      {isAdded ? 'Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spending Preview & Recent Orders */}
      <div style={{ marginTop: '22px' }} className="two-col">
        <div className="panel">
          <div className="panel-title">Weekly Spend Preview</div>
          <div className="panel-sub">Peak spending day: Wednesday</div>

          <div className="bars">
            {spendingData.map((d) => (
              <div key={d.day} className={`bar-col ${d.peak ? 'peak' : ''}`}>
                <div className="bar" style={{ height: '100%' }}>
                  <span style={{ height: `${d.val === 0 ? 0 : Math.max(12, Math.round((d.val / 240) * 100))}%` }}></span>
                </div>
                <div className="bar-label">{d.day}</div>
              </div>
            ))}
          </div>

          <div className="spend-total">
            <span className="amt">Rs {orders.reduce((sum, o) => sum + (o.amt || 0), 0)}</span>
            <span className="lbl">spent across {orders.length} orders</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Recent Tickets</div>
          <div className="panel-sub">Live status sync from Counter 2</div>

          <div className="stub-list">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="stub-item">
                <div className="s-tok">{o.token || '#A-038'}</div>
                <div className="s-info">
                  <div className="s-tit">{o.title}</div>
                  <div className="s-meta">Rs {o.amt} - Counter 1</div>
                </div>
                <div className={`s-st ${o.status.toLowerCase()}`}>{o.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
