import { Router } from 'express';
const carritosRouter = Router();

import * as carritosController from '../controllers/carritosController.js';

carritosRouter.get('/carrito/:id', carritosController.get);
carritosRouter.post('/carrito', carritosController.post);
carritosRouter.post('/carrito/:id/productos', carritosController.postProductos);
carritosRouter.delete('/carrito/:id', carritosController.del);
carritosRouter.delete('/carrito/:id/productos/:id_prod', carritosController.delProductos);

export default carritosRouter;