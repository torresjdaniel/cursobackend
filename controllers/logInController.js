import logger from '../logger/lg4js.js';

export function get(req, res){
    res.json("'msg': 'logueado ok'");
    logger.info(`ruta: /login | metodo: GET`);
};

export function post(req, res){
    logger.info(`ruta: /login | metodo: POST`);
};