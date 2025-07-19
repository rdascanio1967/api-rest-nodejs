import { Router } from "express";
import { createProduct, getAllProducts,
         productsById,
         searchProducts
 } from "../controllers/products.controllers.js";

const router = Router();


router.get('/products',getAllProducts)

router.get("/products/search", searchProducts);


router.get('/products/:id',productsById);

router.post('/products',createProduct);

export default router;
