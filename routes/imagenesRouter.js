import { Router } from 'express';
const imagenesRouter = Router();
import * as imagenesController from '../controllers/imagenesController.js';
import upLoadAvatarImg from '../middlewares/multerMdw.js';

imagenesRouter.post("/images", upLoadAvatarImg, imagenesController.post);

export default imagenesRouter;