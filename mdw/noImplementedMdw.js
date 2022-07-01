import logger from "../logger/lg4js.js";

export default function noImplemented(req, res){
    const { url, method } = req;
    res.send(`Ruta ${method} ${url} no está implementada`);
    logger.warn(`Ruta ${method} ${url} no implementada`);
  };
