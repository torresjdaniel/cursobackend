import { Router } from 'express';
const registerRouter = Router();
import passport from '../auth/passportConfig.js';
import upLoadAvatarImg from '../mdw/multerMdw.js';
import * as registerController from '../controllers/registerController.js';

registerRouter.post("/register",upLoadAvatarImg, passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/registerok' }),registerController.post);

export default registerRouter;