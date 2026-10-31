import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import auditRoutes from './routes/auditRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'InvenTrack Campus Dining & Inventory API'
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/audit', auditRoutes);
app.use((err, req, res, next) => {
  console.error('[InvenTrack Backend Error]', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(` InvenTrack Backend Server running on http://localhost:${PORT}`);
  console.log(`" Health Check: http://localhost:${PORT}/api/health`);
});

export default app;


