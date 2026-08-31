export const initialMenuItems = [
  { id: 'biryani', name: 'Chicken Biryani', emoji: '🍲', price: 185, cat: 'Mains', stock: 25, status: 'available' },
  { id: 'vegbiryani', name: 'Veg Biryani', emoji: '🍚', price: 150, cat: 'Mains', stock: 18, status: 'available' },
  { id: 'dosa', name: 'Masala Dosa', emoji: '🧇', price: 90, cat: 'Mains', stock: 18, status: 'available' },
  { id: 'burger', name: 'Burger', emoji: '🍔', price: 70, cat: 'Snacks', stock: 5, status: 'low' },
  { id: 'sandwich', name: 'Veg Sandwich', emoji: '🥪', price: 60, cat: 'Snacks', stock: 22, status: 'available' },
  { id: 'pizza', name: 'Pizza Slice', emoji: '🍕', price: 120, cat: 'Snacks', stock: 0, status: 'out' },
  { id: 'fries', name: 'Fries', emoji: '🍟', price: 55, cat: 'Snacks', stock: 7, status: 'low' },
  { id: 'coldcoffee', name: 'Cold Coffee', emoji: '🥤', price: 45, cat: 'Beverages', stock: 31, status: 'available' },
  { id: 'buttermilk', name: 'Buttermilk', emoji: '🥛', price: 25, cat: 'Beverages', stock: 40, status: 'available' },
  { id: 'coke', name: 'Coke', emoji: '🥤', price: 40, cat: 'Beverages', stock: 26, status: 'available' },
  { id: 'gulabjamun', name: 'Gulab Jamun', emoji: '🍮', price: 30, cat: 'Desserts', stock: 16, status: 'available' },
];

export const recommendedIds = ['burger', 'coke', 'fries', 'gulabjamun'];

export const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];

export const initialOrders = [
  { id: 1, icon: '🍲', title: 'Chicken Biryani', when: 'Today, 1:04 PM', amt: 185, status: 'In progress', live: true },
  { id: 2, icon: '🥪', title: 'Veg Sandwich + Coffee', when: 'Yesterday, 4:40 PM', amt: 95, status: 'Delivered' },
  { id: 3, icon: '🍕', title: 'Margherita Slice', when: 'Mon, 12:52 PM', amt: 120, status: 'Delivered' },
  { id: 4, icon: '🥤', title: 'Cold Coffee', when: 'Mon, 9:15 AM', amt: 45, status: 'Delivered' },
];

export const initialUser = {
  name: 'Nivedita',
  year: '2nd year',
  rollNo: '2503A52924',
  studentId: '2503A52924',
  phone: '91+1234567890',
};

export const spendingData = [
  { day: 'MON', val: 120, peak: false },
  { day: 'TUE', val: 185, peak: false },
  { day: 'WED', val: 240, peak: true },
  { day: 'THU', val: 95, peak: false },
  { day: 'FRI', val: 160, peak: false },
  { day: 'SAT', val: 45, peak: false },
  { day: 'SUN', val: 0, peak: false },
];
