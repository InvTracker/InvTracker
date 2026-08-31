import React from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';
import StockGauge from '../components/common/StockGauge';
import RecCard from '../components/common/RecCard';
import { spendingData } from '../data/initialData';

const etaMessages = [
  '~12 min to ready',
  '~7 min to ready',
  'Ready — head to Counter 2',
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
  } = useApp();

  const currentLiveOrder = orders.find((o) => o.live) || orders[0];
  const done = stageIndex >= stages.length - 1;

  const activeTicketTitle = currentLiveOrder ? currentLiveOrder.title : 'Chicken Biryani';
  const activeTicketAmt = currentLiveOrder ? currentLiveOrder.amt : 185;

  return (
    <div className="page active">
      {/* Hero Ticket */}
      <div className="ticket">
        <div className="ticket-main">
          <div className="ticket-eyebrow">Active Order · Digital Token</div>
          <div className="ticket-title">{activeTicketTitle}</div>
          <div className="ticket-desc">Placed just now · Counter 2</div>

          <div className="stepper">
            {stages.map((st, i) => {
              let cls = '';
              if (i < stageIndex) cls = 'done';
              else if (i === stageIndex) cls = 'now';
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
            <span className="stub-value mono">Counter 2</span>
          </div>

          <div className="queue-no">{queueNo}</div>

          <div className="stub-row">
            <span className="stub-label">Paid</span>
            <span className="stub-value mono">₹{activeTicketAmt}</span>
          </div>

          <div className="eta-pill">{etaMessages[stageIndex]}</div>

          <button
            className="advance-btn"
            onClick={advanceStage}
            disabled={done}
          >
            {done ? 'Picked up ✓' : `Mark "${stages[stageIndex + 1]}" →`}
          </button>
        </div>
      </div>

      {/* Quick Grid Shortcuts */}
      <div className="quick-grid">
        <div className="quick-card" onClick={() => switchPage('menu')}>
          <div className="quick-icon">📋</div>
          <div className="quick-title">Browse Menu</div>
          <div className="quick-sub">Filter by Mains, Snacks & Drinks</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('cart')}>
          <div className="quick-icon">🛒</div>
          <div className="quick-title">View Cart</div>
          <div className="quick-sub">Review items & checkout</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('orders')}>
          <div className="quick-icon">🎫</div>
          <div className="quick-title">Order History</div>
          <div className="quick-sub">Track active & past tokens</div>
        </div>
        <div className="quick-card" onClick={() => switchPage('spending')}>
          <div className="quick-icon">📊</div>
          <div className="quick-title">Spending Log</div>
          <div className="quick-sub">Weekly canteen expense overview</div>
        </div>
      </div>

      {/* Live Inventory Counter Strip */}
      <div className="section-head">
        <div className="section-title">Live Canteen Stock Gauges</div>
        <button className="section-link" onClick={() => switchPage('menu')}>
          View all menu →
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
        <div className="section-title">Recommended Meal Pairs</div>
        <button className="section-link" onClick={() => switchPage('foryou')}>
          See personalized picks →
        </button>
      </div>

      <div className="rec-grid">
        {recommendedIds.map((id) => {
          const item = menuItems.find((m) => m.id === id);
          return item ? <RecCard key={item.id} item={item} /> : null;
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
            <span className="amt">₹845</span>
            <span className="lbl">spent this week across 7 orders</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Recent Tickets</div>
          <div className="panel-sub">Live status sync from Counter 2</div>

          <div className="stub-list">
            {orders.slice(0, 4).map((o) => (
              <div key={o.id} className="stub-list-item">
                <div className="stub-icon">{o.icon}</div>
                <div className="stub-info">
                  <div className="t">{o.title}</div>
                  <div className="s">{o.when}</div>
                </div>
                <div>
                  <div className="stub-amt mono">₹{o.amt}</div>
                  <div className={`stub-status ${o.status === 'Delivered' ? 'done' : 'progress'}`}>
                    {o.status}
                  </div>
                </div>
              </div>
            ))}
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
          Give Feedback ★
        </button>
      </div>
    </div>
  );
};

export default HomePage;
