import { Router } from 'express';
const failLogInRouter = Router();
import * as failLogInController from '../controllers/failLogInController.js';

failLogInRouter.get("/login", failLogInController.get);  

export default failLogInRouter;