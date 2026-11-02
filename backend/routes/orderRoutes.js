import { Router } from 'express';
import { getOrders, placeOrder, updateStatus } from '../controllers/orderController.js';

const router = Router();

router.get('/', getOrders);
router.post('/place', placeOrder);
router.patch('/:id/status', updateStatus);

export default router;


