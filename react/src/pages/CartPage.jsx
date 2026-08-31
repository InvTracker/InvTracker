import React from 'react';
import { useApp } from '../context/AppContext';

const CartPage = () => {
  const {
    cart,
    menuItems,
    cartCount,
    cartTotal,
    changeQty,
    removeFromCart,
    placeOrder,
    switchPage,
  } = useApp();

  const cartItemIds = Object.keys(cart);
  const packingFee = cartItemIds.length ? 10 : 0;
  const finalTotal = cartTotal + packingFee;

  return (
    <div className="page active">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div className="section-title">
          Selected Items ({cartCount} item{cartCount !== 1 ? 's' : ''})
        </div>
      </div>

      <div className="cart-layout">
        <div className="panel">
          {cartItemIds.length === 0 ? (
            <div className="empty-state">
              <div className="em">🛒</div>
              Your cart is empty.
              <br />
              <button
                className="mini-btn"
                style={{ marginTop: '12px' }}
                onClick={() => switchPage('menu')}
              >
                Browse menu
              </button>
            </div>
          ) : (
            <div>
              {cartItemIds.map((id) => {
                const item = menuItems.find((m) => m.id === id);
                if (!item) return null;
                const qty = cart[id];
                return (
                  <div key={id} className="cart-line">
                    <div className="menu-emoji">{item.emoji}</div>
                    <div className="stub-info">
                      <div className="t">{item.name}</div>
                      <div className="s mono">₹{item.price} each</div>
                    </div>
                    <div className="qty-ctrl">
                      <button onClick={() => changeQty(id, -1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => changeQty(id, 1)}>+</button>
                    </div>
                    <button className="remove-x" onClick={() => removeFromCart(id)}>
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="panel">
          <div className="panel-title">Order Summary</div>
          <div className="panel-sub">Digital Token & Receipt</div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span className="mono">₹{cartTotal}</span>
          </div>
          <div className="summary-row">
            <span>Packaging & Container Fee</span>
            <span className="mono">₹{packingFee}</span>
          </div>
          <div className="summary-row total">
            <span>Total Payable</span>
            <span className="mono">₹{finalTotal}</span>
          </div>

          <button
            className="checkout-btn"
            disabled={cartCount === 0}
            onClick={placeOrder}
          >
            Place Order & Get Token →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
