import { Router } from 'express';
const logInRouter = Router();
import passport from '../auth/passportConfig.js';
import * as logInController from '../controllers/logInController.js';
import validarSession from '../mdw/validarSession.js';

logInRouter.get("/login",validarSession,logInController.get);  
logInRouter.post("/login",passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/login' }), logInController.post);

export default logInRouter;
