import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.js';
import { inventoryService } from '../services/inventory.service.js';

export async function getItems(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { cat, search } = req.query as { cat?: string; search?: string };
    const items = await inventoryService.getAll({ cat, search });

    res.status(200).json({
      success: true,
      data: items,
      meta: {
        count: items.length,
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function adjustStock(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };
    const { delta } = req.body as { delta: number };

    const updated = await inventoryService.adjustStock(id, delta);

    res.status(200).json({
      success: true,
      message: `Stock updated for "${updated.name}" (${delta > 0 ? '+' : ''}${delta} units). Current stock: ${updated.stock}`,
      data: updated,
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function createItem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const itemData = req.body;
    const created = await inventoryService.create(itemData);

    res.status(201).json({
      success: true,
      message: `Item "${created.name}" added to menu catalog`,
      data: created,
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}
