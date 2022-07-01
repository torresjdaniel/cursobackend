import { Router } from 'express';
const userRouter = Router();
import * as userController from '../controllers/userController.js';
import validarSession from '../mdw/validarSessionMdw.js';

userRouter.post("/user", validarSession ,userController.post);

export default userRouter;