import { Router } from 'express';
import { getItems, adjustStock, createItem } from '../controllers/inventoryController.js';

const router = Router();

router.get('/items', getItems);
router.patch('/items/:id/stock', adjustStock);
router.post('/items', createItem);

export default router;


