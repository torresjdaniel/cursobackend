import logger from '../logger/lg4js.js';

export function get(req, res){
    req.logout();
    res.json("'msg': 'Deslogueado ok'");
    logger.info(`ruta: /logout | metodo: POST`);
}