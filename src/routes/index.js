import { Router } from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import authRouter from "./auth.route.js";
import cartRouter from "./cart.route.js";
import swaggerRouter from "./swagger.route.cjs"

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/auth', authRouter);
router.use('/api/product', productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/doc', swaggerRouter);

export default router;