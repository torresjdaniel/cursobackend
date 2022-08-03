import { Router } from 'express';
import { isAuth } from '../auth/jwt.js';
const logInRouter = Router();
import passport from '../auth/passportConfig.js';
import * as logInController from '../controllers/logInController.js';
  
logInRouter.post("/login", isAuth, logInController.post);


export default logInRouter;
