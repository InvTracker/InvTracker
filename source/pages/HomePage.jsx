import React from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import StockGauge from '../components/common/StockGauge';
import RecCard from '../components/common/RecCard';
import { spendingData } from '../data/initialData';

const etaMessages = [
  '~12 min to ready',
  '~7 min to ready',
  'Ready - head to Counter 2',
  'Order complete',
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
    addToast,
  } = useApp();

  // 1. Identify 3 most frequently ordered items
  const frequencyMap = {};
  orders.forEach((order) => {
    (order.items || []).forEach((it) => {
      const key = it.id || it.name;
      if (!frequencyMap[key]) {
        frequencyMap[key] = {
          id: it.id,
          name: it.name,
          price: it.price,
          count: 0
        };
      }
      frequencyMap[key].count += (it.qty || 1);
    });
  });

  const sortedFreq = Object.values(frequencyMap).sort((a, b) => b.count - a.count);

  let favoriteItems = [];
  if (sortedFreq.length > 0) {
    favoriteItems = sortedFreq.slice(0, 3).map((entry) => {
      const catalogItem = menuItems.find((m) => m.id === entry.id || m.name?.toLowerCase() === entry.name?.toLowerCase());
      return {
        id: catalogItem ? catalogItem.id : entry.id,
        name: catalogItem ? catalogItem.name : entry.name,
        price: catalogItem ? catalogItem.price : entry.price,
        counter: catalogItem ? catalogItem.counter : 'Counter 2 (Quick Bites)',
        stock: catalogItem ? catalogItem.stock : 10,
        orderCount: entry.count,
        isHistory: true
      };
    });
  } else if (menuItems.length > 0) {
    favoriteItems = menuItems.filter((m) => m.stock > 0).slice(0, 3).map((m) => ({
      id: m.id,
      name: m.name,
      price: m.price,
      counter: m.counter || 'Counter 1 (Hot Meals)',
      stock: m.stock,
      orderCount: 0,
      isHistory: false
    }));
  }

  // 2. Identify if last placed order was a combo (>= 2 paired items)
  let lastOrder = null;
  if (orders.length > 0) {
    lastOrder = [...orders].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] || orders[0];
  }
  const lastOrderItems = (lastOrder && Array.isArray(lastOrder.items)) ? lastOrder.items : [];
  const hasCombo = lastOrderItems.length >= 2;

  const handleReorderCombo = () => {
    let addedCount = 0;
    lastOrderItems.forEach((it) => {
      const catItem = menuItems.find((m) => m.id === it.id || m.name?.toLowerCase() === it.name?.toLowerCase());
      const itemId = catItem ? catItem.id : it.id;
      if (catItem && catItem.stock > 0) {
        addToCart(itemId);
        addedCount++;
      } else if (!catItem) {
        addToCart(itemId);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      addToast(`Re-ordered combo (${addedCount} items) added to cart!`);
    } else {
      addToast('Items in previous combo are currently out of stock.');
    }
  };

  const currentLiveOrder = orders.find((o) => o.live);
  const done = stageIndex >= stages.length - 1;

  const activeTicketTitle = currentLiveOrder ? currentLiveOrder.title : 'No active order';
  const activeTicketDesc = currentLiveOrder ? 'Placed just now  -  Counter 2' : 'Browse the menu and place an order to get a live token';
  const activeTicketAmt = currentLiveOrder ? currentLiveOrder.amt : 0;

  return (
    <div className="page active">
            {/* Student Greeting */}
      <div className="home-greeting-bar">
        <h2 className="greeting-heading">Welcome back, {currentUser?.name || 'Student'}!</h2>
        <p className="greeting-sub">High-speed re-order for your frequent cafeteria favorites.</p>
      </div>

      {/* High-Speed Quick Re-Order Shelf */}
      <section className="quick-reorder-section">
        <div className="section-head" style={{ marginTop: '4px', marginBottom: '8px' }}>
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#f59e0b' }}>bolt</span>
            <span>Quick Re-Order</span>
          </div>
          {hasCombo && (
            <button
              type="button"
              className="reorder-combo-cta-btn"
              onClick={handleReorderCombo}
              title={`Re-order all ${lastOrderItems.length} items from your previous meal`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>autorenew</span>
              <span>Re-order Entire Combo ({lastOrderItems.length} items)</span>
            </button>
          )}
        </div>
        <div className="quick-reorder-scroll-row">
          {favoriteItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '18px', width: '100%', textAlign: 'left', background: 'var(--md-sys-color-surface-container-low)', borderRadius: '12px', border: '1px dashed var(--md-sys-color-outline-variant)' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--md-sys-color-on-surface)' }}>Your frequent favorites will appear here</div>
              <div style={{ fontSize: '12px', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '2px' }}>Load menu items or place your first order to enable high-speed 1-tap re-ordering.</div>
            </div>
          ) : (
            favoriteItems.map((it) => (
              <div key={it.id} className="reorder-card">
                <div className="reorder-card-top">
                  <div className="reorder-card-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>restaurant</span>
                  </div>
                  <div className="reorder-card-info">
                    <div className="reorder-card-title" title={it.name}>{it.name}</div>
                    <span className="reorder-card-counter" title={it.counter}>{it.counter}</span>
                    <div className="reorder-card-frequency">
                      <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{it.isHistory ? 'history' : 'star'}</span>
                      <span>{it.isHistory && it.orderCount > 1 ? `Ordered ${it.orderCount}x` : (it.isHistory ? 'Recent order' : 'Campus staple')}</span>
                    </div>
                  </div>
                </div>
                <div className="reorder-card-bottom">
                  <span className="reorder-card-price mono">Rs {it.price}</span>
                  <button
                    type="button"
                    className="reorder-add-btn"
                    onClick={() => {
                      addToCart(it.id);
                      addToast(`Added ${it.name} to cart`);
                    }}
                    disabled={it.stock <= 0}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                    <span>{it.stock <= 0 ? 'Sold Out' : 'Add'}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Hero Ticket */}
      <div className="ticket">
        <div className="ticket-main">
          <div className="ticket-eyebrow">Active Order  -  Digital Token</div>
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
            {stageIndex < 0 ? 'No active order' : done ? 'Picked up (Done)' : `Mark "${stages[stageIndex + 1]}" ->`}
          </button>
        </div>
      </div>

      {/* Quick Grid Shortcuts */}
      <div className="quick-grid">
        <div className="quick-card" onClick={() => switchPage('menu')}>
          <div className="quick-icon"></div>
          <div className="quick-title">Browse Menu</div>
          <div className="quick-sub">Filter by Mains, Snacks & Drinks</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('cart')}>
          <div className="quick-icon"></div>
          <div className="quick-title">View Cart</div>
          <div className="quick-sub">Review items & checkout</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('orders')}>
          <div className="quick-icon"></div>
          <div className="quick-title">Order History</div>
          <div className="quick-sub">Track active & past tokens</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('spending')}>
          <div className="quick-icon"></div>
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
        {menuItems.length === 0 ? (
          <div className="empty-state" style={{ width: '100%', padding: '24px', textAlign: 'center', gridColumn: '1 / -1' }}>
            <div className="em"></div>
            No live inventory loaded yet. Click <strong>"Enter Example Data"</strong> at the top to load sample menu items.
          </div>
        ) : (
          menuItems.slice(0, 6).map((it) => (
            <div key={it.id} className="counter-item">
              <div className="counter-meta">
                <span className="counter-name">{it.name}</span>
                <StatusBadge status={it.status} />
              </div>
              <div className="stock-count">{it.stock} servings left</div>
              <StockGauge stock={it.stock} status={it.status} />
            </div>
          ))
        )}
      </div>

      {/* Recommended Meal Pairings */}
      <div className="section-head">
        <div className="section-title">Recommended Meal Pairs</div>
        <button className="section-link" onClick={() => switchPage('foryou')}>
          See personalized picks ->
        </button>
      </div>

      <div className="rec-grid">
        {menuItems.length === 0 ? (
          <div className="empty-state" style={{ width: '100%', padding: '24px', textAlign: 'center', gridColumn: '1 / -1' }}>
            <div className="em"></div>
            No recommended pairings yet. Load example data to explore combos.
          </div>
        ) : (
          recommendedIds.map((id) => {
            const item = menuItems.find((m) => m.id === id);
            return item ? <RecCard key={item.id} item={item} /> : null;
          })
        )}
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
            {orders.length === 0 ? (
              <div className="empty-state" style={{ padding: '24px', textAlign: 'center' }}>
                <div className="em"></div>
                No recent tickets found.
              </div>
            ) : (
              orders.slice(0, 4).map((o) => (
                <div key={o.id} className="stub-list-item">
                  <div className="stub-icon">{o.icon}</div>
                  <div className="stub-info">
                    <div className="t">{o.title}</div>
                    <div className="s">{o.when}</div>
                  </div>
                  <div>
                    <div className="stub-amt mono">Rs {o.amt}</div>
                    <div className={`stub-status ${o.status === 'Delivered' ? 'done' : 'progress'}`}>
                      {o.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Feedback Strip */}
      <div className="feedback-strip">
        <div>
          <div className="ft">How was your lunch today?</div>
          <div className="fs">Rate your experience to help cafeteria staff restock better.</div>
        </div>
        <button className="fb-btn" onClick={() => switchPage('feedback')}>
          Give Feedback
        </button>
      </div>
    </div>
  );
};

export default HomePage;
