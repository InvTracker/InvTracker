export interface MenuItem {
  id: string;
  name: string;
  cat: string;
  price: number;
  stock: number;
  threshold: number;
  counter: string;
  image?: string;
  prepTime?: string;
  tags?: string[];
}

export interface InventoryAuditSummary {
  totalRevenue: number;
  totalOrders: number;
  activeOrders: number;
  totalCatalogItems: number;
  criticalDeficitsCount: number;
  criticalItems: MenuItem[];
}
