import React from 'react';
import { useApp } from '../../context/AppContext';

const ToastContainer = () => {
  const { toasts } = useApp();

  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.msg}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
