import DaoProductosMongoDb from './productos/daoProductosMongoDb.js';
import DaoCarritosMongoDb from './carritos/daoCarritosMongoDb.js';
import DaoUsuariosMongoDb from './usuarios/daoUsuariosMongoDb.js';
import DaoMensajesMongoDb from './mensajes/daoMensajesMongoDb.js';
import {productoSchema} from '../model/mongoDbModels/productoSchema.js';
import {carritoSchema}  from '../model/mongoDbModels/productoSchema.js';
import {usuarioSchema}  from '../model/mongoDbModels/productoSchema.js';
import {mensajeSchema} from '../model/mongoDbModels/productoSchema.js';
import {tipoPersistencia, stringNoSql, coleccionProductos, coleccionCarritos, coleccionUsuarios, coleccionMensajes} from "../config.js"
import logger from '../logger/lg4js.js'

let productosDao, carritosDao, usuariosDao, mensajesDao;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        productosDao = new DaoProductosMongoDb(stringNoSql, coleccionProductos, productoSchema);
        carritosDao = new DaoCarritosMongoDb(stringNoSql, coleccionCarritos, carritoSchema);
        usuariosDao = new DaoUsuariosMongoDb(stringNoSql, coleccionUsuarios, usuarioSchema);
        mensajesDao = new DaoMensajesMongoDb(stringNoSql,coleccionMensajes, mensajeSchema)
        break;

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export default class DaoFactory{
    static getProductosDao(){
        return productosDao;
    }

    static getCarritosDao(){
        return carritosDao;
    }

    static getUsuariosDao(){
        return usuariosDao;
    }

    static getMensajesDao(){
        return mensajesDao;
    }
}

