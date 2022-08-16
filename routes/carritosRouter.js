import { Router } from 'express';
import { isAuth } from '../middlewares/authMdw.js';
const carritosRouter = Router();

import * as carritosController from '../controllers/carritosController.js';

carritosRouter.get('/shoppingcartproducts', isAuth, carritosController.get);
carritosRouter.post('/shoppingcartproducts', isAuth, carritosController.post);
carritosRouter.delete('/shoppingcartproducts/:id', isAuth, carritosController.del);

export default carritosRouter;