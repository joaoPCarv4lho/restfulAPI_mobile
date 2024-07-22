import { Router } from 'express';
import { addCart, removeProduct, purchase } from '../controllers/cart.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.use(authMiddleware);
cartRouter.patch('/add/:id', addCart);
cartRouter.patch('/remove/:id', removeProduct);
cartRouter.patch('/purchase', purchase);

export default cartRouter;
