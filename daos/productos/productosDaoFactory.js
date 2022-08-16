import DaoProductosMongoDb from "./ProductosDaoMongoDb.js";
import productoschema  from '../../models/mongoDbModels/productoschema.js'
import {tipoPersistencia, stringNoSql, coleccionProductos} from "../../config.js"
import logger from '../../logger/lg4js.js'

let dao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        dao = new DaoProductosMongoDb(stringNoSql, coleccionProductos, productoschema);
        await dao.setConexion();
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoProductosFactory{
    static getDao(){
        return dao;
    }
}