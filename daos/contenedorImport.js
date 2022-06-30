import * as contenedorSql from './contenedorSql.js';
import * as contenedorMemoria from './contenedorMemoria.js';
import * as contenedorMongoDb from './contenedorMongoDb.js';
import {productoSchema} from '../model/mongoDbModel.js';
import {carritoSchema}  from '../model/mongoDbModel.js';
import {userSchema}  from '../model/mongoDbModel.js';
import {tipoPersistencia, stringNoSql, coleccionProductos, coleccionCarritos, coleccionUsuarios, stringSql, tablaCarritos, tablaProductos} from "../config.js"
import logger from '../logger/lg4js.js'
let productos;
let carritos;
let usuarios;

switch (tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        productos = new contenedorMongoDb.Productos(stringNoSql, coleccionProductos, productoSchema);
        carritos = new contenedorMongoDb.Carritos(stringNoSql, coleccionCarritos, carritoSchema);
        usuarios = new contenedorMongoDb.Usuarios(stringNoSql, coleccionUsuarios, userSchema);
        break;
    
    case 'sql':
        productos = new contenedorSql.Productos(JSON.parse(stringSql), tablaProductos);
        carritos = new contenedorSql.Carritos(JSON.parse(stringSql), tablaCarritos);
        break;
        
    case 'memoria':
        productos = new contenedorMemoria.Productos();
        carritos = new contenedorMemoria.Carritos();
        break;    

    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}

export {carritos, productos, usuarios};

