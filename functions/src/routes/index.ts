import { Router } from 'express';
import { validateToken } from '../middleware/authMiddleware';
import * as productController from '../modules/products/productController';

const router = Router();

// HEALTH CHECK
router.get('/health', (req, res) => res.send('Amarise Backend Operational'));

// PRODUCTS
router.get('/products', productController.getProducts);
router.post('/products', validateToken, productController.createProduct);

// ANALYTICS (Mock)
router.get('/analytics/dashboard', (req, res) => {
  res.json({
    success: true,
    data: { users: 1200, revenue: 540000, orders: 320, growth: "+12%" }
  });
});

// AI (Mock)
router.post('/ai/generate', (req, res) => {
  res.json({
    success: true,
    data: { output: "Mock AI response for: " + req.body.prompt }
  });
});

export default router;
