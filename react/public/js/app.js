try {
  ['invenTrack_user', 'inventrack_m3_state'].forEach((k) => {
    let raw = localStorage.getItem(k);
    if (raw) {
      let changed = false;
      if (raw.includes('\u00C2') || raw.includes('\u00B7') || raw.includes('\\u00C2') || raw.includes('\\u00B7') || raw.includes('\\u2022') || raw.includes('&middot;')) {
        raw = raw.replace(/[\u00C2\u00A0\u00B7\u2022\u26a1]/g, '').replace(/\\u00C2\\u00B7/g, '').replace(/\\u00C2/g, '').replace(/\\u00B7/g, '').replace(/\\u2022/g, '').replace(/&middot;/g, '');
        changed = true;
      }
      if (raw.includes('photo-1601050690597-df0568f70950')) {
        raw = raw.split('photo-1601050690597-df0568f70950').join('photo-1666190092159-3171cf0fbb12');
        changed = true;
      }
      if (raw.includes('photo-1556881286-fc6915169721')) {
        raw = raw.split('photo-1556881286-fc6915169721').join('photo-1637792357005-c3ba175df533');
        changed = true;
      }
      if (raw.includes('photo-1626777552726-4a6b54c97e46')) {
        raw = raw.split('photo-1626777552726-4a6b54c97e46').join('photo-1626700051175-6818013e1d4f');
        changed = true;
      }
      if (k === 'inventrack_m3_state') {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.menuItems)) {
            parsed.menuItems.forEach((m) => {
              if (typeof m.stock === 'number' && m.stock < 15) {
                m.stock = Math.max(m.stock, 28);
                changed = true;
              }
            });
            if (changed) {
              raw = JSON.stringify(parsed);
            }
          }
        } catch(pe) {}
      }
      if (changed) {
        localStorage.setItem(k, raw);
      }
    }
  });
} catch(e) {}

// storage_sanitizer_added

const DATA_INJECTION_SLOT = {
  menuItems: [],
  orders: [],
  users: [],
  feedbacks: []
};

const CAMPUS_DEMO_FIXTURE = {
      menuItems: [
    { id: 'item-1', name: 'Chicken Dum Biryani', emoji: 'restaurant', price: 185, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', stock: 25, lowThreshold: 8, restockTime: '15 min', diet: 'non-veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-2', name: 'Hyderabadi Veg Biryani', emoji: 'rice_bowl', price: 150, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', stock: 18, lowThreshold: 5, restockTime: '20 min', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-3', name: 'Ghee Podi Masala Dosa', emoji: 'breakfast_dining', price: 90, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', stock: 30, lowThreshold: 6, restockTime: '10 min', diet: 'veg', spice: 'Mild', isExpress: false, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-4', name: 'Crispy Veg Patty Burger', emoji: 'lunch_dining', price: 70, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', stock: 22, lowThreshold: 5, restockTime: '12 min', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-5', name: 'Grilled Cheese Sandwich', emoji: 'bakery_dining', price: 60, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', stock: 22, lowThreshold: 5, restockTime: '8 min', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-6', name: 'Wood-Fired Pizza Slice', emoji: 'local_pizza', price: 120, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', stock: 20, lowThreshold: 4, restockTime: '25 min', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-7', name: 'Peri-Peri Salted Fries', emoji: 'fastfood', price: 55, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', stock: 30, lowThreshold: 8, restockTime: '5 min', diet: 'veg', spice: 'Hot', isExpress: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-8', name: 'Artisan Cold Coffee', emoji: 'local_cafe', price: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 35, lowThreshold: 10, restockTime: '5 min', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-9', name: 'Spiced Masala Buttermilk', emoji: 'emoji_food_beverage', price: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', stock: 28, lowThreshold: 10, restockTime: '5 min', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1637792357005-c3ba175df533?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-10', name: 'Warm Gulab Jamun (2 pcs)', emoji: 'icecream', price: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', stock: 26, lowThreshold: 5, restockTime: '15 min', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-11', name: 'Belgian Chocolate Brownie', emoji: 'cookie', price: 65, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', stock: 22, lowThreshold: 5, restockTime: '15 min', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80' },
    { id: 'item-12', name: 'Paneer Butter Masala Combo', emoji: 'dinner_dining', price: 160, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', stock: 12, lowThreshold: 5, restockTime: '15 min', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80' }
  ],
  orders: [
    {
      id: 'ord-101',
      token: '#A-038',
      customerName: 'Rohan Sharma',
      role: 'Student',
      items: [
        { id: 'item-1', name: 'Chicken Dum Biryani', qty: 1, price: 185, note: 'Extra spicy, less oil' },
        { id: 'item-8', name: 'Artisan Cold Coffee', qty: 1, price: 45, note: 'Less ice' }
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
        { id: 'item-4', name: 'Crispy Veg Patty Burger', qty: 1, price: 70, note: 'No onion' },
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
    // Hydrate dedicated cart and active token from localStorage
    let cachedCart = {};
    try {
      const rawCart = localStorage.getItem('invenTrack_cart');
      if (rawCart) cachedCart = JSON.parse(rawCart);
    } catch (e) {}

    let cachedCartNotes = {};
    try {
      const rawNotes = localStorage.getItem('invenTrack_cart_notes');
      if (rawNotes) cachedCartNotes = JSON.parse(rawNotes);
    } catch (e) {}

    let cachedActiveOrder = null;
    try {
      const rawOrder = localStorage.getItem('invenTrack_active_order');
      if (rawOrder) cachedActiveOrder = JSON.parse(rawOrder);
    } catch (e) {}

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
        menuItems: (DATA_INJECTION_SLOT.menuItems && DATA_INJECTION_SLOT.menuItems.length > 0) ? [...DATA_INJECTION_SLOT.menuItems] : [...CAMPUS_DEMO_FIXTURE.menuItems],
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
    } else {
      try {
        var curTheme = localStorage.getItem('invenTrack_theme');
        if (curTheme === 'kitchen') {
          document.documentElement.removeAttribute('data-theme');
          document.body.removeAttribute('data-theme');
          localStorage.setItem('invenTrack_theme', 'light');
        }
      } catch(e){}
    }

    if (parsed) {
      return {
        menuItems: parsed.menuItems || [...DATA_INJECTION_SLOT.menuItems],
        orders: (() => {
          let list = parsed.orders || [...DATA_INJECTION_SLOT.orders];
          if (cachedActiveOrder && cachedActiveOrder.status !== 'Picked up') {
            const idx = list.findIndex((o) => o.id === cachedActiveOrder.id || o.token === cachedActiveOrder.token);
            if (idx !== -1) list[idx] = { ...list[idx], ...cachedActiveOrder };
            else list.unshift(cachedActiveOrder);
          }
          return list;
        })(),
        users: parsed.users || [...DATA_INJECTION_SLOT.users],
        feedbacks: parsed.feedbacks || [...DATA_INJECTION_SLOT.feedbacks],
        cart: (parsed.cart && Object.keys(parsed.cart).length > 0) ? parsed.cart : cachedCart,
        cartNotes: (parsed.cartNotes && typeof parsed.cartNotes === 'object') ? parsed.cartNotes : (cachedCartNotes || {}),
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
      menuItems: (DATA_INJECTION_SLOT.menuItems && DATA_INJECTION_SLOT.menuItems.length > 0) ? [...DATA_INJECTION_SLOT.menuItems] : [...CAMPUS_DEMO_FIXTURE.menuItems],
      orders: [...DATA_INJECTION_SLOT.orders],
      users: [...DATA_INJECTION_SLOT.users],
      feedbacks: [...DATA_INJECTION_SLOT.feedbacks],
      cart: cachedCart || {},
      cartNotes: cachedCartNotes || {},
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
      localStorage.setItem('invenTrack_cart', JSON.stringify(this.state.cart || {}));
      localStorage.setItem('invenTrack_cart_notes', JSON.stringify(this.state.cartNotes || {}));
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          menuItems: this.state.menuItems,
          orders: this.state.orders,
          users: this.state.users,
          feedbacks: this.state.feedbacks,
          cart: this.state.cart,
          cartNotes: this.state.cartNotes || {},
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
      } else if (stockRand < 0.42) {
        stock = Math.floor(1 + Math.random() * 5); // 1 to 5: triggers animated urgency tag
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
      toast(' Role switching is only permitted for Administrators.', 'error');
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
      toast('Permission Denied: Users cannot alter item stock levels or remaining quantities.', 'error');
      return;
    }

    const item = findCatalogItem(this.state, itemId);
    if (!item) return;
    const oldStock = item.stock;
    item.stock = Math.max(0, item.stock + delta);
    if (item.stock === 0 && oldStock > 0) {
      toast(`"${item.name}" is now OUT OF STOCK`, 'warning');
    } else if (item.stock > 0 && oldStock === 0) {
      toast(`"${item.name}" is RESTOCKED (${item.stock} available)`, 'check_circle');
    } else {
      toast(`Stock updated: ${item.name} (${item.stock})`, 'inventory');
    }
    this.save();
  }

  setStockZero(itemId) {
    if (!this.hasPermission('canAdjustStock')) {
      toast('Permission Denied: Only kitchen staff and admin can alter item availability.', 'error');
      return;
    }

    const item = findCatalogItem(this.state, itemId);
    if (!item) return;
    item.stock = 0;
    toast(`Marked "${item.name}" as Out of Stock`, 'cancel');
    this.save();
  }
  addMenuItem(itemData) {
    if (!this.hasPermission('canEditMenu')) {
      toast('Permission Denied: Users cannot add or modify menu catalog items.', 'error');
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
  async addToCart(itemId) {
    const prevCart = { ...(this.state.cart || {}) };
    const currentQty = this.state.cart[itemId] || 0;

    // 1. Optimistic Update: Immediately increment and update UI state, counters & totals
    this.state.cart[itemId] = currentQty + 1;
    this.state.shopperCart = this.state.cart;
    this.save();
    toast('Added item to cart', 'shopping_cart');

    // 2. Inventory & Network Verification
    try {
      const item = findCatalogItem(this.state, itemId);
      if (!item || item.stock <= 0 || (currentQty + 1) > item.stock) {
        throw new Error('OUT_OF_STOCK');
      }

      if (typeof window !== 'undefined' && window.INVENTRACK_API_URL && navigator.onLine) {
        const res = await fetch(`${window.INVENTRACK_API_URL}/inventory/${itemId}`).catch(() => null);
        if (res && res.ok) {
          const remoteData = await res.json().catch(() => null);
          if (remoteData && typeof remoteData.stock === 'number' && remoteData.stock < (currentQty + 1)) {
            throw new Error('OUT_OF_STOCK');
          }
        }
      }
    } catch (err) {
      // Rollback gracefully on inventory failure
      this.state.cart = prevCart;
      this.state.shopperCart = prevCart;
      this.save();
      triggerHaptic(100);
      toast('Item currently out of stock', 'cancel');
    }
  }

  async changeCartQty(itemId, delta) {
    const prevCart = { ...(this.state.cart || {}) };
    const current = this.state.cart[itemId] || 0;
    const next = current + delta;

    // 1. Optimistic Update: Immediately apply next quantity and re-render
    if (next <= 0) {
      delete this.state.cart[itemId];
      if (this.state.cartNotes) delete this.state.cartNotes[itemId];
    } else {
      this.state.cart[itemId] = next;
    }
    this.state.shopperCart = this.state.cart;
    this.save();

    // 2. Inventory verification if increasing quantity
    if (delta > 0) {
      try {
        const item = findCatalogItem(this.state, itemId);
        if (!item || item.stock <= 0 || next > item.stock) {
          throw new Error('OUT_OF_STOCK');
        }

        if (typeof window !== 'undefined' && window.INVENTRACK_API_URL && navigator.onLine) {
          const res = await fetch(`${window.INVENTRACK_API_URL}/inventory/${itemId}`).catch(() => null);
          if (res && res.ok) {
            const remoteData = await res.json().catch(() => null);
            if (remoteData && typeof remoteData.stock === 'number' && remoteData.stock < next) {
              throw new Error('OUT_OF_STOCK');
            }
          }
        }
      } catch (err) {
        // Rollback gracefully
        this.state.cart = prevCart;
        this.state.shopperCart = prevCart;
        this.save();
        triggerHaptic(100);
        toast('Item currently out of stock', 'cancel');
      }
    }
  }

  setCartItemNote(itemId, noteText) {
    if (!this.state.cartNotes) this.state.cartNotes = {};
    const trimmed = (noteText || '').trim().slice(0, 60);
    if (!trimmed) {
      delete this.state.cartNotes[itemId];
    } else {
      this.state.cartNotes[itemId] = trimmed;
    }
    this.save();
  }

  removeCartItem(itemId) {
    delete this.state.cart[itemId];
    if (this.state.cartNotes) delete this.state.cartNotes[itemId];
    this.state.shopperCart = this.state.cart;
    this.save();
    toast('Item removed from cart', 'delete');
  }

  addToShopperCart(itemId) {
    return this.addToCart(itemId);
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

  createOrder({ itemsMap, customerName, role, counter, paymentMethod, pickupTime = 'Instant', packagingFee = 10, cartNotes }) {
    const itemEntries = Object.entries(itemsMap);
    if (!itemEntries.length) return null;

    for (const [id, qty] of itemEntries) {
      let item = findCatalogItem(this.state, id) || this.state.menuItems.find((m) => m.id === id);
      if (!item) {
        item = { id, name: 'Campus Favorite', stock: 25, price: 50 };
      }
      // If stock in localStorage was depleted from earlier demo orders, automatically replenish
      if (typeof item.stock !== 'number' || item.stock < qty) {
        item.stock = Math.max(qty + 12, (item.lowThreshold || 5) * 3);
        const liveIdx = this.state.menuItems.findIndex((m) => m.id === id);
        if (liveIdx !== -1) {
          this.state.menuItems[liveIdx].stock = item.stock;
        } else {
          this.state.menuItems.push({ ...item });
        }
      }
    }

    for (const [id, qty] of itemEntries) {
      let item = this.state.menuItems.find((m) => m.id === id);
      if (!item) {
        const catItem = findCatalogItem(this.state, id);
        if (catItem) {
          item = { ...catItem };
          this.state.menuItems.push(item);
        }
      }
      if (item) item.stock = Math.max(0, item.stock - qty);
    }

    const orderItems = itemEntries.map(([id, qty]) => {
      const it = findCatalogItem(this.state, id) || this.state.menuItems.find((m) => m.id === id) || { name: 'Item', price: 0 };
      const note = (cartNotes && cartNotes[id]) || (this.state.cartNotes && this.state.cartNotes[id]) || '';
      const itemObj = {
        id,
        name: it.name,
        qty,
        price: it.price
      };
      if (note && note.trim()) {
        itemObj.note = note.trim().slice(0, 60);
      }
      return itemObj;
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
      pickupTime: pickupTime || 'Instant',
      status: 'Placed',
      stageIndex: 0,
      counter: counter || 'Counter 2 (Quick Bites)',
      createdAt: new Date().toISOString()
    };

    if (paymentMethod === 'Meal Pass' && this.state.currentUser) {
      const curBal = typeof this.state.currentUser.balance === 'number' ? this.state.currentUser.balance : 450;
      this.state.currentUser.balance = Math.max(0, curBal - total);
      try {
        localStorage.setItem('invenTrack_user', JSON.stringify(this.state.currentUser));
      } catch (e) {}
      const mealChip = $('#mealPassBalanceText');
      if (mealChip) {
        mealChip.textContent = `Bal: Rs ${this.state.currentUser.balance}`;
      }
    }
    stopUpiCountdownTimer();
    this.state.pendingUpiOrderRef = null;

    this.state.orders.unshift(newOrder);
    try {
      if (typeof playKitchenOrderDing === 'function') playKitchenOrderDing();
      if (typeof recentNewOrderIds !== 'undefined') recentNewOrderIds.add(newOrder.id);
    } catch(e) {}
    this.save();
    return newOrder;
  }
  advanceOrderStatus(orderId) {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;
    if (order.stageIndex < stages.length - 1) {
      order.stageIndex++;
      order.status = stages[order.stageIndex];
      if (order.status === 'Picked up') {
        try {
          localStorage.removeItem('invenTrack_active_token');
          localStorage.removeItem('invenTrack_active_order');
        } catch (e) {}
      } else {
        try {
          localStorage.setItem('invenTrack_active_order', JSON.stringify(order));
        } catch (e) {}
      }
      if (order.status === 'Ready' || order.status === 'Ready for Pickup') {
        playPickupChime();
        triggerHaptic(80);
      }
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
    toast('Thanks - feedback recorded!', 'thumb_up');
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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


function isDevModeEnabled() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'true' || params.get('dev') === 'true') {
      localStorage.setItem('invenTrack_debug', 'true');
      return true;
    }
    if (params.get('debug') === 'false' || params.get('dev') === 'false') {
      localStorage.removeItem('invenTrack_debug');
      return false;
    }
    return localStorage.getItem('invenTrack_debug') === 'true';
  } catch(e) {
    return false;
  }
}

const roleLabels = {
  user: 'User Portal',
  student: 'User Portal',
  shopper: 'User Portal',
  kitchen: 'Kitchen & Staff',
  admin: 'Admin Portal'
};


function triggerHaptic(duration = 50) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  } catch (e) {}
}

let audioCtx = null;
function playPickupChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.38);

    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.12);
    gain2.gain.setValueAtTime(0, now + 0.12);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.65);
  } catch (e) {}
}

function openTokenSheet(state) {
  const overlay = $('#tokenSheetOverlay');
  const content = $('#tokenSheetContent');
  if (!overlay || !content) return;
  const activeOrder = (state.orders || []).find((o) => o.status !== 'Picked up' && (o.role === 'Student' || !o.role || state.activeRole === 'user'));
  if (!activeOrder) {
    toast('No active order currently in queue', 'info');
    return;
  }
  
  const statusColor = activeOrder.status === 'Ready' ? '#10b981' : (activeOrder.status === 'Preparing' ? '#f59e0b' : '#3b82f6');
  const itemsHtml = Object.entries(activeOrder.itemsMap || {}).map(([id, qty]) => {
    const item = (state.catalog || []).find((c) => c.id === id);
    const title = item ? item.name : id;
    const price = item ? item.price * qty : 0;
    return `
      <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(0,0,0,0.06); font-size:13.5px;">
        <span>${qty}x ${title}</span>
        <span style="font-weight:600;">Rs ${price}</span>
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <div style="text-align:center; padding:12px 0 18px 0;">
      <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.8px; color:var(--md-sys-color-on-surface-variant,#666);">Pickup Token</div>
      <div style="font-size:38px; font-weight:800; color:var(--md-sys-color-primary,#00639b); margin:4px 0 8px 0; letter-spacing:1px;">#${activeOrder.token}</div>
      <div style="display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:9999px; background:${statusColor}18; color:${statusColor}; font-weight:700; font-size:13px;">
        <span style="width:8px; height:8px; border-radius:50%; background:${statusColor};"></span>
        <span>${activeOrder.status || 'Placed'}</span>
      </div>
    </div>

    <div style="background:var(--md-sys-color-surface,#ffffff); border:1px solid var(--md-sys-color-outline-variant,#e0e0e0); border-radius:14px; padding:14px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
        <span style="color:var(--md-sys-color-on-surface-variant,#666);">Assigned Counter</span>
        <span style="font-weight:600;">${activeOrder.counter || 'Counter 2 (Dining Hall)'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px;">
        <span style="color:var(--md-sys-color-on-surface-variant,#666);">Estimated Ready In</span>
        <span style="font-weight:600; color:#10b981;">${activeOrder.status === 'Ready' ? 'Ready Now!' : '4 - 7 mins'}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:13px;">
        <span style="color:var(--md-sys-color-on-surface-variant,#666);">Payment</span>
        <span style="font-weight:600;">${activeOrder.paymentMethod || 'Campus UPI'} (Paid)</span>
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:13px; font-weight:700; margin-bottom:8px; color:var(--md-sys-color-on-surface,#333);">Order Items</div>
      <div style="background:var(--md-sys-color-surface,#ffffff); border:1px solid var(--md-sys-color-outline-variant,#e0e0e0); border-radius:14px; padding:10px 14px;">
        ${itemsHtml || '<div style="font-size:13px; color:#888;">Items details recorded</div>'}
        <div style="display:flex; justify-content:space-between; padding-top:10px; margin-top:6px; font-size:14px; font-weight:700;">
          <span>Total Paid</span>
          <span style="color:var(--md-sys-color-primary,#00639b);">Rs ${activeOrder.total || 0}</span>
        </div>
      </div>
    </div>
  `;

  overlay.classList.add('open');
}

function renderShell(state) {
  const { activeRole, activePage, currentUser } = state;
  const userRole = (currentUser && currentUser.role) || 'student';
  const isAdmin = userRole === 'admin';
  const isKitchen = userRole === 'kitchen';
  const isStudent = !isAdmin && !isKitchen;
  const isDev = isDevModeEnabled();

  const devPill = $('#devPersonaPill');
  if (devPill) {
    devPill.style.display = (isDev || isAdmin) ? 'block' : 'none';
  }

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
  const devBar = $('#devFixtureBar');
  if (devBar) {
    devBar.style.display = isDev ? 'flex' : 'none';
  }

  const badge = $('#dataModeBadge');
  const stats = $('#dataStatsText');
  const isDemoLoaded = state.menuItems.length > 0;
  const activeCount = state.orders.filter((o) => o.status !== 'Picked up').length;

  if (badge) {
    badge.textContent = isDemoLoaded ? 'Active Live State' : 'Empty Schema []';
    badge.style.backgroundColor = isDemoLoaded ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-highest)';
    badge.style.color = isDemoLoaded ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)';
  }
  if (stats) {
    stats.textContent = `(${state.menuItems.length} items, ${activeCount} active orders)`;
  }

  if (isDev) {
    console.debug('[InvenTrack State Engine]', isDemoLoaded ? 'Active Live State' : 'Empty Schema []', `(${state.menuItems.length} items, ${activeCount} active orders)`);
  }

  const clearTopBtn = $('#clearDataBtnTop');
  if (clearTopBtn) {
    clearTopBtn.style.display = state.menuItems.length > 0 ? 'inline-flex' : 'none';
  }
  const openItemBtn = $('#openAddItemModalBtn');
  if (openItemBtn) {
    openItemBtn.style.display = store.hasPermission('canEditMenu') ? 'inline-flex' : 'none';
  }
  const unifiedCartCount = Object.values(state.cart).reduce((a, b) => a + b, 0);
  const cartBadge = $('#cartBadge');
  if (cartBadge) {
    cartBadge.textContent = unifiedCartCount;
    cartBadge.classList.toggle('hide', unifiedCartCount === 0);
  }
  const bottomCartBadge = $('#bottomCartBadge');
  if (bottomCartBadge) {
    bottomCartBadge.textContent = unifiedCartCount;
    bottomCartBadge.classList.toggle('hide', unifiedCartCount === 0);
  }
  const mobileCartBadge = $('#mobileCartBadge');
  if (mobileCartBadge) {
    mobileCartBadge.textContent = unifiedCartCount;
    mobileCartBadge.classList.toggle('hide', unifiedCartCount === 0);
  }
  const shopperBadge = $('#shopperCartBadge');
  if (shopperBadge) {
    shopperBadge.textContent = unifiedCartCount;
    shopperBadge.classList.toggle('hide', unifiedCartCount === 0);
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
      if (isAdmin) sideRole.textContent = 'Administrator';
      else if (userRole === 'kitchen') sideRole.textContent = 'Kitchen Staff';
      else sideRole.textContent = 'Student';
    }
    if ($('#accName')) $('#accName').textContent = state.currentUser.name;
    if ($('#accEmail')) $('#accEmail').textContent = state.currentUser.email || 'rohan@student.campus.edu';
    if ($('#accRoleType')) {
      if ($('#accRoleType')) $('#accRoleType').textContent = isAdmin
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



  // Persistent Floating Active Token Bar
  const floatingTokenBar = $('#floatingTokenBar');
  const tokenPulseDot = $('#tokenPulseDot');
  const tokenPillText = $('#tokenPillText');
  const activeTokenOrder = (state.orders || []).find((o) => o.status !== 'Picked up' && (o.role === 'Student' || !o.role || state.activeRole === 'user'));
  if (floatingTokenBar) {
    if (activeTokenOrder) {
      floatingTokenBar.classList.remove('hide');
      const st = activeTokenOrder.status || 'Placed';
      if (tokenPulseDot) {
        tokenPulseDot.className = 'token-pulse-dot ' + (st === 'Ready' ? 'ready' : (st === 'Preparing' ? 'preparing' : 'placed'));
      }
      if (tokenPillText) {
        tokenPillText.textContent = `Token #${activeTokenOrder.token} - ${st} - Counter ${activeTokenOrder.counter || 1}`;
      }
    } else {
      floatingTokenBar.classList.add('hide');
    }
  }

}

function renderCanteenRushMeter(state) {
  const inPrepCount = (state.orders || []).filter((o) => o.status === 'Placed' || o.status === 'Preparing').length;
  
  let rushLevel = 'quiet';
  let rushDotClass = 'quiet';
  let rushTitle = 'Canteen Quiet - Est. Wait: 3 - 5 mins';

  if (inPrepCount < 5) {
    rushLevel = 'quiet';
    rushDotClass = 'quiet';
    rushTitle = 'Canteen Quiet - Est. Wait: 3 - 5 mins';
  } else if (inPrepCount <= 15) {
    rushLevel = 'moderate';
    rushDotClass = 'moderate';
    rushTitle = 'Moderate Rush - Est. Wait: 8 - 12 mins';
  } else {
    rushLevel = 'peak';
    rushDotClass = 'peak';
    rushTitle = 'Peak Rush Hour - Est. Wait: 15 - 20 mins';
  }

  const menuBanner = $('#canteenRushBanner');
  if (menuBanner) {
    menuBanner.className = `canteen-rush-banner ${rushLevel}`;
    menuBanner.innerHTML = `
      <div class="rush-banner-content">
        <span class="rush-indicator-dot ${rushDotClass}"></span>
        <span class="rush-title-text">${rushTitle}</span>
      </div>
      <div class="rush-badge-meta">
        <span class="material-symbols-outlined" style="font-size:14px;">soup_kitchen</span>
        <span>${inPrepCount} ${inPrepCount === 1 ? 'ticket' : 'tickets'} in prep</span>
      </div>
    `;
  }

  const homeRush = $('#homeRushMeter');
  if (homeRush) {
    homeRush.className = `canteen-rush-card ${rushLevel}`;
    homeRush.innerHTML = `
      <div class="rush-card-header">
        <div class="rush-card-title-group">
          <span class="rush-indicator-dot ${rushDotClass}"></span>
          <span class="rush-card-title">${rushTitle}</span>
        </div>
        <span class="rush-card-badge">${inPrepCount} active</span>
      </div>
      <div class="rush-card-sub">
        ${rushLevel === 'quiet' 
          ? 'Counter lines are fast. Ideal time to order instant meals.' 
          : (rushLevel === 'moderate' 
              ? 'Moderate counter queue. Pre-order recommended for short breaks.' 
              : 'Kitchen is at peak capacity. Pre-order for upcoming breaks to skip queue.')
        }
      </div>
    `;
  }
}


function renderQuickReorder(state) {
  const greetingName = $('#homeGreetingName');
  if (greetingName) {
    const rawName = state.currentUser ? state.currentUser.name : 'Student';
    const cleanName = rawName.replace(/[^\x20-\x7E]/g, '').trim() || 'Student';
    greetingName.textContent = `Welcome back, ${cleanName}!`;
  }

  const container = $('#quickReorderRow');
  const ctaContainer = $('#reorderComboCtaContainer');
  if (!container) return;

  const userOrders = (state.orders || []).filter((o) =>
    o.role === 'Student' || !o.role || state.activeRole === 'user' || (state.currentUser && o.customerName === state.currentUser.name)
  );

  // 1. Identify 3 most frequently ordered items
  const frequencyMap = {};
  userOrders.forEach((order) => {
    (order.items || []).forEach((it) => {
      const key = it.id || it.name;
      if (!frequencyMap[key]) {
        frequencyMap[key] = {
          id: it.id,
          name: it.name,
          price: it.price,
          count: 0
        };
      }
      frequencyMap[key].count += (it.qty || 1);
    });
  });

  const sortedFreq = Object.values(frequencyMap).sort((a, b) => b.count - a.count);

  let favoriteItems = [];
  if (sortedFreq.length > 0) {
    favoriteItems = sortedFreq.slice(0, 3).map((entry) => {
      const catalogItem = (state.menuItems || []).find((m) => m.id === entry.id || m.name.toLowerCase() === entry.name.toLowerCase());
      return {
        id: catalogItem ? catalogItem.id : entry.id,
        name: catalogItem ? catalogItem.name : entry.name,
        emoji: catalogItem ? catalogItem.emoji : 'restaurant',
        price: catalogItem ? catalogItem.price : entry.price,
        counter: catalogItem ? catalogItem.counter : 'Counter 2 (Quick Bites)',
        stock: catalogItem ? catalogItem.stock : 10,
        orderCount: entry.count,
        isHistory: true
      };
    });
  } else if ((state.menuItems || []).length > 0) {
    favoriteItems = (state.menuItems || []).filter((m) => m.stock > 0).slice(0, 3).map((m) => ({
      id: m.id,
      name: m.name,
      emoji: m.emoji,
      price: m.price,
      counter: m.counter || 'Counter 1 (Hot Meals)',
      stock: m.stock,
      orderCount: 0,
      isHistory: false
    }));
  }

  // 2. Identify if last placed order was a combo (>= 2 paired items)
  let lastOrder = null;
  if (userOrders.length > 0) {
    lastOrder = [...userOrders].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] || userOrders[0];
  }
  const lastOrderItems = (lastOrder && Array.isArray(lastOrder.items)) ? lastOrder.items : [];
  const hasCombo = lastOrderItems.length >= 2;

  // Render "Re-order Entire Combo" CTA button if previous order consisted of 2 or more paired items
  if (ctaContainer) {
    if (hasCombo) {
      const comboIds = lastOrderItems.map((it) => {
        const catItem = (state.menuItems || []).find((m) => m.id === it.id || m.name.toLowerCase() === it.name.toLowerCase());
        return catItem ? catItem.id : it.id;
      });
      const idsAttr = JSON.stringify(comboIds).replace(/"/g, '&quot;');
      ctaContainer.innerHTML = `
        <button type="button" class="reorder-combo-cta-btn" id="reorderComboBtn" data-combo-ids="${idsAttr}" title="Re-order all ${lastOrderItems.length} items from your previous meal">
          <span class="material-symbols-outlined" style="font-size:16px;">autorenew</span>
          <span>Re-order Entire Combo (${lastOrderItems.length} items)</span>
        </button>
      `;
    } else {
      ctaContainer.innerHTML = '';
    }
  }

  // Render cards
  if (favoriteItems.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 18px; width: 100%; text-align: left; background: var(--md-sys-color-surface-container-low, #f8fafc); border-radius: 12px; border: 1px dashed var(--md-sys-color-outline-variant, #cbd5e1);">
        <div style="font-size: 13.5px; font-weight: 600; color: var(--md-sys-color-on-surface);">Your frequent favorites will appear here</div>
        <div style="font-size: 12px; color: var(--md-sys-color-on-surface-variant); margin-top: 2px;">Load menu items or place your first order to enable high-speed 1-tap re-ordering.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = favoriteItems.map((it) => {
    const isOut = it.stock <= 0;
    const isLow = it.stock > 0 && it.stock <= 5;
    const badgeText = it.isHistory && it.orderCount > 1 
      ? `Ordered ${it.orderCount}x` 
      : (it.isHistory ? 'Recent order' : 'Campus staple');
    const badgeIcon = it.isHistory ? 'history' : 'star';
    const safeName = String(it.name).replace(/"/g, '&quot;');
    const safeCounter = String(it.counter).replace(/"/g, '&quot;');

    return `
      <div class="reorder-card">
        <div class="reorder-card-top">
          <div class="reorder-card-thumb">
            <img src="${getItemImage(it)}" alt="${safeName}" class="reorder-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
            <span class="food-type-icon ${isVegItem(it) ? 'veg' : 'non-veg'} reorder-veg-badge"></span>
          </div>
          <div class="reorder-card-info">
            <div class="reorder-card-title" title="${safeName}">${it.name}</div>
            <span class="reorder-card-counter" title="${safeCounter}">${it.counter}</span>
            <div class="reorder-card-frequency">
              <span class="material-symbols-outlined" style="font-size:12px;">${badgeIcon}</span>
              <span>${badgeText}</span>
            </div>
            ${isLow ? '<div style="font-size:10px; color:#ef4444; font-weight:700; margin-top:3px;">Only ' + it.stock + ' left!</div>' : ''}
          </div>
        </div>
        <div class="reorder-card-bottom">
          <span class="reorder-card-price mono">Rs ${it.price}</span>
          <button type="button" class="reorder-add-btn" data-add="${it.id}" ${isOut ? 'disabled title="Out of stock"' : 'title="Add to tray"'}>
            <span class="material-symbols-outlined" style="font-size:16px;">add</span>
            <span>${isOut ? 'Sold Out' : 'Add'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
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
    if (ticketPaid) ticketPaid.textContent = '0';
    if (advanceBtn) {
      advanceBtn.disabled = true;
      advanceBtn.innerHTML = '<span>No active order</span>';
    }
    $$('#stepper .step').forEach((el) => el.classList.remove('done', 'now'));
    return;
  }

  const itemsSummary = activeOrder.items.map((i) => `${i.qty} - ${i.name}`).join(' + ');
  if (ticketTitle) ticketTitle.textContent = itemsSummary;
  if (ticketDesc) {
    const sched = (activeOrder.pickupTime && activeOrder.pickupTime !== 'Instant') ? ` - Scheduled: ${activeOrder.pickupTime}` : '';
    ticketDesc.textContent = `Order placed - ${activeOrder.counter} - ${activeOrder.paymentMethod}${sched}`;
  }
  if (queueNo) queueNo.textContent = activeOrder.token;
  if (ticketPaid) ticketPaid.textContent = `${activeOrder.total}`;

  const etaMap = [
    '~12 min to ready',
    '~7 min to ready',
    'Ready " collect at counter!',
    'Order complete "'
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
      ? '<span class="material-symbols-outlined">check_circle</span><span>Picked up "</span>' 
      : `<span class="material-symbols-outlined">arrow_forward</span><span>Advance "${stages[activeOrder.stageIndex + 1]}"</span>`;
    advanceBtn.dataset.orderId = activeOrder.id;
  }
}
function renderCounterStrip(state) {
  const container = $('#counterStrip');
  if (!container) return;

  if (!state.menuItems.length) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; width: 100%; padding: 24px 16px;">
        <div class="icon-bubble" style="width: 48px; height: 48px;">
          <span class="material-symbols-outlined" style="font-size:24px;">soup_kitchen</span>
        </div>
        <div class="empty-title" style="font-size:15px;">Live Stations Updating</div>
        <div class="empty-subtitle" style="font-size:12.5px;">Live counter meal lines and hot stations will display availability here as service opens.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.menuItems
    .slice(0, 6)
    .map((it) => {
      const status = getItemStatus(it);
      return `
        <div class="counter-item counter-item--with-img">
          <div class="counter-thumb-wrap">
            <img class="counter-item-img" src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
            <span class="food-type-icon ${isVegItem(it) ? 'veg' : 'non-veg'} counter-veg-dot"></span>
          </div>
          <div class="counter-content">
            <div class="counter-meta">
              <span class="counter-name" title="${escapeHtml(it.name)}">${it.name}</span>
              ${sbHTML(status)}
            </div>
            <div class="stock-count">${it.stock} servings left &bull; <span style="color:var(--md-sys-color-on-surface-variant); font-size:11px;">${it.restockTime || '15 min'}</span></div>
            <div class="gauge">
              <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

function getDietaryInfo(it) {
  if (it.diet) {
    const isNonVeg = it.diet.toLowerCase() === 'non-veg';
    return {
      type: isNonVeg ? 'non-veg' : 'veg',
      label: isNonVeg ? 'Non-Veg' : 'Pure Veg'
    };
  }
  const nameLower = (it.name || '').toLowerCase();
  const isNonVeg = nameLower.includes('chicken') || nameLower.includes('egg') || nameLower.includes('fish') || nameLower.includes('meat') || nameLower.includes('mutton');
  return {
    type: isNonVeg ? 'non-veg' : 'veg',
    label: isNonVeg ? 'Non-Veg' : 'Pure Veg'
  };
}

function getSpiceLevel(it) {
  if (it.spice) return it.spice;
  const nameLower = (it.name || '').toLowerCase();
  if (nameLower.includes('peri-peri') || nameLower.includes('spicy') || nameLower.includes('schezwan')) return 'Hot';
  if (nameLower.includes('biryani') || nameLower.includes('tikka') || nameLower.includes('masala') || nameLower.includes('pizza') || nameLower.includes('chole')) return 'Medium';
  if (nameLower.includes('dosa') || nameLower.includes('burger') || nameLower.includes('sandwich') || nameLower.includes('buttermilk')) return 'Mild';
  return null;
}

function isExpressItem(it) {
  if (it.isExpress !== undefined) return !!it.isExpress;
  const cat = (it.cat || '').toLowerCase();
  const nameLower = (it.name || '').toLowerCase();
  return cat.includes('snack') || cat.includes('beverage') || cat.includes('dessert') || cat.includes('quick') || nameLower.includes('coffee') || nameLower.includes('fries') || nameLower.includes('burger') || nameLower.includes('sandwich') || nameLower.includes('jamun') || nameLower.includes('brownie') || nameLower.includes('tea') || nameLower.includes('lassi');
}

// =========================================================================
// ZOMATO & SWIGGY STYLE FOOD METADATA & ASSET RESOLVERS
// =========================================================================

const FOOD_REAL_IMAGES = {
  'chicken dum biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
  'hyderabadi veg biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
  'ghee podi masala dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
  'crispy veg patty burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
  'grilled cheese sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
  'wood-fired pizza slice': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
  'peri-peri salted fries': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80',
  'artisan cold coffee': 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80',
  'spiced masala buttermilk': 'https://images.unsplash.com/photo-1637792357005-c3ba175df533?w=800&auto=format&fit=crop&q=80',
  'masala buttermilk': 'https://images.unsplash.com/photo-1637792357005-c3ba175df533?w=800&auto=format&fit=crop&q=80',
  'buttermilk': 'https://images.unsplash.com/photo-1637792357005-c3ba175df533?w=800&auto=format&fit=crop&q=80',
  'chaas': 'https://images.unsplash.com/photo-1637792357005-c3ba175df533?w=800&auto=format&fit=crop&q=80',
  'warm gulab jamun (2 pcs)': 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=800&auto=format&fit=crop&q=80',
  'warm gulab jamun': 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=800&auto=format&fit=crop&q=80',
  'gulab jamun': 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=800&auto=format&fit=crop&q=80',
  'belgian chocolate brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
  'paneer butter masala combo': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
  'paneer butter masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
  'smoky paneer tikka roll': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
  'paneer tikka roll': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
  'kathi roll': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
  'paneer roll': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80',
  'crispy vegetable samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  'crispy samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  'samosas': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  'chilled mango lassi': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80',
  'mango lassi': 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80',
  'chole bhature platter': 'https://images.unsplash.com/photo-1643892467625-65df6a500524?w=800&auto=format&fit=crop&q=80',
  'chole bhature': 'https://images.unsplash.com/photo-1643892467625-65df6a500524?w=800&auto=format&fit=crop&q=80',
  'iced lemon mint tea': 'https://images.unsplash.com/photo-1681974913878-1c446bac7cf5?w=800&auto=format&fit=crop&q=80',
  'spicy schezwan hakka noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
  'crispy chicken tenders & cajun fries': 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80',
  'royal north indian thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
  'truffle mushroom melt panini': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
  'steamed himalayan chicken dimsums (6 pcs)': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=80',
  'biscoff caramel frappe': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80',
  'berry burst belgian waffle': 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80'
};

const CATEGORY_FALLBACK_IMAGES = {
  mains: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
  snacks: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80',
  beverages: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop&q=80'
};

function getItemImage(it) {
  if (!it) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
  const key = (it.name || '').toLowerCase().trim();
  if (FOOD_REAL_IMAGES[key]) return FOOD_REAL_IMAGES[key];
  for (const [nameKey, url] of Object.entries(FOOD_REAL_IMAGES)) {
    if (key.includes(nameKey) || nameKey.includes(key)) return url;
  }
  if (it.image && typeof it.image === 'string' && it.image.startsWith('http')) {
    // If the image is not one of the old mismatched placeholder photos, use it
    if (!it.image.includes('photo-1601050690597-df0568f70950') &&
        !it.image.includes('photo-1556881286-fc6915169721') &&
        !it.image.includes('photo-1626777552726-4a6b54c97e46')) {
      return it.image;
    }
  }
  const catKey = (it.cat || '').toLowerCase().trim();
  if (CATEGORY_FALLBACK_IMAGES[catKey]) return CATEGORY_FALLBACK_IMAGES[catKey];
  if (catKey.includes('snack') || catKey.includes('quick')) return CATEGORY_FALLBACK_IMAGES.snacks;
  if (catKey.includes('meal') || catKey.includes('main') || catKey.includes('hot') || catKey.includes('rice')) return CATEGORY_FALLBACK_IMAGES.mains;
  if (catKey.includes('drink') || catKey.includes('bev') || catKey.includes('cafe')) return CATEGORY_FALLBACK_IMAGES.beverages;
  if (catKey.includes('dessert') || catKey.includes('sweet')) return CATEGORY_FALLBACK_IMAGES.desserts;
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
}

function isVegItem(it) {
  if (typeof it.isVeg === 'boolean') return it.isVeg;
  const name = (it.name || '').toLowerCase();
  if (name.includes('chicken') || name.includes('mutton') || name.includes('fish') || name.includes('egg') || name.includes('prawn') || name.includes('meat')) {
    return false;
  }
  return true;
}

function getItemSize(it) {
  if (it.cardSize) return it.cardSize;
  const name = (it.name || '').toLowerCase();
  if (name.includes('dum biryani') || name.includes('pizza') || name.includes('platter') || name.includes('combo')) {
    return 'featured';
  }
  if (name.includes('burger') || name.includes('coffee') || name.includes('fries') || name.includes('jamun') || name.includes('lassi')) {
    return 'tall';
  }
  return 'standard';
}

const ITEM_DESCRIPTIONS = {
  'chicken dum biryani': 'Slow-cooked fragrant basmati rice layered with spiced tender chicken, saffron, and caramelised onions. Served with spiced mint raita.',
  'hyderabadi veg biryani': 'Fragrant long-grain basmati layered with garden-fresh vegetables, paneer cubes, and aromatic Nizam spices.',
  'ghee podi masala dosa': 'Crisp golden crepe roasted in pure desi ghee and Gunpowder chutney podi, wrapped around spiced potato masala.',
  'crispy veg patty burger': 'Crispy herb-crumbed vegetable patty with fresh lettuce, sliced tomatoes, gherkins and smoky tandoori mayo in a toasted bun.',
  'grilled cheese sandwich': 'Thick sourdough toast grilled with a three-cheese blend of mozzarella, cheddar, and processed cheese with herb butter.',
  'wood-fired pizza slice': 'Authentic stone-oven baked slice with san marzano tomato reduction, fresh basil leaves, and stringy fior di latte mozzarella.',
  'peri-peri salted fries': 'Skin-on golden potato fries tossed in fiery African peri-peri spice dust. Served with creamy garlic dip.',
  'artisan cold coffee': 'Slow-brewed dark roast espresso whipped with chilled creamy whole milk, chocolate drizzle, and vanilla bean froth.',
  'spiced masala buttermilk': 'Traditional desi chaas churned with fresh coriander, ginger, crushed green chillies, and roasted cumin.',
  'warm gulab jamun (2 pcs)': 'Handmade khoya dumplings fried golden and immersed in simmering rosewater, saffron, and green cardamom nectar.',
  'belgian chocolate brownie': 'Warm, fudgy dark Belgian chocolate brownie studded with toasted walnuts and crowned with a dark chocolate drizzle.',
  'paneer butter masala combo': 'Velvety cottage cheese cubes simmered in a rich tomato, butter, and cashew gravy, served with 2 butter naan and jeera rice.'
};

function getItemDesc(it) {
  if (it.desc) return it.desc;
  const key = (it.name || '').toLowerCase().trim();
  if (ITEM_DESCRIPTIONS[key]) return ITEM_DESCRIPTIONS[key];
  for (const [nameKey, val] of Object.entries(ITEM_DESCRIPTIONS)) {
    if (key.includes(nameKey) || nameKey.includes(key)) return val;
  }
  return `${it.name} freshly prepared at ${it.counter || 'Counter 1'} with authentic campus cafeteria ingredients.`;
}

// M3 Student Menu Grid with Zomato & Swiggy Style Multi-Sized Interactive Cards

// =========================================================================
// =========================================================================
// QUICK RE-ORDER FREQUENT FAVORITES (Real Food Cards for Home Page)
// =========================================================================

const QUICK_REORDER_ITEMS = [
  {
    id: 'item-3',
    name: 'Ghee Podi Masala Dosa',
    emoji: 'breakfast_dining',
    price: 80,
    cat: 'Mains',
    counter: 'Counter 1 (Hot Meals)',
    stock: 30,
    lowThreshold: 5,
    restockTime: '10 min',
    isVeg: true,
    rating: 4.9,
    ratingCount: 284,
    badge: 'Ordered 2x',
    recReason: 'Ordered 2x this week - Counter 1',
    cardSize: 'standard',
    desc: 'Crisp golden crepe roasted in pure desi ghee and Gunpowder chutney podi, wrapped around spiced potato masala.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'item-1',
    name: 'Chicken Dum Biryani',
    emoji: 'restaurant',
    price: 180,
    cat: 'Mains',
    counter: 'Counter 1 (Hot Meals)',
    stock: 22,
    lowThreshold: 8,
    restockTime: '15 min',
    isVeg: false,
    rating: 4.8,
    ratingCount: 342,
    badge: 'Recent order',
    recReason: 'Recent order - Counter 1 (Hot Meals)',
    cardSize: 'standard',
    desc: 'Slow-cooked fragrant basmati rice layered with spiced tender chicken, saffron, and caramelised onions. Served with spiced mint raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'item-8',
    name: 'Artisan Cold Coffee',
    emoji: 'local_cafe',
    price: 50,
    cat: 'Beverages',
    counter: 'Counter 3 (Cafe & Drinks)',
    stock: 28,
    lowThreshold: 10,
    restockTime: '5 min',
    isVeg: true,
    rating: 4.9,
    ratingCount: 410,
    badge: 'Recent order',
    recReason: 'Recent order - Counter 3 (Cafe & Drinks)',
    cardSize: 'standard',
    desc: 'Slow-steeped dark roast espresso blended with chilled creamy milk, turbinado brown sugar, and dark chocolate drizzle.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80'
  }
];

// =========================================================================
// CURATED "FOR YOU" RECOMMENDATION CATALOG (Distinct items from Menu)
// =========================================================================

const FOR_YOU_ITEMS = [
  {
    id: 'foryou-1',
    name: 'Smoky Paneer Tikka Roll',
    emoji: 'lunch_dining',
    price: 135,
    cat: 'Wraps & Rolls',
    counter: 'Counter 2 (Quick Bites)',
    stock: 16,
    lowThreshold: 5,
    restockTime: '10 min',
    isVeg: true,
    rating: 4.8,
    ratingCount: 312,
    badge: 'Trending Combo',
    recReason: '98% Match - Frequently paired with Cold Coffee',
    cardSize: 'featured',
    desc: 'Soft handmade rumali roti wrapped around clay-oven charred paneer tikka, crunchy bell peppers, pickled onions, and house mint-coriander mayonnaise.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-2',
    name: 'Spicy Schezwan Hakka Noodles',
    emoji: 'ramen_dining',
    price: 110,
    cat: 'Asian Wok',
    counter: 'Counter 1 (Hot Meals)',
    stock: 20,
    lowThreshold: 6,
    restockTime: '12 min',
    isVeg: true,
    rating: 4.7,
    ratingCount: 245,
    badge: 'Chef Special',
    recReason: 'Evening Pick - Wok-tossed fresh on order',
    cardSize: 'standard',
    desc: 'Flame-tossed noodles with shredded cabbage, crunchy carrots, bell peppers, and fiery homemade Schezwan sauce topped with fresh scallions.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-3',
    name: 'Crispy Chicken Tenders & Cajun Fries',
    emoji: 'dinner_dining',
    price: 160,
    cat: 'Snacks & Combos',
    counter: 'Counter 2 (Quick Bites)',
    stock: 12,
    lowThreshold: 4,
    restockTime: '15 min',
    isVeg: false,
    rating: 4.9,
    ratingCount: 428,
    badge: 'Student Favorite',
    recReason: '#1 Campus Combo - High Reorder Velocity',
    cardSize: 'tall',
    desc: 'Crispy golden buttermilk-marinated chicken strips served with a generous portion of cajun dusted fries, creamy garlic mayo, and smoky BBQ dip.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-4',
    name: 'Royal North Indian Thali',
    emoji: 'set_meal',
    price: 195,
    cat: 'Full Meals',
    counter: 'Counter 1 (Hot Meals)',
    stock: 14,
    lowThreshold: 5,
    restockTime: '20 min',
    isVeg: true,
    rating: 4.9,
    ratingCount: 516,
    badge: 'Value Feast',
    recReason: 'Complete Lunch - Balanced nutrition & fresh phulkas',
    cardSize: 'featured',
    desc: 'Executive campus lunch platter: creamy Dal Makhani, Paneer Butter Masala, 2 hot butter phulkas, fragrant Jeera Basmati rice, fresh salad, and sweet gulab jamun.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-5',
    name: 'Truffle Mushroom Melt Panini',
    emoji: 'bakery_dining',
    price: 125,
    cat: 'Artisan Cafe',
    counter: 'Counter 2 (Quick Bites)',
    stock: 8,
    lowThreshold: 3,
    restockTime: '10 min',
    isVeg: true,
    rating: 4.6,
    ratingCount: 164,
    badge: 'Cafe Special',
    recReason: 'Gourmet Pick - 3-Cheese blend on sourdough',
    cardSize: 'standard',
    desc: 'Herb-crusted sourdough panini pressed with pan-seared garlic button mushrooms, caramelized balsamic onions, and melted Swiss mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-6',
    name: 'Steamed Himalayan Chicken Dimsums (6 pcs)',
    emoji: 'kebab_dining',
    price: 120,
    cat: 'Street Bites',
    counter: 'Counter 2 (Quick Bites)',
    stock: 25,
    lowThreshold: 6,
    restockTime: '8 min',
    isVeg: false,
    rating: 4.8,
    ratingCount: 380,
    badge: 'Must Try',
    recReason: 'Quick Grab - Steaming hot & ready in 5 mins',
    cardSize: 'standard',
    desc: 'Delicate handmade steamed momos filled with seasoned ground chicken, spring onions, and ginger. Served with fiery Himalayan roasted red chili dip.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-7',
    name: 'Biscoff Caramel Frappe',
    emoji: 'local_cafe',
    price: 95,
    cat: 'Beverages',
    counter: 'Counter 3 (Cafe & Drinks)',
    stock: 30,
    lowThreshold: 8,
    restockTime: '5 min',
    isVeg: true,
    rating: 4.9,
    ratingCount: 680,
    badge: 'Best Seller',
    recReason: 'Energy Boost - Real Lotus Biscoff & double espresso',
    cardSize: 'tall',
    desc: 'Iced blended double shot Arabica espresso churned with rich Lotus Biscoff spread, salted caramel drizzle, whipped dairy cream, and crushed biscuit topping.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'foryou-8',
    name: 'Berry Burst Belgian Waffle',
    emoji: 'cake',
    price: 85,
    cat: 'Desserts',
    counter: 'Counter 3 (Cafe & Drinks)',
    stock: 15,
    lowThreshold: 4,
    restockTime: '10 min',
    isVeg: true,
    rating: 4.8,
    ratingCount: 295,
    badge: 'Sweet Treat',
    recReason: 'Dessert Pairing - Made fresh on Belgian iron',
    cardSize: 'tall',
    desc: 'Crisp malted Belgian waffle loaded with warm wild blueberry-strawberry compote, melted dark chocolate drizzle, and a dusting of powdered sugar.',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&auto=format&fit=crop&q=80'
  }
];

function findCatalogItem(state, id) {
  if (!id) return null;
  if (state && state.menuItems) {
    const found = state.menuItems.find((m) => m.id === id);
    if (found) return found;
  }
  const foryou = FOR_YOU_ITEMS.find((m) => m.id === id);
  if (foryou) return foryou;
  if (typeof QUICK_REORDER_ITEMS !== 'undefined') {
    const quick = QUICK_REORDER_ITEMS.find((m) => m.id === id);
    if (quick) return quick;
  }
  return null;
}

// =========================================================================
// SHARED FOOD CARD RENDERER (Menu Page & For You Page)
// =========================================================================

function renderFoodCardHTML(it, state) {
  const liveItem = (state && state.menuItems) ? state.menuItems.find((m) => m.id === it.id || (m.name && it.name && m.name.toLowerCase() === it.name.toLowerCase())) : null;
  const currentStock = liveItem ? liveItem.stock : (typeof it.stock === 'number' ? it.stock : 25);
  const itemForStatus = liveItem || { ...it, stock: currentStock };
  const status = getItemStatus(itemForStatus);
  const isOut = status === 'out' || currentStock <= 0;
  const inCart = (state.cart && state.cart[it.id]) || 0;
  const imgUrl = getItemImage(it);
  const isVeg = isVegItem(it);
  const rating = it.rating || 4.6;
  const ratingCount = it.ratingCount || (120 + (it.stock || 5) * 6);
  const badge = it.badge || (isOut ? null : (status === 'low' ? 'Only Few Left' : null));
  const cardSize = it.cardSize || getItemSize(it);
  const desc = it.desc || getItemDesc(it);
  const originalPrice = Math.round(it.price * 1.18);
  const recBadge = it.recReason ? `<div class="rec-pill-badge">${it.recReason}</div>` : '';

  // Render Add / Stepper control
  let actionControl = '';
  if (isOut) {
    actionControl = `<button class="swiggy-add-btn" disabled title="Sold out">SOLD OUT</button>`;
  } else if (inCart > 0) {
    actionControl = `
      <div class="swiggy-qty-controller">
        <button class="swiggy-qty-btn" data-dec="${it.id}" title="Decrease quantity" aria-label="Decrease">&minus;</button>
        <span class="swiggy-qty-val">${inCart}</span>
        <button class="swiggy-qty-btn" data-inc="${it.id}" title="Increase quantity" aria-label="Increase">&plus;</button>
      </div>
    `;
  } else {
    actionControl = `
      <button class="swiggy-add-btn" data-add="${it.id}" title="Add to Cart">
        ADD <span style="font-size:14px; margin-left:2px;">+</span>
      </button>
    `;
  }

  // Veg / Non-Veg badge markup
  const vegBadge = `<span class="food-type-icon ${isVeg ? 'veg' : 'non-veg'}" title="${isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>`;

  // Rating badge markup
  const ratingMarkup = `
    <div style="display:inline-flex; align-items:center; gap:4px;">
      <span class="swiggy-rating-pill"><span class="star">*</span> ${rating}</span>
      <span class="swiggy-rating-count">(${ratingCount})</span>
    </div>
  `;

  // Stock and Gauge HTML
  const stockGaugeHTML = `
    <div style="margin-top:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-bottom:4px;">
        <span style="color:var(--md-sys-color-on-surface-variant); font-weight:600;">Stock: <strong>${currentStock}</strong> left</span>
        <span style="color:${getGaugeColor(status)}; font-weight:700; text-transform:uppercase; font-size:10.5px;">${status}</span>
      </div>
      <div class="gauge" style="height:4px; margin:0;">
        <span style="width:${getGaugeWidth(it)}%; background:${getGaugeColor(status)}"></span>
      </div>
    </div>
  `;

  // Template 1: FEATURED CARD (Hero Landscape)
  if (cardSize === 'featured') {
    return `
      <div class="menu-card menu-card--featured ${isOut ? 'is-out-of-stock' : ''}">
        <div class="card-main-content">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            ${vegBadge}
            ${badge ? `<span class="swiggy-ribbon bestseller"><span class="material-symbols-outlined" style="font-size:13px;">workspace_premium</span>${badge}</span>` : ''}
            <span style="font-size:11px; font-weight:600; background:var(--md-sys-color-primary-container); color:var(--md-sys-color-on-primary-container); padding:2px 8px; border-radius:6px;">${it.counter || 'Counter 1'}</span>
          </div>
          ${recBadge}
          <div class="card-item-title" style="font-size:17px; margin-top:4px;">${it.name}</div>
          <div style="margin-top:2px; margin-bottom:6px;">${ratingMarkup}</div>
          <div class="card-item-price-row">
            <span class="card-item-price" style="font-size:16.5px;">Rs ${it.price}</span>
            <span class="card-item-original-price">Rs ${originalPrice}</span>
            <span style="font-size:11px; font-weight:700; color:#1ba672;">SAVE Rs ${originalPrice - it.price}</span>
          </div>
          <div class="card-item-desc" style="-webkit-line-clamp:3;">${desc}</div>
          <div style="margin-top:auto; padding-top:10px;">
            ${stockGaugeHTML}
          </div>
        </div>
        <div class="card-media-side">
          <div class="food-img-box">
            <img class="food-img" src="${imgUrl}" alt="${it.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'">
            ${isOut ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:12px; letter-spacing:1px;">SOLD OUT</div>' : ''}
          </div>
          <div class="card-action-wrap">
            ${actionControl}
          </div>
        </div>
      </div>
    `;
  }

  // Template 2: TALL CARD (Portrait Visual)
  if (cardSize === 'tall') {
    return `
      <div class="menu-card menu-card--tall ${isOut ? 'is-out-of-stock' : ''}">
        <div class="food-img-box">
          <img class="food-img" src="${imgUrl}" alt="${it.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'">
          <div style="position:absolute; top:10px; left:10px; z-index:2; display:flex; gap:6px; align-items:center;">
            <span style="background:rgba(255,255,255,0.92); backdrop-filter:blur(4px); padding:4px; border-radius:6px; display:inline-flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.15);">${vegBadge}</span>
            ${badge ? `<span class="swiggy-ribbon chef" style="box-shadow:0 2px 6px rgba(0,0,0,0.2);">${badge}</span>` : ''}
          </div>
          <div style="position:absolute; top:10px; right:10px; z-index:2;">
            ${ratingMarkup}
          </div>
          ${isOut ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:13px; letter-spacing:1px;">SOLD OUT</div>' : ''}
          <div class="card-action-wrap">
            ${actionControl}
          </div>
        </div>
        <div class="card-main-content">
          <div class="card-item-title">${it.name}</div>
          ${recBadge}
          <div style="font-size:11.5px; color:var(--md-sys-color-on-surface-variant); margin-bottom:4px;">
            ${it.cat} &middot; <span style="font-weight:600;">${it.counter || 'Counter 1'}</span>
          </div>
          <div class="card-item-price-row">
            <span class="card-item-price">Rs ${it.price}</span>
            <span class="card-item-original-price">Rs ${originalPrice}</span>
          </div>
          <div class="card-item-desc">${desc}</div>
          <div style="margin-top:auto; padding-top:10px;">
            ${stockGaugeHTML}
          </div>
        </div>
      </div>
    `;
  }

  // Template 3: STANDARD CARD (Signature Swiggy Split Layout)
  return `
    <div class="menu-card menu-card--standard ${isOut ? 'is-out-of-stock' : ''}">
      <div class="card-main-content">
        <div style="display:flex; align-items:center; gap:8px;">
          ${vegBadge}
          ${badge ? `<span class="swiggy-ribbon trending">${badge}</span>` : ''}
        </div>
        ${recBadge}
        <div class="card-item-title">${it.name}</div>
        <div class="card-item-price-row">
          <span class="card-item-price">Rs ${it.price}</span>
          <span class="card-item-original-price">Rs ${originalPrice}</span>
        </div>
        <div style="margin-bottom:6px;">${ratingMarkup}</div>
        <div class="card-item-desc">${desc}</div>
        <div style="margin-top:auto; padding-top:10px;">
          ${stockGaugeHTML}
        </div>
      </div>
      <div class="card-media-side">
        <div class="food-img-box">
          <img class="food-img" src="${imgUrl}" alt="${it.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'">
          ${isOut ? '<div style="position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:11px; letter-spacing:0.5px;">SOLD OUT</div>' : ''}
        </div>
        <div class="card-action-wrap">
          ${actionControl}
        </div>
      </div>
    </div>
  `;
}



function renderStudentMenu(state, searchQuery = '') {
  const grid = $('#menuGrid');
  const filterRow = $('#filterRow');
  if (!grid) return;

  const CATEGORY_CHIPS = ['All', 'Express / Grab and Go', 'Hot Meals', 'Quick Bites', 'Beverages', 'Desserts'];
  if (filterRow) {
    filterRow.innerHTML = CATEGORY_CHIPS
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
    let matchCat = true;
    if (state.activeCat && state.activeCat !== 'All') {
      if (state.activeCat.includes('Express')) {
        matchCat = isExpressItem(m);
      } else if (state.activeCat === 'Hot Meals') {
        matchCat = m.cat === 'Hot Meals' || m.cat === 'Mains' || (m.counter && m.counter.toLowerCase().includes('hot meals'));
      } else if (state.activeCat === 'Quick Bites') {
        matchCat = m.cat === 'Quick Bites' || m.cat === 'Snacks' || (m.counter && m.counter.toLowerCase().includes('quick bites'));
      } else if (state.activeCat === 'Beverages') {
        matchCat = m.cat === 'Beverages' || (m.counter && m.counter.toLowerCase().includes('cafe'));
      } else if (state.activeCat === 'Desserts') {
        matchCat = m.cat === 'Desserts';
      } else {
        matchCat = m.cat === state.activeCat;
      }
    }
    const matchCounter = counterVal === 'All' || m.counter === counterVal;
    const matchQuery = !q || m.name.toLowerCase().includes(q) || (m.cat && m.cat.toLowerCase().includes(q));
    return matchCat && matchCounter && matchQuery;
  });

  if (!items.length) {
    const isCatalogEmpty = state.menuItems.length === 0;
    grid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1; width: 100%; padding: 48px 24px;">
        <div class="icon-bubble">
          <span class="material-symbols-outlined" style="font-size:32px;">${isCatalogEmpty ? 'soup_kitchen' : 'search_off'}</span>
        </div>
        <div class="empty-title">${isCatalogEmpty ? 'Menu being freshly prepared' : 'No menu items match your search'}</div>
        <div class="empty-subtitle">
          ${isCatalogEmpty
            ? 'The kitchen is preparing fresh daily specials. Check back in a few moments to order.'
            : 'Try selecting a different food category or clearing your search keywords above.'}
        </div>
        ${!isCatalogEmpty ? '<button class="mini-btn" style="margin-top:10px;" onclick="if($(\'#searchInput\')) $(\'#searchInput\').value=\'\'; store.state.activeCat=\'All\'; renderStudentMenu(store.state);">Reset Filters</button>' : ''}
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map((it) => renderFoodCardHTML(it, state)).join('');
}
let activeQuickReorderItems = [...QUICK_REORDER_ITEMS];

function getRandomComboItems(state, count = 3) {
  const pool = (state.menuItems || []).filter((m) => m.stock > 0);
  const candidates = pool.length >= count ? pool : (state.menuItems || []);
  if (!candidates.length) return [...QUICK_REORDER_ITEMS];
  
  const shuffled = [...candidates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((it, idx) => {
    return {
      id: it.id,
      name: it.name,
      emoji: it.emoji,
      price: it.price,
      cat: it.cat,
      counter: it.counter || 'Counter 1 (Hot Meals)',
      stock: it.stock,
      lowThreshold: it.lowThreshold || 5,
      restockTime: it.restockTime || '10 min',
      isVeg: isVegItem(it),
      rating: it.rating || (4.6 + (idx * 0.1)).toFixed(1),
      ratingCount: it.ratingCount || (180 + ((it.price * 7) % 250)),
      badge: idx === 0 ? 'Combo Pick' : (idx === 1 ? 'Chef Choice' : 'Value Pair'),
      recReason: `Curated Campus Combo (${idx + 1}/3)`,
      cardSize: 'standard',
      desc: getItemDesc(it),
      image: getItemImage(it)
    };
  });
}

function renderRecommendations(state) {
  // Update Welcome heading with current user's name
  const welcomeHeading = $('#homeWelcomeHeading');
  if (welcomeHeading) {
    const userName = (state.currentUser && state.currentUser.name) || 'Rohan Sharma';
    welcomeHeading.textContent = `Welcome back, ${userName}!`;
  }

  // Render Real Food Cards in Quick Re-Order Grid on Home Page
  const quickReorderGrid = $('#quickReorderGrid');
  if (quickReorderGrid) {
    if (!activeQuickReorderItems || !activeQuickReorderItems.length) {
      activeQuickReorderItems = [...QUICK_REORDER_ITEMS];
    }
    quickReorderGrid.innerHTML = activeQuickReorderItems.map((it) => renderFoodCardHTML(it, state)).join('');
  }

  // Render Real Food Cards in Home Recommendations Grid ("You may also like")
  const homeRec = $('#homeRecGrid');
  if (homeRec) {
    const recItems = FOR_YOU_ITEMS.slice(0, 4);
    homeRec.innerHTML = recItems.length
      ? recItems.map((it) => renderFoodCardHTML(it, state)).join('')
      : '<div class="empty-state" style="grid-column:1 / -1;"><div class="em"><span class="material-symbols-outlined">auto_awesome</span></div>No recommendations available.</div>';
  }

  // Render Real Food Cards in For You Page
  const foryouRec = $('#foryouGrid');
  if (foryouRec) {
    foryouRec.innerHTML = FOR_YOU_ITEMS.map((it) => renderFoodCardHTML(it, state)).join('');
  }
}

let upiCountdownInterval = null;
let upiCountdownRemainingSecs = 300;

function isMobileDevice() {
  try {
    const ua = navigator.userAgent || '';
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
    const isSmallScreen = window.innerWidth <= 768;
    return mobileRegex.test(ua) || isSmallScreen;
  } catch (e) {
    return false;
  }
}

function startUpiCountdownTimer(onTick, onExpire) {
  if (upiCountdownInterval) {
    clearInterval(upiCountdownInterval);
    upiCountdownInterval = null;
  }
  upiCountdownRemainingSecs = 300;
  
  const updateTimer = () => {
    const mins = Math.floor(upiCountdownRemainingSecs / 60);
    const secs = upiCountdownRemainingSecs % 60;
    const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (onTick) onTick(timeFormatted, upiCountdownRemainingSecs);

    if (upiCountdownRemainingSecs <= 0) {
      clearInterval(upiCountdownInterval);
      upiCountdownInterval = null;
      if (onExpire) onExpire();
    } else {
      upiCountdownRemainingSecs--;
    }
  };

  updateTimer();
  upiCountdownInterval = setInterval(updateTimer, 1000);
}

function stopUpiCountdownTimer() {
  if (upiCountdownInterval) {
    clearInterval(upiCountdownInterval);
    upiCountdownInterval = null;
  }
}

function renderPaymentMethodDetails(state) {
  const container = $('#paymentMethodDetails');
  if (!container) return;

  const itemEntries = Object.entries(state.cart || {});
  const subtotal = itemEntries.reduce((acc, [id, qty]) => {
    const it = (state.menuItems || []).find((m) => m.id === id);
    return acc + (it ? it.price * qty : 0);
  }, 0);
  const totalAmount = itemEntries.length > 0 ? (subtotal + 10) : 0;
  
  const selectedMethod = state.selectedPaymentMethod || 'Campus UPI';
  const isMobile = isMobileDevice();

  if (totalAmount <= 0) {
    container.innerHTML = '';
    stopUpiCountdownTimer();
    return;
  }

  if (selectedMethod === 'Campus UPI') {
    if (!state.pendingUpiOrderRef) {
      state.pendingUpiOrderRef = 'CP' + Math.floor(1000 + Math.random() * 9000);
    }
    const orderRef = state.pendingUpiOrderRef;
    const upiUri = `upi://pay?pa=canteenupi@bank&pn=CampusCanteen&am=${totalAmount}&cu=INR&tn=Order_${orderRef}`;

    if (isMobile) {
      stopUpiCountdownTimer();
      container.innerHTML = `
        <div class="upi-mobile-card">
          <div class="upi-card-top">
            <div class="upi-badge-row">
              <span class="material-symbols-outlined upi-lightning-icon">bolt</span>
              <strong>Instant UPI Intent</strong>
            </div>
            <div class="upi-amount-pill">Rs ${totalAmount}</div>
          </div>
          <div class="upi-card-sub">Tap below to trigger payment directly in your installed UPI app.</div>
          <a href="${upiUri}" class="upi-intent-primary-btn" id="upiIntentBtn">
            <span class="material-symbols-outlined">send_to_mobile</span>
            <span>Pay via any UPI App (GPay / PhonePe / Paytm)</span>
          </a>
          <div class="upi-apps-row">
            <span class="upi-app-pill">GPay</span>
            <span class="upi-app-pill">PhonePe</span>
            <span class="upi-app-pill">Paytm</span>
            <span class="upi-app-pill">BHIM</span>
            <span class="upi-app-pill">CRED</span>
          </div>
          <div class="upi-intent-note">
            <span class="material-symbols-outlined" style="font-size:14px;">info</span>
            <span>After authorizing in your UPI app, return and tap "Place order &amp; Generate Token" below.</span>
          </div>
        </div>
      `;
      const upiBtn = $('#upiIntentBtn');
      if (upiBtn) {
        upiBtn.addEventListener('click', () => {
          triggerHaptic(50);
          toast('Opening UPI checkout intent...', 'payments');
        });
      }
    } else {
      container.innerHTML = `
        <div class="upi-desktop-card">
          <div class="upi-qr-wrapper">
            <div id="upiQrCodeContainer" class="upi-qr-box"></div>
            <div class="upi-countdown-timer" id="upiCountdownTimer">
              <span class="material-symbols-outlined" style="font-size:14px;">timer</span>
              <span id="upiTimerDisplay">05:00</span>
            </div>
          </div>
          <div class="upi-desktop-details">
            <div class="upi-desktop-header">
              <strong>Scan &amp; Pay via UPI</strong>
              <span class="upi-desktop-amt">Rs ${totalAmount}</span>
            </div>
            <div class="upi-desktop-desc">Open any UPI app on your mobile and scan this dynamic QR code to pay.</div>
            <div class="upi-meta-box">
              <div class="upi-meta-row"><span>Payee:</span> <strong>Campus Canteen</strong></div>
              <div class="upi-meta-row"><span>VPA:</span> <strong>canteenupi@bank</strong></div>
              <div class="upi-meta-row"><span>Order Ref:</span> <strong>Order_${orderRef}</strong></div>
            </div>
            <div class="upi-expiry-text" id="upiExpiryNotice">QR code expires in 5 minutes.</div>
          </div>
        </div>
      `;

      const qrContainer = $('#upiQrCodeContainer');
      if (qrContainer) {
        qrContainer.innerHTML = '';
        if (typeof QRCode !== 'undefined') {
          try {
            new QRCode(qrContainer, {
              text: upiUri,
              width: 124,
              height: 124,
              colorDark: '#000000',
              colorLight: '#ffffff',
              correctLevel: QRCode.CorrectLevel.M
            });
          } catch (e) {
            qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=124x124&data=${encodeURIComponent(upiUri)}" alt="UPI QR" width="124" height="124" />`;
          }
        } else {
          qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=124x124&data=${encodeURIComponent(upiUri)}" alt="UPI QR" width="124" height="124" />`;
        }
      }

      startUpiCountdownTimer(
        (timeFormatted) => {
          const display = $('#upiTimerDisplay');
          if (display) display.textContent = timeFormatted;
        },
        () => {
          const timerBadge = $('#upiCountdownTimer');
          const notice = $('#upiExpiryNotice');
          if (timerBadge) {
            timerBadge.classList.add('expired');
            timerBadge.innerHTML = `<span class="material-symbols-outlined" style="font-size:14px;">error</span><span>Expired</span>`;
          }
          if (notice) {
            notice.innerHTML = `<button type="button" class="mini-btn" id="refreshUpiQrBtn" style="padding:4px 10px; font-size:11px;">Refresh QR Code</button>`;
            const refBtn = $('#refreshUpiQrBtn');
            if (refBtn) {
              refBtn.addEventListener('click', () => {
                state.pendingUpiOrderRef = 'CP' + Math.floor(1000 + Math.random() * 9000);
                renderPaymentMethodDetails(state);
              });
            }
          }
        }
      );
    }
  } else if (selectedMethod === 'Meal Pass') {
    stopUpiCountdownTimer();
    const currentBal = (state.currentUser && typeof state.currentUser.balance === 'number') ? state.currentUser.balance : 450;
    const remBalance = currentBal - totalAmount;
    
    const mealChipText = $('#mealPassBalanceText');
    if (mealChipText) mealChipText.textContent = `Bal: Rs ${currentBal}`;

    container.innerHTML = `
      <div class="meal-pass-card">
        <div class="meal-pass-header">
          <div class="meal-pass-title">
            <span class="material-symbols-outlined" style="color:#00897b; font-size:20px;">badge</span>
            <strong>Meal Pass Instant Deduction</strong>
          </div>
          <span class="meal-pass-tag">Live Balance</span>
        </div>
        <div class="meal-pass-stats-grid">
          <div class="meal-pass-stat">
            <span class="lbl">Current Balance</span>
            <span class="val">Rs ${currentBal}</span>
          </div>
          <div class="meal-pass-stat">
            <span class="lbl">Order Total</span>
            <span class="val deduct">- Rs ${totalAmount}</span>
          </div>
          <div class="meal-pass-stat">
            <span class="lbl">Remaining Balance</span>
            <span class="val ${remBalance < 0 ? 'insufficient' : 'remaining'}">Rs ${Math.max(0, remBalance)}</span>
          </div>
        </div>
        ${remBalance < 0 
          ? '<div class="meal-pass-alert-box error"><span class="material-symbols-outlined">error</span><span>Insufficient meal pass balance. Please top up or choose UPI / Cash.</span></div>' 
          : '<div class="meal-pass-alert-box success"><span class="material-symbols-outlined">check_circle</span><span>Instant balance deduction upon placing order.</span></div>'
        }
      </div>
    `;

    const checkoutBtn = $('#checkoutBtn');
    if (checkoutBtn && remBalance < 0) {
      checkoutBtn.disabled = true;
    }
  } else if (selectedMethod === 'Cash') {
    stopUpiCountdownTimer();
    container.innerHTML = `
      <div class="cash-card">
        <div class="cash-card-header">
          <span class="material-symbols-outlined" style="color:#f59e0b; font-size:20px;">payments</span>
          <strong>Cash at Counter</strong>
        </div>
        <div class="cash-notice-box">
          <div class="cash-notice-title">Pay when collecting token</div>
          <div class="cash-notice-sub">Please present exact cash of Rs ${totalAmount} at your selected pickup counter when collecting your meal token.</div>
        </div>
      </div>
    `;
  } else if (selectedMethod === 'Card') {
    stopUpiCountdownTimer();
    container.innerHTML = `
      <div class="card-payment-card">
        <div class="card-header">
          <span class="material-symbols-outlined" style="color:#3b82f6; font-size:20px;">credit_card</span>
          <strong>Debit / Credit Card</strong>
        </div>
        <div class="card-sub">Tap or swipe your card at the POS terminal at Counter upon token collection.</div>
      </div>
    `;
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
    if (subtotalEl) subtotalEl.textContent = '0';
    if (packingEl) packingEl.textContent = '0';
    if (totalEl) totalEl.textContent = '0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    renderPaymentMethodDetails(state);
    return;
  }

  let subtotal = 0;
  cartList.innerHTML = itemEntries
    .map(([id, qty]) => {
      const it = findCatalogItem(state, id);
      if (!it) return '';
      const lineTotal = it.price * qty;
      subtotal += lineTotal;
      const currentNote = (state.cartNotes && state.cartNotes[id]) || '';
      const hasNote = Boolean(currentNote && currentNote.trim());

      return `
        <div class="cart-line-container" data-item-id="${id}">
          <div class="cart-line">
            <div class="cart-food-thumb">
              <img src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
              <span class="food-type-icon ${isVegItem(it) ? 'veg' : 'non-veg'} cart-food-dot"></span>
            </div>
            <div class="stub-info">
              <div class="t">${escapeHtml(it.name)}</div>
              <div class="s mono">Rs ${it.price} each &bull; Rs ${lineTotal}</div>
            </div>
            <div class="qty-ctrl">
              <button data-dec="${id}">-</button>
              <span>${qty}</span>
              <button data-inc="${id}">+</button>
            </div>
            <button class="remove-x" data-remove="${id}" title="Remove">
              <span class="material-symbols-outlined" style="font-size:18px;">close</span>
            </button>
          </div>
          <div class="cart-note-wrapper">
            ${hasNote ? `
              <div class="cart-note-active-pill" id="cartNoteActive-${id}">
                <div class="cart-note-active-left">
                  <span class="material-symbols-outlined note-icon">edit_note</span>
                  <span class="cart-note-saved-text">"${escapeHtml(currentNote)}"</span>
                </div>
                <div class="cart-note-pill-actions">
                  <button type="button" class="cart-note-btn-link" data-edit-note="${id}" title="Edit note">Edit</button>
                  <button type="button" class="cart-note-btn-link remove" data-clear-note="${id}" title="Remove note">
                    <span class="material-symbols-outlined" style="font-size:14px;">close</span>
                  </button>
                </div>
              </div>
              <div class="cart-note-input-row" id="cartNoteInputRow-${id}" style="display:none;">
                <div class="cart-note-input-field-wrap">
                  <input type="text" class="cart-note-input" id="cartNoteInput-${id}" maxlength="60" value="${escapeHtml(currentNote)}" placeholder="e.g., Less ice, Extra spicy, No onion" data-note-input="${id}">
                  <span class="cart-note-counter" id="cartNoteCounter-${id}">${currentNote.length}/60 max</span>
                </div>
                <div class="cart-note-btn-group">
                  <button type="button" class="cart-note-cancel-btn" data-cancel-note="${id}">Cancel</button>
                  <button type="button" class="cart-note-save-btn" data-save-note="${id}">Save</button>
                </div>
              </div>
            ` : `
              <button type="button" class="cart-note-expand-link" id="cartNoteExpandBtn-${id}" data-toggle-note="${id}">
                <span class="material-symbols-outlined" style="font-size:15px;">note_add</span>
                <span>Add cooking request / note</span>
              </button>
              <div class="cart-note-input-row" id="cartNoteInputRow-${id}" style="display:none;">
                <div class="cart-note-input-field-wrap">
                  <input type="text" class="cart-note-input" id="cartNoteInput-${id}" maxlength="60" placeholder="e.g., Less ice, Extra spicy, No onion" data-note-input="${id}">
                  <span class="cart-note-counter" id="cartNoteCounter-${id}">0/60 max</span>
                </div>
                <div class="cart-note-btn-group">
                  <button type="button" class="cart-note-cancel-btn" data-cancel-note="${id}">Cancel</button>
                  <button type="button" class="cart-note-save-btn" data-save-note="${id}">Save</button>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;

  if (subtotalEl) subtotalEl.textContent = `${subtotal}`;
  if (packingEl) packingEl.textContent = `${packing}`;
  if (totalEl) totalEl.textContent = `${total}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
  renderPaymentMethodDetails(state);
}
function renderOrdersList(state) {
  const homeList = $('#homeOrderList');
  const fullList = $('#ordersFullList');

  const makeRowHTML = (o, isFull = false) => {
    const isDone = o.status === 'Picked up';
    const summary = o.items ? o.items.map((i) => `${i.qty} - ${i.name}`).join(', ') : 'Campus Meal';

    return `
      <div class="stub-list-item">
        <div class="stub-icon">
          <span class="material-symbols-outlined">${isDone ? 'check_circle' : 'receipt_long'}</span>
        </div>
        <div class="stub-info">
          <div class="t">${summary}</div>
          <div class="s">${o.token} - ${o.counter || 'Counter'} - ${new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div>
          <div class="stub-amt mono">${o.total}</div>
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
          <div class="bar-col ${isPeak ? 'peak' : ''}" title="${day}: ${val}">
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
  if (homeAmt) homeAmt.textContent = `${totalSpent}`;
  if (homeLbl) {
    homeLbl.textContent = totalSpent > 0 ? `spent this week across ${state.orders.length} orders` : 'spent this week - No orders placed yet';
  }

  const spAmt = $('#spendingPageTotalAmt');
  const spLbl = $('#spendingPageTotalLbl');
  if (spAmt) spAmt.textContent = `${totalSpent}`;
  if (spLbl) {
    spLbl.textContent = totalSpent > 0 ? `total recorded spend across campus counters` : 'total recorded spend - No orders placed yet';
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
        <div class="menu-card menu-card--shopper">
          <div class="shopper-card-media">
            <img src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" class="shopper-food-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
            <span class="food-type-icon ${isVegItem(it) ? 'veg' : 'non-veg'} shopper-veg-badge"></span>
          </div>
          <div class="menu-info">
            <div class="mn">${escapeHtml(it.name)}</div>
            <div class="mc">${it.cat} &bull; ${it.counter}</div>
            <div class="mrow" style="margin-top:8px;">
              <span class="rec-price mono">Rs ${it.price}</span>
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
    if (sumSub) sumSub.textContent = '0';
    if (sumPack) sumPack.textContent = '0';
    if (sumTot) sumTot.textContent = '0';
    if (btn) btn.disabled = true;
    return;
  }

  let subtotal = 0;
  list.innerHTML = entries
    .map(([id, qty]) => {
      const it = findCatalogItem(state, id);
      if (!it) return '';
      const lineTotal = it.price * qty;
      subtotal += lineTotal;
      return `
        <div class="cart-line">
          <div class="cart-food-thumb">
            <img src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
            <span class="food-type-icon ${isVegItem(it) ? 'veg' : 'non-veg'} cart-food-dot"></span>
          </div>
          <div class="stub-info">
            <div class="t">${escapeHtml(it.name)}</div>
            <div class="s mono">Rs ${it.price} each &bull; Rs ${lineTotal}</div>
          </div>
          <div class="qty-ctrl">
            <button data-shopper-dec="${id}">-</button>
            <span>${qty}</span>
            <button data-shopper-inc="${id}">+</button>
          </div>
        </div>
      `;
    })
    .join('');

  const packing = 10;
  const total = subtotal + packing;
  if (sumSub) sumSub.textContent = `${subtotal}`;
  if (sumPack) sumPack.textContent = `${packing}`;
  if (sumTot) sumTot.textContent = `${total}`;
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
          <div class="t">${o.token} - ${o.customerName}</div>
          <div class="s">${o.items.map((i) => `${i.qty} - ${i.name}`).join(', ')}</div>
        </div>
        <div>
          <div class="stub-amt mono">${o.total}</div>
          <div class="stub-status ${o.status === 'Picked up' ? 'done' : 'progress'}">${o.status}</div>
        </div>
        <div class="stub-actions">
          <button class="mini-btn" data-view-receipt="${o.id}">View Receipt</button>
        </div>
      </div>
    `)
    .join('');
}


let kitchenAlertsMuted = typeof localStorage !== 'undefined' && localStorage.getItem('invenTrack_kitchen_muted') === 'true';
let knownPlacedOrderIds = new Set();
let recentNewOrderIds = new Set();

function playKitchenOrderDing() {
  if (kitchenAlertsMuted) return;
  try {
    const audio = new Audio('/notification.mp3');
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        playWebAudioDing();
      });
    }
  } catch (e) {
    playWebAudioDing();
  }
}

function playWebAudioDing() {
  if (kitchenAlertsMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    
    // Distinct chime: 880Hz (A5) to 1320Hz (E6) harmonic
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.1);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);
  } catch (err) {}
}

function toggleKitchenMute() {
  kitchenAlertsMuted = !kitchenAlertsMuted;
  try {
    localStorage.setItem('invenTrack_kitchen_muted', String(kitchenAlertsMuted));
  } catch (e) {}
  updateKitchenMuteUI();
  toast(kitchenAlertsMuted ? 'Kitchen alerts muted' : 'Kitchen alerts active', kitchenAlertsMuted ? 'volume_off' : 'volume_up');
}

function updateKitchenMuteUI() {
  const muteBtn = $('#kitchenAlertMuteBtn');
  const muteIcon = $('#kitchenMuteIcon');
  const muteLabel = $('#kitchenMuteLabel');
  if (muteBtn) {
    muteBtn.classList.toggle('muted', kitchenAlertsMuted);
    muteBtn.title = kitchenAlertsMuted ? 'Unmute Kitchen Alerts' : 'Mute Kitchen Alerts';
  }
  if (muteIcon) {
    muteIcon.textContent = kitchenAlertsMuted ? 'volume_off' : 'volume_up';
  }
  if (muteLabel) {
    muteLabel.textContent = kitchenAlertsMuted ? 'Muted' : 'Alerts On';
  }
}

function renderKitchenKanban(state) {
  updateKitchenMuteUI();

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

  // Check for new arrivals in "Placed" column (Stage 0)
  const currentPlacedOrders = colOrders[0];
  const newPlacedArrivals = currentPlacedOrders.filter((o) => !knownPlacedOrderIds.has(o.id));
  if (knownPlacedOrderIds.size > 0 && newPlacedArrivals.length > 0) {
    playKitchenOrderDing();
    newPlacedArrivals.forEach((o) => {
      recentNewOrderIds.add(o.id);
      setTimeout(() => {
        recentNewOrderIds.delete(o.id);
        const card = document.getElementById(`kanban-ticket-${o.id}`);
        if (card) card.classList.remove('new-order-pulse');
      }, 5000);
    });
  }
  knownPlacedOrderIds = new Set(currentPlacedOrders.map((o) => o.id));

  if (countPlaced) countPlaced.textContent = colOrders[0].length;
  if (countPreparing) countPreparing.textContent = colOrders[1].length;
  if (countReady) countReady.textContent = colOrders[2].length;
  if (countPicked) countPicked.textContent = colOrders[3].length;

  const now = Date.now();

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
        const orderTime = o.createdAt ? new Date(o.createdAt).getTime() : now;
        const elapsedMs = Math.max(0, now - orderTime);
        const elapsedMins = Math.floor(elapsedMs / 60000);

        // Elapsed time formatting
        let elapsedText = 'Placed just now';
        if (elapsedMins === 1) elapsedText = 'Placed 1m ago';
        else if (elapsedMins > 1 && elapsedMins < 60) elapsedText = `Placed ${elapsedMins}m ago`;
        else if (elapsedMins >= 60) {
          const hrs = Math.floor(elapsedMins / 60);
          const rem = elapsedMins % 60;
          elapsedText = `Placed ${hrs}h ${rem}m ago`;
        }

        // Visual aging for active kitchen orders (stages 0, 1, 2)
        let agingClass = 'aging-normal';
        let elapsedClass = '';
        let agingBadgeHTML = '';

        if (sIndex < 3) {
          if (elapsedMins >= 10) {
            agingClass = 'aging-urgent';
            elapsedClass = 'urgent';
            agingBadgeHTML = `
              <span class="ticket-aging-badge urgent">
                <span class="material-symbols-outlined" style="font-size:12px;">priority_high</span>
                <span>Priority pickup needed</span>
              </span>
            `;
          } else if (elapsedMins >= 5) {
            agingClass = 'aging-warning';
            elapsedClass = 'warning';
            agingBadgeHTML = `
              <span class="ticket-aging-badge warning">
                <span class="material-symbols-outlined" style="font-size:12px;">warning</span>
                <span>Prep delay</span>
              </span>
            `;
          }
        }

        const isNewPulse = recentNewOrderIds.has(o.id);
        const timeStr = new Date(orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const itemsList = (o.items || [])
          .map(
            (i) => `
              <div class="kanban-item-line">
                <span><strong>${i.qty} - </strong> ${escapeHtml(i.name)}</span>
                <span class="mono">Rs ${i.price * i.qty}</span>
              </div>
              ${i.note ? `
                <div class="kanban-item-note-chip">
                  <span class="material-symbols-outlined note-chip-icon">edit_note</span>
                  <span class="note-chip-label">Note:</span>
                  <strong class="note-chip-text">${escapeHtml(i.note)}</strong>
                </div>
              ` : ''}
            `
          )
          .join('');

        const nextStageName = stages[sIndex + 1];
        const isCompleted = sIndex >= stages.length - 1;

        return `
          <div class="kanban-card ${agingClass} ${isNewPulse ? 'new-order-pulse' : ''}" id="kanban-ticket-${o.id}">
            <div class="kanban-card-header">
              <span class="kanban-token">${o.token}</span>
              <div style="text-align:right;">
                <span class="kanban-time">${timeStr}</span>
                <div class="kanban-elapsed-time ${elapsedClass}">
                  <span class="material-symbols-outlined" style="font-size:12px;">schedule</span>
                  <span>${elapsedText}</span>
                </div>
              </div>
            </div>
            ${agingBadgeHTML ? `<div style="margin:4px 0 6px 0;">${agingBadgeHTML}</div>` : ''}
            <div class="kanban-cust">
              <span class="material-symbols-outlined" style="font-size:14px; vertical-align:middle; margin-right:2px;">person</span>
              <strong>${o.customerName}</strong> - <span style="font-weight:400; color:var(--md-sys-color-on-surface-variant);">${o.counter}</span>
            </div>
            <div class="kanban-items">${itemsList}</div>
            <div class="kanban-card-footer">
              <span class="kanban-total mono">Rs ${o.total}</span>
              <button class="kanban-advance-btn" data-kitchen-advance="${o.id}" ${isCompleted ? 'disabled' : ''}>
                <span class="material-symbols-outlined" style="font-size:15px;">${isCompleted ? 'check' : 'arrow_forward'}</span>
                <span>${isCompleted ? 'Picked up (Done)' : `Mark "${nextStageName}"`}</span>
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
                <div style="font-size:11px; color:var(--md-sys-color-on-surface-variant);">${it.cat} - ${it.price}</div>
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
              <button data-stock-dec="${it.id}" title="Decrease stock">'</button>
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
    const searchVal = ($('#posSearchInput') && typeof $('#posSearchInput').value === 'string') ? $('#posSearchInput').value.trim().toLowerCase() : '';
    const filtered = state.menuItems.filter(
      (m) => !searchVal || m.name.toLowerCase().includes(searchVal) || m.cat.toLowerCase().includes(searchVal)
    );

    grid.innerHTML = filtered.length
      ? filtered
          .map((it) => {
            const isOut = it.stock <= 0;
            return `
              <button class="pos-item-btn" data-pos-add="${it.id}" ${isOut ? 'disabled' : ''}>
                <span class="pos-item-thumb">
                  <img src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" class="pos-thumb-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
                </span>
                <span class="pos-item-name">${escapeHtml(it.name)}</span>
                <span class="pos-item-price">Rs ${it.price} (${it.stock} left)</span>
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
      if (subEl) subEl.textContent = '0';
      if (packEl) packEl.textContent = '0';
      if (totEl) totEl.textContent = '0';
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    lines.innerHTML = entries
      .map(([id, qty]) => {
        const it = findCatalogItem(state, id);
        if (!it) return '';
        const lineTotal = it.price * qty;
        subtotal += lineTotal;
        return `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:12.5px; border-bottom:1px solid var(--md-sys-color-outline-variant);">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="${getItemImage(it)}" alt="${escapeHtml(it.name)}" style="width:34px; height:34px; border-radius:6px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80'">
              <div>
                <strong>${escapeHtml(it.name)}</strong>
                <div style="font-size:11px; color:var(--md-sys-color-on-surface-variant);">Rs ${it.price} &bull; ${qty}x</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="mono" style="font-weight:700;">Rs ${lineTotal}</span>
              <div class="inline-stock-ctrl">
                <button data-pos-dec="${id}">-</button>
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
    if (subEl) subEl.textContent = `${subtotal}`;
    if (packEl) packEl.textContent = `${packing}`;
    if (totEl) totEl.textContent = `${total}`;
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
            <strong>${fb.studentName}</strong> - 
            <span style="color:var(--md-sys-color-primary); font-weight:700;">${'...'.repeat(fb.rating)}</span> 
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
  if (revEl) revEl.textContent = `${rev}`;
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
              ${isCritical ? 'Urgent Restock' : 'Normal'}
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

  if ($('#modalTokenNum')) $('#modalTokenNum').textContent = order.token;
  if ($('#modalCounterName')) $('#modalCounterName').textContent = order.counter || 'Campus Dining Counter';
  if ($('#modalTotalPaid')) $('#modalTotalPaid').textContent = `${order.total}`;
  if ($('#modalReceiptStatus')) $('#modalReceiptStatus').textContent = order.status;

  const lines = $('#modalReceiptLines');
  if (lines) {
    lines.innerHTML = (order.items || [])
      .map(
        (it) => `
          <div class="receipt-row" style="flex-direction:column; align-items:flex-start; gap:2px;">
            <div style="display:flex; justify-content:space-between; width:100%;">
              <span>${it.qty} - ${escapeHtml(it.name)}</span>
              <span class="mono">${it.price * it.qty}</span>
            </div>
            ${it.note ? `<div style="font-size:11.5px; color:#b45309; font-weight:600; display:flex; align-items:center; gap:4px; padding-left:4px;"><span class="material-symbols-outlined" style="font-size:13px;">edit_note</span>Note: ${escapeHtml(it.note)}</div>` : ''}
          </div>
        `
      )
      .join('') +
      `
        <div class="receipt-row" style="color:var(--md-sys-color-primary); font-size:12px; font-weight:600;">
          <span>Pickup Time</span>
          <span class="mono">${order.pickupTime || 'Instant'}</span>
        </div>
        <div class="receipt-row" style="color:var(--md-sys-color-on-surface-variant); font-size:12px;">
          <span>Packaging Fee</span>
          <span class="mono">${order.packing || 10}</span>
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

  
  document.addEventListener('click', (e) => {
    const comboBtn = e.target.closest('#reorderComboBtn');
    if (comboBtn) {
      triggerHaptic(60);

      // Animate the sync icon inside button
      const icon = comboBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          icon.style.transition = 'none';
          icon.style.transform = 'rotate(0deg)';
        }, 500);
      }

      // Pick 3 random in-stock items
      const newCombo = getRandomComboItems(store.state, 3);
      if (newCombo && newCombo.length) {
        activeQuickReorderItems = newCombo;

        // Re-render Quick Re-Order Grid with the 3 fresh items
        const quickReorderGrid = $('#quickReorderGrid');
        if (quickReorderGrid) {
          quickReorderGrid.innerHTML = activeQuickReorderItems.map((it) => renderFoodCardHTML(it, store.state)).join('');
        }

        // Add all 3 items to cart as combo
        let addedCount = 0;
        const itemNames = [];
        newCombo.forEach((it) => {
          const curQty = store.state.cart[it.id] || 0;
          store.state.cart[it.id] = curQty + 1;
          itemNames.push(it.name);
          addedCount++;
        });

        store.state.shopperCart = store.state.cart;
        store.save();
        renderApp(store.state);

        toast(`Added combo (3 items) to cart: ${itemNames.join(', ')}`, 'shopping_cart');
      } else {
        toast('No combo items available to order.', 'cancel');
      }
    }
  });



  const floatingTokenBar = $('#floatingTokenBar');
  if (floatingTokenBar) {
    floatingTokenBar.addEventListener('click', () => {
      triggerHaptic(50);
      openTokenSheet(store.state);
    });
  }

  const closeTokenSheetBtn = $('#closeTokenSheetBtn');
  const tokenSheetOverlay = $('#tokenSheetOverlay');
  if (closeTokenSheetBtn && tokenSheetOverlay) {
    closeTokenSheetBtn.addEventListener('click', () => {
      tokenSheetOverlay.classList.remove('open');
    });
    tokenSheetOverlay.addEventListener('click', (e) => {
      if (e.target === tokenSheetOverlay) {
        tokenSheetOverlay.classList.remove('open');
      }
    });
  }

  const devPillBtn = $('#devPillToggle');
  const devPill = $('#devPersonaPill');
  if (devPillBtn && devPill) {
    devPillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      devPill.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!devPill.contains(e.target)) {
        devPill.classList.remove('open');
      }
    });
    $$('#devPillMenu .dev-pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetRole = btn.dataset.role;
        store.setRole(targetRole);
        devPill.classList.remove('open');
      });
    });
  }

  const roleSwitcher = $('#roleSwitcher');
  if (roleSwitcher) {
    roleSwitcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.role-btn[data-role]');
      if (!btn) return;
      const userRole = (store.state.currentUser && store.state.currentUser.role) || 'user';
      if (userRole !== 'admin') {
        toast('Access Restricted: The top bar role switcher is exclusively available for Administrators.', 'error');
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
    mobileThemeToggleBtn.onclick = (e) => {
      if (typeof window.toggleInvenTrackTheme === 'function') {
        window.toggleInvenTrackTheme(e);
      } else {
        const isDark = document.body.getAttribute('data-theme') === 'kitchen' ||
                       document.body.getAttribute('data-theme') === 'dark' ||
                       document.documentElement.getAttribute('data-theme') === 'kitchen' ||
                       document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.body.removeAttribute('data-theme');
          document.documentElement.removeAttribute('data-theme');
          try { localStorage.setItem('invenTrack_theme', 'light'); } catch(err){}
        } else {
          document.body.setAttribute('data-theme', 'kitchen');
          document.documentElement.setAttribute('data-theme', 'kitchen');
          try { localStorage.setItem('invenTrack_theme', 'dark'); } catch(err){}
        }
      }
    };
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
  const themeToggleBtn = $('#themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.onclick = (e) => {
      if (typeof window.toggleInvenTrackTheme === 'function') {
        window.toggleInvenTrackTheme(e);
      } else {
        const isDark = document.body.getAttribute('data-theme') === 'kitchen' ||
                       document.body.getAttribute('data-theme') === 'dark' ||
                       document.documentElement.getAttribute('data-theme') === 'kitchen' ||
                       document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
          document.body.removeAttribute('data-theme');
          document.documentElement.removeAttribute('data-theme');
          try { localStorage.setItem('invenTrack_theme', 'light'); } catch(err){}
        } else {
          document.body.setAttribute('data-theme', 'kitchen');
          document.documentElement.setAttribute('data-theme', 'kitchen');
          try { localStorage.setItem('invenTrack_theme', 'dark'); } catch(err){}
        }
      }
    };
  }

  const themeToggle = $('#themeToggle');
  if (themeToggle) {
    themeToggle.onclick = (e) => {
      const btn = e.target.closest('button[data-mode]');
      if (!btn) return;
      if (typeof window.applyInvenTrackTheme === 'function') {
        window.applyInvenTrackTheme(btn.dataset.mode === 'kitchen');
      } else {
        if (btn.dataset.mode === 'kitchen') {
          document.body.setAttribute('data-theme', 'kitchen');
          document.documentElement.setAttribute('data-theme', 'kitchen');
        } else {
          document.body.removeAttribute('data-theme');
          document.documentElement.removeAttribute('data-theme');
        }
      }
      $$('#themeToggle button[data-mode]').forEach((b) => b.classList.toggle('on', b === btn));
    };
  }
  const bellBtn = $('#bellBtn');
  if (bellBtn) {
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const notif = $('#notifPanel');
      if (notif) notif.classList.toggle('open');
      const dot = $('#bellDot');
      if (dot) dot.classList.add('hide');
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
      triggerHaptic(50);
      store.addToCart(addBtn.dataset.add);
      return;
    }

    const incBtn = e.target.closest('[data-inc]');
    if (incBtn) {
      triggerHaptic(50);
      store.changeCartQty(incBtn.dataset.inc, 1);
      return;
    }

    const decBtn = e.target.closest('[data-dec]');
    if (decBtn) {
      triggerHaptic(50);
      store.changeCartQty(decBtn.dataset.dec, -1);
      return;
    }

    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) {
      triggerHaptic(50);
      store.removeCartItem(removeBtn.dataset.remove);
      return;
    }

    // Expand cooking request input
    const toggleNoteBtn = e.target.closest('[data-toggle-note]');
    if (toggleNoteBtn) {
      triggerHaptic(40);
      const id = toggleNoteBtn.dataset.toggleNote;
      const inputRow = document.getElementById(`cartNoteInputRow-${id}`);
      if (inputRow) {
        inputRow.style.display = 'flex';
        toggleNoteBtn.style.display = 'none';
        const input = document.getElementById(`cartNoteInput-${id}`);
        if (input) input.focus();
      }
      return;
    }

    // Edit cooking request note
    const editNoteBtn = e.target.closest('[data-edit-note]');
    if (editNoteBtn) {
      triggerHaptic(40);
      const id = editNoteBtn.dataset.editNote;
      const activePill = document.getElementById(`cartNoteActive-${id}`);
      const inputRow = document.getElementById(`cartNoteInputRow-${id}`);
      if (activePill) activePill.style.display = 'none';
      if (inputRow) {
        inputRow.style.display = 'flex';
        const input = document.getElementById(`cartNoteInput-${id}`);
        if (input) {
          input.focus();
          input.select();
        }
      }
      return;
    }

    // Cancel cooking request edit
    const cancelNoteBtn = e.target.closest('[data-cancel-note]');
    if (cancelNoteBtn) {
      triggerHaptic(30);
      renderStudentCart(store.state);
      return;
    }

    // Save cooking request note
    const saveNoteBtn = e.target.closest('[data-save-note]');
    if (saveNoteBtn) {
      triggerHaptic(50);
      const id = saveNoteBtn.dataset.saveNote;
      const input = document.getElementById(`cartNoteInput-${id}`);
      const noteVal = input ? input.value : '';
      store.setCartItemNote(id, noteVal);
      toast('Cooking request saved', 'check');
      renderStudentCart(store.state);
      return;
    }

    // Clear cooking request note
    const clearNoteBtn = e.target.closest('[data-clear-note]');
    if (clearNoteBtn) {
      triggerHaptic(40);
      const id = clearNoteBtn.dataset.clearNote;
      store.setCartItemNote(id, '');
      toast('Cooking note removed', 'delete');
      renderStudentCart(store.state);
      return;
    }
  });

  // Note live character counter
  document.addEventListener('input', (e) => {
    const noteInput = e.target.closest('[data-note-input]');
    if (noteInput) {
      const id = noteInput.dataset.noteInput;
      const counterEl = document.getElementById(`cartNoteCounter-${id}`);
      if (counterEl) {
        counterEl.textContent = `${noteInput.value.length}/60 max`;
      }
    }
  });

  // Save note on Enter key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const noteInput = e.target.closest('[data-note-input]');
      if (noteInput) {
        e.preventDefault();
        const id = noteInput.dataset.noteInput;
        store.setCartItemNote(id, noteInput.value);
        toast('Cooking request saved', 'check');
        renderStudentCart(store.state);
      }
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
      renderPaymentMethodDetails(store.state);
      triggerHaptic(40);
    });
  }
  const checkoutBtn = $('#checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      triggerHaptic(60);
      const counter = $('#checkoutCounterSelect') ? $('#checkoutCounterSelect').value : 'Counter 2 (Quick Bites)';
      const pickupTime = $('#checkoutPickupTimeSelect') ? $('#checkoutPickupTimeSelect').value : 'Instant';
      const paymentMethod = store.state.selectedPaymentMethod || 'Campus UPI';
      if (paymentMethod === 'Meal Pass') {
        const curBal = (store.state.currentUser && typeof store.state.currentUser.balance === 'number') ? store.state.currentUser.balance : 450;
        const totalAmount = Object.entries(store.state.cart).reduce((sum, [id, qty]) => {
          const it = findCatalogItem(store.state, id) || store.state.menuItems.find((m) => m.id === id);
          return sum + (it ? it.price * qty : 0);
        }, 0) + 10;
        if (curBal < totalAmount) {
          toast('Insufficient Meal Pass balance. Please top up or choose UPI / Cash.', 'error');
          return;
        }
      }
      const order = store.createOrder({
        itemsMap: store.state.cart,
        customerName: store.state.currentUser ? store.state.currentUser.name : 'Campus User',
        role: 'User',
        counter,
        paymentMethod,
        pickupTime,
        cartNotes: store.state.cartNotes
      });

      if (order) {
        store.state.cart = {};
        store.state.cartNotes = {};
        try {
          localStorage.removeItem('invenTrack_cart');
          localStorage.removeItem('invenTrack_cart_notes');
        } catch (e) {}
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
        paymentMethod,
        pickupTime
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
      toast('Random example campus data injected!', 'casino');
    });
  }

  const clearTopBtnEl = $('#clearDataBtnTop');
  if (clearTopBtnEl) {
    clearTopBtnEl.addEventListener('click', () => {
      store.resetToEmptyState();
      toast('All data cleared. Website is now empty [].', 'delete_sweep');
    });
  }

  const loadFixtureBtn = $('#loadFixtureBtn');
  if (loadFixtureBtn) {
    loadFixtureBtn.addEventListener('click', () => {
      store.generateRandomExampleData();
      toast('Random example campus data injected!', 'casino');
    });
  }

  const resetDataBtn = $('#resetDataBtn');
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      store.resetToEmptyState();
      toast('State reset to empty schema []', 'restart_alt');
    });
  }
  const openItemBtn = $('#openAddItemModalBtn');
  if (openItemBtn) {
    openItemBtn.addEventListener('click', () => {
      if (!store.hasPermission('canEditMenu')) {
        toast('Permission Denied: Users cannot alter menu details or add items.', 'error');
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
        toast('Permission Denied: Users cannot alter menu details or add items.', 'error');
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
        toast('Permission Denied: Users cannot alter menu details or add items.', 'error');
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
      const name = ($('#itemFormName') && $('#itemFormName').value) ? $('#itemFormName').value.trim() : '';
      const emoji = ($('#itemFormEmoji') && $('#itemFormEmoji').value) ? $('#itemFormEmoji').value.trim() : 'restaurant';
      const cat = $('#itemFormCat') ? $('#itemFormCat').value : 'Mains';
      const counter = $('#itemFormCounter') ? $('#itemFormCounter').value : 'Counter 1 (Hot Meals)';
      const price = $('#itemFormPrice') ? $('#itemFormPrice').value : '100';
      const stock = $('#itemFormStock') ? $('#itemFormStock').value : '25';
      const lowThreshold = $('#itemFormThreshold') ? $('#itemFormThreshold').value : '5';
      const restockTime = ($('#itemFormRestock') && $('#itemFormRestock').value) ? $('#itemFormRestock').value.trim() : '15 min';

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
  renderCanteenRushMeter(state);
  renderQuickReorder(state);

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

window.addEventListener('resize', () => {
  if (typeof store !== 'undefined' && store.state && store.state.activePage === 'cart') {
    renderPaymentMethodDetails(store.state);
  }
});

window.addEventListener('offline', () => {
  toast('Campus network offline - Using cached cart and active token', 'cloud_off');
});
window.addEventListener('online', () => {
  toast('Campus network reconnected', 'cloud_done');
});

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


// Live Aging Ticker for Kitchen Kanban
setInterval(() => {
  if (typeof store !== 'undefined' && store.state) {
    const kitchenBoard = $('#page-kitchen-kanban');
    if (kitchenBoard && (kitchenBoard.classList.contains('active') || store.state.activePage === 'kitchen-kanban')) {
      renderKitchenKanban(store.state);
    }
  }
}, 10000);

// ==========================================
// Floating Scroll-to-Top Controller
// ==========================================
(function() {
  function initScrollToTop() {
    var scrollBtn = document.getElementById('scrollToTopBtn');
    if (!scrollBtn) return;

    var onScroll = function() {
      if (window.pageYOffset > 240 || document.documentElement.scrollTop > 240) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
  } else {
    initScrollToTop();
  }
})();
