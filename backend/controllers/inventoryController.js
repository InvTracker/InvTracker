import { dataStore } from '../models/dataStore.js';

export const getItems = (req, res) => {
  const { cat, search } = req.query;
  let items = dataStore.getAllItems();

  if (cat && cat !== 'All') {
    items = items.filter(item => item.cat.toLowerCase() === cat.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    items = items.filter(item => item.name.toLowerCase().includes(s) || item.counter.toLowerCase().includes(s));
  }

  return res.status(200).json({
    success: true,
    count: items.length,
    items
  });
};

export const adjustStock = (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;

  if (delta === undefined) {
    return res.status(400).json({ success: false, message: 'Stock delta is required' });
  }

  const updatedItem = dataStore.updateStock(id, Number(delta));
  if (!updatedItem) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }

  return res.status(200).json({
    success: true,
    message: `Stock updated for ${updatedItem.name}`,
    item: updatedItem
  });
};

export const createItem = (req, res) => {
  const { name, price, stock, cat, counter, threshold } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Item name and price are required' });
  }

  const newItem = dataStore.addItem({
    name,
    price: Number(price),
    stock: Number(stock) || 10,
    cat: cat || 'Meals',
    counter: counter || 'Counter 1 (Hot Station)',
    threshold: Number(threshold) || 5
  });

  return res.status(201).json({
    success: true,
    message: `Item "${newItem.name}" added to menu catalog`,
    item: newItem
  });
};


