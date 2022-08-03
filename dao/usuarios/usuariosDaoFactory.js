import DaoUsuariosMongoDb from "./UsuariosDaoMongoDb.js";
import usuarioschema  from '../../model/mongoDbModels/usuarioschema.js'
import {tipoPersistencia, stringNoSql, coleccionUsuarios} from "../../config.js"
import logger from '../../logger/lg4js.js'

let dao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        dao = new DaoUsuariosMongoDb(stringNoSql, coleccionUsuarios, usuarioschema);
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoUsuariosFactory{
    static getDao(){
        return dao;
    }
}