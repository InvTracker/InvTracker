import { MenuItem } from '../types/inventory.js';
import { LockService } from './lock.service.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
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

class InventoryService {
  private items: Map<string, MenuItem> = new Map();

  constructor() {
    INITIAL_MENU_ITEMS.forEach((i) => this.items.set(i.id, { ...i }));
  }

  async getAll(query?: { cat?: string; search?: string }): Promise<MenuItem[]> {
    let result = Array.from(this.items.values());

    if (query?.cat && query.cat !== 'All') {
      const catLower = query.cat.toLowerCase();
      result = result.filter((item) => item.cat.toLowerCase() === catLower);
    }

    if (query?.search) {
      const s = query.search.toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(s) || item.counter.toLowerCase().includes(s));
    }

    return result;
  }

  async getById(id: string): Promise<MenuItem> {
    const item = this.items.get(id);
    if (!item) {
      throw new NotFoundError(`Menu item with ID "${id}" was not found.`);
    }
    return { ...item };
  }

  async create(data: Omit<MenuItem, 'id'> & { id?: string }): Promise<MenuItem> {
    const id = data.id || `item-${Date.now()}`;
    const newItem: MenuItem = {
      ...data,
      id
    };
    this.items.set(id, newItem);
    logger.info({ id, name: newItem.name }, 'New catalog menu item created');
    return { ...newItem };
  }

  async adjustStock(id: string, delta: number): Promise<MenuItem> {
    return await LockService.withLock(id, 5000, async () => {
      const item = this.items.get(id);
      if (!item) {
        throw new NotFoundError(`Menu item "${id}" not found`);
      }

      const newStock = item.stock + delta;
      if (newStock < 0) {
        throw new ConflictError(
          `Cannot deduct ${Math.abs(delta)} units. Available stock for "${item.name}" is only ${item.stock}.`
        );
      }

      item.stock = newStock;
      logger.info({ id, delta, newStock }, 'Stock adjusted atomically');
      return { ...item };
    });
  }

  async deductMultipleAtomic(cartItems: Array<{ id: string; qty: number; name?: string }>): Promise<void> {
    const itemKeys = cartItems.map((c) => c.id);

    await LockService.withMultiLock(itemKeys, 8000, async () => {
      for (const cartItem of cartItems) {
        const current = this.items.get(cartItem.id);
        if (!current) {
          throw new NotFoundError(`Cart item with ID "${cartItem.id}" no longer exists in inventory catalog.`);
        }
        if (current.stock < cartItem.qty) {
          throw new ConflictError(
            `Insufficient stock for "${current.name}". Requested: ${cartItem.qty}, Available: ${current.stock}. Order rejected to protect inventory integrity.`
          );
        }
      }

      for (const cartItem of cartItems) {
        const current = this.items.get(cartItem.id)!;
        current.stock -= cartItem.qty;
        logger.info(
          { itemId: current.id, name: current.name, deducted: cartItem.qty, remaining: current.stock },
          'Atomic stock deduction committed'
        );
      }
    });
  }
}

export const inventoryService = new InventoryService();

