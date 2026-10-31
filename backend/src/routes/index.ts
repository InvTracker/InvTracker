import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import inventoryRoutes from './inventory.routes.js';
import orderRoutes from './order.routes.js';
import auditRoutes from './audit.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/inventory', inventoryRoutes);
apiRouter.use('/orders', orderRoutes);
apiRouter.use('/audit', auditRoutes);

export default apiRouter;

