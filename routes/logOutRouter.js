import { Router } from 'express';
const logOutRouter = Router();
import validarSession from '../mdw/validarSessionMdw.js';
import * as logOutController from '../controllers/logOutController.js';

logOutRouter.get("/logout",validarSession, logOutController.get); 

export default logOutRouter;