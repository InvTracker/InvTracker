/**
 * InvenTrack — Campus Food & Cafe Inventory Platform
 * Core Application Architecture & Schema-Driven State Engine
 * 
 * Supports 4 Unified Roles:
 * 1. Student (Live ordering, token tracking, spending analytics, feedback)
 * 2. Shopper (Fast-track quick order, express token checkout, receipts)
 * 3. Kitchen Staff (Live Kanban queue, stock adjuster, counter POS, complaints)
 * 4. Admin Management (Revenue metrics, demand matrix, audit table, CSV export)
 */

// =========================================================================
// 1. DATA INJECTION SLOT & DEMO FIXTURE
// =========================================================================

/**
 * CRITICAL DATA REQUIREMENT:
 * Zero pre-populated records by default. External datasets can be injected
 * directly into DATA_INJECTION_SLOT without breaking the UI.
 */
const DATA_INJECTION_SLOT = {
  menuItems: [],
  orders: [],
  users: [],
  feedbacks: []
};

/**
 * Toggleable Demo Fixture for Campus Dining.
 * Can be loaded with 1-click via the Dev Fixture Bar or empty-state buttons.
 */
const CAMPUS_DEMO_FIXTURE = {
  menuItems: [
    { id: 'item-1', name: 'Chicken Dum Biryani', emoji: '🍲', price: 185, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 25, lowThreshold: 8, restockTime: '15 min' },
    { id: 'item-2', name: 'Hyderabadi Veg Biryani', emoji: '🍚', price: 150, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 18, lowThreshold: 5, restockTime: '20 min' },
    { id: 'item-3', name: 'Ghee Podi Masala Dosa', emoji: '🧇', price: 90, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 4, lowThreshold: 6, restockTime: '10 min' },
    { id: 'item-4', name: 'Crispy Veg Patty Burger', emoji: '🍔', price: 70, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 22, lowThreshold: 5, restockTime: '12 min' },
    { id: 'item-5', name: 'Grilled Cheese Sandwich', emoji: '🥪', price: 60, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 3, lowThreshold: 5, restockTime: '8 min' },
    { id: 'item-6', name: 'Wood-Fired Pizza Slice', emoji: '🍕', price: 120, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 0, lowThreshold: 4, restockTime: '25 min' },
    { id: 'item-7', name: 'Peri-Peri Salted Fries', emoji: '🍟', price: 55, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 30, lowThreshold: 8, restockTime: '5 min' },
    { id: 'item-8', name: 'Artisan Cold Coffee', emoji: '🥤', price: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 35, lowThreshold: 10, restockTime: '5 min' },
    { id: 'item-9', name: 'Spiced Masala Buttermilk', emoji: '🥛', price: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 40, lowThreshold: 10, restockTime: '5 min' },
    { id: 'item-10', name: 'Warm Gulab Jamun (2 pcs)', emoji: '🍮', price: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', stock: 14, lowThreshold: 5, restockTime: '15 min' }
  ],
  orders: [
    {
      id: 'ord-101',
      token: '#A-038',
      customerName: 'Rohan Sharma',
      role: 'Student',
      items: [
        { id: 'item-1', name: 'Chicken Dum Biryani', qty: 1, price: 185 },
        { id: 'item-8', name: 'Artisan Cold Coffee', qty: 1, price: 45 }
      ],
      subtotal: 230,
      packing: 10,
      total: 240,
      paymentMethod: 'Campus UPI',
      status: 'Preparing',
      stageIndex: 1,
      counter: 'Counter 1 (Hot Meals)',
      createdAt: new Date(Date.now() - 12 * 60000).toISOString()
    },
    {
      id: 'ord-102',
      token: '#A-039',
      customerName: 'Ananya Verma',
      role: 'Student',
      items: [
        { id: 'item-3', name: 'Ghee Podi Masala Dosa', qty: 2, price: 90 }
      ],
      subtotal: 180,
      packing: 10,
      total: 190,
      paymentMethod: 'Meal Pass',
      status: 'Ready',
      stageIndex: 2,
      counter: 'Counter 1 (Hot Meals)',
      createdAt: new Date(Date.now() - 25 * 60000).toISOString()
    },
    {
      id: 'ord-103',
      token: '#A-040',
      customerName: 'Walk-in Faculty',
      role: 'Shopper',
      items: [
        { id: 'item-4', name: 'Crispy Veg Patty Burger', qty: 1, price: 70 },
        { id: 'item-7', name: 'Peri-Peri Salted Fries', qty: 1, price: 55 }
      ],
      subtotal: 125,
      packing: 10,
      total: 135,
      paymentMethod: 'Card',
      status: 'Placed',
      stageIndex: 0,
      counter: 'Counter 2 (Quick Bites)',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString()
    }
  ],
  feedbacks: [
    {
      id: 'fb-1',
      studentName: 'Priya K.',
      rating: 5,
      category: 'Food Quality',
      comment: 'Cold Coffee and Burger pairing was fantastic today!',
      date: 'Today, 12:45 PM'
    },
    {
      id: 'fb-2',
      studentName: 'Aditya S.',
      rating: 3,
      category: 'Wait Time',
      comment: 'Counter 1 was very crowded during lunch rush; took 15 mins.',
      date: 'Today, 1:15 PM'
    }
  ],
  users: [
    {
      id: 'u-1',
      name: 'Rohan Sharma',
      studentId: '2503A52924',
      rollNo: '2503A52924',
      year: '2nd year',
      phone: '9876543210',
      balance: 450
    }
  ]
};

// =========================================================================
// 2. REACTIVE STATE ENGINE & LOCAL STORAGE ADAPTER
// =========================================================================

const STORAGE_KEY = 'inventrack_state_v2';
const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];

class InvenTrackStore {
  constructor() {
    this.listeners = [];
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    // 1. Try local storage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          menuItems: parsed.menuItems || [],
          orders: parsed.orders || [],
          users: parsed.users || [],
          feedbacks: parsed.feedbacks || [],
          cart: parsed.cart || {},
          shopperCart: parsed.shopperCart || {},
          posCart: parsed.posCart || {},
          currentUser: parsed.currentUser || null,
          loggedIn: parsed.loggedIn || false,
          activeRole: parsed.activeRole || 'student',
          activePage: parsed.activePage || 'home',
          selectedPaymentMethod: 'Campus UPI',
          activeCat: 'All',
          counterFilter: 'All'
        };
      } catch (e) {
        console.warn('Failed to parse localStorage, resetting to injection slot', e);
      }
    }

    // 2. Fallback to DATA_INJECTION_SLOT
    return {
      menuItems: [...DATA_INJECTION_SLOT.menuItems],
      orders: [...DATA_INJECTION_SLOT.orders],
      users: [...DATA_INJECTION_SLOT.users],
      feedbacks: [...DATA_INJECTION_SLOT.feedbacks],
      cart: {},
      shopperCart: {},
      posCart: {},
      currentUser: null,
      loggedIn: false,
      activeRole: 'student',
      activePage: 'home',
      selectedPaymentMethod: 'Campus UPI',
      activeCat: 'All',
      counterFilter: 'All'
    };
  }

  save() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          menuItems: this.state.menuItems,
          orders: this.state.orders,
          users: this.state.users,
          feedbacks: this.state.feedbacks,
          cart: this.state.cart,
          shopperCart: this.state.shopperCart,
          currentUser: this.state.currentUser,
          loggedIn: this.state.loggedIn,
          activeRole: this.state.activeRole,
          activePage: this.state.activePage
        })
      );
    } catch (e) {
      console.warn('Failed to persist state', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in listener', err);
      }
    });
  }

  // --- ACTIONS ---

  loadDemoFixture() {
    this.state.menuItems = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.menuItems));
    this.state.orders = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.orders));
    this.state.users = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.users));
    this.state.feedbacks = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.feedbacks));
    this.state.currentUser = this.state.users[0] || null;
    this.state.loggedIn = !!this.state.currentUser;
    this.state.cart = {};
    this.state.shopperCart = {};
    this.state.posCart = {};
    this.save();
  }

  resetToEmptyState() {
    this.state.menuItems = [];
    this.state.orders = [];
    this.state.users = [];
    this.state.feedbacks = [];
    this.state.cart = {};
    this.state.shopperCart = {};
    this.state.posCart = {};
    this.state.currentUser = null;
    this.state.loggedIn = false;
    this.save();
  }

  setRole(role) {
    this.state.activeRole = role;
    if (role === 'student') this.state.activePage = 'home';
    else if (role === 'shopper') this.state.activePage = 'shopper-store';
    else if (role === 'kitchen') this.state.activePage = 'kitchen-kanban';
    else if (role === 'admin') this.state.activePage = 'admin-overview';
    this.save();
  }

  setPage(page) {
    this.state.activePage = page;
    this.save();
  }

  // Stock Adjustment (Directly reactive across all roles)
  adjustStock(itemId, delta) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item) return;
    const oldStock = item.stock;
    item.stock = Math.max(0, item.stock + delta);
    if (item.stock === 0 && oldStock > 0) {
      toast(`⚠️ "${item.name}" is now OUT OF STOCK`);
    } else if (item.stock > 0 && oldStock === 0) {
      toast(`🟢 "${item.name}" is RESTOCKED (${item.stock} available)`);
    } else {
      toast(`Stock updated: ${item.name} (${item.stock})`);
    }
    this.save();
  }

  setStockZero(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item) return;
    item.stock = 0;
    toast(`🔴 Marked "${item.name}" as Out of Stock`);
    this.save();
  }

  // Cart operations (Student)
  addToCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item is currently out of stock');
      return;
    }
    const currentQty = this.state.cart[itemId] || 0;
    if (currentQty >= item.stock) {
      toast(`Only ${item.stock} servings available in kitchen`);
      return;
    }
    this.state.cart[itemId] = currentQty + 1;
    toast(`Added ${item.name} to cart`);
    this.save();
  }

  changeCartQty(itemId, delta) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item) return;
    const current = this.state.cart[itemId] || 0;
    const next = current + delta;
    if (next <= 0) {
      delete this.state.cart[itemId];
    } else if (next > item.stock) {
      toast(`Only ${item.stock} available in stock`);
      return;
    } else {
      this.state.cart[itemId] = next;
    }
    this.save();
  }

  removeCartItem(itemId) {
    delete this.state.cart[itemId];
    this.save();
  }

  // Cart operations (Shopper)
  addToShopperCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item is out of stock');
      return;
    }
    this.state.shopperCart[itemId] = (this.state.shopperCart[itemId] || 0) + 1;
    toast(`Added ${item.name} to Express Cart`);
    this.save();
  }

  changeShopperCartQty(itemId, delta) {
    const current = this.state.shopperCart[itemId] || 0;
    const next = current + delta;
    if (next <= 0) {
      delete this.state.shopperCart[itemId];
    } else {
      this.state.shopperCart[itemId] = next;
    }
    this.save();
  }

  // POS operations (Cashier)
  addToPosCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item out of stock in kitchen');
      return;
    }
    this.state.posCart[itemId] = (this.state.posCart[itemId] || 0) + 1;
    this.save();
  }

  changePosCartQty(itemId, delta) {
    const current = this.state.posCart[itemId] || 0;
    const next = current + delta;
    if (next <= 0) {
      delete this.state.posCart[itemId];
    } else {
      this.state.posCart[itemId] = next;
    }
    this.save();
  }

  clearPosCart() {
    this.state.posCart = {};
    this.save();
  }

  // Order Placement
  createOrder({ itemsMap, customerName, role, counter, paymentMethod, packagingFee = 10 }) {
    const itemEntries = Object.entries(itemsMap);
    if (!itemEntries.length) return null;

    // Verify and decrement stock
    for (const [id, qty] of itemEntries) {
      const item = this.state.menuItems.find((m) => m.id === id);
      if (!item || item.stock < qty) {
        toast(`Insufficient stock for ${item ? item.name : 'item'}`);
        return null;
      }
    }

    // Decrement stock
    for (const [id, qty] of itemEntries) {
      const item = this.state.menuItems.find((m) => m.id === id);
      if (item) item.stock = Math.max(0, item.stock - qty);
    }

    const orderItems = itemEntries.map(([id, qty]) => {
      const it = this.state.menuItems.find((m) => m.id === id);
      return {
        id,
        name: it.name,
        qty,
        price: it.price
      };
    });

    const subtotal = orderItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    const total = subtotal + packagingFee;

    const tokenPrefix = role === 'Student' ? 'A' : role === 'Shopper' ? 'S' : 'P';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const token = `#${tokenPrefix}-${randomNum}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      token,
      customerName: customerName || (this.state.currentUser ? this.state.currentUser.name : 'Guest User'),
      role: role || 'Student',
      items: orderItems,
      subtotal,
      packing: packagingFee,
      total,
      paymentMethod: paymentMethod || 'Campus UPI',
      status: 'Placed',
      stageIndex: 0,
      counter: counter || 'Counter 2 (Quick Bites)',
      createdAt: new Date().toISOString()
    };

    this.state.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  // Advance Kitchen Order Status
  advanceOrderStatus(orderId) {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;
    if (order.stageIndex < stages.length - 1) {
      order.stageIndex++;
      order.status = stages[order.stageIndex];
      toast(`Order ${order.token} advanced to "${order.status}"`);
      this.save();
    }
  }

  // Feedback Submission
  addFeedback({ rating, category, comment }) {
    const studentName = this.state.currentUser ? this.state.currentUser.name : 'Student Diner';
    const newFb = {
      id: `fb-${Date.now()}`,
      studentName,
      rating,
      category,
      comment: comment || 'No comments left.',
      date: 'Just now'
    };
    this.state.feedbacks.unshift(newFb);
    toast('Thanks — feedback recorded!');
    this.save();
  }

  // Add Item to Catalog
  addMenuItem(itemData) {
    const id = `item-${Date.now()}`;
    const newItem = {
      id,
      name: itemData.name || 'New Item',
      emoji: itemData.emoji || '🍽️',
      price: Number(itemData.price) || 50,
      cat: itemData.cat || 'Snacks',
      counter: itemData.counter || 'Counter 2 (Quick Bites)',
      stock: Number(itemData.stock) || 20,
      lowThreshold: Number(itemData.lowThreshold) || 5,
      restockTime: itemData.restockTime || '15 min'
    };
    this.state.menuItems.push(newItem);
    toast(`Injected "${newItem.name}" into menu catalog`);
    this.save();
  }
}

// Global Store Instance
const store = new InvenTrackStore();

// =========================================================================
// 3. DOM UTILITIES & HELPERS
// =========================================================================

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function toast(msg) {
  const wrap = $('#toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function getItemStatus(item) {
  if (item.stock === 0) return 'out';
  if (item.stock <= (item.lowThreshold || 5)) return 'low';
  return 'available';
}

function sbHTML(status) {
  const labels = { available: 'AVAIL', low: 'LOW', out: 'OUT' };
  return `<span class="status-badge ${status}">${labels[status] || status}</span>`;
}

function getGaugeColor(status) {
  return status === 'available' ? 'var(--fresh)' : status === 'low' ? 'var(--low)' : 'var(--alert)';
}

function getGaugeWidth(item) {
  const maxRef = Math.max(40, (item.lowThreshold || 5) * 4);
  return Math.max(3, Math.min(100, Math.round((item.stock / maxRef) * 100)));
}

function initials(name) {
  if (!name) return 'GU';
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'ST'
  );
}

// =========================================================================
// 4. ROLE SWITCHING & SHELL ADAPTATION
// =========================================================================

const roleLabels = {
  student: 'Student Portal',
  shopper: 'Express Shopper',
  kitchen: 'Kitchen & Staff',
  admin: 'Admin Portal'
};

function renderShell(state) {
  const { activeRole, activePage } = state;

  // 1. Role Switcher Buttons
  $$('#roleSwitcher .role-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.role === activeRole);
  });

  // 2. Sidebar Brand Subtitle
  const brandSub = $('#brandSubRole');
  if (brandSub) brandSub.textContent = roleLabels[activeRole] || 'Portal';

  // 3. Toggle Sidebar Nav Groups
  const navGroups = {
    student: $('#navGroupStudent'),
    shopper: $('#navGroupShopper'),
    kitchen: $('#navGroupKitchen'),
    admin: $('#navGroupAdmin')
  };

  Object.entries(navGroups).forEach(([role, navEl]) => {
    if (navEl) navEl.style.display = role === activeRole ? 'flex' : 'none';
  });

  // 4. Update Nav Active Item
  $$('.nav-item[data-page]').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === activePage);
  });

  // 5. Update Active Page Section
  $$('.page').forEach((pg) => pg.classList.remove('active'));
  const targetPage = $(`#page-${activePage}`);
  if (targetPage) targetPage.classList.add('active');

  // 6. Update Dev Fixture Bar Status
  const badge = $('#dataModeBadge');
  const stats = $('#dataStatsText');
  if (badge && stats) {
    const isDemoLoaded = state.menuItems.length > 0;
    badge.textContent = isDemoLoaded ? 'Active Live State' : 'Empty Schema []';
    badge.style.background = isDemoLoaded ? 'var(--fresh-bg)' : 'var(--surface)';
    badge.style.color = isDemoLoaded ? 'var(--fresh)' : 'var(--ink)';
    const activeCount = state.orders.filter((o) => o.status !== 'Picked up').length;
    stats.textContent = `(${state.menuItems.length} items, ${activeCount} active orders)`;
  }

  // 7. Badges
  const studentCartCount = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const cartBadge = $('#cartBadge');
  if (cartBadge) {
    cartBadge.textContent = studentCartCount;
    cartBadge.classList.toggle('hide', studentCartCount === 0);
  }

  const shopperCartCount = Object.values(state.shopperCart).reduce((a, b) => a + b, 0);
  const shopperBadge = $('#shopperCartBadge');
  if (shopperBadge) {
    shopperBadge.textContent = shopperCartCount;
    shopperBadge.classList.toggle('hide', shopperCartCount === 0);
  }

  const inPrepCount = state.orders.filter((o) => o.status === 'Placed' || o.status === 'Preparing').length;
  const kitchenBadge = $('#kitchenQueueBadge');
  if (kitchenBadge) {
    kitchenBadge.textContent = inPrepCount;
    kitchenBadge.classList.toggle('hide', inPrepCount === 0);
  }

  // 8. User Profile in Sidebar
  const sideAvatar = $('#sideAvatar');
  const sideName = $('#sideName');
  const sideRole = $('#sideRole');
  if (state.loggedIn && state.currentUser) {
    if (sideAvatar) sideAvatar.textContent = initials(state.currentUser.name);
    if (sideName) sideName.textContent = state.currentUser.name;
    if (sideRole) sideRole.textContent = `${state.currentUser.year || 'Student'} · Dining`;
    if ($('#accountPanel')) $('#accountPanel').style.display = 'block';
    if ($('#authPanel')) $('#authPanel').style.display = 'none';
  } else {
    if (sideAvatar) sideAvatar.textContent = 'GU';
    if (sideName) sideName.textContent = 'Guest Student';
    if (sideRole) sideRole.textContent = 'Log in / Sign up';
    if ($('#accountPanel')) $('#accountPanel').style.display = 'none';
    if ($('#authPanel')) $('#authPanel').style.display = 'block';
  }
}

// =========================================================================
// 5. STUDENT MODULE RENDERING
// =========================================================================

// Live Order Ticket (Home)
function renderStudentTicket(state) {
  const activeOrder = state.orders.find((o) => o.status !== 'Picked up' && (o.role === 'Student' || !o.role));
  const advanceBtn = $('#advanceBtn');
  const queueNo = $('#queueNo');
  const etaPill = $('#etaPill');
  const ticketTitle = $('#ticketTitle');
  const ticketDesc = $('#ticketDesc');
  const ticketPaid = $('#ticketPaid');

  if (!activeOrder) {
    if (ticketTitle) ticketTitle.textContent = 'No active order';
    if (ticketDesc) ticketDesc.textContent = 'Browse the menu to place an order and track your live token.';
    if (queueNo) queueNo.textContent = '#---';
    if (etaPill) etaPill.textContent = 'No active order';
    if (ticketPaid) ticketPaid.textContent = '₹0';
    if (advanceBtn) {
      advanceBtn.disabled = true;
      advanceBtn.textContent = 'No active order';
    }
    $$('#stepper .step').forEach((el) => el.classList.remove('done', 'now'));
    return;
  }

  const itemsSummary = activeOrder.items.map((i) => `${i.qty}× ${i.name}`).join(' + ');
  if (ticketTitle) ticketTitle.textContent = itemsSummary;
  if (ticketDesc) ticketDesc.textContent = `Order placed · ${activeOrder.counter} · ${activeOrder.paymentMethod}`;
  if (queueNo) queueNo.textContent = activeOrder.token;
  if (ticketPaid) ticketPaid.textContent = `₹${activeOrder.total}`;

  const etaMap = [
    '~12 min to ready',
    '~7 min to ready',
    'Ready — collect at counter!',
    'Order complete ✓'
  ];
  if (etaPill) etaPill.textContent = etaMap[activeOrder.stageIndex] || 'In progress';

  // Stepper dots
  $$('#stepper .step').forEach((el, i) => {
    el.classList.remove('done', 'now');
    if (i < activeOrder.stageIndex) el.classList.add('done');
    else if (i === activeOrder.stageIndex) el.classList.add('now');
  });

  if (advanceBtn) {
    const isDone = activeOrder.stageIndex >= stages.length - 1;
    advanceBtn.disabled = isDone;
    advanceBtn.textContent = isDone ? 'Picked up ✓' : `Simulate "${stages[activeOrder.stageIndex + 1]}" →`;
    advanceBtn.dataset.orderId = activeOrder.id;
  }
}

// Live Counter Strip (Shared Real-time Inventory Component)
function renderCounterStrip(state) {
  const container = $('#counterStrip');
  if (!container) return;

  if (!state.menuItems.length) {
    container.innerHTML = `
      <div class="empty-state" style="padding:24px; width:100%; grid-column:1 / -1; border:1px dashed var(--border); border-radius:10px;">
        <div class="em">📦</div>
        <strong>No counter items available</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">
          Inject records into <code>DATA_INJECTION_SLOT</code> or click 
          <button class="dev-btn primary" style="margin-left:6px;" onclick="store.loadDemoFixture()">Load Sample Data</button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.menuItems
    .slice(0, 6)
    .map((it) => {
      const status = getItemStatus(it);
      return `
        <div class="counter-item">
          <div class="counter-meta">
            <span class="counter-name">${it.name}</span>
            ${sbHTML(status)}
          </div>
          <div class="stock-count">${it.stock} servings left &middot; <span style="color:var(--muted); font-size:10.5px;">${it.restockTime || '15 min'}</span></div>
          <div class="gauge">
            <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
          </div>
        </div>
      `;
    })
    .join('');
}

// Student Menu Grid & Filtering
function renderStudentMenu(state, searchQuery = '') {
  const grid = $('#menuGrid');
  const filterRow = $('#filterRow');
  if (!grid) return;

  // Categories
  const cats = ['All', ...new Set(state.menuItems.map((m) => m.cat))];
  if (filterRow) {
    filterRow.innerHTML = cats
      .map(
        (c) => `<button class="filter-chip ${c === state.activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`
      )
      .join('');
  }

  const q = searchQuery.trim().toLowerCase();
  const counterVal = $('#counterFilterSelect') ? $('#counterFilterSelect').value : 'All';

  const items = state.menuItems.filter((m) => {
    const matchCat = state.activeCat === 'All' || m.cat === state.activeCat;
    const matchCounter = counterVal === 'All' || m.counter === counterVal;
    const matchQuery = !q || m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q);
    return matchCat && matchCounter && matchQuery;
  });

  // Empty state handling
  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state" style="padding:48px 20px; grid-column:1 / -1; width:100%;">
        <div class="em">🔍</div>
        <strong>No menu items found</strong>
        <div style="font-size:12.5px; color:var(--muted); margin-top:6px; max-width:420px; margin-left:auto; margin-right:auto;">
          ${
            state.menuItems.length === 0
              ? 'Catalog is empty. Inject custom items into <code>DATA_INJECTION_SLOT</code> or load the live demo fixture.'
              : 'Try clearing your category/counter filters or search keyword.'
          }
        </div>
        ${
          state.menuItems.length === 0
            ? '<button class="dev-btn primary" style="margin-top:14px;" onclick="store.loadDemoFixture()">⚡ Load Campus Demo Fixture</button>'
            : ''
        }
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map((it) => {
      const status = getItemStatus(it);
      const isOut = status === 'out';
      const inCart = state.cart[it.id] || 0;

      return `
        <div class="menu-card">
          <div class="menu-emoji">${it.emoji}</div>
          <div class="menu-info">
            <div class="mn">${it.name}</div>
            <div class="mc">${it.cat} &middot; <span style="color:var(--muted);">${it.counter || 'Counter 1'}</span></div>
            <div style="font-size:11px; color:var(--muted); margin-top:2px;">
              Stock: <strong>${it.stock}</strong> &middot; Gauge: 
              <span style="color:${getGaugeColor(status)}; font-weight:700;">${status.toUpperCase()}</span>
            </div>
            <div class="gauge" style="margin:6px 0 8px;">
              <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
            </div>
            <div class="mrow">
              <span class="rec-price mono">₹${it.price}</span>
              <div style="display:flex; align-items:center; gap:8px;">
                ${sbHTML(status)}
                <button class="add-btn" data-add="${it.id}" ${isOut ? 'disabled title="Sold out"' : 'title="Add to Cart"'}>
                  ${inCart > 0 ? inCart : '+'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// Recommendations Section
function renderRecommendations(state) {
  const homeRec = $('#homeRecGrid');
  const foryouRec = $('#foryouGrid');

  const recItems = state.menuItems.filter((m) => m.stock > 0).slice(0, 4);

  const makeCardHTML = (it) => {
    const status = getItemStatus(it);
    return `
      <div class="rec-card">
        <div class="rec-img">${it.emoji}</div>
        <div class="rec-body">
          <div class="rec-name">${it.name}</div>
          <div class="rec-tag">${status === 'low' ? 'Only few remaining' : 'Pairs with your usual'}</div>
          <div class="rec-row">
            <span class="rec-price mono">₹${it.price}</span>
            <button class="add-btn" data-add="${it.id}">+</button>
          </div>
        </div>
      </div>
    `;
  };

  if (homeRec) {
    homeRec.innerHTML = recItems.length
      ? recItems.map(makeCardHTML).join('')
      : '<div class="empty-state" style="grid-column:1 / -1;"><div class="em">✨</div>No recommendation fixtures available.</div>';
  }

  if (foryouRec) {
    foryouRec.innerHTML = state.menuItems.length
      ? state.menuItems.slice(0, 8).map(makeCardHTML).join('')
      : '<div class="empty-state" style="grid-column:1 / -1;"><div class="em">✨</div>Load items to view graph-inspired recommendations.</div>';
  }
}

// Student Cart Page
function renderStudentCart(state) {
  const cartList = $('#cartList');
  const cartSub = $('#cartSub');
  const subtotalEl = $('#sumSubtotal');
  const packingEl = $('#sumPacking');
  const totalEl = $('#sumTotal');
  const checkoutBtn = $('#checkoutBtn');

  const itemEntries = Object.entries(state.cart);
  const totalCount = itemEntries.reduce((a, [_, qty]) => a + qty, 0);

  if (cartSub) cartSub.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;

  if (!cartList) return;

  if (!itemEntries.length) {
    cartList.innerHTML = `
      <div class="empty-state" style="padding:40px 10px;">
        <div class="em">🛒</div>
        <strong>Your cart is empty</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">Add fresh meals and snacks from the live counter.</div>
        <button class="mini-btn" style="margin-top:14px;" data-goto="menu">Browse Live Menu</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (packingEl) packingEl.textContent = '₹0';
    if (totalEl) totalEl.textContent = '₹0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let subtotal = 0;
  cartList.innerHTML = itemEntries
    .map(([id, qty]) => {
      const it = state.menuItems.find((m) => m.id === id);
      if (!it) return '';
      const lineTotal = it.price * qty;
      subtotal += lineTotal;

      return `
        <div class="cart-line">
          <div class="menu-emoji">${it.emoji}</div>
          <div class="stub-info">
            <div class="t">${it.name}</div>
            <div class="s mono">₹${it.price} each &middot; ₹${lineTotal}</div>
          </div>
          <div class="qty-ctrl">
            <button data-dec="${id}">−</button>
            <span>${qty}</span>
            <button data-inc="${id}">+</button>
          </div>
          <button class="remove-x" data-remove="${id}" title="Remove">✕</button>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (packingEl) packingEl.textContent = `₹${packing}`;
  if (totalEl) totalEl.textContent = `₹${total}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

// Student Orders Page & History
function renderOrdersList(state) {
  const homeList = $('#homeOrderList');
  const fullList = $('#ordersFullList');

  const makeRowHTML = (o, isFull = false) => {
    const isDone = o.status === 'Picked up';
    const firstEmoji = o.items && o.items[0] ? '🍽️' : '🧾';
    const summary = o.items ? o.items.map((i) => `${i.qty}× ${i.name}`).join(', ') : 'Campus Meal';

    return `
      <div class="stub-list-item">
        <div class="stub-icon">${firstEmoji}</div>
        <div class="stub-info">
          <div class="t">${summary}</div>
          <div class="s">${o.token} &middot; ${o.counter || 'Counter'} &middot; ${new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div>
          <div class="stub-amt mono">₹${o.total}</div>
          <div class="stub-status ${isDone ? 'done' : 'progress'}">${o.status}</div>
        </div>
        ${
          isFull
            ? `<div class="stub-actions"><button class="mini-btn" data-view-receipt="${o.id}">Receipt</button></div>`
            : ''
        }
      </div>
    `;
  };

  if (homeList) {
    homeList.innerHTML = state.orders.length
      ? state.orders.slice(0, 4).map((o) => makeRowHTML(o, false)).join('')
      : '<div class="empty-state" style="padding:24px 0;"><div class="em">📋</div>No past orders yet.</div>';
  }

  if (fullList) {
    fullList.innerHTML = state.orders.length
      ? state.orders.map((o) => makeRowHTML(o, true)).join('')
      : '<div class="empty-state" style="padding:48px 0;"><div class="em">📋</div>No orders placed yet.<br><button class="mini-btn" style="margin-top:12px;" data-goto="menu">Browse menu</button></div>';
  }
}

// Dynamic Spending Bars (Mon-Sun breakdown calculated from placed orders)
function renderSpendingBars(state) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayTotals = { MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0, SUN: 0 };

  state.orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const dayIndex = (d.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
    const dayName = days[dayIndex];
    if (dayTotals[dayName] !== undefined) {
      dayTotals[dayName] += o.total || 0;
    }
  });

  const totalSpent = Object.values(dayTotals).reduce((a, b) => a + b, 0);
  const maxSpend = Math.max(...Object.values(dayTotals), 1);

  const makeBarsHTML = () => {
    return days
      .map((day) => {
        const val = dayTotals[day];
        const pct = Math.round((val / maxSpend) * 100);
        const isPeak = val > 0 && val === maxSpend;
        return `
          <div class="bar-col ${isPeak ? 'peak' : ''}" title="${day}: ₹${val}">
            <div class="bar" style="height:100%"><span style="height:${pct}%"></span></div>
            <div class="bar-label">${day}</div>
          </div>
        `;
      })
      .join('');
  };

  const homeBars = $('#homeSpendingBars');
  if (homeBars) homeBars.innerHTML = makeBarsHTML();

  const spendingPageBars = $('#spendingPageBars');
  if (spendingPageBars) spendingPageBars.innerHTML = makeBarsHTML();

  const homeAmt = $('#homeSpendTotalAmt');
  const homeLbl = $('#homeSpendTotalLbl');
  if (homeAmt) homeAmt.textContent = `₹${totalSpent}`;
  if (homeLbl) {
    homeLbl.textContent = totalSpent > 0 ? `spent this week across ${state.orders.length} orders` : 'spent this week · No orders placed yet';
  }

  const spAmt = $('#spendingPageTotalAmt');
  const spLbl = $('#spendingPageTotalLbl');
  if (spAmt) spAmt.textContent = `₹${totalSpent}`;
  if (spLbl) {
    spLbl.textContent = totalSpent > 0 ? `total recorded spend across campus counters` : 'total recorded spend · No orders placed yet';
  }
}

// =========================================================================
// 6. SHOPPER MODULE RENDERING
// =========================================================================

function renderShopperStore(state) {
  const grid = $('#shopperGrid');
  const filterRow = $('#shopperFilterRow');
  if (!grid) return;

  const cats = ['All', ...new Set(state.menuItems.map((m) => m.cat))];
  if (filterRow) {
    filterRow.innerHTML = cats
      .map(
        (c) => `<button class="filter-chip ${c === state.activeCat ? 'active' : ''}" data-shopper-cat="${c}">${c}</button>`
      )
      .join('');
  }

  const items = state.menuItems.filter(
    (m) => state.activeCat === 'All' || m.cat === state.activeCat
  );

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state" style="padding:40px; grid-column:1 / -1;">
        <div class="em">🛒</div>
        <strong>No fast-track items available</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">Load campus demo data or add items to catalog.</div>
        <button class="dev-btn primary" style="margin-top:12px;" onclick="store.loadDemoFixture()">Load Sample Data</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map((it) => {
      const status = getItemStatus(it);
      const isOut = status === 'out';
      return `
        <div class="menu-card">
          <div class="menu-emoji">${it.emoji}</div>
          <div class="menu-info">
            <div class="mn">${it.name}</div>
            <div class="mc">${it.cat} &middot; ${it.counter}</div>
            <div class="mrow" style="margin-top:8px;">
              <span class="rec-price mono">₹${it.price}</span>
              <div style="display:flex; align-items:center; gap:8px;">
                ${sbHTML(status)}
                <button class="dev-btn ${isOut ? '' : 'primary'}" data-shopper-add="${it.id}" ${isOut ? 'disabled' : ''}>
                  ${isOut ? 'Sold Out' : '+ Fast Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

function renderShopperCart(state) {
  const list = $('#shopperCartList');
  const subEl = $('#shopperCartSub');
  const sumSub = $('#shopperSumSub');
  const sumPack = $('#shopperSumPack');
  const sumTot = $('#shopperSumTot');
  const btn = $('#shopperCheckoutBtn');

  const entries = Object.entries(state.shopperCart);
  const count = entries.reduce((a, [_, q]) => a + q, 0);

  if (subEl) subEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  if (!list) return;

  if (!entries.length) {
    list.innerHTML = `
      <div class="empty-state" style="padding:30px;">
        <div class="em">⚡</div>
        <strong>Express Cart is Empty</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">Tap "+ Fast Add" on any item in the store.</div>
      </div>
    `;
    if (sumSub) sumSub.textContent = '₹0';
    if (sumPack) sumPack.textContent = '₹0';
    if (sumTot) sumTot.textContent = '₹0';
    if (btn) btn.disabled = true;
    return;
  }

  let subtotal = 0;
  list.innerHTML = entries
    .map(([id, qty]) => {
      const it = state.menuItems.find((m) => m.id === id);
      if (!it) return '';
      const lineTotal = it.price * qty;
      subtotal += lineTotal;
      return `
        <div class="cart-line">
          <div class="menu-emoji">${it.emoji}</div>
          <div class="stub-info">
            <div class="t">${it.name}</div>
            <div class="s mono">₹${it.price} each</div>
          </div>
          <div class="qty-ctrl">
            <button data-shopper-dec="${id}">−</button>
            <span>${qty}</span>
            <button data-shopper-inc="${id}">+</button>
          </div>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;
  if (sumSub) sumSub.textContent = `₹${subtotal}`;
  if (sumPack) sumPack.textContent = `₹${packing}`;
  if (sumTot) sumTot.textContent = `₹${total}`;
  if (btn) btn.disabled = false;
}

function renderShopperReceipts(state) {
  const list = $('#shopperReceiptsList');
  if (!list) return;

  const shopperOrders = state.orders.filter((o) => o.role === 'Shopper');
  if (!shopperOrders.length) {
    list.innerHTML = `
      <div class="empty-state" style="padding:40px;">
        <div class="em">🧾</div>
        <strong>No express receipts found</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">Completed fast-track orders will display here.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = shopperOrders
    .map((o) => `
      <div class="stub-list-item">
        <div class="stub-icon">🎟️</div>
        <div class="stub-info">
          <div class="t">${o.token} &middot; ${o.customerName}</div>
          <div class="s">${o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}</div>
        </div>
        <div>
          <div class="stub-amt mono">₹${o.total}</div>
          <div class="stub-status ${o.status === 'Picked up' ? 'done' : 'progress'}">${o.status}</div>
        </div>
        <div class="stub-actions">
          <button class="mini-btn" data-view-receipt="${o.id}">View Receipt</button>
        </div>
      </div>
    `)
    .join('');
}

// =========================================================================
// 7. KITCHEN & STAFF MODULE RENDERING
// =========================================================================

// Live Kanban Ticket Board
function renderKitchenKanban(state) {
  const lists = {
    0: $('#kanbanListPlaced'),
    1: $('#kanbanListPreparing'),
    2: $('#kanbanListReady'),
    3: $('#kanbanListPicked')
  };

  const countPlaced = $('#countPlaced');
  const countPreparing = $('#countPreparing');
  const countReady = $('#countReady');
  const countPicked = $('#countPicked');

  const counterFilter = $('#kitchenCounterSelect') ? $('#kitchenCounterSelect').value : 'All';

  const filteredOrders = state.orders.filter(
    (o) => counterFilter === 'All' || o.counter === counterFilter
  );

  const colOrders = { 0: [], 1: [], 2: [], 3: [] };
  filteredOrders.forEach((o) => {
    const stage = o.stageIndex !== undefined ? o.stageIndex : 0;
    if (colOrders[stage]) colOrders[stage].push(o);
  });

  if (countPlaced) countPlaced.textContent = colOrders[0].length;
  if (countPreparing) countPreparing.textContent = colOrders[1].length;
  if (countReady) countReady.textContent = colOrders[2].length;
  if (countPicked) countPicked.textContent = colOrders[3].length;

  Object.entries(lists).forEach(([stageIdx, listEl]) => {
    if (!listEl) return;
    const items = colOrders[stageIdx];
    const sIndex = Number(stageIdx);

    if (!items.length) {
      listEl.innerHTML = `
        <div style="padding:30px 10px; text-align:center; color:var(--muted); font-size:11.5px;">
          No tickets in this stage
        </div>
      `;
      return;
    }

    listEl.innerHTML = items
      .map((o) => {
        const timeStr = new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const itemsList = o.items
          .map(
            (i) => `
              <div class="kanban-item-line">
                <span><strong>${i.qty}×</strong> ${i.name}</span>
                <span class="mono">₹${i.price * i.qty}</span>
              </div>
            `
          )
          .join('');

        const nextStageName = stages[sIndex + 1];
        const isCompleted = sIndex >= stages.length - 1;

        return `
          <div class="kanban-card">
            <div class="kanban-card-header">
              <span class="kanban-token">${o.token}</span>
              <span class="kanban-time">${timeStr}</span>
            </div>
            <div class="kanban-cust">👤 ${o.customerName} &middot; <span style="font-weight:400; color:var(--muted);">${o.counter}</span></div>
            <div class="kanban-items">${itemsList}</div>
            <div class="kanban-card-footer">
              <span class="kanban-total">₹${o.total}</span>
              <button class="kanban-advance-btn" data-kitchen-advance="${o.id}" ${isCompleted ? 'disabled' : ''}>
                ${isCompleted ? 'Picked up ✓' : `Mark "${nextStageName}" →`}
              </button>
            </div>
          </div>
        `;
      })
      .join('');
  });
}

// Kitchen Real-Time Stock Adjuster Table
function renderKitchenStock(state) {
  const tbody = $('#kitchenStockTbody');
  if (!tbody) return;

  if (!state.menuItems.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:32px; color:var(--muted);">
          No items registered in catalog. Click 
          <button class="dev-btn primary" style="margin-left:6px;" onclick="store.loadDemoFixture()">Load Sample Data</button>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.menuItems
    .map((it) => {
      const status = getItemStatus(it);
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:20px;">${it.emoji}</span>
              <div>
                <strong>${it.name}</strong>
                <div style="font-size:11px; color:var(--muted);">${it.cat} &middot; ₹${it.price}</div>
              </div>
            </div>
          </td>
          <td style="font-size:12px;">${it.counter}</td>
          <td>${sbHTML(status)}</td>
          <td style="width:120px;">
            <div class="gauge">
              <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
            </div>
          </td>
          <td class="mono" style="font-weight:700;">${it.stock}</td>
          <td>
            <div class="inline-stock-ctrl">
              <button data-stock-dec="${it.id}" title="Decrease stock">−</button>
              <span>${it.stock}</span>
              <button data-stock-inc="${it.id}" title="Increase stock">+</button>
            </div>
          </td>
          <td>
            <div class="table-actions">
              <button class="dev-btn" data-stock-zero="${it.id}" title="Mark zero">Mark 0</button>
              <button class="dev-btn primary" data-stock-ten="${it.id}" title="Add 10">+10</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

// Counter POS / Rapid Billing Register
function renderKitchenPos(state) {
  const grid = $('#posMenuGrid');
  const lines = $('#posCartLines');
  const subEl = $('#posSubtotal');
  const packEl = $('#posPacking');
  const totEl = $('#posTotal');
  const submitBtn = $('#posSubmitBtn');

  if (grid) {
    const searchVal = $('#posSearchInput') ? $('#posSearchInput').value.trim().toLowerCase() : '';
    const filtered = state.menuItems.filter(
      (m) => !searchVal || m.name.toLowerCase().includes(searchVal) || m.cat.toLowerCase().includes(searchVal)
    );

    grid.innerHTML = filtered.length
      ? filtered
          .map((it) => {
            const isOut = it.stock <= 0;
            return `
              <button class="pos-item-btn" data-pos-add="${it.id}" ${isOut ? 'disabled' : ''}>
                <span class="pos-item-emoji">${it.emoji}</span>
                <span class="pos-item-name">${it.name}</span>
                <span class="pos-item-price">₹${it.price} (${it.stock} left)</span>
              </button>
            `;
          })
          .join('')
      : '<div style="grid-column:1 / -1; padding:20px; color:var(--muted); text-align:center;">No items match POS search.</div>';
  }

  if (lines) {
    const entries = Object.entries(state.posCart);
    if (!entries.length) {
      lines.innerHTML = '<div style="padding:16px 0; text-align:center; color:var(--muted); font-size:12px;">Register bill empty. Tap items to add.</div>';
      if (subEl) subEl.textContent = '₹0';
      if (packEl) packEl.textContent = '₹0';
      if (totEl) totEl.textContent = '₹0';
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    lines.innerHTML = entries
      .map(([id, qty]) => {
        const it = state.menuItems.find((m) => m.id === id);
        if (!it) return '';
        const lineTotal = it.price * qty;
        subtotal += lineTotal;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:4px 0; font-size:12.5px;">
            <div>
              <strong>${it.name}</strong>
              <div style="font-size:10.5px; color:var(--muted);">₹${it.price} × ${qty}</div>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="mono" style="font-weight:700;">₹${lineTotal}</span>
              <div class="inline-stock-ctrl">
                <button data-pos-dec="${id}">−</button>
                <span>${qty}</span>
                <button data-pos-inc="${id}">+</button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    const packing = entries.length ? 10 : 0;
    const total = subtotal + packing;
    if (subEl) subEl.textContent = `₹${subtotal}`;
    if (packEl) packEl.textContent = `₹${packing}`;
    if (totEl) totEl.textContent = `₹${total}`;
    if (submitBtn) submitBtn.disabled = false;
  }
}

// Kitchen Incoming Complaint Feed
function renderKitchenFeedback(state) {
  const feed = $('#kitchenFeedbackList');
  if (!feed) return;

  if (!state.feedbacks.length) {
    feed.innerHTML = `
      <div class="empty-state" style="padding:40px;">
        <div class="em">💬</div>
        <strong>No complaints or feedback logged</strong>
        <div style="font-size:12px; color:var(--muted); margin-top:4px;">Incoming student ratings will stream here in real time.</div>
      </div>
    `;
    return;
  }

  feed.innerHTML = state.feedbacks
    .map((fb) => `
      <div class="stub-list-item">
        <div class="stub-icon">⭐</div>
        <div class="stub-info">
          <div class="t">
            <strong>${fb.studentName}</strong> &middot; 
            <span style="color:var(--accent); font-weight:700;">${'★'.repeat(fb.rating)}</span> 
            <span class="dev-fixture-badge" style="margin-left:6px;">${fb.category}</span>
          </div>
          <div class="s" style="margin-top:3px; font-size:12px; color:var(--ink);">${fb.comment}</div>
        </div>
        <div class="mono" style="font-size:11px; color:var(--muted); white-space:nowrap;">${fb.date}</div>
      </div>
    `)
    .join('');
}

// =========================================================================
// 8. ADMIN / MANAGEMENT MODULE RENDERING
// =========================================================================

function renderAdminOverview(state) {
  // Metric 1: Total Revenue
  const rev = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const revEl = $('#metricTotalRevenue');
  const revSub = $('#metricTotalRevenueSub');
  if (revEl) revEl.textContent = `₹${rev}`;
  if (revSub) revSub.textContent = `Across ${state.orders.length} total orders`;

  // Metric 2: Total Order Volume
  const volEl = $('#metricOrderVolume');
  const volSub = $('#metricOrderVolumeSub');
  if (volEl) volEl.textContent = state.orders.length;
  if (volSub) volSub.textContent = `${state.orders.filter((o) => o.status === 'Picked up').length} completed`;

  // Metric 3: Critical Low Stock Count
  const lowCount = state.menuItems.filter((m) => m.stock <= (m.lowThreshold || 5)).length;
  const lowEl = $('#metricLowStockCount');
  const lowSub = $('#metricLowStockSub');
  if (lowEl) lowEl.textContent = lowCount;
  if (lowSub) lowSub.textContent = `${state.menuItems.filter((m) => m.stock === 0).length} out of stock`;

  // Metric 4: Active In-Flight Orders
  const inFlight = state.orders.filter((o) => o.status === 'Placed' || o.status === 'Preparing').length;
  const infEl = $('#metricActiveOrders');
  const infSub = $('#metricActiveOrdersSub');
  if (infEl) infEl.textContent = inFlight;
  if (infSub) infSub.textContent = 'Active in kitchen queue';

  // Demand Matrix: Peak Order Hours Distribution
  const hours = [
    { label: '8-10', name: 'Breakfast', count: 0 },
    { label: '10-12', name: 'Brunch', count: 0 },
    { label: '12-14', name: 'Lunch Rush', count: 0 },
    { label: '14-16', name: 'Afternoon', count: 0 },
    { label: '16-18', name: 'Tea & Snacks', count: 0 },
    { label: '18-21', name: 'Dinner', count: 0 }
  ];

  // Map orders to time slot
  state.orders.forEach((o) => {
    const hr = new Date(o.createdAt).getHours();
    if (hr >= 8 && hr < 10) hours[0].count++;
    else if (hr >= 10 && hr < 12) hours[1].count++;
    else if (hr >= 12 && hr < 14) hours[2].count++;
    else if (hr >= 14 && hr < 16) hours[3].count++;
    else if (hr >= 16 && hr < 18) hours[4].count++;
    else if (hr >= 18 && hr <= 21) hours[5].count++;
    else hours[2].count++; // Default to lunch rush for demo items
  });

  const maxHour = Math.max(...hours.map((h) => h.count), 1);
  const barsEl = $('#adminPeakBars');
  if (barsEl) {
    barsEl.innerHTML = hours
      .map((h) => {
        const pct = Math.round((h.count / maxHour) * 100);
        const isPeak = h.count > 0 && h.count === maxHour;
        return `
          <div class="bar-col ${isPeak ? 'peak' : ''}" title="${h.name}: ${h.count} orders">
            <div class="bar" style="height:100%"><span style="height:${pct}%"></span></div>
            <div class="bar-label">${h.label}</div>
          </div>
        `;
      })
      .join('');
  }

  // Top Re-Order Velocity Ranking
  const velocityEl = $('#adminVelocityList');
  if (velocityEl) {
    const salesMap = {};
    state.orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        salesMap[it.name] = (salesMap[it.name] || 0) + it.qty;
      });
    });

    const sortedVelocity = Object.entries(salesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    if (!sortedVelocity.length) {
      velocityEl.innerHTML = '<div style="padding:20px; color:var(--muted); text-align:center; font-size:12px;">No order velocity recorded yet.</div>';
    } else {
      const topQty = sortedVelocity[0][1];
      velocityEl.innerHTML = sortedVelocity
        .map(([name, qty]) => {
          const pct = Math.round((qty / topQty) * 100);
          return `
            <div class="velocity-bar-row">
              <span class="velocity-label">${name}</span>
              <div class="velocity-track">
                <div class="velocity-fill" style="width:${pct}%;"></div>
              </div>
              <span class="velocity-stat mono">${qty} orders</span>
            </div>
          `;
        })
        .join('');
    }
  }
}

// Admin Audit Table & CSV Export
function renderAdminAudit(state) {
  const tbody = $('#adminAuditTbody');
  if (!tbody) return;

  if (!state.menuItems.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:32px; color:var(--muted);">
          Catalog is empty. 
          <button class="dev-btn primary" style="margin-left:6px;" onclick="store.loadDemoFixture()">Load Sample Data</button>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = state.menuItems
    .map((it) => {
      const status = getItemStatus(it);
      const isCritical = it.stock <= (it.lowThreshold || 5);
      return `
        <tr>
          <td>
            <strong>${it.name}</strong>
            <div class="mono" style="font-size:10.5px; color:var(--muted);">${it.id}</div>
          </td>
          <td>${it.cat}</td>
          <td>${it.counter}</td>
          <td class="mono" style="font-weight:700;">${it.stock}</td>
          <td class="mono">${it.lowThreshold || 5}</td>
          <td>${sbHTML(status)}</td>
          <td>
            <span style="color:${isCritical ? 'var(--alert)' : 'var(--fresh)'}; font-weight:600; font-size:12px;">
              ${isCritical ? '⚠️ Urgent Restock' : '✓ Normal'}
            </span>
          </td>
          <td>
            <button class="dev-btn primary" data-admin-restock="${it.id}">+20 Units</button>
          </td>
        </tr>
      `;
    })
    .join('');
}

function exportAuditCsv(state) {
  if (!state.menuItems.length) {
    toast('No inventory items to export.');
    return;
  }

  const headers = ['Item ID', 'Item Name', 'Category', 'Counter', 'Price (INR)', 'Current Stock', 'Low Threshold', 'Status', 'Restock Time'];
  const rows = state.menuItems.map((it) => [
    `"${it.id}"`,
    `"${it.name.replace(/"/g, '""')}"`,
    `"${it.cat}"`,
    `"${it.counter}"`,
    it.price,
    it.stock,
    it.lowThreshold || 5,
    `"${getItemStatus(it).toUpperCase()}"`,
    `"${it.restockTime || '15 min'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `inventrack_audit_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Audit CSV exported successfully!');
}

// =========================================================================
// 9. DIGITAL RECEIPT MODAL
// =========================================================================

function showReceiptModal(order) {
  const modal = $('#receiptModal');
  if (!modal || !order) return;

  $('#modalTokenNum').textContent = order.token;
  $('#modalCounterName').textContent = order.counter || 'Campus Dining Counter';
  $('#modalTotalPaid').textContent = `₹${order.total}`;
  $('#modalReceiptStatus').textContent = order.status;

  const lines = $('#modalReceiptLines');
  if (lines) {
    lines.innerHTML = (order.items || [])
      .map(
        (it) => `
          <div class="receipt-row">
            <span>${it.qty}× ${it.name}</span>
            <span class="mono">₹${it.price * it.qty}</span>
          </div>
        `
      )
      .join('') +
      `
        <div class="receipt-row" style="color:var(--muted); font-size:11.5px;">
          <span>Packaging Fee</span>
          <span class="mono">₹${order.packing || 10}</span>
        </div>
      `;
  }

  modal.classList.remove('hide');
}

function hideReceiptModal() {
  const modal = $('#receiptModal');
  if (modal) modal.classList.add('hide');
}

// =========================================================================
// 10. COMPREHENSIVE EVENT DELEGATION & LISTENERS
// =========================================================================

function setupEventHandlers() {
  // 1. Role Switcher
  const roleSwitcher = $('#roleSwitcher');
  if (roleSwitcher) {
    roleSwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.role-btn[data-role]');
      if (!btn) return;
      const newRole = btn.dataset.role;
      store.setRole(newRole);
      toast(`Switched to ${roleLabels[newRole]}`);
    });
  }

  // 2. Navigation item click
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.nav-item[data-page]');
    if (navBtn) {
      const pageKey = navBtn.dataset.page;
      store.setPage(pageKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const gotoBtn = e.target.closest('[data-goto]');
    if (gotoBtn) {
      const pageKey = gotoBtn.dataset.goto;
      store.setPage(pageKey);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  });

  // 3. Theme toggle (Front of House vs Back of House)
  const themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-mode]');
      if (!btn) return;
      if (btn.dataset.mode === 'kitchen') {
        document.body.setAttribute('data-theme', 'kitchen');
      } else {
        document.body.removeAttribute('data-theme');
      }
      $$('#themeToggle button[data-mode]').forEach((b) => b.classList.toggle('on', b === btn));
    });
  }

  // 4. Notification Drawer Toggle
  const bellBtn = $('#bellBtn');
  if (bellBtn) {
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      $('#notifPanel').classList.toggle('open');
      $('#bellDot').classList.add('hide');
    });
  }
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#bellBtn')) {
      const notif = $('#notifPanel');
      if (notif) notif.classList.remove('open');
    }
  });

  // 5. Global Search Input
  const searchInput = $('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (store.state.activeRole === 'student') {
        store.setPage('menu');
        renderStudentMenu(store.state, e.target.value);
      }
    });
  }

  // 6. Category & Counter Filters
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip[data-cat]');
    if (chip) {
      store.state.activeCat = chip.dataset.cat;
      const searchVal = $('#searchInput') ? $('#searchInput').value : '';
      renderStudentMenu(store.state, searchVal);
      return;
    }

    const shopperChip = e.target.closest('.filter-chip[data-shopper-cat]');
    if (shopperChip) {
      store.state.activeCat = shopperChip.dataset.shopperCat;
      renderShopperStore(store.state);
      return;
    }
  });

  const counterSelect = $('#counterFilterSelect');
  if (counterSelect) {
    counterSelect.addEventListener('change', () => {
      const searchVal = $('#searchInput') ? $('#searchInput').value : '';
      renderStudentMenu(store.state, searchVal);
    });
  }

  const kitchenCounterSelect = $('#kitchenCounterSelect');
  if (kitchenCounterSelect) {
    kitchenCounterSelect.addEventListener('change', () => {
      renderKitchenKanban(store.state);
    });
  }

  // 7. Student Cart & Add Buttons
  document.addEventListener('click', (e) => {
    // Add to cart
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      store.addToCart(addBtn.dataset.add);
      return;
    }

    // Increment
    const incBtn = e.target.closest('[data-inc]');
    if (incBtn) {
      store.changeCartQty(incBtn.dataset.inc, 1);
      return;
    }

    // Decrement
    const decBtn = e.target.closest('[data-dec]');
    if (decBtn) {
      store.changeCartQty(decBtn.dataset.dec, -1);
      return;
    }

    // Remove
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      store.removeCartItem(removeBtn.dataset.remove);
      return;
    }
  });

  // 8. Payment Selector in Checkout
  const paymentGrid = $('#paymentOptions');
  if (paymentGrid) {
    paymentGrid.addEventListener('click', (e) => {
      const chip = e.target.closest('.payment-chip');
      if (!chip) return;
      $$('.payment-chip').forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      store.state.selectedPaymentMethod = chip.dataset.method;
    });
  }

  // 9. Student Checkout Order Placement
  const checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const counter = $('#checkoutCounterSelect') ? $('#checkoutCounterSelect').value : 'Counter 2 (Quick Bites)';
      const paymentMethod = store.state.selectedPaymentMethod || 'Campus UPI';
      const order = store.createOrder({
        itemsMap: store.state.cart,
        customerName: store.state.currentUser ? store.state.currentUser.name : 'Student Diner',
        role: 'Student',
        counter,
        paymentMethod
      });

      if (order) {
        store.state.cart = {};
        store.save();
        toast(`Order ${order.token} placed successfully!`);
        showReceiptModal(order);
        store.setPage('home');
      }
    });
  }

  // 10. Student Advance Order Stepper
  const advanceBtn = $('#advanceBtn');
  if (advanceBtn) {
    advanceBtn.addEventListener('click', () => {
      const orderId = advanceBtn.dataset.orderId;
      if (orderId) store.advanceOrderStatus(orderId);
    });
  }

  // 11. Shopper Fast Add & Cart
  document.addEventListener('click', (e) => {
    const shopperAdd = e.target.closest('[data-shopper-add]');
    if (shopperAdd) {
      store.addToShopperCart(shopperAdd.dataset.shopperAdd);
      return;
    }

    const sInc = e.target.closest('[data-shopper-inc]');
    if (sInc) {
      store.changeShopperCartQty(sInc.dataset.shopperInc, 1);
      return;
    }

    const sDec = e.target.closest('[data-shopper-dec]');
    if (sDec) {
      store.changeShopperCartQty(sDec.dataset.shopperDec, -1);
      return;
    }
  });

  const shopperCheckoutBtn = $('#shopperCheckoutBtn');
  if (shopperCheckoutBtn) {
    shopperCheckoutBtn.addEventListener('click', () => {
      const custName = $('#shopperCustName') && $('#shopperCustName').value.trim() ? $('#shopperCustName').value.trim() : 'Express Shopper';
      const order = store.createOrder({
        itemsMap: store.state.shopperCart,
        customerName: custName,
        role: 'Shopper',
        counter: 'Counter 2 (Quick Bites)',
        paymentMethod: 'Instant Express'
      });

      if (order) {
        store.state.shopperCart = {};
        store.save();
        toast(`Express Token ${order.token} issued!`);
        showReceiptModal(order);
        store.setPage('shopper-receipts');
      }
    });
  }

  // 12. Kitchen Kanban Advance
  document.addEventListener('click', (e) => {
    const kAdvance = e.target.closest('[data-kitchen-advance]');
    if (kAdvance) {
      store.advanceOrderStatus(kAdvance.dataset.kitchenAdvance);
      return;
    }
  });

  // 13. Kitchen Stock Adjuster Controls
  document.addEventListener('click', (e) => {
    const stockInc = e.target.closest('[data-stock-inc]');
    if (stockInc) {
      store.adjustStock(stockInc.dataset.stockInc, 1);
      return;
    }

    const stockDec = e.target.closest('[data-stock-dec]');
    if (stockDec) {
      store.adjustStock(stockDec.dataset.stockDec, -1);
      return;
    }

    const stockZero = e.target.closest('[data-stock-zero]');
    if (stockZero) {
      store.setStockZero(stockZero.dataset.stockZero);
      return;
    }

    const stockTen = e.target.closest('[data-stock-ten]');
    if (stockTen) {
      store.adjustStock(stockTen.dataset.stockTen, 10);
      return;
    }

    const adminRestock = e.target.closest('[data-admin-restock]');
    if (adminRestock) {
      store.adjustStock(adminRestock.dataset.adminRestock, 20);
      return;
    }
  });

  // 14. Counter POS Billing Interactions
  document.addEventListener('click', (e) => {
    const posAdd = e.target.closest('[data-pos-add]');
    if (posAdd) {
      store.addToPosCart(posAdd.dataset.posAdd);
      return;
    }

    const posInc = e.target.closest('[data-pos-inc]');
    if (posInc) {
      store.changePosCartQty(posInc.dataset.posInc, 1);
      return;
    }

    const posDec = e.target.closest('[data-pos-dec]');
    if (posDec) {
      store.changePosCartQty(posDec.dataset.posDec, -1);
      return;
    }
  });

  const posSearchInput = $('#posSearchInput');
  if (posSearchInput) {
    posSearchInput.addEventListener('input', () => {
      renderKitchenPos(store.state);
    });
  }

  const posSubmitBtn = $('#posSubmitBtn');
  if (posSubmitBtn) {
    posSubmitBtn.addEventListener('click', () => {
      const custName = $('#posCustName') && $('#posCustName').value.trim() ? $('#posCustName').value.trim() : 'Walk-in Student';
      const counter = $('#posCounterSelect') ? $('#posCounterSelect').value : 'Counter 2 (Quick Bites)';
      const paymentMethod = $('#posPaymentSelect') ? $('#posPaymentSelect').value : 'Cash';

      const order = store.createOrder({
        itemsMap: store.state.posCart,
        customerName: custName,
        role: 'Counter POS',
        counter,
        paymentMethod
      });

      if (order) {
        store.clearPosCart();
        toast(`POS Token ${order.token} printed!`);
        showReceiptModal(order);
      }
    });
  }

  // 15. View Receipt Modal Trigger
  document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-view-receipt]');
    if (viewBtn) {
      const order = store.state.orders.find((o) => o.id === viewBtn.dataset.viewReceipt);
      if (order) showReceiptModal(order);
    }
  });

  const modalCloseBtn = $('#modalCloseBtn');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideReceiptModal);

  const modalPrintBtn = $('#modalPrintBtn');
  if (modalPrintBtn) modalPrintBtn.addEventListener('click', () => window.print());

  const modalBackdrop = $('#receiptModal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) hideReceiptModal();
    });
  }

  // 16. Dev Fixture Controls
  const loadFixtureBtn = $('#loadFixtureBtn');
  if (loadFixtureBtn) {
    loadFixtureBtn.addEventListener('click', () => {
      store.loadDemoFixture();
      toast('⚡ Campus demo fixture loaded successfully!');
    });
  }

  const resetDataBtn = $('#resetDataBtn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      store.resetToEmptyState();
      toast('🗑️ State reset to empty schema []');
    });
  }

  // 17. Add Item Modal / Page Form
  const openItemBtn = $('#openAddItemModalBtn');
  if (openItemBtn) {
    openItemBtn.addEventListener('click', () => {
      store.setRole('admin');
      store.setPage('admin-items');
    });
  }

  const openItemBtnStock = $('#openAddItemModalBtnStock');
  if (openItemBtnStock) {
    openItemBtnStock.addEventListener('click', () => {
      store.setRole('admin');
      store.setPage('admin-items');
    });
  }

  const openItemBtnAdmin = $('#openAddItemModalBtnAdmin');
  if (openItemBtnAdmin) {
    openItemBtnAdmin.addEventListener('click', () => {
      store.setPage('admin-items');
    });
  }

  const itemFormSubmit = $('#itemFormSubmit');
  if (itemFormSubmit) {
    itemFormSubmit.addEventListener('click', () => {
      const name = $('#itemFormName').value.trim();
      const emoji = $('#itemFormEmoji').value.trim() || '🍽️';
      const cat = $('#itemFormCat').value;
      const counter = $('#itemFormCounter').value;
      const price = $('#itemFormPrice').value;
      const stock = $('#itemFormStock').value;
      const lowThreshold = $('#itemFormThreshold').value;
      const restockTime = $('#itemFormRestock').value.trim() || '15 min';

      if (!name || !price) {
        toast('Please enter item name and price');
        return;
      }

      store.addMenuItem({ name, emoji, cat, counter, price, stock, lowThreshold, restockTime });
      $('#itemFormName').value = '';
      $('#itemFormPrice').value = '';
      store.setPage('admin-audit');
    });
  }

  // 18. Export Audit CSV
  const exportCsvBtn = $('#exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => exportAuditCsv(store.state));
  }

  // 19. Feedback Submission
  let selectedStars = 0;
  let selectedFeedbackCat = 'Food Quality';

  const starRow = $('#starRow');
  if (starRow) {
    starRow.addEventListener('click', (e) => {
      const star = e.target.closest('.star');
      if (!star) return;
      selectedStars = parseInt(star.dataset.v, 10);
      $$('#starRow .star').forEach((s) => {
        s.classList.toggle('on', parseInt(s.dataset.v, 10) <= selectedStars);
      });
    });
  }

  const fbCatRow = $('#feedbackCategoryRow');
  if (fbCatRow) {
    fbCatRow.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      $$('#feedbackCategoryRow .filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      selectedFeedbackCat = chip.dataset.cat;
    });
  }

  const submitFb = $('#submitFeedback');
  if (submitFb) {
    submitFb.addEventListener('click', () => {
      if (!selectedStars) {
        toast('Please pick a star rating first');
        return;
      }
      const comment = $('#feedbackText') ? $('#feedbackText').value.trim() : '';
      store.addFeedback({ rating: selectedStars, category: selectedFeedbackCat, comment });
      if ($('#feedbackText')) $('#feedbackText').value = '';
      selectedStars = 0;
      $$('#starRow .star').forEach((s) => s.classList.remove('on'));
    });
  }

  // 20. Student Authentication
  $$('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.auth-tab').forEach((t) => t.classList.toggle('active', t === tab));
      const isLogin = tab.dataset.tab === 'login';
      $('#loginForm').style.display = isLogin ? 'block' : 'none';
      $('#signupForm').style.display = isLogin ? 'none' : 'block';
    });
  });

  const loginSubmit = $('#loginSubmit');
  if (loginSubmit) {
    loginSubmit.addEventListener('click', () => {
      const studentId = $('#loginStudentId').value.trim();
      const phone = $('#loginPhone').value.trim();
      if (!studentId || !phone) {
        $('#loginError').classList.add('show');
        return;
      }
      $('#loginError').classList.remove('show');
      store.state.currentUser = {
        name: 'Student Diner',
        year: '2nd year',
        rollNo: studentId,
        studentId: studentId,
        phone: phone,
        balance: 450
      };
      store.state.loggedIn = true;
      store.save();
      toast(`Welcome back, ${store.state.currentUser.name}!`);
      store.setPage('home');
    });
  }

  const signupSubmit = $('#signupSubmit');
  if (signupSubmit) {
    signupSubmit.addEventListener('click', () => {
      const name = $('#suName').value.trim();
      const roll = $('#suRoll').value.trim();
      const year = $('#suYear').value;
      const studentId = $('#suStudentId').value.trim();
      const phone = $('#suPhone').value.trim();
      if (!name || !roll || !studentId || !phone) {
        $('#signupError').classList.add('show');
        return;
      }
      $('#signupError').classList.remove('show');
      store.state.currentUser = { name, year, rollNo: roll, studentId, phone, balance: 450 };
      store.state.loggedIn = true;
      store.save();
      toast(`Account created! Welcome, ${name.split(' ')[0]}.`);
      store.setPage('home');
    });
  }

  const logoutNavBtn = $('#logoutNavBtn');
  if (logoutNavBtn) {
    logoutNavBtn.addEventListener('click', () => {
      store.state.loggedIn = false;
      store.state.currentUser = null;
      store.save();
      toast('Logged out');
      store.setPage('settings');
    });
  }

  const logoutSettingsBtn = $('#logoutSettingsBtn');
  if (logoutSettingsBtn) {
    logoutSettingsBtn.addEventListener('click', () => {
      store.state.loggedIn = false;
      store.state.currentUser = null;
      store.save();
      toast('Logged out');
      store.setPage('settings');
    });
  }
}

// =========================================================================
// 11. CENTRAL RENDER DISPATCHER
// =========================================================================

function renderApp(state) {
  renderShell(state);

  // Render role-specific and shared components
  renderStudentTicket(state);
  renderCounterStrip(state);
  renderStudentMenu(state);
  renderRecommendations(state);
  renderStudentCart(state);
  renderOrdersList(state);
  renderSpendingBars(state);

  renderShopperStore(state);
  renderShopperCart(state);
  renderShopperReceipts(state);

  renderKitchenKanban(state);
  renderKitchenStock(state);
  renderKitchenPos(state);
  renderKitchenFeedback(state);

  renderAdminOverview(state);
  renderAdminAudit(state);
}

// Subscribe renderer to reactive store
store.subscribe((state) => {
  renderApp(state);
});

// Setup event delegation and perform initial render
setupEventHandlers();
renderApp(store.state);
