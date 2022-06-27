import logger from '../logger/lg4js.js';

export function get(req, res){
    res.json("'estado': 'fallo Log In'");
    logger.info(`ruta: /faillogin | metodo: GET | res: 'estado': 'fallo ok' `);
};