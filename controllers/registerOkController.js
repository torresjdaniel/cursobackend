import logger from '../logger/lg4js.js';

export function post(req, res){
    res.json("'msg': 'registrado ok'");
    logger.info(`ruta: /registerok | metodo: POST`);
};