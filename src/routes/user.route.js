import { register, findAll, findByID, update } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {validID} from '../middlewares/global.middlewares.js'

import { Router } from 'express';
const userRouter = Router();

userRouter.post('/register', register);

userRouter.use(authMiddleware)
userRouter.get('/list', findAll);

userRouter.use(validID)
userRouter.get('/:id', validID, findByID);
userRouter.patch('/:id', validID, update);

export default userRouter;