import logger from '../logger/lg4js.js';

export function post(req, res){
    res.json("'msg': 'logueado ok'");
    logger.info(`ruta: /loginok | metodo: POST`);
};