import { Router } from 'express';
import { createProduct, getProductById, updateProductById, deleteProductById, listProducts, getProductsByPriceRange } from './productController.js';

const router = Router();

router.post('/products', createProduct);
router.get('/products/:id', getProductById);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', deleteProductById);
router.get('/products', listProducts);
router.get('/products/price-range', getProductsByPriceRange);

export default router;