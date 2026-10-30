import React from 'react';

const StockGauge = ({ stock, status }) => {
  const width = Math.max(3, Math.min(100, Math.round((stock / 40) * 100)));
  const background =
    status === 'available'
      ? 'var(--fresh)'
      : status === 'low'
      ? 'var(--low)'
      : 'var(--alert)';

  return (
    <div className="gauge">
      <span style={{ width: `${width}%`, background }}></span>
    </div>
  );
};

export default StockGauge;
