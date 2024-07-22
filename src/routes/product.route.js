import {findAll, createProduct, searchByName, byUser, update, findByID, remove} from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validID } from '../middlewares/global.middlewares.js';

import { Router } from 'express';
const productRouter = Router();

productRouter.get('/search', searchByName);
productRouter.get('/list', findAll);

productRouter.use(authMiddleware);
productRouter.post('/create', createProduct);

productRouter.use(validID);
productRouter.get('/byUser', byUser);
productRouter.get('/:id', findByID);
productRouter.patch('/:id', update);
productRouter.delete('/:id', remove);

export default productRouter;