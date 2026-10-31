import { Router } from 'express';
import { authenticateUser, requireRole } from '../middlewares/auth.middleware.js';
import { getOverview, exportCSV } from '../controllers/audit.controller.js';

const router = Router();

router.get('/overview', authenticateUser, requireRole('admin'), getOverview);
router.get('/export-csv', authenticateUser, requireRole('admin'), exportCSV);

export default router;
