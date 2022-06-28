import { Router } from 'express';
const logInRouter = Router();
import passport from '../auth/passportConfig.js';
import * as logInController from '../controllers/logInController.js';
  
logInRouter.post("/login",passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/loginok' }), logInController.post);


export default logInRouter;
