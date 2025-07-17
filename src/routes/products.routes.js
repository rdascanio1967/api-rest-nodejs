import { Router } from "express";
import { getAllProducts,
         productsById,
         searchProducts
 } from "../controllers/products.controllers.js";

const router = Router();


router.get('/products',getAllProducts)

router.get("/products/search", searchProducts);


router.get('/products/:id',productsById)

export default router;
