/**
 * InvenTrack React Data Models
 * Clean empty schema by default (zero hardcoded items on first load)
 */

export const initialMenuItems = [];
export const recommendedIds = [];
export const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];
export const initialOrders = [];
export const initialUser = {
  name: 'Rohan Sharma',
  email: 'rohan@student.campus.edu',
  year: '2nd year',
  rollNo: '2503A52924',
  studentId: '2503A52924',
  phone: '9876543210',
  role: 'user'
};

export const spendingData = [
  { day: 'MON', val: 0, peak: false },
  { day: 'TUE', val: 0, peak: false },
  { day: 'WED', val: 0, peak: false },
  { day: 'THU', val: 0, peak: false },
  { day: 'FRI', val: 0, peak: false },
  { day: 'SAT', val: 0, peak: false },
  { day: 'SUN', val: 0, peak: false },
];

// Diverse catalog of potential campus food items to sample randomly from
const ITEM_POOL = [
  { name: 'Chicken Dum Biryani', emoji: '', basePrice: 180, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'non-veg', spice: 'Medium', isExpress: false },
  { name: 'Hyderabadi Veg Biryani', emoji: '', basePrice: 150, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Medium', isExpress: false },
  { name: 'Ghee Podi Masala Dosa', emoji: '', basePrice: 90, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Mild', isExpress: false },
  { name: 'Crispy Veg Patty Burger', emoji: '', basePrice: 70, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Mild', isExpress: true },
  { name: 'Grilled Cheese Sandwich', emoji: '', basePrice: 60, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Mild', isExpress: true },
  { name: 'Wood-Fired Pizza Slice', emoji: '', basePrice: 120, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Medium', isExpress: false },
  { name: 'Peri-Peri Salted Fries', emoji: '', basePrice: 55, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Hot', isExpress: true },
  { name: 'Artisan Cold Coffee', emoji: '', basePrice: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true },
  { name: 'Spiced Masala Buttermilk', emoji: '', basePrice: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: 'Mild', isExpress: true },
  { name: 'Chilled Mango Lassi', emoji: '', basePrice: 50, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true },
  { name: 'Warm Gulab Jamun (2 pcs)', emoji: '', basePrice: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true },
  { name: 'Belgian Chocolate Brownie', emoji: '', basePrice: 65, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true },
  { name: 'Paneer Tikka Roll', emoji: '', basePrice: 95, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Medium', isExpress: false },
  { name: 'Chole Bhature Platter', emoji: '', basePrice: 110, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Medium', isExpress: false },
  { name: 'Iced Lemon Mint Tea', emoji: '', basePrice: 35, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true }
];

/**
 * Generates a random set of example campus menu items and orders
 */
export function generateRandomExampleData() {
  // Shuffle pool and pick 7-9 items
  const shuffled = [...ITEM_POOL].sort(() => 0.5 - Math.random());
  const selectedCount = Math.floor(7 + Math.random() * 3); // 7 to 9 items
  const selectedPool = shuffled.slice(0, selectedCount);

  const menuItems = selectedPool.map((template, idx) => {
    // Random stock: mostly normal (15-35), occasionally low (3-5), occasionally out (0)
    const stockRand = Math.random();
    let stock = Math.floor(12 + Math.random() * 25);
    let status = 'available';

    if (stockRand < 0.12) {
      stock = 0;
      status = 'out';
    } else if (stockRand < 0.28) {
      stock = Math.floor(2 + Math.random() * 4); // 2-5
      status = 'low';
    }

    // Slight price jitter +- 5-10 Rs for realistic variety
    const priceOffset = (Math.floor(Math.random() * 5) - 2) * 5;
    const price = Math.max(20, template.basePrice + priceOffset);

    return {
      id: `item-${Date.now()}-${idx + 1}`,
      name: template.name,
      emoji: template.emoji,
      price,
      cat: template.cat,
      counter: template.counter,
      diet: template.diet,
      spice: template.spice,
      isExpress: template.isExpress,
      stock,
      status
    };
  });

  // Recommended IDs from the available generated items
  const availItems = menuItems.filter((m) => m.status !== 'out');
  const recommendedIds = availItems.slice(0, 4).map((m) => m.id);

  // Generate 2-3 realistic sample orders
  const customerNames = ['Rohan Sharma', 'Ananya Verma', 'Vikram Patel', 'Siddharth Rao', 'Tanvi Mehta'];
  const orderCount = Math.floor(2 + Math.random() * 2); // 2 or 3 orders
  const sampleOrders = [];

  for (let i = 0; i < orderCount; i++) {
    const itemA = availItems[i % availItems.length] || menuItems[0];
    const itemB = availItems[(i + 1) % availItems.length];
    const orderItems = itemB && Math.random() > 0.4 ? [itemA, itemB] : [itemA];
    
    const subtotal = orderItems.reduce((acc, curr) => acc + (curr ? curr.price : 50), 0);
    const packing = 10;
    const total = subtotal + packing;
    const tokenNum = Math.floor(100 + Math.random() * 900);
    const stageIdx = Math.floor(Math.random() * 3); // 0 (Placed), 1 (Preparing), 2 (Ready)

    sampleOrders.push({
      id: `ord-${Date.now()}-${i + 1}`,
      token: `#A-${tokenNum}`,
      title: orderItems.map((it) => it.name).join(' + '),
      icon: orderItems[0].emoji,
      amt: total,
      when: `${(i + 1) * 8} mins ago`,
      status: stages[stageIdx],
      stageIndex: stageIdx,
      live: i === 0, // First order is live
      customerName: customerNames[i % customerNames.length]
    });
  }

  return {
    menuItems,
    recommendedIds,
    orders: sampleOrders
  };
}
