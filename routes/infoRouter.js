import { Router } from 'express';
const infoRouter = Router();
import * as infoController from '../controllers/infoController.js';;

infoRouter.get('/infoDatos', infoController.getDatos);
infoRouter.get('/info', infoController.get);

export default infoRouter;