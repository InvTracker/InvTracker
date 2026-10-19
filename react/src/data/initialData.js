export const initialMenuItems = [
  { id: 'biryani', name: 'Chicken Biryani', emoji: '🍲', price: 185, cat: 'Mains', stock: 25, status: 'available' },
  { id: 'vegbiryani', name: 'Veg Biryani', emoji: '🍚', price: 150, cat: 'Mains', stock: 20, status: 'available' },
  { id: 'dosa', name: 'Masala Dosa', emoji: '🧇', price: 90, cat: 'Mains', stock: 20, status: 'available' },
  { id: 'burger', name: 'Burger', emoji: '🍔', price: 70, cat: 'Snacks', stock: 20, status: 'available' },
  { id: 'sandwich', name: 'Veg Sandwich', emoji: '🥪', price: 60, cat: 'Snacks', stock: 25, status: 'available' },
  { id: 'pizza', name: 'Pizza Slice', emoji: '🍕', price: 120, cat: 'Snacks', stock: 15, status: 'available' },
  { id: 'fries', name: 'Fries', emoji: '🍟', price: 55, cat: 'Snacks', stock: 25, status: 'available' },
  { id: 'coldcoffee', name: 'Cold Coffee', emoji: '🥤', price: 45, cat: 'Beverages', stock: 30, status: 'available' },
  { id: 'buttermilk', name: 'Buttermilk', emoji: '🥛', price: 25, cat: 'Beverages', stock: 40, status: 'available' },
  { id: 'coke', name: 'Coke', emoji: '🥤', price: 40, cat: 'Beverages', stock: 30, status: 'available' },
  { id: 'gulabjamun', name: 'Gulab Jamun', emoji: '🍮', price: 30, cat: 'Desserts', stock: 20, status: 'available' },
];

export const recommendedIds = ['burger', 'coke', 'fries', 'gulabjamun'];

export const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];

// Beta test orders reset to empty initial array
export const initialOrders = [];

// Guest initial state
export const initialUser = null;

// Clean zero spending analytics
export const spendingData = [
  { day: 'MON', val: 0, peak: false },
  { day: 'TUE', val: 0, peak: false },
  { day: 'WED', val: 0, peak: false },
  { day: 'THU', val: 0, peak: false },
  { day: 'FRI', val: 0, peak: false },
  { day: 'SAT', val: 0, peak: false },
  { day: 'SUN', val: 0, peak: false },
];
