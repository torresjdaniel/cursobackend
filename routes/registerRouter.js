import { Router } from 'express';
const registerRouter = Router();
import passport from '../auth/passportConfig.js';
import * as registerController from '../controllers/registerController.js';

registerRouter.get("/register",registerController.get);  
registerRouter.post("/register",passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/register' }),registerController.post);

export default registerRouter;