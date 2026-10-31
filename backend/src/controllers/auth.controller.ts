import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.js';

export function getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  try {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
        permissions: {
          canManageInventory: req.user?.role === 'admin',
          canAdjustStock: req.user?.role === 'admin' || req.user?.role === 'kitchen',
          canUpdateOrderStatus: req.user?.role === 'admin' || req.user?.role === 'kitchen',
          canViewAuditReports: req.user?.role === 'admin',
          canPlaceOrders: true
        }
      },
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}
