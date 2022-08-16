import DaoCarritosMongoDb from "./carritosDaoMongoDb.js";
import carritoSchema  from '../../models/mongoDbModels/carritoSchema.js'
import {tipoPersistencia, stringNoSql, coleccionCarritos} from "../../config.js"
import logger from '../../logger/lg4js.js'

let dao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        dao = new DaoCarritosMongoDb(stringNoSql, coleccionCarritos, carritoSchema);
        await dao.setConexion();
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoCarritosFactory{
    static getDao(){
        return dao;
    }
}