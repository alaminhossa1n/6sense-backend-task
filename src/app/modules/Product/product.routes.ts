import { Router } from "express";
import { ProductController } from "./product.controller";

const router = Router();

router.post("/create", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.patch("/update/:id", ProductController.updateProduct);

export const productRoutes = router;
