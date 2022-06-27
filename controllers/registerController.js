import logger from '../logger/lg4js.js';

export function get(req, res){
    res.json("'msg': 'registro ok'");
    logger.info(`ruta: /register | metodo: GET`);
}

export function post(req, res){
    logger.info(`ruta: /register | metodo: POST`);
};