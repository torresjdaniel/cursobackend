import logger from "../logger/lg4js.js";

export default function validarSession(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      logger.info('Usuario no logueado');
      res.json("'msg': 'No estas logueado'");
    }
  }