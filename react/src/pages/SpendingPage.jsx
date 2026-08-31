import React from 'react';
import { spendingData } from '../data/initialData';

const SpendingPage = () => {
  return (
    <div className="page active">
      <div className="panel">
        <div className="panel-title">Weekly Spending Analytics</div>
        <div className="panel-sub">Day-by-day expense log for campus dining</div>

        <div className="bars" style={{ height: '180px' }}>
          {spendingData.map((d) => (
            <div key={d.day} className={`bar-col ${d.peak ? 'peak' : ''}`}>
              <div className="bar" style={{ height: '100%' }}>
                <span style={{ height: `${d.val === 0 ? 0 : Math.max(12, Math.round((d.val / 240) * 100))}%` }}></span>
              </div>
              <div className="bar-label">{d.day}</div>
            </div>
          ))}
        </div>

        <div className="spend-total" style={{ marginTop: '24px' }}>
          <span className="amt">₹845</span>
          <span className="lbl">Total spent this week across 7 canteen orders</span>
        </div>
      </div>
    </div>
  );
};

export default SpendingPage;
