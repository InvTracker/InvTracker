import { inventoryService } from './inventory.service.js';
import { orderService } from './order.service.js';
import { InventoryAuditSummary } from '../types/inventory.js';

class AuditService {
  async getSummary(): Promise<InventoryAuditSummary> {
    const items = await inventoryService.getAll();
    const orders = await orderService.getAll();

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const activeOrders = orders.filter((o) => o.status !== 'Picked up').length;
    const criticalItems = items.filter((i) => i.stock <= i.threshold);

    return {
      totalRevenue,
      totalOrders: orders.length,
      activeOrders,
      totalCatalogItems: items.length,
      criticalDeficitsCount: criticalItems.length,
      criticalItems
    };
  }

  async generateCSV(): Promise<string> {
    const items = await inventoryService.getAll();
    let csv = 'Item ID,Item Name,Category,Station Counter,Price (INR),Stock Remaining,Restock Threshold,Restock Urgency\n';

    items.forEach((i) => {
      const urgency = i.stock === 0 ? 'CRITICAL (OUT)' : i.stock <= i.threshold ? 'HIGH (LOW STOCK)' : 'NORMAL';
      const cleanName = i.name.replace(/"/g, '""');
      const cleanCat = i.cat.replace(/"/g, '""');
      const cleanCounter = i.counter.replace(/"/g, '""');
      csv += `"${i.id}","${cleanName}","${cleanCat}","${cleanCounter}",${i.price},${i.stock},${i.threshold},"${urgency}"\n`;
    });

    return csv;
  }
}

export const auditService = new AuditService();

