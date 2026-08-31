import React from 'react';

const StatusBadge = ({ status }) => {
  const map = { available: 'AVAIL', low: 'LOW', out: 'OUT' };
  return (
    <span className={`status-badge ${status}`}>
      {map[status] || 'AVAIL'}
    </span>
  );
};

export default StatusBadge;
