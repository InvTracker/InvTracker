import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth.js';
import { auditService } from '../services/audit.service.js';

export async function getOverview(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const summary = await auditService.getSummary();

    res.status(200).json({
      success: true,
      data: summary,
      meta: {
        requestId: req.requestId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function exportCSV(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const csvData = await auditService.generateCSV();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventrack_audit_report.csv"');
    res.status(200).send(csvData);
  } catch (err) {
    next(err);
  }
}

