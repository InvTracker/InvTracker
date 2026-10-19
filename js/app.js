/**
 * InvenTrack — Student Dashboard Application
 * Core client-side logic for menu, cart, orders, and authentication
 */

// ==========================================
// 1. DATA MODELS & INITIAL STATE (RESET)
// ==========================================

const menuItems = [
  { id: 'biryani', name: 'Chicken Biryani', emoji: '\u{1F372}', price: 185, cat: 'Mains', stock: 25, status: 'available' },
  { id: 'vegbiryani', name: 'Veg Biryani', emoji: '\u{1F35A}', price: 150, cat: 'Mains', stock: 20, status: 'available' },
  { id: 'dosa', name: 'Masala Dosa', emoji: '\u{1FAD3}', price: 90, cat: 'Mains', stock: 20, status: 'available' },
  { id: 'burger', name: 'Burger', emoji: '\u{1F354}', price: 70, cat: 'Snacks', stock: 20, status: 'available' },
  { id: 'sandwich', name: 'Veg Sandwich', emoji: '\u{1F96A}', price: 60, cat: 'Snacks', stock: 25, status: 'available' },
  { id: 'pizza', name: 'Pizza Slice', emoji: '\u{1F355}', price: 120, cat: 'Snacks', stock: 15, status: 'available' },
  { id: 'fries', name: 'Fries', emoji: '\u{1F35F}', price: 55, cat: 'Snacks', stock: 25, status: 'available' },
  { id: 'coldcoffee', name: 'Cold Coffee', emoji: '\u{1F964}', price: 45, cat: 'Beverages', stock: 30, status: 'available' },
  { id: 'buttermilk', name: 'Buttermilk', emoji: '\u{1F95B}', price: 25, cat: 'Beverages', stock: 40, status: 'available' },
  { id: 'coke', name: 'Coke', emoji: '\u{1F9C3}', price: 40, cat: 'Beverages', stock: 30, status: 'available' },
  { id: 'gulabjamun', name: 'Gulab Jamun', emoji: '\u{1F36E}', price: 30, cat: 'Desserts', stock: 20, status: 'available' }
];

const recommended = ['burger', 'coke', 'fries', 'gulabjamun'];
const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];

let cart = {};
let stageIndex = -1; // -1: No active order initially
let feedbackStars = 0;
let activeCat = 'All';

// Clean initial state — beta test orders reset to empty
let orders = [];

let currentUser = null;
let loggedIn = false;

// ==========================================
// 2. DOM UTILITIES & HELPERS
// ==========================================

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

function sbHTML(status) {
  const labels = { available: 'AVAIL', low: 'LOW', out: 'OUT' };
  return `<span class="status-badge ${status}">${labels[status] || status}</span>`;
}

function gc(status) {
  return status === 'available' ? 'var(--fresh)' : status === 'low' ? 'var(--low)' : 'var(--alert)';
}

function gw(item) {
  return Math.max(3, Math.min(100, Math.round((item.stock / 40) * 100)));
}

// ==========================================
// 3. AUTHENTICATION & USER PROFILE
// ==========================================

function renderAccount() {
  if (!loggedIn || !currentUser) {
    $('#sideAvatar').textContent = 'GU';
    $('#sideName').textContent = 'Guest Student';
    $('#sideRole').textContent = 'Log in / Sign up';
    if ($('#accountPanel')) $('#accountPanel').style.display = 'none';
    if ($('#authPanel')) $('#authPanel').style.display = 'block';
    return;
  }

  if ($('#accountPanel')) $('#accountPanel').style.display = 'block';
  if ($('#authPanel')) $('#authPanel').style.display = 'none';

  $('#sideAvatar').textContent = initials(currentUser.name);
  $('#sideName').textContent = currentUser.name;
  $('#sideRole').textContent = `${currentUser.year} · CSE`;

  $('#accName').textContent = currentUser.name;
  $('#accYear').textContent = currentUser.year;
  $('#accRoll').textContent = currentUser.rollNo;
  $('#accStudentId').textContent = currentUser.studentId;
  $('#accPhone').textContent = currentUser.phone;
}

function login() {
  loggedIn = true;
  $('#accountPanel').style.display = 'block';
  $('#authPanel').style.display = 'none';
  renderAccount();
  switchPage('home');
  toast(`Welcome back, ${currentUser.name.split(' ')[0]}!`);
}

function logout() {
  loggedIn = false;
  currentUser = null;
  $('#accountPanel').style.display = 'none';
  $('#authPanel').style.display = 'block';
  if ($('#loginStudentId')) $('#loginStudentId').value = '';
  if ($('#loginPhone')) $('#loginPhone').value = '';
  if ($('#loginError')) $('#loginError').classList.remove('show');
  renderAccount();
  switchPage('settings');
  toast('Logged out');
}

// ==========================================
// 4. MENU & RECOMMENDATIONS
// ==========================================

function renderCounterStrip() {
  const container = $('#counterStrip');
  if (!container) return;

  container.innerHTML = menuItems
    .slice(0, 6)
    .map(
      (it) => `
        <div class="counter-item">
          <div class="counter-meta">
            <span class="counter-name">${it.name}</span>
            ${sbHTML(it.status)}
          </div>
          <div class="stock-count">${it.stock} servings left</div>
          <div class="gauge">
            <span style="width:${gw(it)}%; background:${gc(it.status)}"></span>
          </div>
        </div>
      `
    )
    .join('');
}

function recCardHTML(it) {
  const isOut = it.status === 'out';
  const tag =
    it.status === 'low'
      ? `Only ${it.stock} left today`
      : it.status === 'out'
      ? 'Currently out of stock'
      : 'Pairs with your usual';

  return `
    <div class="rec-card">
      <div class="rec-img">${it.emoji}</div>
      <div class="rec-body">
        <div class="rec-name">${it.name}</div>
        <div class="rec-tag">${tag}</div>
        <div class="rec-row">
          <span class="rec-price mono">₹${it.price}</span>
          <button class="add-btn" data-add="${it.id}" ${isOut ? 'disabled' : ''}>+</button>
        </div>
      </div>
    </div>
  `;
}

function renderRecGrids() {
  const homeRec = $('#homeRecGrid');
  if (homeRec) {
    homeRec.innerHTML = recommended
      .map((id) => recCardHTML(menuItems.find((m) => m.id === id)))
      .join('');
  }

  const forYouGrid = $('#foryouGrid');
  if (forYouGrid) {
    forYouGrid.innerHTML = menuItems
      .filter((m) => m.status !== 'out')
      .map(recCardHTML)
      .join('');
  }
}

function renderFilterRow() {
  const container = $('#filterRow');
  if (!container) return;

  const cats = ['All', ...new Set(menuItems.map((m) => m.cat))];
  container.innerHTML = cats
    .map((c) => `<button class="filter-chip ${c === activeCat ? 'active' : ''}" data-cat="${c}">${c}</button>`)
    .join('');
}

function renderMenuGrid(query = '') {
  const container = $('#menuGrid');
  if (!container) return;

  const q = query.trim().toLowerCase();
  const items = menuItems.filter(
    (m) => (activeCat === 'All' || m.cat === activeCat) && m.name.toLowerCase().includes(q)
  );

  if (!items.length) {
    container.innerHTML = '<div class="empty-state"><div class="em">🔍</div>No items match your search.</div>';
    return;
  }

  container.innerHTML = items
    .map((it) => {
      const isOut = it.status === 'out';
      return `
        <div class="menu-card">
          <div class="menu-emoji">${it.emoji}</div>
          <div class="menu-info">
            <div class="mn">${it.name}</div>
            <div class="mc">${it.cat}</div>
            <div class="mrow">
              <span class="rec-price mono">₹${it.price}</span>
              <div style="display:flex; align-items:center; gap:8px;">
                ${sbHTML(it.status)}
                <button class="add-btn" data-add="${it.id}" ${isOut ? 'disabled' : ''}>+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// ==========================================
// 5. CART & CHECKOUT
// ==========================================

function cartCount() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

function cartTotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);
}

function addToCart(id, btn) {
  const item = menuItems.find((m) => m.id === id);
  if (!item) return;

  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  toast(`Added ${item.name} to cart`);

  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = '+';
    }, 700);
  }
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
  renderCartPage();
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
  renderCartPage();
}

function updateCartUI() {
  const count = cartCount();
  const badge = $('#cartBadge');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('hide', count === 0);
  }

  const quickSub = $('#quickCartSub');
  if (quickSub) {
    quickSub.textContent = count === 0 ? 'Cart is empty' : `${count} item${count > 1 ? 's' : ''} waiting`;
  }

  const checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.disabled = count === 0;
  }
}

function renderCartPage() {
  const ids = Object.keys(cart);
  const count = cartCount();
  const cartSub = $('#cartSub');
  const cartList = $('#cartList');

  if (cartSub) cartSub.textContent = `${count} item${count !== 1 ? 's' : ''}`;

  if (!cartList) return;

  if (!ids.length) {
    cartList.innerHTML = `
      <div class="empty-state">
        <div class="em">🛒</div>
        Your cart is empty.<br>
        <button class="mini-btn" style="margin-top:12px;" data-goto="menu">Browse menu</button>
      </div>
    `;
  } else {
    cartList.innerHTML = ids
      .map((id) => {
        const it = menuItems.find((m) => m.id === id);
        return `
          <div class="cart-line">
            <div class="menu-emoji">${it.emoji}</div>
            <div class="stub-info">
              <div class="t">${it.name}</div>
              <div class="s mono">₹${it.price} each</div>
            </div>
            <div class="qty-ctrl">
              <button data-dec="${id}">−</button>
              <span>${cart[id]}</span>
              <button data-inc="${id}">+</button>
            </div>
            <button class="remove-x" data-remove="${id}">✕</button>
          </div>
        `;
      })
      .join('');
  }

  const sub = cartTotal();
  const packing = ids.length ? 10 : 0;
  const total = sub + packing;

  if ($('#sumSubtotal')) $('#sumSubtotal').textContent = `₹${sub}`;
  if ($('#sumPacking')) $('#sumPacking').textContent = `₹${packing}`;
  if ($('#sumTotal')) $('#sumTotal').textContent = `₹${total}`;
}

function placeOrder() {
  const count = cartCount();
  if (!count) return;

  const total = cartTotal() + 10;
  const names = Object.keys(cart)
    .map((id) => menuItems.find((m) => m.id === id).name)
    .join(' + ');
  const firstItem = menuItems.find((m) => m.id === Object.keys(cart)[0]);
  const emoji = firstItem ? firstItem.emoji : '🍽️';

  orders.forEach((o) => {
    if (o.live) {
      o.live = false;
      o.status = 'Delivered';
    }
  });

  orders.unshift({
    icon: emoji,
    title: names,
    when: 'Just now',
    amt: total,
    status: 'In progress',
    live: true
  });

  stageIndex = 0;
  $('#ticketTitle').textContent = names;
  $('#ticketDesc').textContent = 'Placed just now · Counter 2';
  $('#ticketPaid').textContent = `₹${total}`;
  const newToken = `#A-0${43 + Math.floor(Math.random() * 9)}`;
  $('#queueNo').textContent = newToken;

  const quickTrackSub = document.querySelector('[data-goto="orders"] .quick-sub');
  if (quickTrackSub) quickTrackSub.textContent = `Token ${newToken}`;

  renderStepper();
  cart = {};
  updateCartUI();
  renderCartPage();
  renderOrderLists();
  toast('Order placed! Track it from Home.');
  switchPage('home');
}

// ==========================================
// 6. ORDER TRACKING & STEPPER
// ==========================================

function renderStepper() {
  $$('#stepper .step').forEach((el, i) => {
    el.classList.remove('done', 'now');
    if (stageIndex >= 0) {
      if (i < stageIndex) el.classList.add('done');
      else if (i === stageIndex) el.classList.add('now');
    }
  });

  const etaList = ['~12 min to ready', '~7 min to ready', 'Ready — head to Counter 2', 'Order complete'];
  const advanceBtn = $('#advanceBtn');

  if (stageIndex < 0) {
    if ($('#etaPill')) $('#etaPill').textContent = 'No active order';
    if ($('#ticketTitle')) $('#ticketTitle').textContent = 'No active order';
    if ($('#ticketDesc')) $('#ticketDesc').textContent = 'Browse the menu and place an order to get a live token';
    if ($('#ticketPaid')) $('#ticketPaid').textContent = '₹0';
    if ($('#queueNo')) $('#queueNo').textContent = '#---';
    if (advanceBtn) {
      advanceBtn.disabled = true;
      advanceBtn.textContent = 'No active order';
    }
    return;
  }

  if ($('#etaPill')) $('#etaPill').textContent = etaList[stageIndex];

  const done = stageIndex >= stages.length - 1;
  if (advanceBtn) {
    advanceBtn.disabled = done;
    advanceBtn.textContent = done ? 'Picked up ✓' : `Mark "${stages[stageIndex + 1]}" →`;
  }

  if (orders[0] && orders[0].live) {
    orders[0].status = stageIndex >= 3 ? 'Delivered' : 'In progress';
    if (stageIndex >= 3) orders[0].live = false;
    renderOrderLists();
  }
}

function advanceStage() {
  if (stageIndex >= 0 && stageIndex < stages.length - 1) {
    stageIndex++;
    renderStepper();
    toast(`Status updated: ${stages[stageIndex]}`);
  }
}

function orderRowHTML(o, full = false) {
  const statusCls = o.status === 'Delivered' ? 'done' : 'progress';
  return `
    <div class="stub-list-item">
      <div class="stub-icon">${o.icon}</div>
      <div class="stub-info">
        <div class="t">${o.title}</div>
        <div class="s">${o.when}</div>
      </div>
      <div>
        <div class="stub-amt mono">₹${o.amt}</div>
        <div class="stub-status ${statusCls}">${o.status}</div>
      </div>
      ${full ? '<div class="stub-actions"><button class="mini-btn" data-track="1">Track</button></div>' : ''}
    </div>
  `;
}

function renderOrderLists() {
  const homeList = $('#homeOrderList');
  if (homeList) {
    homeList.innerHTML = orders.length
      ? orders.slice(0, 4).map((o) => orderRowHTML(o, false)).join('')
      : '<div class="empty-state" style="padding:24px 0;"><div class="em">📋</div>No past orders yet.</div>';
  }

  const fullList = $('#ordersFullList');
  if (fullList) {
    fullList.innerHTML = orders.length
      ? orders.map((o) => orderRowHTML(o, true)).join('')
      : '<div class="empty-state" style="padding:40px 0;"><div class="em">📋</div>No orders placed yet.<br><button class="mini-btn" style="margin-top:12px;" data-goto="menu">Browse menu</button></div>';
  }
}

// ==========================================
// 7. ROUTING & NAVIGATION
// ==========================================

const pageTitles = {
  home: 'Home',
  menu: 'Menu',
  cart: 'Cart',
  orders: 'Orders',
  spending: 'Spending',
  foryou: 'For you',
  feedback: 'Feedback',
  settings: 'Settings'
};

function switchPage(pageKey) {
  const target = $(`#page-${pageKey}`);
  if (!target) return;

  $$('.page').forEach((pg) => pg.classList.remove('active'));
  target.classList.add('active');

  $$('.nav-item[data-page]').forEach((n) => {
    n.classList.toggle('active', n.dataset.page === pageKey);
  });

  const pageTitle = $('#pageTitle');
  if (pageTitle) pageTitle.textContent = pageTitles[pageKey] || '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 8. EVENT DELEGATION & LISTENERS
// ==========================================

// Theme Switcher (Counter vs. Kitchen Mode)
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

// Notification Drawer Toggle
const bellBtn = $('#bellBtn');
if (bellBtn) {
  bellBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    $('#notifPanel').classList.toggle('open');
    $('#bellDot').classList.add('hide');
  });
}

// Live Search Input
const searchInput = $('#searchInput');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    switchPage('menu');
    renderMenuGrid(e.target.value);
  });
}

// Auth Tabs (Login / Signup)
$$('.auth-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    $$('.auth-tab').forEach((t) => t.classList.toggle('active', t === tab));
    const isLogin = tab.dataset.tab === 'login';
    $('#loginForm').style.display = isLogin ? 'block' : 'none';
    $('#signupForm').style.display = isLogin ? 'none' : 'block';
  });
});

// Login Form Submission
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
    currentUser = {
      name: 'Student User',
      year: '2nd year',
      rollNo: studentId,
      studentId: studentId,
      phone: phone
    };
    login();
  });
}

// Signup Form Submission
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
    currentUser = { name, year, rollNo: roll, studentId, phone };
    login();
  });
}

// Logout Buttons
const logoutNavBtn = $('#logoutNavBtn');
if (logoutNavBtn) logoutNavBtn.addEventListener('click', logout);

const logoutSettingsBtn = $('#logoutSettingsBtn');
if (logoutSettingsBtn) logoutSettingsBtn.addEventListener('click', logout);

// Global Click Delegation
document.addEventListener('click', (e) => {
  // Navigation
  const navBtn = e.target.closest('.nav-item[data-page]');
  if (navBtn) {
    switchPage(navBtn.dataset.page);
    return;
  }

  // Quick Action Jump
  const gotoBtn = e.target.closest('[data-goto]');
  if (gotoBtn) {
    switchPage(gotoBtn.dataset.goto);
    return;
  }

  // Add Item to Cart
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    addToCart(addBtn.dataset.add, addBtn);
    return;
  }

  // Quantity Increment
  const incBtn = e.target.closest('[data-inc]');
  if (incBtn) {
    changeQty(incBtn.dataset.inc, 1);
    return;
  }

  // Quantity Decrement
  const decBtn = e.target.closest('[data-dec]');
  if (decBtn) {
    changeQty(decBtn.dataset.dec, -1);
    return;
  }

  // Remove from Cart
  const removeBtn = e.target.closest('[data-remove]');
  if (removeBtn) {
    removeFromCart(removeBtn.dataset.remove);
    return;
  }

  // Checkout Button
  if (e.target.closest('#checkoutBtn')) {
    placeOrder();
    return;
  }

  // Advance Order Stepper
  if (e.target.closest('#advanceBtn')) {
    advanceStage();
    return;
  }

  // Track Order Jump
  if (e.target.closest('[data-track]')) {
    switchPage('home');
    return;
  }

  // Category Filter Chips
  const chip = e.target.closest('.filter-chip');
  if (chip) {
    activeCat = chip.dataset.cat;
    renderFilterRow();
    const searchVal = $('#searchInput') ? $('#searchInput').value : '';
    renderMenuGrid(searchVal);
    return;
  }

  // Star Rating Interaction
  const star = e.target.closest('.star');
  if (star) {
    feedbackStars = parseInt(star.dataset.v, 10);
    $$('.star').forEach((s) => {
      s.classList.toggle('on', parseInt(s.dataset.v, 10) <= feedbackStars);
    });
    return;
  }

  // Feedback Submission
  if (e.target.closest('#submitFeedback')) {
    if (!feedbackStars) {
      toast('Pick a star rating first');
      return;
    }
    toast('Thanks — feedback submitted!');
    if ($('#feedbackText')) $('#feedbackText').value = '';
    feedbackStars = 0;
    $$('.star').forEach((s) => s.classList.remove('on'));
    return;
  }

  // Settings Toggles
  const switchEl = e.target.closest('.switch');
  if (switchEl) {
    switchEl.classList.toggle('on');
    return;
  }

  // Close notifications on outer click
  if (!e.target.closest('#bellBtn')) {
    const notif = $('#notifPanel');
    if (notif) notif.classList.remove('open');
  }
});

// ==========================================
// 9. APPLICATION INITIALIZATION
// ==========================================

renderCounterStrip();
renderRecGrids();
renderFilterRow();
renderMenuGrid();
renderOrderLists();
updateCartUI();
renderCartPage();
renderStepper();
renderAccount();
