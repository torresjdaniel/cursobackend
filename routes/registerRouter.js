import { Router } from 'express';
const registerRouter = Router();
import passport from '../auth/passportConfig.js';
import upLoadAvatarImg from '../mdw/multerMdw.js';
import * as registerController from '../controllers/registerController.js';

registerRouter.post("/register",registerController.post);

export default registerRouter;
