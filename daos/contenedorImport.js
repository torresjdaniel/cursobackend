import {ProductosSql} from './contenedorSql.js';
import {CarritosSql} from './contenedorSql.js';
import {ProductosMemoria} from './contenedorMemoria.js';
import {CarritosMemoria} from './contenedorMemoria.js';
import {ProductosMongoDb} from './contenedorMongoDb.js';
import {CarritosMongoDb} from './contenedorMongoDb.js';
import productoSchema from '../model/mongoDbModel.js';
import carritoSchema  from '../model/mongoDbModel.js';
import 'dotenv/config';
let productos;
let carritos;



switch (process.env.tipoPersistencia.toLocaleLowerCase()) {
    case 'mongodb':
        productos = new ProductosMongoDb(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
        carritos = new CarritosMongoDb(process.env.stringNoSql, process.env.coleccionCarritos, carritoSchema);
        break;
    
    case 'sql':
        productos = new ProductosSql(JSON.parse(process.env.stringSql), process.env.tablaProductos);
        carritos = new CarritosSql(JSON.parse(process.env.stringSql), process.env.tablaCarritos);
        break;
        
    case 'memoria':
        productos = new ProductosMemoria();
        carritos = new CarritosMemoria();
        break;    

    default:
        console.log(`Tipo de persistencia ${process.env.tipoPersistencia} no existente`)
        break;
}

export {carritos, productos};

