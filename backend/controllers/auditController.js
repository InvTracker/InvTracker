import { dataStore } from '../models/dataStore.js';

export const getOverview = (req, res) => {
  const items = dataStore.getAllItems();
  const orders = dataStore.getAllOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Picked up').length;
  const criticalDeficits = items.filter(i => i.stock <= (i.threshold || 5));

  return res.status(200).json({
    success: true,
    data: {
      totalRevenue,
      totalOrders: orders.length,
      activeOrders: activeOrdersCount,
      totalCatalogItems: items.length,
      criticalDeficitsCount: criticalDeficits.length,
      criticalItems: criticalDeficits
    }
  });
};

export const exportCSV = (req, res) => {
  const items = dataStore.getAllItems();

  let csv = 'Item ID,Item Name,Category,Station Counter,Price (INR),Stock Remaining,Restock Threshold,Restock Urgency\n';
  items.forEach(i => {
    const urgency = i.stock === 0 ? 'CRITICAL (OUT)' : i.stock <= i.threshold ? 'HIGH (LOW STOCK)' : 'NORMAL';
    csv += `"${i.id}","${i.name}","${i.cat}","${i.counter}",${i.price},${i.stock},${i.threshold},"${urgency}"\n`;
  });

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="inventrack_audit_report.csv"');
  return res.status(200).send(csv);
};

