import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import ToastContainer from './components/layout/ToastContainer';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import SpendingPage from './pages/SpendingPage';
import ForYouPage from './pages/ForYouPage';
import FeedbackPage from './pages/FeedbackPage';
import SettingsPage from './pages/SettingsPage';

const AppContent = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'orders':
        return <OrdersPage />;
      case 'spending':
        return <SpendingPage />;
      case 'foryou':
        return <ForYouPage />;
      case 'feedback':
        return <FeedbackPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="shell">
      <Sidebar />
      <main>
        <Topbar />
        {renderPage()}
      </main>
      <ToastContainer />
    </div>
  );
};

export default AppContent;
