import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { getProfile } from '../controllers/auth.controller.js';

const router = Router();

router.get('/profile', authenticateUser, getProfile);

export default router;
