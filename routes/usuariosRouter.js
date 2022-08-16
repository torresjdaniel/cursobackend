import { Router } from 'express';
const usuariosRouter = Router();
import * as registerController from '../controllers/usuariosController.js';

usuariosRouter.post("/users",registerController.post);

export default usuariosRouter;
