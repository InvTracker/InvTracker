
const DATA_INJECTION_SLOT = {
  menuItems: [],
  orders: [],
  users: [],
  feedbacks: []
};

const CAMPUS_DEMO_FIXTURE = {
  menuItems: [
    { id: 'item-1', name: 'Chicken Dum Biryani', emoji: 'restaurant', price: 185, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 25, lowThreshold: 8, restockTime: '15 min' },
    { id: 'item-2', name: 'Hyderabadi Veg Biryani', emoji: 'rice_bowl', price: 150, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 18, lowThreshold: 5, restockTime: '20 min' },
    { id: 'item-3', name: 'Ghee Podi Masala Dosa', emoji: 'breakfast_dining', price: 90, cat: 'Mains', counter: 'Counter 1 (Hot Meals)', stock: 4, lowThreshold: 6, restockTime: '10 min' },
    { id: 'item-4', name: 'Crispy Veg Patty Burger', emoji: 'lunch_dining', price: 70, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 22, lowThreshold: 5, restockTime: '12 min' },
    { id: 'item-5', name: 'Grilled Cheese Sandwich', emoji: 'bakery_dining', price: 60, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 3, lowThreshold: 5, restockTime: '8 min' },
    { id: 'item-6', name: 'Wood-Fired Pizza Slice', emoji: 'local_pizza', price: 120, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 0, lowThreshold: 4, restockTime: '25 min' },
    { id: 'item-7', name: 'Peri-Peri Salted Fries', emoji: 'fastfood', price: 55, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)', stock: 30, lowThreshold: 8, restockTime: '5 min' },
    { id: 'item-8', name: 'Artisan Cold Coffee', emoji: 'local_cafe', price: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 35, lowThreshold: 10, restockTime: '5 min' },
    { id: 'item-9', name: 'Spiced Masala Buttermilk', emoji: 'emoji_food_beverage', price: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 40, lowThreshold: 10, restockTime: '5 min' },
    { id: 'item-10', name: 'Warm Gulab Jamun (2 pcs)', emoji: 'icecream', price: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', stock: 14, lowThreshold: 5, restockTime: '15 min' }
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

const STORAGE_KEY = 'inventrack_m3_state';
const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];
const ROLE_PERMISSIONS = {
  user: {
    label: 'User Portal',
    badgeText: 'Campus User (Dining & Store Access)',
    canViewStore: true,
    canOrder: true,
    canViewKitchen: false,
    canViewAdmin: false,
    canEditMenu: false,
    canAdjustStock: false,
    allowedPages: [
      'home', 'menu', 'cart', 'orders', 'spending', 'foryou', 'feedback',
      'shopper-store', 'shopper-cart', 'shopper-receipts', 'settings'
    ]
  },
  student: {
    label: 'User Portal',
    badgeText: 'Campus User (Dining & Store Access)',
    canViewStore: true,
    canOrder: true,
    canViewKitchen: false,
    canViewAdmin: false,
    canEditMenu: false,
    canAdjustStock: false,
    allowedPages: [
      'home', 'menu', 'cart', 'orders', 'spending', 'foryou', 'feedback',
      'shopper-store', 'shopper-cart', 'shopper-receipts', 'settings'
    ]
  },
  shopper: {
    label: 'User Portal',
    badgeText: 'Campus User (Dining & Store Access)',
    canViewStore: true,
    canOrder: true,
    canViewKitchen: false,
    canViewAdmin: false,
    canEditMenu: false,
    canAdjustStock: false,
    allowedPages: [
      'home', 'menu', 'cart', 'orders', 'spending', 'foryou', 'feedback',
      'shopper-store', 'shopper-cart', 'shopper-receipts', 'settings'
    ]
  },
  kitchen: {
    label: 'Kitchen & Staff',
    badgeText: 'Kitchen Staff (Back of House)',
    canViewStore: false,
    canOrder: false,
    canViewKitchen: true,
    canViewAdmin: false,
    canEditMenu: false,
    canAdjustStock: true, // Kitchen can adjust live stock ("what item is how much left")
    allowedPages: ['kitchen-kanban', 'kitchen-stock', 'kitchen-pos', 'kitchen-feedback', 'settings']
  },
  admin: {
    label: 'Admin Portal',
    badgeText: 'Campus Administrator',
    canViewStore: true,
    canOrder: true,
    canViewKitchen: true,
    canViewAdmin: true,
    canEditMenu: true,    // Admin can add/edit menu details
    canAdjustStock: true, // Admin can adjust stock
    allowedPages: [
      'admin-overview', 'admin-audit', 'admin-items',
      'kitchen-kanban', 'kitchen-stock', 'kitchen-pos', 'kitchen-feedback',
      'home', 'menu', 'cart', 'orders', 'spending', 'foryou', 'feedback',
      'shopper-store', 'shopper-cart', 'shopper-receipts', 'settings'
    ]
  }
};

const DEMO_ACCOUNTS = {
  admin: {
    id: 'usr-admin-1',
    name: 'Dr. Vikram Malhotra',
    email: 'admin@campus.edu',
    role: 'admin',
    title: 'Campus Administrator',
    year: 'Faculty / Admin',
    rollNo: 'ADM-2026',
    studentId: 'ADM-2026',
    phone: '9876543219',
    balance: 5000
  },
  kitchen: {
    id: 'usr-kitchen-1',
    name: 'Chef Rajesh Kumar',
    email: 'kitchen@campus.edu',
    role: 'kitchen',
    title: 'Executive Kitchen Chef',
    year: 'Kitchen Staff',
    rollNo: 'KIT-104',
    studentId: 'KIT-104',
    phone: '9876543218',
    balance: 2000
  },
  user: {
    id: 'usr-2503',
    name: 'Rohan Sharma',
    email: 'rohan@student.campus.edu',
    role: 'user',
    title: 'Campus Student',
    year: '2nd year',
    rollNo: '2503A52924',
    studentId: '2503A52924',
    phone: '9876543210',
    balance: 450
  }
};

function detectRoleFromEmail(input) {
  if (!input) return 'user';
  const str = input.toLowerCase().trim();
  if (str.includes('admin') || str === 'adm') return 'admin';
  if (str.includes('kitchen') || str.includes('chef') || str.includes('cook') || str === 'kit') return 'kitchen';
  return 'user';
}

const DEFAULT_USER = DEMO_ACCOUNTS.user;

class InvenTrackStore {
  constructor() {
    this.listeners = [];
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    let authUser = null;
    try {
      const stored = localStorage.getItem('invenTrack_user');
      if (stored) authUser = JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse invenTrack_user', e);
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    let parsed = null;
    if (saved) {
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse localStorage', e);
      }
    }
    const currentUser = authUser || (parsed && parsed.loggedIn && parsed.currentUser ? parsed.currentUser : null);
    const isLoggedIn = !!currentUser;

    if (!isLoggedIn) {
      try {
        window.location.replace(window.location.protocol === 'file:' ? 'landing.html' : '/landing');
      } catch (e) {}

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
        activeRole: 'user',
        activePage: 'home',
        selectedPaymentMethod: 'Campus UPI',
        activeCat: 'All',
        counterFilter: 'All'
      };
    }
    const role = (currentUser && currentUser.role) || 'user';
    const activeRole = role === 'admin' ? (parsed && parsed.activeRole ? parsed.activeRole : 'admin') : role;
    const defaultPage = role === 'admin' ? 'admin-overview' : (role === 'kitchen' ? 'kitchen-kanban' : 'home');
    const activePage = (parsed && parsed.activePage && ROLE_PERMISSIONS[role] && ROLE_PERMISSIONS[role].allowedPages && ROLE_PERMISSIONS[role].allowedPages.includes(parsed.activePage))
      ? parsed.activePage
      : defaultPage;
    if (role === 'kitchen') {
      try {
        document.documentElement.setAttribute('data-theme', 'kitchen');
        document.body.setAttribute('data-theme', 'kitchen');
        localStorage.setItem('invenTrack_theme', 'kitchen');
      } catch(e){}
    }

    if (parsed) {
      return {
        menuItems: parsed.menuItems || [...DATA_INJECTION_SLOT.menuItems],
        orders: parsed.orders || [...DATA_INJECTION_SLOT.orders],
        users: parsed.users || [...DATA_INJECTION_SLOT.users],
        feedbacks: parsed.feedbacks || [...DATA_INJECTION_SLOT.feedbacks],
        cart: parsed.cart || {},
        shopperCart: parsed.shopperCart || {},
        posCart: parsed.posCart || {},
        currentUser,
        loggedIn: true,
        activeRole,
        activePage,
        selectedPaymentMethod: parsed.selectedPaymentMethod || 'Campus UPI',
        activeCat: parsed.activeCat || 'All',
        counterFilter: parsed.counterFilter || 'All'
      };
    }

    return {
      menuItems: [...DATA_INJECTION_SLOT.menuItems],
      orders: [...DATA_INJECTION_SLOT.orders],
      users: [...DATA_INJECTION_SLOT.users],
      feedbacks: [...DATA_INJECTION_SLOT.feedbacks],
      cart: {},
      shopperCart: {},
      posCart: {},
      currentUser,
      loggedIn: true,
      activeRole,
      activePage,
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

  generateRandomExampleData() {
    const shuffled = [...CAMPUS_DEMO_FIXTURE.menuItems].sort(() => 0.5 - Math.random());
    const count = Math.floor(7 + Math.random() * 4); // 7 to 10 items
    const selected = shuffled.slice(0, count).map((item, idx) => {
      const stockRand = Math.random();
      let stock = Math.floor(12 + Math.random() * 26);
      let restockTime = '10 min';
      if (stockRand < 0.12) {
        stock = 0;
        restockTime = '25 min';
      } else if (stockRand < 0.28) {
        stock = Math.floor(2 + Math.random() * 4);
        restockTime = '15 min';
      }
      const priceOffset = (Math.floor(Math.random() * 5) - 2) * 5;
      const price = Math.max(20, item.price + priceOffset);
      return {
        ...item,
        id: `item-${Date.now()}-${idx + 1}`,
        stock,
        price,
        restockTime
      };
    });

    this.state.menuItems = selected;
    this.state.orders = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.orders)).map((o, i) => {
      const tokenNum = Math.floor(100 + Math.random() * 900);
      const stageIdx = Math.floor(Math.random() * 3);
      return {
        ...o,
        id: `ord-${Date.now()}-${i + 1}`,
        token: `#A-${tokenNum}`,
        status: stages[stageIdx],
        stageIndex: stageIdx
      };
    });
    this.state.users = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.users));
    this.state.feedbacks = JSON.parse(JSON.stringify(CAMPUS_DEMO_FIXTURE.feedbacks));
    this.state.cart = {};
    this.state.shopperCart = {};
    this.state.posCart = {};
    this.save();
  }

  loadDemoFixture() {
    this.generateRandomExampleData();
  }

  resetToEmptyState() {
    this.state.menuItems = [];
    this.state.orders = [];
    this.state.users = [];
    this.state.feedbacks = [];
    this.state.cart = {};
    this.state.shopperCart = {};
    this.state.posCart = {};
    this.save();
  }

  hasPermission(permName) {
    const userRole = (this.state.currentUser && this.state.currentUser.role) || 'user';
    if (userRole === 'admin') return true; // Admin has full access to User, Kitchen, and Admin features
    const config = ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.user;
    return !!config[permName];
  }

  setRole(role) {
    const rawRole = (this.state.currentUser && (this.state.currentUser.role || (window.getUserRole ? window.getUserRole(this.state.currentUser.email) : 'student'))) || 'student';
    const userRole = (rawRole === 'student' || rawRole === 'user') ? 'student' : rawRole;

    if (userRole === 'student') {
      if (role === 'admin' || role === 'kitchen') {
        alert("Access denied: Students cannot access this section");
        const isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
        return;
      }
    } else if (userRole === 'kitchen') {
      if (role === 'admin') {
        alert("Access denied: Kitchen staff cannot access Admin Dashboard");
        return;
      }
    }

    if (userRole !== 'admin') {
      toast('🔒 Role switching is only permitted for Administrators.', 'error');
      return;
    }

    if (role === 'student' || role === 'shopper') role = 'user';
    this.state.activeRole = role;
    if (role === 'user') this.state.activePage = 'home';
    else if (role === 'kitchen') this.state.activePage = 'kitchen-kanban';
    else if (role === 'admin') this.state.activePage = 'admin-overview';
    this.save();
  }

  setPage(page) {
    const rawRole = (this.state.currentUser && (this.state.currentUser.role || (window.getUserRole ? window.getUserRole(this.state.currentUser.email) : 'student'))) || 'student';
    const userRole = (rawRole === 'student' || rawRole === 'user') ? 'student' : rawRole;

    if (userRole === 'student') {
      if (page.startsWith('admin-') || page.startsWith('kitchen-')) {
        alert("Access denied: Students cannot access this section");
        const isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
        return;
      }
    } else if (userRole === 'kitchen') {
      if (page.startsWith('admin-')) {
        alert("Access denied: Kitchen staff cannot access Admin Dashboard");
        this.state.activePage = 'kitchen-kanban';
        this.save();
        return;
      }
    }

    this.state.activePage = page;
    this.save();
  }

  login(email, name = null) {
    const role = detectRoleFromEmail(email);
    let userObj;
    if (role === 'admin') {
      userObj = { ...DEMO_ACCOUNTS.admin, email: email || DEMO_ACCOUNTS.admin.email };
      if (name) userObj.name = name;
    } else if (role === 'kitchen') {
      userObj = { ...DEMO_ACCOUNTS.kitchen, email: email || DEMO_ACCOUNTS.kitchen.email };
      if (name) userObj.name = name;
    } else {
      userObj = { ...DEMO_ACCOUNTS.user, email: email || DEMO_ACCOUNTS.user.email };
      if (name) userObj.name = name;
    }

    this.state.currentUser = userObj;
    this.state.loggedIn = true;
    this.state.activeRole = role;
    if (role === 'admin') this.state.activePage = 'admin-overview';
    else if (role === 'kitchen') this.state.activePage = 'kitchen-kanban';
    else this.state.activePage = 'home';
    this.save();
    toast(`Signed in as ${userObj.name} (${role.toUpperCase()})`, 'verified_user');
  }

  async logout() {
    this.state.loggedIn = false;
    this.state.currentUser = null;
    this.state.activeRole = 'user';
    this.state.activePage = 'home';
    try {
      localStorage.removeItem('invenTrack_user');
    } catch (e) {}
    try {
      if (window.__FIREBASE_CONFIG__) {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
        const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
        const auth = getAuth(initializeApp(window.__FIREBASE_CONFIG__));
        await signOut(auth);
      }
    } catch (e) {}
    this.save();
    toast('Logged out successfully. Redirecting to landing page...', 'logout');
    setTimeout(() => {
      window.location.replace(window.location.protocol === 'file:' ? 'landing.html' : '/landing');
    }, 600);
  }
  adjustStock(itemId, delta) {
    if (!this.hasPermission('canAdjustStock')) {
      toast('ðŸ”’ Permission Denied: Users cannot alter item stock levels or remaining quantities.', 'error');
      return;
    }

    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item) return;
    const oldStock = item.stock;
    item.stock = Math.max(0, item.stock + delta);
    if (item.stock === 0 && oldStock > 0) {
      toast(`âš ï¸⚠️ "${item.name}" is now OUT OF STOCK`, 'warning');
    } else if (item.stock > 0 && oldStock === 0) {
      toast(`ðŸŸ¢ "${item.name}" is RESTOCKED (${item.stock} available)`, 'check_circle');
    } else {
      toast(`Stock updated: ${item.name} (${item.stock})`, 'inventory');
    }
    this.save();
  }

  setStockZero(itemId) {
    if (!this.hasPermission('canAdjustStock')) {
      toast('ðŸ”’ Permission Denied: Only kitchen staff and admin can alter item availability.', 'error');
      return;
    }

    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item) return;
    item.stock = 0;
    toast(`ðŸ”´ Marked "${item.name}" as Out of Stock`, 'cancel');
    this.save();
  }
  addMenuItem(itemData) {
    if (!this.hasPermission('canEditMenu')) {
      toast('ðŸ”’ Permission Denied: Users cannot add or modify menu catalog items.', 'error');
      return false;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      name: itemData.name,
      emoji: itemData.emoji || 'restaurant',
      cat: itemData.cat || 'Mains',
      counter: itemData.counter || 'Counter 1 (Hot Meals)',
      price: parseFloat(itemData.price) || 50,
      stock: parseInt(itemData.stock, 10) || 0,
      lowThreshold: parseInt(itemData.lowThreshold, 10) || 5,
      restockTime: itemData.restockTime || '15 min'
    };

    this.state.menuItems.push(newItem);
    this.save();
    toast(`Added "${newItem.name}" to menu catalog`, 'check_circle');
    return true;
  }
  addToCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item is currently out of stock', 'cancel');
      return;
    }
    const currentQty = this.state.cart[itemId] || 0;
    if (currentQty >= item.stock) {
      toast(`Only ${item.stock} servings available in kitchen`, 'schedule');
      return;
    }
    this.state.cart[itemId] = currentQty + 1;
    toast(`Added ${item.name} to cart`, 'shopping_cart');
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
      toast(`Only ${item.stock} available in stock`, 'schedule');
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
  addToShopperCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item is out of stock', 'cancel');
      return;
    }
    this.state.shopperCart[itemId] = (this.state.shopperCart[itemId] || 0) + 1;
    toast(`Added ${item.name} to Express Cart`, 'shopping_bag');
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
  addToPosCart(itemId) {
    const item = this.state.menuItems.find((m) => m.id === itemId);
    if (!item || item.stock <= 0) {
      toast('Item out of stock in kitchen', 'cancel');
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
  createOrder({ itemsMap, customerName, role, counter, paymentMethod, packagingFee = 10 }) {
    const itemEntries = Object.entries(itemsMap);
    if (!itemEntries.length) return null;

    for (const [id, qty] of itemEntries) {
      const item = this.state.menuItems.find((m) => m.id === id);
      if (!item || item.stock < qty) {
        toast(`Insufficient stock for ${item ? item.name : 'item'}`, 'cancel');
        return null;
      }
    }

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
  advanceOrderStatus(orderId) {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;
    if (order.stageIndex < stages.length - 1) {
      order.stageIndex++;
      order.status = stages[order.stageIndex];
      toast(`Order ${order.token} advanced to "${order.status}"`, 'check_circle');
      this.save();
    }
  }
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
    toast('Thanks â€” feedback recorded!', 'thumb_up');
    this.save();
  }
}
const store = new InvenTrackStore();

const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

function toast(msg, icon = 'info') {
  const wrap = $('#toastWrap');
  if (!wrap) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="material-symbols-outlined" style="font-size:18px;">${icon}</span><span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function getItemStatus(item) {
  if (item.stock === 0) return 'out';
  if (item.stock <= (item.lowThreshold || 5)) return 'low';
  return 'available';
}

function sbHTML(status) {
  const meta = {
    available: { label: 'AVAIL', icon: 'check_circle' },
    low: { label: 'LOW', icon: 'schedule' },
    out: { label: 'OUT', icon: 'cancel' }
  };
  const config = meta[status] || { label: status, icon: 'info' };
  return `<span class="status-badge ${status}"><span class="material-symbols-outlined" style="font-size:13px;">${config.icon}</span><span>${config.label}</span></span>`;
}

function getGaugeColor(status) {
  return status === 'available' ? 'var(--md-sys-color-avail)' : status === 'low' ? 'var(--md-sys-color-low)' : 'var(--md-sys-color-out)';
}

function getGaugeWidth(item) {
  const maxRef = Math.max(40, (item.lowThreshold || 5) * 4);
  return Math.max(4, Math.min(100, Math.round((item.stock / maxRef) * 100)));
}

function renderItemIcon(emoji) {
  const isSymbol = /^[a-z_]+$/.test(emoji);
  if (isSymbol) {
    return `<span class="material-symbols-outlined" style="font-size:26px;">${emoji}</span>`;
  }
  return `<span style="font-size:24px;">${emoji}</span>`;
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

const roleLabels = {
  user: 'User Portal',
  student: 'User Portal',
  shopper: 'User Portal',
  kitchen: 'Kitchen & Staff',
  admin: 'Admin Portal'
};

function renderShell(state) {
  const { activeRole, activePage, currentUser } = state;
  const userRole = (currentUser && currentUser.role) || 'user';
  const isAdmin = userRole === 'admin';
  const roleSwitcher = $('#roleSwitcher');
  if (roleSwitcher) {
    if (isAdmin) {
      roleSwitcher.style.display = 'inline-flex';
      $$('#roleSwitcher .role-btn').forEach((btn) => {
        const role = btn.dataset.role;
        btn.classList.toggle('active', role === activeRole);
        btn.classList.remove('restricted');
        const lockIcon = btn.querySelector('.perm-lock');
        if (lockIcon) lockIcon.remove();
        btn.title = `Switch to ${roleLabels[role] || role}`;
      });
    } else {
      roleSwitcher.style.display = 'none';
    }
  }
  const brandSub = $('#brandSubRole');
  if (brandSub) {
    if (isAdmin) {
      const viewName = activeRole === 'user' ? 'User Store View' : activeRole === 'kitchen' ? 'Kitchen Staff View' : 'Executive Overview';
      brandSub.textContent = `Admin Portal (${viewName})`;
    } else if (userRole === 'kitchen') {
      brandSub.textContent = 'Kitchen Staff Portal';
    } else {
      brandSub.textContent = 'User Portal';
    }
  }
  const navUser = $('#navGroupUser');
  const navKitchen = $('#navGroupKitchen');
  const navAdmin = $('#navGroupAdmin');

  if (isAdmin) {
    if (navUser) navUser.style.display = activeRole === 'user' ? 'flex' : 'none';
    if (navKitchen) navKitchen.style.display = activeRole === 'kitchen' ? 'flex' : 'none';
    if (navAdmin) navAdmin.style.display = activeRole === 'admin' ? 'flex' : 'none';
  } else if (userRole === 'kitchen') {
    if (navUser) navUser.style.display = 'none';
    if (navKitchen) navKitchen.style.display = 'flex';
    if (navAdmin) navAdmin.style.display = 'none';
  } else {
    if (navUser) navUser.style.display = 'flex';
    if (navKitchen) navKitchen.style.display = 'none';
    if (navAdmin) navAdmin.style.display = 'none';
  }
  const mobileRoleBadge = $('#mobileRoleBadge');
  if (mobileRoleBadge) {
    mobileRoleBadge.textContent = activeRole.toUpperCase();
  }
  const bottomUser = $('#bottomNavUser');
  const bottomKitchen = $('#bottomNavKitchen');
  const bottomAdmin = $('#bottomNavAdmin');

  if (userRole === 'student' || userRole === 'user') {
    if (bottomUser) bottomUser.style.display = 'flex';
    if (bottomKitchen) bottomKitchen.style.display = 'none';
    if (bottomAdmin) bottomAdmin.style.display = 'none';
    const kBtn = document.querySelector('#roleSwitcher [data-role="kitchen"]');
    const aBtn = document.querySelector('#roleSwitcher [data-role="admin"]');
    if (kBtn) kBtn.style.display = 'none';
    if (aBtn) aBtn.style.display = 'none';
    if (roleSwitcher) roleSwitcher.style.display = 'none';
    if (navKitchen) navKitchen.style.display = 'none';
    if (navAdmin) navAdmin.style.display = 'none';
  } else if (userRole === 'kitchen') {
    if (bottomUser) bottomUser.style.display = 'none';
    if (bottomKitchen) bottomKitchen.style.display = 'flex';
    if (bottomAdmin) bottomAdmin.style.display = 'none';
    const aBtn = document.querySelector('#roleSwitcher [data-role="admin"]');
    if (aBtn) aBtn.style.display = 'none';
    if (navAdmin) navAdmin.style.display = 'none';
  } else {
    if (bottomUser) bottomUser.style.display = activeRole === 'user' ? 'flex' : 'none';
    if (bottomKitchen) bottomKitchen.style.display = activeRole === 'kitchen' ? 'flex' : 'none';
    if (bottomAdmin) bottomAdmin.style.display = activeRole === 'admin' ? 'flex' : 'none';
  }
  $$('.nav-item[data-page], .m3-bottom-nav-item[data-page]').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === activePage);
  });
  $$('.page').forEach((pg) => pg.classList.remove('active'));
  const targetPage = $(`#page-${activePage}`);
  if (targetPage) targetPage.classList.add('active');
  const badge = $('#dataModeBadge');
  const stats = $('#dataStatsText');
  if (badge && stats) {
    const isDemoLoaded = state.menuItems.length > 0;
    badge.textContent = isDemoLoaded ? 'Active Live State' : 'Empty Schema []';
    badge.style.backgroundColor = isDemoLoaded ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-highest)';
    badge.style.color = isDemoLoaded ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)';
    const activeCount = state.orders.filter((o) => o.status !== 'Picked up').length;
    stats.textContent = `(${state.menuItems.length} items, ${activeCount} active orders)`;
  }

  const clearTopBtn = $('#clearDataBtnTop');
  if (clearTopBtn) {
    clearTopBtn.style.display = state.menuItems.length > 0 ? 'inline-flex' : 'none';
  }
  const openItemBtn = $('#openAddItemModalBtn');
  if (openItemBtn) {
    openItemBtn.style.display = store.hasPermission('canEditMenu') ? 'inline-flex' : 'none';
  }
  const studentCartCount = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const cartBadge = $('#cartBadge');
  if (cartBadge) {
    cartBadge.textContent = studentCartCount;
    cartBadge.classList.toggle('hide', studentCartCount === 0);
  }

  const bottomCartBadge = $('#bottomCartBadge');
  if (bottomCartBadge) {
    bottomCartBadge.textContent = studentCartCount;
    bottomCartBadge.classList.toggle('hide', studentCartCount === 0);
  }

  const mobileCartBadge = $('#mobileCartBadge');
  if (mobileCartBadge) {
    mobileCartBadge.textContent = studentCartCount;
    mobileCartBadge.classList.toggle('hide', studentCartCount === 0);
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
  const sideAvatar = $('#sideAvatar');
  const sideName = $('#sideName');
  const sideRole = $('#sideRole');
  if (state.currentUser) {
    if (sideAvatar) sideAvatar.textContent = initials(state.currentUser.name);
    if (sideName) sideName.textContent = state.currentUser.name;
    if (sideRole) {
      if (isAdmin) sideRole.textContent = 'Administrator Â· Full Access';
      else if (userRole === 'kitchen') sideRole.textContent = 'Kitchen Staff Â· Back of House';
      else sideRole.textContent = `${state.currentUser.year || 'Student'} Â· Dining & Store`;
    }
    if ($('#accName')) $('#accName').textContent = state.currentUser.name;
    if ($('#accEmail')) $('#accEmail').textContent = state.currentUser.email || 'rohan@student.campus.edu';
    if ($('#accRoleType')) {
      $('#accRoleType').textContent = isAdmin
        ? 'Campus Administrator (Full Access + Top Bar Switcher)'
        : userRole === 'kitchen'
        ? 'Kitchen Crew (Kitchen Back of House Features Only)'
        : 'Campus User (Dining Store & Express Features Only)';
    }
    if ($('#accStudentId')) $('#accStudentId').textContent = state.currentUser.studentId || state.currentUser.rollNo || 'USR-2503';

    const roleBadge = $('#activeRoleBadge');
    if (roleBadge) {
      roleBadge.textContent = userRole.toUpperCase();
      roleBadge.className = `status-badge ${isAdmin ? 'available' : userRole === 'kitchen' ? 'low' : 'available'}`;
    }
    const permStoreEl = $('#permStoreView');
    if (permStoreEl) {
      const canStore = store.hasPermission('canViewStore');
      permStoreEl.className = `perm-pill ${canStore ? 'granted' : 'restricted'}`;
      permStoreEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:12px;">${canStore ? 'check' : 'lock'}</span><span>${canStore ? 'Permitted' : 'Restricted (Kitchen Cannot Access Store)'}</span>`;
    }

    const permBackHouseEl = $('#permBackHouse');
    if (permBackHouseEl) {
      const canBack = store.hasPermission('canViewKitchen');
      permBackHouseEl.className = `perm-pill ${canBack ? 'granted' : 'restricted'}`;
      permBackHouseEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:12px;">${canBack ? 'check' : 'lock'}</span><span>${canBack ? 'Permitted' : 'Restricted to Staff'}</span>`;
    }

    const permStockEl = $('#permStockAdjust');
    if (permStockEl) {
      const canAdj = store.hasPermission('canAdjustStock');
      permStockEl.className = `perm-pill ${canAdj ? 'granted' : 'restricted'}`;
      permStockEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:12px;">${canAdj ? 'check' : 'lock'}</span><span>${canAdj ? 'Permitted' : 'Restricted (Users Cannot Alter Stock)'}</span>`;
    }

    const permMenuEl = $('#permMenuDetails');
    if (permMenuEl) {
      const canEdit = store.hasPermission('canEditMenu');
      permMenuEl.className = `perm-pill ${canEdit ? 'granted' : 'restricted'}`;
      permMenuEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:12px;">${canEdit ? 'check' : 'lock'}</span><span>${canEdit ? 'Permitted' : 'Admin Only'}</span>`;
    }

    const permRoleSwitcherEl = $('#permRoleSwitcher');
    if (permRoleSwitcherEl) {
      permRoleSwitcherEl.className = `perm-pill ${isAdmin ? 'granted' : 'restricted'}`;
      permRoleSwitcherEl.innerHTML = `<span class="material-symbols-outlined" style="font-size:12px;">${isAdmin ? 'check' : 'lock'}</span><span>${isAdmin ? 'Visible & Active' : 'Hidden (Admin Only)'}</span>`;
    }
  } else {
    if (sideAvatar) sideAvatar.textContent = 'GU';
    if (sideName) sideName.textContent = 'Guest User';
    if (sideRole) sideRole.textContent = 'Sign In to Access';
  }
}
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
    if (ticketPaid) ticketPaid.textContent = 'â‚¹0';
    if (advanceBtn) {
      advanceBtn.disabled = true;
      advanceBtn.innerHTML = '<span>No active order</span>';
    }
    $$('#stepper .step').forEach((el) => el.classList.remove('done', 'now'));
    return;
  }

  const itemsSummary = activeOrder.items.map((i) => `${i.qty}Ã— ${i.name}`).join(' + ');
  if (ticketTitle) ticketTitle.textContent = itemsSummary;
  if (ticketDesc) ticketDesc.textContent = `Order placed Â· ${activeOrder.counter} Â· ${activeOrder.paymentMethod}`;
  if (queueNo) queueNo.textContent = activeOrder.token;
  if (ticketPaid) ticketPaid.textContent = `â‚¹${activeOrder.total}`;

  const etaMap = [
    '~12 min to ready',
    '~7 min to ready',
    'Ready â€” collect at counter!',
    'Order complete âœ“'
  ];
  if (etaPill) etaPill.textContent = etaMap[activeOrder.stageIndex] || 'In progress';

  $$('#stepper .step').forEach((el, i) => {
    el.classList.remove('done', 'now');
    if (i < activeOrder.stageIndex) el.classList.add('done');
    else if (i === activeOrder.stageIndex) el.classList.add('now');
  });

  if (advanceBtn) {
    const isDone = activeOrder.stageIndex >= stages.length - 1;
    advanceBtn.disabled = isDone;
    advanceBtn.innerHTML = isDone 
      ? '<span class="material-symbols-outlined">check_circle</span><span>Picked up âœ“</span>' 
      : `<span class="material-symbols-outlined">arrow_forward</span><span>Advance "${stages[activeOrder.stageIndex + 1]}"</span>`;
    advanceBtn.dataset.orderId = activeOrder.id;
  }
}
function renderCounterStrip(state) {
  const container = $('#counterStrip');
  if (!container) return;

  if (!state.menuItems.length) {
    container.innerHTML = `
      <div class="empty-state" style="padding:24px; width:100%; grid-column:1 / -1;">
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">inventory_2</span></div>
        <strong>No counter items available</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">
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
          <div class="stock-count">${it.stock} servings left &middot; <span style="color:var(--md-sys-color-on-surface-variant); font-size:11px;">${it.restockTime || '15 min'}</span></div>
          <div class="gauge">
            <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
          </div>
        </div>
      `;
    })
    .join('');
}
function renderStudentMenu(state, searchQuery = '') {
  const grid = $('#menuGrid');
  const filterRow = $('#filterRow');
  if (!grid) return;

  const cats = ['All', ...new Set(state.menuItems.map((m) => m.cat))];
  if (filterRow) {
    filterRow.innerHTML = cats
      .map((c) => {
        const isActive = c === state.activeCat;
        return `
          <button class="filter-chip ${isActive ? 'active' : ''}" data-cat="${c}">
            ${isActive ? '<span class="material-symbols-outlined" style="font-size:16px;">done</span>' : ''}
            <span>${c}</span>
          </button>
        `;
      })
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

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state" style="padding:48px 20px; grid-column:1 / -1; width:100%;">
        <div class="em"><span class="material-symbols-outlined" style="font-size:40px;">search</span></div>
        <strong>No menu items found</strong>
        <div style="font-size:12.5px; color:var(--md-sys-color-on-surface-variant); margin-top:6px; max-width:420px; margin-left:auto; margin-right:auto;">
          ${
            state.menuItems.length === 0
              ? 'Catalog is empty. Inject custom items into <code>DATA_INJECTION_SLOT</code> or load the live demo fixture.'
              : 'Try clearing your category/counter filters or search keyword.'
          }
        </div>
        ${
          state.menuItems.length === 0
            ? '<button class="dev-btn primary" style="margin-top:14px;" onclick="store.loadDemoFixture()"><span class="material-symbols-outlined" style="font-size:16px;">bolt</span><span>Load Campus Demo Fixture</span></button>'
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
          <div class="menu-emoji">${renderItemIcon(it.emoji)}</div>
          <div class="menu-info">
            <div class="mn">${it.name}</div>
            <div class="mc">${it.cat} &middot; <span>${it.counter || 'Counter 1'}</span></div>
            <div style="font-size:11px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">
              Stock: <strong>${it.stock}</strong> &middot; Gauge: 
              <span style="color:${getGaugeColor(status)}; font-weight:700;">${status.toUpperCase()}</span>
            </div>
            <div class="gauge" style="margin:6px 0 8px;">
              <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
            </div>
            <div class="mrow">
              <span class="rec-price mono">â‚¹${it.price}</span>
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
function renderRecommendations(state) {
  const homeRec = $('#homeRecGrid');
  const foryouRec = $('#foryouGrid');

  const recItems = state.menuItems.filter((m) => m.stock > 0).slice(0, 4);

  const makeCardHTML = (it) => {
    const status = getItemStatus(it);
    return `
      <div class="rec-card">
        <div class="rec-img">${renderItemIcon(it.emoji)}</div>
        <div class="rec-body">
          <div class="rec-name">${it.name}</div>
          <div class="rec-tag">${status === 'low' ? 'Only few remaining' : 'Pairs with your usual'}</div>
          <div class="rec-row">
            <span class="rec-price mono">â‚¹${it.price}</span>
            <button class="add-btn" data-add="${it.id}">+</button>
          </div>
        </div>
      </div>
    `;
  };

  if (homeRec) {
    homeRec.innerHTML = recItems.length
      ? recItems.map(makeCardHTML).join('')
      : '<div class="empty-state" style="grid-column:1 / -1;"><div class="em"><span class="material-symbols-outlined">auto_awesome</span></div>No recommendations available.</div>';
  }

  if (foryouRec) {
    foryouRec.innerHTML = state.menuItems.length
      ? state.menuItems.slice(0, 8).map(makeCardHTML).join('')
      : '<div class="empty-state" style="grid-column:1 / -1;"><div class="em"><span class="material-symbols-outlined">auto_awesome</span></div>Load items to view graph-inspired recommendations.</div>';
  }
}
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
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">shopping_cart</span></div>
        <strong>Your cart is empty</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">Add fresh meals and snacks from the live counter.</div>
        <button class="mini-btn" style="margin-top:14px;" data-goto="menu">Browse Live Menu</button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = 'â‚¹0';
    if (packingEl) packingEl.textContent = 'â‚¹0';
    if (totalEl) totalEl.textContent = 'â‚¹0';
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
          <div class="menu-emoji" style="width:38px; height:38px; font-size:18px;">${renderItemIcon(it.emoji)}</div>
          <div class="stub-info">
            <div class="t">${it.name}</div>
            <div class="s mono">â‚¹${it.price} each &middot; â‚¹${lineTotal}</div>
          </div>
          <div class="qty-ctrl">
            <button data-dec="${id}">âˆ’</button>
            <span>${qty}</span>
            <button data-inc="${id}">+</button>
          </div>
          <button class="remove-x" data-remove="${id}" title="Remove">
            <span class="material-symbols-outlined" style="font-size:18px;">close</span>
          </button>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;

  if (subtotalEl) subtotalEl.textContent = `â‚¹${subtotal}`;
  if (packingEl) packingEl.textContent = `â‚¹${packing}`;
  if (totalEl) totalEl.textContent = `â‚¹${total}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}
function renderOrdersList(state) {
  const homeList = $('#homeOrderList');
  const fullList = $('#ordersFullList');

  const makeRowHTML = (o, isFull = false) => {
    const isDone = o.status === 'Picked up';
    const summary = o.items ? o.items.map((i) => `${i.qty}Ã— ${i.name}`).join(', ') : 'Campus Meal';

    return `
      <div class="stub-list-item">
        <div class="stub-icon">
          <span class="material-symbols-outlined">${isDone ? 'check_circle' : 'receipt_long'}</span>
        </div>
        <div class="stub-info">
          <div class="t">${summary}</div>
          <div class="s">${o.token} &middot; ${o.counter || 'Counter'} &middot; ${new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div>
          <div class="stub-amt mono">â‚¹${o.total}</div>
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
      : '<div class="empty-state" style="padding:24px 0;"><div class="em"><span class="material-symbols-outlined">receipt</span></div>No past orders yet.</div>';
  }

  if (fullList) {
    fullList.innerHTML = state.orders.length
      ? state.orders.map((o) => makeRowHTML(o, true)).join('')
      : '<div class="empty-state" style="padding:48px 0;"><div class="em"><span class="material-symbols-outlined">receipt</span></div>No orders placed yet.<br><button class="mini-btn" style="margin-top:12px;" data-goto="menu">Browse menu</button></div>';
  }
}
function renderSpendingBars(state) {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayTotals = { MON: 0, TUE: 0, WED: 0, THU: 0, FRI: 0, SAT: 0, SUN: 0 };

  state.orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const dayIndex = (d.getDay() + 6) % 7;
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
          <div class="bar-col ${isPeak ? 'peak' : ''}" title="${day}: â‚¹${val}">
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
  if (homeAmt) homeAmt.textContent = `â‚¹${totalSpent}`;
  if (homeLbl) {
    homeLbl.textContent = totalSpent > 0 ? `spent this week across ${state.orders.length} orders` : 'spent this week Â· No orders placed yet';
  }

  const spAmt = $('#spendingPageTotalAmt');
  const spLbl = $('#spendingPageTotalLbl');
  if (spAmt) spAmt.textContent = `â‚¹${totalSpent}`;
  if (spLbl) {
    spLbl.textContent = totalSpent > 0 ? `total recorded spend across campus counters` : 'total recorded spend Â· No orders placed yet';
  }
}

function renderShopperStore(state) {
  const grid = $('#shopperGrid');
  const filterRow = $('#shopperFilterRow');
  if (!grid) return;

  const cats = ['All', ...new Set(state.menuItems.map((m) => m.cat))];
  if (filterRow) {
    filterRow.innerHTML = cats
      .map((c) => {
        const isActive = c === state.activeCat;
        return `
          <button class="filter-chip ${isActive ? 'active' : ''}" data-shopper-cat="${c}">
            ${isActive ? '<span class="material-symbols-outlined" style="font-size:16px;">done</span>' : ''}
            <span>${c}</span>
          </button>
        `;
      })
      .join('');
  }

  const items = state.menuItems.filter(
    (m) => state.activeCat === 'All' || m.cat === state.activeCat
  );

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state" style="padding:40px; grid-column:1 / -1;">
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">storefront</span></div>
        <strong>No fast-track items available</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">Load campus demo data or add items to catalog.</div>
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
          <div class="menu-emoji">${renderItemIcon(it.emoji)}</div>
          <div class="menu-info">
            <div class="mn">${it.name}</div>
            <div class="mc">${it.cat} &middot; ${it.counter}</div>
            <div class="mrow" style="margin-top:8px;">
              <span class="rec-price mono">â‚¹${it.price}</span>
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
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">shopping_bag</span></div>
        <strong>Express Cart is Empty</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">Tap "+ Fast Add" on any item in the store.</div>
      </div>
    `;
    if (sumSub) sumSub.textContent = 'â‚¹0';
    if (sumPack) sumPack.textContent = 'â‚¹0';
    if (sumTot) sumTot.textContent = 'â‚¹0';
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
          <div class="menu-emoji" style="width:36px; height:36px;">${renderItemIcon(it.emoji)}</div>
          <div class="stub-info">
            <div class="t">${it.name}</div>
            <div class="s mono">â‚¹${it.price} each</div>
          </div>
          <div class="qty-ctrl">
            <button data-shopper-dec="${id}">âˆ’</button>
            <span>${qty}</span>
            <button data-shopper-inc="${id}">+</button>
          </div>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;
  if (sumSub) sumSub.textContent = `â‚¹${subtotal}`;
  if (sumPack) sumPack.textContent = `â‚¹${packing}`;
  if (sumTot) sumTot.textContent = `â‚¹${total}`;
  if (btn) btn.disabled = false;
}

function renderShopperReceipts(state) {
  const list = $('#shopperReceiptsList');
  if (!list) return;

  const shopperOrders = state.orders.filter((o) => o.role === 'Shopper');
  if (!shopperOrders.length) {
    list.innerHTML = `
      <div class="empty-state" style="padding:40px;">
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">confirmation_number</span></div>
        <strong>No express receipts found</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">Completed fast-track orders will display here.</div>
      </div>
    `;
    return;
  }

  list.innerHTML = shopperOrders
    .map((o) => `
      <div class="stub-list-item">
        <div class="stub-icon">
          <span class="material-symbols-outlined">confirmation_number</span>
        </div>
        <div class="stub-info">
          <div class="t">${o.token} &middot; ${o.customerName}</div>
          <div class="s">${o.items.map((i) => `${i.qty}Ã— ${i.name}`).join(', ')}</div>
        </div>
        <div>
          <div class="stub-amt mono">â‚¹${o.total}</div>
          <div class="stub-status ${o.status === 'Picked up' ? 'done' : 'progress'}">${o.status}</div>
        </div>
        <div class="stub-actions">
          <button class="mini-btn" data-view-receipt="${o.id}">View Receipt</button>
        </div>
      </div>
    `)
    .join('');
}

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
        <div style="padding:32px 10px; text-align:center; color:var(--md-sys-color-on-surface-variant); font-size:12px;">
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
                <span><strong>${i.qty}Ã—</strong> ${i.name}</span>
                <span class="mono">â‚¹${i.price * i.qty}</span>
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
            <div class="kanban-cust">ðŸ‘¤ ${o.customerName} &middot; <span style="font-weight:400; color:var(--md-sys-color-on-surface-variant);">${o.counter}</span></div>
            <div class="kanban-items">${itemsList}</div>
            <div class="kanban-card-footer">
              <span class="kanban-total">â‚¹${o.total}</span>
              <button class="kanban-advance-btn" data-kitchen-advance="${o.id}" ${isCompleted ? 'disabled' : ''}>
                <span class="material-symbols-outlined" style="font-size:15px;">${isCompleted ? 'check' : 'arrow_forward'}</span>
                <span>${isCompleted ? 'Picked up âœ“' : `Mark "${nextStageName}"`}</span>
              </button>
            </div>
          </div>
        `;
      })
      .join('');
  });
}

function renderKitchenStock(state) {
  const tbody = $('#kitchenStockTbody');
  if (!tbody) return;

  if (!state.menuItems.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding:32px; color:var(--md-sys-color-on-surface-variant);">
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
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:32px; height:32px; display:flex; align-items:center; justify-content:center; background:var(--md-sys-color-surface-container-high); border-radius:8px;">
                ${renderItemIcon(it.emoji)}
              </div>
              <div>
                <strong>${it.name}</strong>
                <div style="font-size:11px; color:var(--md-sys-color-on-surface-variant);">${it.cat} &middot; â‚¹${it.price}</div>
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
              <button data-stock-dec="${it.id}" title="Decrease stock">âˆ’</button>
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
                <span class="pos-item-emoji">${renderItemIcon(it.emoji)}</span>
                <span class="pos-item-name">${it.name}</span>
                <span class="pos-item-price">â‚¹${it.price} (${it.stock} left)</span>
              </button>
            `;
          })
          .join('')
      : '<div style="grid-column:1 / -1; padding:20px; color:var(--md-sys-color-on-surface-variant); text-align:center;">No items match POS search.</div>';
  }

  if (lines) {
    const entries = Object.entries(state.posCart);
    if (!entries.length) {
      lines.innerHTML = '<div style="padding:16px 0; text-align:center; color:var(--md-sys-color-on-surface-variant); font-size:12px;">Register bill empty. Tap items to add.</div>';
      if (subEl) subEl.textContent = 'â‚¹0';
      if (packEl) packEl.textContent = 'â‚¹0';
      if (totEl) totEl.textContent = 'â‚¹0';
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
          <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; font-size:12.5px;">
            <div>
              <strong>${it.name}</strong>
              <div style="font-size:11px; color:var(--md-sys-color-on-surface-variant);">â‚¹${it.price} Ã— ${qty}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mono" style="font-weight:700;">â‚¹${lineTotal}</span>
              <div class="inline-stock-ctrl">
                <button data-pos-dec="${id}">âˆ’</button>
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
    if (subEl) subEl.textContent = `â‚¹${subtotal}`;
    if (packEl) packEl.textContent = `â‚¹${packing}`;
    if (totEl) totEl.textContent = `â‚¹${total}`;
    if (submitBtn) submitBtn.disabled = false;
  }
}

function renderKitchenFeedback(state) {
  const feed = $('#kitchenFeedbackList');
  if (!feed) return;

  if (!state.feedbacks.length) {
    feed.innerHTML = `
      <div class="empty-state" style="padding:40px;">
        <div class="em"><span class="material-symbols-outlined" style="font-size:36px;">feedback</span></div>
        <strong>No complaints or feedback logged</strong>
        <div style="font-size:12px; color:var(--md-sys-color-on-surface-variant); margin-top:4px;">Incoming student ratings will stream here in real time.</div>
      </div>
    `;
    return;
  }

  feed.innerHTML = state.feedbacks
    .map((fb) => `
      <div class="stub-list-item">
        <div class="stub-icon">
          <span class="material-symbols-outlined" style="color:var(--md-sys-color-primary);">star</span>
        </div>
        <div class="stub-info">
          <div class="t">
            <strong>${fb.studentName}</strong> &middot; 
            <span style="color:var(--md-sys-color-primary); font-weight:700;">${'â˜…'.repeat(fb.rating)}</span> 
            <span class="dev-fixture-badge" style="margin-left:6px;">${fb.category}</span>
          </div>
          <div class="s" style="margin-top:4px; font-size:12.5px; color:var(--md-sys-color-on-surface);">${fb.comment}</div>
        </div>
        <div class="mono" style="font-size:11px; color:var(--md-sys-color-on-surface-variant); white-space:nowrap;">${fb.date}</div>
      </div>
    `)
    .join('');
}

function renderAdminOverview(state) {
  const rev = state.orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const revEl = $('#metricTotalRevenue');
  const revSub = $('#metricTotalRevenueSub');
  if (revEl) revEl.textContent = `â‚¹${rev}`;
  if (revSub) revSub.textContent = `Across ${state.orders.length} total orders`;

  const volEl = $('#metricOrderVolume');
  const volSub = $('#metricOrderVolumeSub');
  if (volEl) volEl.textContent = state.orders.length;
  if (volSub) volSub.textContent = `${state.orders.filter((o) => o.status === 'Picked up').length} completed`;

  const lowCount = state.menuItems.filter((m) => m.stock <= (m.lowThreshold || 5)).length;
  const lowEl = $('#metricLowStockCount');
  const lowSub = $('#metricLowStockSub');
  if (lowEl) lowEl.textContent = lowCount;
  if (lowSub) lowSub.textContent = `${state.menuItems.filter((m) => m.stock === 0).length} out of stock`;

  const inFlight = state.orders.filter((o) => o.status === 'Placed' || o.status === 'Preparing').length;
  const infEl = $('#metricActiveOrders');
  const infSub = $('#metricActiveOrdersSub');
  if (infEl) infEl.textContent = inFlight;
  if (infSub) infSub.textContent = 'Active in kitchen queue';

  const hours = [
    { label: '8-10', name: 'Breakfast', count: 0 },
    { label: '10-12', name: 'Brunch', count: 0 },
    { label: '12-14', name: 'Lunch Rush', count: 0 },
    { label: '14-16', name: 'Afternoon', count: 0 },
    { label: '16-18', name: 'Tea & Snacks', count: 0 },
    { label: '18-21', name: 'Dinner', count: 0 }
  ];

  state.orders.forEach((o) => {
    const hr = new Date(o.createdAt).getHours();
    if (hr >= 8 && hr < 10) hours[0].count++;
    else if (hr >= 10 && hr < 12) hours[1].count++;
    else if (hr >= 12 && hr < 14) hours[2].count++;
    else if (hr >= 14 && hr < 16) hours[3].count++;
    else if (hr >= 16 && hr < 18) hours[4].count++;
    else if (hr >= 18 && hr <= 21) hours[5].count++;
    else hours[2].count++;
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
      velocityEl.innerHTML = '<div style="padding:20px; color:var(--md-sys-color-on-surface-variant); text-align:center; font-size:12px;">No order velocity recorded yet.</div>';
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

function renderAdminAudit(state) {
  const tbody = $('#adminAuditTbody');
  if (!tbody) return;

  if (!state.menuItems.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center; padding:32px; color:var(--md-sys-color-on-surface-variant);">
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
            <div class="mono" style="font-size:11px; color:var(--md-sys-color-on-surface-variant);">${it.id}</div>
          </td>
          <td>${it.cat}</td>
          <td>${it.counter}</td>
          <td class="mono" style="font-weight:700;">${it.stock}</td>
          <td class="mono">${it.lowThreshold || 5}</td>
          <td>${sbHTML(status)}</td>
          <td>
            <span style="color:${isCritical ? 'var(--md-sys-color-low)' : 'var(--md-sys-color-avail)'}; font-weight:600; font-size:12px;">
              ${isCritical ? 'âš ï¸⚠️ Urgent Restock' : 'âœ“ Normal'}
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
    toast('No inventory items to export.', 'warning');
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
  toast('Audit CSV exported successfully!', 'download');
}

function showReceiptModal(order) {
  const modal = $('#receiptModal');
  if (!modal || !order) return;

  $('#modalTokenNum').textContent = order.token;
  $('#modalCounterName').textContent = order.counter || 'Campus Dining Counter';
  $('#modalTotalPaid').textContent = `â‚¹${order.total}`;
  $('#modalReceiptStatus').textContent = order.status;

  const lines = $('#modalReceiptLines');
  if (lines) {
    lines.innerHTML = (order.items || [])
      .map(
        (it) => `
          <div class="receipt-row">
            <span>${it.qty}Ã— ${it.name}</span>
            <span class="mono">â‚¹${it.price * it.qty}</span>
          </div>
        `
      )
      .join('') +
      `
        <div class="receipt-row" style="color:var(--md-sys-color-on-surface-variant); font-size:12px;">
          <span>Packaging Fee</span>
          <span class="mono">â‚¹${order.packing || 10}</span>
        </div>
      `;
  }

  modal.classList.remove('hide');
}

function hideReceiptModal() {
  const modal = $('#receiptModal');
  if (modal) modal.classList.add('hide');
}

function setupEventHandlers() {
  const roleSwitcher = $('#roleSwitcher');
  if (roleSwitcher) {
    roleSwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.role-btn[data-role]');
      if (!btn) return;
      const userRole = (store.state.currentUser && store.state.currentUser.role) || 'user';
      if (userRole !== 'admin') {
        toast('ðŸ”’ Access Restricted: The top bar role switcher is exclusively available for Administrators.', 'error');
        return;
      }
      const newRole = btn.dataset.role;
      store.setRole(newRole);
      toast(`Switched perspective to ${roleLabels[newRole] || newRole}`, 'sync');
    });
  }
  const sidebar = $('#appSidebar');
  const drawerBackdrop = $('#drawerBackdrop');
  function openMobileDrawer() {
    if (sidebar) sidebar.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileDrawer() {
    if (sidebar) sidebar.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  const mobileMenuBtn = $('#mobileMenuBtn');
  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);

  const drawerCloseBtn = $('#drawerCloseBtn');
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);

  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMobileDrawer);

  const bottomMoreBtns = [$('#bottomMoreBtn'), $('#bottomMoreKitchenBtn'), $('#bottomMoreAdminBtn')];
  bottomMoreBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openMobileDrawer);
  });
  const mobileThemeToggleBtn = $('#mobileThemeToggleBtn');
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      const isKitchen = document.body.getAttribute('data-theme') === 'kitchen';
      if (isKitchen) {
        document.body.removeAttribute('data-theme');
        const icon = $('#mobileThemeIcon');
        if (icon) icon.textContent = 'dark_mode';
      } else {
        document.body.setAttribute('data-theme', 'kitchen');
        const icon = $('#mobileThemeIcon');
        if (icon) icon.textContent = 'light_mode';
      }
    });
  }
  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('.nav-item[data-page], .m3-bottom-nav-item[data-page]');
    if (navBtn) {
      const pageKey = navBtn.dataset.page;
      store.setPage(pageKey);
      closeMobileDrawer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const gotoBtn = e.target.closest('[data-goto]');
    if (gotoBtn) {
      const pageKey = gotoBtn.dataset.goto;
      store.setPage(pageKey);
      closeMobileDrawer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  });
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
  const searchInput = $('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (store.state.activeRole === 'user' || store.state.activeRole === 'student') {
        store.setPage('menu');
        renderStudentMenu(store.state, e.target.value);
      }
    });
  }
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
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      store.addToCart(addBtn.dataset.add);
      return;
    }

    const incBtn = e.target.closest('[data-inc]');
    if (incBtn) {
      store.changeCartQty(incBtn.dataset.inc, 1);
      return;
    }

    const decBtn = e.target.closest('[data-dec]');
    if (decBtn) {
      store.changeCartQty(decBtn.dataset.dec, -1);
      return;
    }

    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      store.removeCartItem(removeBtn.dataset.remove);
      return;
    }
  });
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
  const checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const counter = $('#checkoutCounterSelect') ? $('#checkoutCounterSelect').value : 'Counter 2 (Quick Bites)';
      const paymentMethod = store.state.selectedPaymentMethod || 'Campus UPI';
      const order = store.createOrder({
        itemsMap: store.state.cart,
        customerName: store.state.currentUser ? store.state.currentUser.name : 'Campus User',
        role: 'User',
        counter,
        paymentMethod
      });

      if (order) {
        store.state.cart = {};
        store.save();
        toast(`Order ${order.token} placed successfully!`, 'check_circle');
        showReceiptModal(order);
        store.setPage('home');
      }
    });
  }
  const advanceBtn = $('#advanceBtn');
  if (advanceBtn) {
    advanceBtn.addEventListener('click', () => {
      const orderId = advanceBtn.dataset.orderId;
      if (orderId) store.advanceOrderStatus(orderId);
    });
  }
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
        toast(`Express Token ${order.token} issued!`, 'flash_on');
        showReceiptModal(order);
        store.setPage('shopper-receipts');
      }
    });
  }
  document.addEventListener('click', (e) => {
    const kAdvance = e.target.closest('[data-kitchen-advance]');
    if (kAdvance) {
      store.advanceOrderStatus(kAdvance.dataset.kitchenAdvance);
      return;
    }
  });
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
        toast(`POS Token ${order.token} printed!`, 'print');
        showReceiptModal(order);
      }
    });
  }
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
  const enterTopBtn = $('#enterExampleDataBtnTop');
  if (enterTopBtn) {
    enterTopBtn.addEventListener('click', () => {
      store.generateRandomExampleData();
      toast('ðŸŽ² Random example campus data injected!', 'casino');
    });
  }

  const clearTopBtnEl = $('#clearDataBtnTop');
  if (clearTopBtnEl) {
    clearTopBtnEl.addEventListener('click', () => {
      store.resetToEmptyState();
      toast('ðŸ—‘ï¸ All data cleared. Website is now empty [].', 'delete_sweep');
    });
  }

  const loadFixtureBtn = $('#loadFixtureBtn');
  if (loadFixtureBtn) {
    loadFixtureBtn.addEventListener('click', () => {
      store.generateRandomExampleData();
      toast('ðŸŽ² Random example campus data injected!', 'casino');
    });
  }

  const resetDataBtn = $('#resetDataBtn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      store.resetToEmptyState();
      toast('ðŸ—‘ï¸ State reset to empty schema []', 'restart_alt');
    });
  }
  const openItemBtn = $('#openAddItemModalBtn');
  if (openItemBtn) {
    openItemBtn.addEventListener('click', () => {
      if (!store.hasPermission('canEditMenu')) {
        toast('ðŸ”’ Permission Denied: Users cannot alter menu details or add items.', 'error');
        return;
      }
      store.setRole('admin');
      store.setPage('admin-items');
    });
  }

  const openItemBtnStock = $('#openAddItemModalBtnStock');
  if (openItemBtnStock) {
    openItemBtnStock.addEventListener('click', () => {
      if (!store.hasPermission('canEditMenu')) {
        toast('ðŸ”’ Permission Denied: Users cannot alter menu details or add items.', 'error');
        return;
      }
      store.setRole('admin');
      store.setPage('admin-items');
    });
  }

  const openItemBtnAdmin = $('#openAddItemModalBtnAdmin');
  if (openItemBtnAdmin) {
    openItemBtnAdmin.addEventListener('click', () => {
      if (!store.hasPermission('canEditMenu')) {
        toast('ðŸ”’ Permission Denied: Users cannot alter menu details or add items.', 'error');
        return;
      }
      store.setPage('admin-items');
    });
  }
  const toggleStaffBtn = $('#toggleStaffUnlockBtn');
  if (toggleStaffBtn) {
    toggleStaffBtn.addEventListener('click', () => {
      store.toggleStaffUnlock();
    });
  }

  const itemFormSubmit = $('#itemFormSubmit');
  if (itemFormSubmit) {
    itemFormSubmit.addEventListener('click', () => {
      const name = $('#itemFormName').value.trim();
      const emoji = $('#itemFormEmoji').value.trim() || 'restaurant';
      const cat = $('#itemFormCat').value;
      const counter = $('#itemFormCounter').value;
      const price = $('#itemFormPrice').value;
      const stock = $('#itemFormStock').value;
      const lowThreshold = $('#itemFormThreshold').value;
      const restockTime = $('#itemFormRestock').value.trim() || '15 min';

      if (!name || !price) {
        toast('Please enter item name and price', 'warning');
        return;
      }

      store.addMenuItem({ name, emoji, cat, counter, price, stock, lowThreshold, restockTime });
      $('#itemFormName').value = '';
      $('#itemFormPrice').value = '';
      store.setPage('admin-audit');
    });
  }
  const exportCsvBtn = $('#exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => exportAuditCsv(store.state));
  }
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
        toast('Please pick a star rating first', 'star');
        return;
      }
      const comment = $('#feedbackText') ? $('#feedbackText').value.trim() : '';
      store.addFeedback({ rating: selectedStars, category: selectedFeedbackCat, comment });
      if ($('#feedbackText')) $('#feedbackText').value = '';
      selectedStars = 0;
      $$('#starRow .star').forEach((s) => s.classList.remove('on'));
    });
  }
  const qUser = $('#quickLoginUser');
  if (qUser) {
    qUser.addEventListener('click', () => {
      store.login('user@student.campus.edu', 'Rohan Sharma');
    });
  }

  const qKitchen = $('#quickLoginKitchen');
  if (qKitchen) {
    qKitchen.addEventListener('click', () => {
      store.login('kitchen@campus.edu', 'Chef Rajesh Kumar');
    });
  }

  const qAdmin = $('#quickLoginAdmin');
  if (qAdmin) {
    qAdmin.addEventListener('click', () => {
      store.login('admin@campus.edu', 'Dr. Vikram Malhotra');
    });
  }

  const customLoginBtn = $('#customLoginBtn');
  if (customLoginBtn) {
    customLoginBtn.addEventListener('click', () => {
      const email = $('#customEmailInput') ? $('#customEmailInput').value.trim() : '';
      const name = $('#customNameInput') ? $('#customNameInput').value.trim() : null;
      if (!email) {
        toast('Please enter a campus email address to sign in', 'warning');
        return;
      }
      store.login(email, name);
      if ($('#customEmailInput')) $('#customEmailInput').value = '';
      if ($('#customNameInput')) $('#customNameInput').value = '';
    });
  }

  const logoutSettingsBtn = $('#logoutSettingsBtn');
  if (logoutSettingsBtn) {
    logoutSettingsBtn.addEventListener('click', () => {
      store.logout();
    });
  }

  const logoutNavBtn = $('#logoutNavBtn');
  if (logoutNavBtn) {
    logoutNavBtn.addEventListener('click', () => {
      store.logout();
    });
  }

  document.addEventListener('click', (e) => {
    const navItem = e.target.closest('[data-page]');
    if (navItem) {
      const pageKey = navItem.dataset.page;
      const rawRole = (store.state.currentUser && (store.state.currentUser.role || (window.getUserRole ? window.getUserRole(store.state.currentUser.email) : 'student'))) || 'student';
      const role = (rawRole === 'student' || rawRole === 'user') ? 'student' : rawRole;
      if (role === 'student' && (pageKey.startsWith('admin-') || pageKey.startsWith('kitchen-'))) {
        e.preventDefault();
        e.stopPropagation();
        alert("Access denied: Students cannot access this section");
        const isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
        return;
      }
      if (role === 'kitchen' && pageKey.startsWith('admin-')) {
        e.preventDefault();
        e.stopPropagation();
        alert("Access denied: Kitchen staff cannot access Admin Dashboard");
        store.setPage('kitchen-kanban');
        return;
      }
    }
    const roleBtn = e.target.closest('.role-btn[data-role]');
    if (roleBtn) {
      const targetRole = roleBtn.dataset.role;
      const rawRole = (store.state.currentUser && (store.state.currentUser.role || (window.getUserRole ? window.getUserRole(store.state.currentUser.email) : 'student'))) || 'student';
      const role = (rawRole === 'student' || rawRole === 'user') ? 'student' : rawRole;
      if (role === 'student' && (targetRole === 'admin' || targetRole === 'kitchen')) {
        e.preventDefault();
        e.stopPropagation();
        alert("Access denied: Students cannot access this section");
        const isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
        return;
      }
      if (role === 'kitchen' && targetRole === 'admin') {
        e.preventDefault();
        e.stopPropagation();
        alert("Access denied: Kitchen staff cannot access Admin Dashboard");
        return;
      }
    }
  }, true);

  window.addEventListener('hashchange', () => {
    const hash = (window.location.hash || '').replace('#', '');
    if (!hash) return;
    const rawRole = (store.state.currentUser && (store.state.currentUser.role || (window.getUserRole ? window.getUserRole(store.state.currentUser.email) : 'student'))) || 'student';
    const role = (rawRole === 'student' || rawRole === 'user') ? 'student' : rawRole;
    if (role === 'student' && (hash.startsWith('admin') || hash.startsWith('kitchen'))) {
      alert("Access denied: Students cannot access this section");
      const isLocal = window.location.protocol === 'file:';
      window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
      return;
    }
    if (role === 'kitchen' && hash.startsWith('admin')) {
      alert("Access denied: Kitchen staff cannot access Admin Dashboard");
      store.setPage('kitchen-kanban');
      return;
    }
    store.setPage(hash);
  });
}

function renderApp(state) {
  renderShell(state);

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
store.subscribe((state) => {
  renderApp(state);
});
setupEventHandlers();
renderApp(store.state);
try {
  if ('BroadcastChannel' in window) {
    const authChannel = new BroadcastChannel('inventrack_auth');
    authChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'AUTH_SUCCESS' && event.data.user) {
        const user = event.data.user;
        store.state.currentUser = user;
        store.state.loggedIn = true;
        const role = user.role || 'user';
        store.state.activeRole = role;
        store.state.activePage = role === 'admin' ? 'admin-overview' : (role === 'kitchen' ? 'kitchen-kanban' : 'home');
        if (role === 'kitchen') {
          try {
            document.documentElement.setAttribute('data-theme', 'kitchen');
            document.body.setAttribute('data-theme', 'kitchen');
          } catch(e){}
        }
        store.save();
        renderApp(store.state);
      }
    };
  }
} catch (e) {}

window.addEventListener('storage', (e) => {
  if (e.key === 'invenTrack_user') {
    if (!e.newValue) {
      window.location.replace(window.location.protocol === 'file:' ? 'landing.html' : '/landing');
    } else {
      try {
        const user = JSON.parse(e.newValue);
        store.state.currentUser = user;
        store.state.loggedIn = true;
        const role = user.role || 'user';
        store.state.activeRole = role;
        store.state.activePage = role === 'admin' ? 'admin-overview' : (role === 'kitchen' ? 'kitchen-kanban' : 'home');
        if (role === 'kitchen') {
          try {
            document.documentElement.setAttribute('data-theme', 'kitchen');
            document.body.setAttribute('data-theme', 'kitchen');
          } catch(err){}
        }
        store.save();
        renderApp(store.state);
      } catch (err) {}
    }
  }
});


(async function initFirebaseObserver() {
  if (typeof window === 'undefined' || !window.__FIREBASE_CONFIG__) return;
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
    const app = initializeApp(window.__FIREBASE_CONFIG__);
    const auth = getAuth(app);
    window.__FIREBASE_AUTH__ = auth;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const determinedRole = window.getUserRole ? window.getUserRole(user.email) : 'student';
        if (store.state.currentUser) {
          store.state.currentUser.email = user.email;
          store.state.currentUser.role = determinedRole;
          store.state.currentUser.name = user.displayName || store.state.currentUser.name;
          store.state.currentUser.photoURL = user.photoURL || store.state.currentUser.photoURL;
        }
        if (determinedRole === 'student' || determinedRole === 'user') {
          const currentPage = store.state.activePage || '';
          if (currentPage.startsWith('admin-') || currentPage.startsWith('kitchen-')) {
            alert("Access denied: Students cannot access this section");
            const isLocal = window.location.protocol === 'file:';
            window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
            return;
          }
        } else if (determinedRole === 'kitchen') {
          const currentPage = store.state.activePage || '';
          if (currentPage.startsWith('admin-')) {
            alert("Access denied: Kitchen staff cannot access Admin Dashboard");
            store.setPage('kitchen-kanban');
            return;
          }
        }
        renderApp(store.state);
      }
    });
  } catch(e) {
    console.warn('Firebase observer init in app.js:', e);
  }
})();
