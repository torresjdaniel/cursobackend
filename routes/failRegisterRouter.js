import { Router } from 'express';
const failRegisterRouter = Router();
import * as failRegisterController from '../controllers/failRegisterController.js';

failRegisterRouter.get("/failregister",failRegisterController.get);
failRegisterRouter.post("/failregister",failRegisterController.post);

export default failRegisterRouter;