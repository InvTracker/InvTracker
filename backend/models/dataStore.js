/**
 * InvenTrack In-Memory / Persistent Data Store
 * Initialized with standard campus dining schema and fixture datasets
 */

export const DEMO_ACCOUNTS = {
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

export const INITIAL_MENU_ITEMS = [
  {
    id: 'item-dum-biryani',
    name: 'Chicken Dum Biryani',
    cat: 'Meals',
    price: 180,
    stock: 24,
    threshold: 8,
    counter: 'Counter 1 (Hot Station)',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    prepTime: '8 min',
    tags: ['Best Seller', 'Spicy', 'Signature']
  },
  {
    id: 'item-paneer-butter',
    name: 'Paneer Butter Masala Combo',
    cat: 'Meals',
    price: 150,
    stock: 18,
    threshold: 6,
    counter: 'Counter 1 (Hot Station)',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    prepTime: '6 min',
    tags: ['Vegetarian', 'Popular']
  },
  {
    id: 'item-masala-dosa',
    name: 'Crispy Masala Dosa',
    cat: 'Quick Bites',
    price: 80,
    stock: 14,
    threshold: 5,
    counter: 'Counter 2 (Quick Bites)',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
    prepTime: '4 min',
    tags: ['Crispy', 'Breakfast']
  },
  {
    id: 'item-veg-burger',
    name: 'Double Patty Crunch Burger',
    cat: 'Quick Bites',
    price: 95,
    stock: 12,
    threshold: 6,
    counter: 'Counter 2 (Quick Bites)',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    prepTime: '5 min',
    tags: ['Snack', 'Express']
  },
  {
    id: 'item-cold-coffee',
    name: 'Frappe Cold Coffee',
    cat: 'Beverages',
    price: 60,
    stock: 35,
    threshold: 10,
    counter: 'Counter 3 (Cafe & Drinks)',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
    prepTime: '2 min',
    tags: ['Chilled', 'Coffee']
  },
  {
    id: 'item-mango-lassi',
    name: 'Kesariya Mango Lassi',
    cat: 'Beverages',
    price: 70,
    stock: 20,
    threshold: 5,
    counter: 'Counter 3 (Cafe & Drinks)',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    prepTime: '2 min',
    tags: ['Sweet', 'Refreshing']
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ord-101',
    token: 'A-042',
    customerName: 'Rohan Sharma',
    customerId: 'usr-2503',
    items: [{ id: 'item-dum-biryani', name: 'Chicken Dum Biryani', qty: 1, price: 180 }],
    total: 180,
    status: 'Preparing',
    placedAt: new Date(Date.now() - 8 * 60000).toISOString(),
    counter: 'Counter 1 (Hot Station)',
    paymentMethod: 'Campus UPI'
  },
  {
    id: 'ord-102',
    token: 'A-043',
    customerName: 'Priya Verma',
    customerId: 'usr-2504',
    items: [{ id: 'item-masala-dosa', name: 'Crispy Masala Dosa', qty: 2, price: 80 }],
    total: 160,
    status: 'Placed',
    placedAt: new Date(Date.now() - 3 * 60000).toISOString(),
    counter: 'Counter 2 (Quick Bites)',
    paymentMethod: 'Meal Pass'
  }
];

class DataStore {
  constructor() {
    this.menuItems = [...INITIAL_MENU_ITEMS];
    this.orders = [...INITIAL_ORDERS];
    this.users = [DEMO_ACCOUNTS.user, DEMO_ACCOUNTS.kitchen, DEMO_ACCOUNTS.admin];
    this.sessions = new Map();
  }

  // Inventory
  getAllItems() {
    return this.menuItems;
  }

  getItemById(id) {
    return this.menuItems.find(item => item.id === id);
  }

  updateStock(id, delta) {
    const item = this.getItemById(id);
    if (!item) return null;
    item.stock = Math.max(0, item.stock + delta);
    return item;
  }

  addItem(newItem) {
    const id = newItem.id || `item-${Date.now()}`;
    const item = { ...newItem, id, stock: Number(newItem.stock) || 0 };
    this.menuItems.push(item);
    return item;
  }

  // Orders
  getAllOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(ord => ord.id === id);
  }

  createOrder(orderData) {
    const nextTokenNum = 44 + this.orders.length;
    const token = `A-${String(nextTokenNum).padStart(3, '0')}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      token,
      customerName: orderData.customerName || 'Campus Diner',
      customerId: orderData.customerId || 'usr-guest',
      items: orderData.items || [],
      total: orderData.total || 0,
      status: 'Placed',
      placedAt: new Date().toISOString(),
      counter: orderData.counter || 'Counter 1 (Hot Station)',
      paymentMethod: orderData.paymentMethod || 'Campus UPI'
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  updateOrderStatus(id, newStatus) {
    const order = this.getOrderById(id);
    if (!order) return null;
    order.status = newStatus;
    return order;
  }

  // Users & Auth
  findUserByRollOrEmail(identifier) {
    if (!identifier) return null;
    const clean = identifier.toLowerCase().trim();
    return this.users.find(u => 
      (u.rollNo && u.rollNo.toLowerCase() === clean) ||
      (u.email && u.email.toLowerCase() === clean) ||
      (u.studentId && u.studentId.toLowerCase() === clean)
    );
  }

  registerUser(userData) {
    const newUser = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New User',
      email: userData.email || `${Date.now()}@campus.edu`,
      role: userData.role || 'user',
      title: userData.title || (userData.role === 'admin' ? 'Campus Administrator' : userData.role === 'kitchen' ? 'Kitchen Staff' : 'Campus Student'),
      year: userData.year || '3rd year',
      rollNo: userData.rollNo || `ID-${Date.now().toString().slice(-5)}`,
      studentId: userData.studentId || userData.rollNo,
      phone: userData.phone || '+91 98765 43210',
      balance: userData.role === 'admin' ? 5000 : userData.role === 'kitchen' ? 2000 : 450
    };
    this.users.push(newUser);
    return newUser;
  }
}

export const dataStore = new DataStore();
