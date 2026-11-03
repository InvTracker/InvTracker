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
  { name: 'Chicken Dum Biryani', emoji: 'restaurant', basePrice: 180, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'non-veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80' },
  { name: 'Hyderabadi Veg Biryani', emoji: 'rice_bowl', basePrice: 150, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80' },
  { name: 'Ghee Podi Masala Dosa', emoji: 'breakfast_dining', basePrice: 90, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Mild', isExpress: false, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80' },
  { name: 'Crispy Veg Patty Burger', emoji: 'lunch_dining', basePrice: 70, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80' },
  { name: 'Grilled Cheese Sandwich', emoji: 'bakery_dining', basePrice: 60, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80' },
  { name: 'Wood-Fired Pizza Slice', emoji: 'local_pizza', basePrice: 120, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80' },
  { name: 'Peri-Peri Salted Fries', emoji: 'fastfood', basePrice: 55, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Hot', isExpress: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=800&auto=format&fit=crop&q=80' },
  { name: 'Artisan Cold Coffee', emoji: 'local_cafe', basePrice: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80' },
  { name: 'Spiced Masala Buttermilk', emoji: 'emoji_food_beverage', basePrice: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: 'Mild', isExpress: true, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80' },
  { name: 'Chilled Mango Lassi', emoji: 'local_cafe', basePrice: 50, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80' },
  { name: 'Warm Gulab Jamun (2 pcs)', emoji: 'icecream', basePrice: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80' },
  { name: 'Belgian Chocolate Brownie', emoji: 'cookie', basePrice: 65, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80' },
  { name: 'Paneer Tikka Roll', emoji: 'lunch_dining', basePrice: 95, cat: 'Quick Bites', counter: 'Counter 2 (Quick Bites)', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { name: 'Chole Bhature Platter', emoji: 'dinner_dining', basePrice: 110, cat: 'Hot Meals', counter: 'Counter 1 (Hot Meals)', diet: 'veg', spice: 'Medium', isExpress: false, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80' },
  { name: 'Iced Lemon Mint Tea', emoji: 'emoji_food_beverage', basePrice: 35, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)', diet: 'veg', spice: null, isExpress: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80' }
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
      status,
      image: template.image
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
