import logger from '../logger/lg4js.js';
import { generateAuthToken } from '../auth/jwt.js';

export function post(req, res){
    // const token = generateAuthToken(req.user);
    logger.info(req.user)
    res.json({msg: 'Registro OK',});
    logger.info(`ruta: /registerok | metodo: POST`);
};