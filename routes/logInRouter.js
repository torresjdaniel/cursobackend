import { Router } from 'express';
const logInRouter = Router();
import * as logInController from '../controllers/logInController.js';
  
logInRouter.post("/login", logInController.post);


export default logInRouter;
