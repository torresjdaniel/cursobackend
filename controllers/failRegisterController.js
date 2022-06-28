import logger from '../logger/lg4js.js';

export function get(req, res){
    res.json("'msg': 'Falló Registro'");
    logger.info(`ruta: /failregister | metodo: GET`);
};

export function post(req, res){
    res.json("'msg': 'Falló Registro'");
    logger.info(`ruta: /failregister | metodo: POST`);
};

