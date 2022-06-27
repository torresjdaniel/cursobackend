import { Router } from 'express';
const productosRouter = Router();

import * as productosController from '../controllers/productosController.js';

productosRouter.get('/productos/:id?', productosController.get);
productosRouter.post('/productos', productosController.post);
productosRouter.put('/productos/:id', productosController.put);
productosRouter.delete('/productos/:id', productosController.del);

export default productosRouter;
