import { Router } from 'express';
const confirmarPedidoRouter = Router();
import validarSession from '../mdw/validarSessionMdw.js';

import * as confirmarPedidoController from '../controllers/confirmarPedidoController.js';

confirmarPedidoRouter.post('/confirmarpedido', validarSession, confirmarPedidoController.post);

export default confirmarPedidoRouter;