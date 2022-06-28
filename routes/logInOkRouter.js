import { Router } from 'express';
const logInOkRouter = Router();
import * as logInOkController from '../controllers/logInOkController.js';
import validarSession from '../mdw/validarSession.js';

logInOkRouter.post("/loginok",validarSession,logInOkController.post);  

export default logInOkRouter;