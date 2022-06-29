import { Router } from 'express';
const confirmarPedidoRouter = Router();
import validarSession from '../mdw/validarSession.js';

import * as confirmarPedidoController from '../controllers/confirmarPedidoController.js';

confirmarPedidoRouter.get('/confirmarpedido', validarSession, confirmarPedidoController.get);

export default confirmarPedidoRouter;