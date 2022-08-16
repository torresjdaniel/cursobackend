import DaoOrdenesMongoDb from "./ordenesDaoMongoDb.js";
import ordenschema  from '../../models/mongoDbModels/ordenschema.js'
import {tipoPersistencia, stringNoSql, coleccionOrdenes} from "../../config.js"
import logger from '../../logger/lg4js.js'

let dao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        dao = new DaoOrdenesMongoDb(stringNoSql, coleccionOrdenes, ordenschema);
        await dao.setConexion();
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoOrdenesFactory{
    static getDao(){
        return dao;
    }
}