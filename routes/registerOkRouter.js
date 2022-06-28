import { Router } from 'express';
const registerOkRouter = Router();
import * as registerOkController from '../controllers/registerOkController.js';
import validarSession from '../mdw/validarSession.js';

registerOkRouter.post("/registerok",validarSession,registerOkController.post);  

export default registerOkRouter;