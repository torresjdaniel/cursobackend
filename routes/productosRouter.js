import { Router } from 'express';
const productosRouter = Router();
import {isAdmin} from '../middlewares/authMdw.js';

import * as productosController from '../controllers/productosController.js';

productosRouter.get('/products/:id?', productosController.get);
productosRouter.post('/products', isAdmin, productosController.post);
productosRouter.put('/products/:id', isAdmin, productosController.put);
productosRouter.delete('/products/:id', isAdmin, productosController.del);

export default productosRouter;
