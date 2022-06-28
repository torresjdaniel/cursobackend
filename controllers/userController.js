import logger from '../logger/lg4js.js';

export function post(req, res){
    const user = {
        email: req.user.username,
        nombre: req.user.nombre,
        edad: req.user.edad,
        direccion: req.user.direccion,
        avatarImgUrl: req.user.avatarImgName,
        idCarrito: req.user.idCarrito
    }
    res.send(user);
    logger.info(`ruta: /user | metodo: POST`);
};