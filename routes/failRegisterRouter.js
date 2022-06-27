import { Router } from 'express';
const failRegisterRouter = Router();
import * as failRegisterController from '../controllers/failRegisterController.js';

failRegisterRouter.get("/failregister",failRegisterController.get);

export default failRegisterRouter;