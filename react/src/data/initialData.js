/**
 * InvenTrack React Data Models
 * Clean default schema populated with realistic campus food fixtures
 */

export const stages = ['Placed', 'Preparing', 'Ready', 'Picked up'];

export const spendingData = [
  { day: 'MON', val: 140, peak: false },
  { day: 'TUE', val: 85, peak: false },
  { day: 'WED', val: 240, peak: true },
  { day: 'THU', val: 195, peak: false },
  { day: 'FRI', val: 160, peak: false },
  { day: 'SAT', val: 45, peak: false },
  { day: 'SUN', val: 0, peak: false },
];

export const initialUser = {
  name: 'Rohan Sharma',
  year: '3rd year',
  rollNo: '2301CS042',
  studentId: 'ST-2023-42',
  phone: '+91 98765 43210',
};

// Diverse catalog of potential campus food items to sample from
export const ITEM_POOL = [
  { name: 'Chicken Dum Biryani', emoji: '🍲', basePrice: 180, cat: 'Mains', counter: 'Counter 1 (Hot Meals)' },
  { name: 'Hyderabadi Veg Biryani', emoji: '🍚', basePrice: 150, cat: 'Mains', counter: 'Counter 1 (Hot Meals)' },
  { name: 'Ghee Podi Masala Dosa', emoji: '🧇', basePrice: 90, cat: 'Mains', counter: 'Counter 1 (Hot Meals)' },
  { name: 'Crispy Veg Patty Burger', emoji: '🍔', basePrice: 70, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)' },
  { name: 'Grilled Cheese Sandwich', emoji: '🥪', basePrice: 60, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)' },
  { name: 'Wood-Fired Pizza Slice', emoji: '🍕', basePrice: 120, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)' },
  { name: 'Peri-Peri Salted Fries', emoji: '🍟', basePrice: 55, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)' },
  { name: 'Artisan Cold Coffee', emoji: '🥤', basePrice: 45, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)' },
  { name: 'Spiced Masala Buttermilk', emoji: '🥛', basePrice: 25, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)' },
  { name: 'Chilled Mango Lassi', emoji: '🥭', basePrice: 50, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)' },
  { name: 'Warm Gulab Jamun (2 pcs)', emoji: '🍮', basePrice: 30, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)' },
  { name: 'Belgian Chocolate Brownie', emoji: '🍫', basePrice: 65, cat: 'Desserts', counter: 'Counter 3 (Cafe & Drinks)' },
  { name: 'Paneer Tikka Roll', emoji: '🌯', basePrice: 95, cat: 'Snacks', counter: 'Counter 2 (Quick Bites)' },
  { name: 'Chole Bhature Platter', emoji: '🥘', basePrice: 110, cat: 'Mains', counter: 'Counter 1 (Hot Meals)' },
  { name: 'Iced Lemon Mint Tea', emoji: '🍹', basePrice: 35, cat: 'Beverages', counter: 'Counter 3 (Cafe & Drinks)' }
];

/**
 * Generates a random set of example campus menu items and orders
 */
export function generateRandomExampleData() {
  // Pick 8-10 items with diverse categories
  const shuffled = [...ITEM_POOL].sort(() => 0.5 - Math.random());
  const selectedCount = Math.floor(8 + Math.random() * 3);
  const selectedPool = shuffled.slice(0, selectedCount);

  const menuItems = selectedPool.map((template, idx) => {
    const stockRand = Math.random();
    let stock = Math.floor(14 + Math.random() * 25);
    let status = 'available';

    if (stockRand < 0.1) {
      stock = 0;
      status = 'out';
    } else if (stockRand < 0.25) {
      stock = Math.floor(2 + Math.random() * 4);
      status = 'low';
    }

    const priceOffset = (Math.floor(Math.random() * 3) - 1) * 5;
    const price = Math.max(20, template.basePrice + priceOffset);

    return {
      id: `item-${Date.now()}-${idx + 1}`,
      name: template.name,
      emoji: template.emoji,
      price,
      cat: template.cat,
      counter: template.counter,
      stock,
      status
    };
  });

  const availItems = menuItems.filter((m) => m.status !== 'out');
  const recommendedIds = (availItems.length ? availItems : menuItems).slice(0, 4).map((m) => m.id);

  const customerNames = ['Rohan Sharma', 'Ananya Verma', 'Vikram Patel', 'Siddharth Rao', 'Tanvi Mehta'];
  const sampleOrders = [
    {
      id: `ord-${Date.now()}-1`,
      token: '#A-042',
      title: 'Chicken Dum Biryani + Artisan Cold Coffee',
      icon: '🍲',
      amt: 235,
      when: 'Just now',
      status: 'Preparing',
      stageIndex: 1,
      live: true,
      customerName: customerNames[0]
    },
    {
      id: `ord-${Date.now()}-2`,
      token: '#A-038',
      title: 'Grilled Cheese Sandwich + Peri-Peri Fries',
      icon: '🥪',
      amt: 125,
      when: '14 mins ago',
      status: 'Delivered',
      stageIndex: 3,
      live: false,
      customerName: customerNames[1]
    },
    {
      id: `ord-${Date.now()}-3`,
      token: '#A-031',
      title: 'Chole Bhature Platter',
      icon: '🥘',
      amt: 120,
      when: '45 mins ago',
      status: 'Delivered',
      stageIndex: 3,
      live: false,
      customerName: customerNames[2]
    }
  ];

  return {
    menuItems,
    recommendedIds,
    orders: sampleOrders
  };
}

// Generate the initial rich dataset so the app is immediately alive upon launch
const defaultFixtures = generateRandomExampleData();
export const initialMenuItems = defaultFixtures.menuItems;
export const recommendedIds = defaultFixtures.recommendedIds;
export const initialOrders = defaultFixtures.orders;
