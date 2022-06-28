import { Router } from 'express';
const failLogInRouter = Router();
import * as failLogInController from '../controllers/failLogInController.js';

failLogInRouter.post("/faillogin", failLogInController.post);  

export default failLogInRouter;