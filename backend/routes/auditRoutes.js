import { Router } from 'express';
import { getOverview, exportCSV } from '../controllers/auditController.js';

const router = Router();

router.get('/overview', getOverview);
router.get('/export-csv', exportCSV);

export default router;


