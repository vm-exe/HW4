import express, { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router: Router = express.Router();

// Rutas
router.get('/', getAllProducts);       // get
router.post('/', createProduct);      // Create
router.put('/:id', updateProduct);    // update
router.delete('/:id', deleteProduct); // delete

export default router;

