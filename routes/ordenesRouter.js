import { Router } from 'express';
import { isAuth } from '../middlewares/authMdw.js';
const ordenesRouter = Router();

import * as ordenesController from '../controllers/ordenesController.js';

ordenesRouter.get('/orders', isAuth, ordenesController.get);
ordenesRouter.post('/orders', isAuth, ordenesController.post);

export default ordenesRouter;