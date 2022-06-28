import logger from '../logger/lg4js.js';


export function post(req, res){
    res.json("'estado': 'fallo Log In'");
    logger.info(`ruta: /faillogin | metodo: POST`);
};