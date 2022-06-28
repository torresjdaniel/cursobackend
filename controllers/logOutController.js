import logger from '../logger/lg4js.js';

export function get(req, res){
    req.logout((err) =>{
        if (err) {
            logger.error(`Algo paso en logout(), ${err}`)
        }
        res.json("'msg': 'Deslogueado ok'");
        logger.info(`ruta: /logout | metodo: POST`);
    });
}