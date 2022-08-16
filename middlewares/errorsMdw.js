import logger from '../logger/lg4js.js'

export default function manejadorDeErrores(err, _req, res, _next) {
    switch (err.estado) {
        case (400 || 401 || 403):
            res.status(err.estado).json({ descripcion: err.descripcion, detalles: err.detalles })
            break;

        case undefined:
            logger.error(err)
            res.status(500).json({msg: err.message})
            break;    
    
        default:
            logger.error(err)
            res.status(err.estado).json({ descripcion: err.descripcion, detalles: err.detalles })
            break;
    }
}
    