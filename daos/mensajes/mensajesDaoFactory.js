import DaoMensajesMongoDb from "./mensajesDaoMongoDb.js";
import mensajeSchema  from '../../models/mongoDbModels/mensajeSchema.js'
import {tipoPersistencia, stringNoSql, coleccionMensajes} from "../../config.js"
import logger from '../../logger/lg4js.js'

let dao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        dao = new DaoMensajesMongoDb(stringNoSql, coleccionMensajes, mensajeSchema);
        await dao.setConexion();
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoMensajesFactory{
    static getDao(){
        return dao;
    }
}