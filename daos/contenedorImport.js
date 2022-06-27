import * as contenedorSql from './contenedorSql.js';
import * as contenedorMemoria from './contenedorMemoria.js';
import * as contenedorMongoDb from './contenedorMongoDb.js';
import {productoSchema} from '../model/mongoDbModel.js';
import {carritoSchema}  from '../model/mongoDbModel.js';
import {userSchema}  from '../model/mongoDbModel.js';
import 'dotenv/config';
let productos;
let carritos;
let usuarios;


switch (process.env.tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        productos = new contenedorMongoDb.Productos(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
        carritos = new contenedorMongoDb.Carritos(process.env.stringNoSql, process.env.coleccionCarritos, carritoSchema);
        usuarios = new contenedorMongoDb.Usuarios(process.env.stringNoSql, process.env.coleccionUsuarios, userSchema);
        break;
    
    case 'sql':
        productos = new contenedorSql.Productos(JSON.parse(process.env.stringSql), process.env.tablaProductos);
        carritos = new contenedorSql.Carritos(JSON.parse(process.env.stringSql), process.env.tablaCarritos);
        break;
        
    case 'memoria':
        productos = new contenedorMemoria.Productos();
        carritos = new contenedorMemoria.Carritos();
        break;    

    default:
        console.log(`Tipo de persistencia ${process.env.tipoPersistencia} no existente`)
        break;
}

export {carritos, productos, usuarios};

