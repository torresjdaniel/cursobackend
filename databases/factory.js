const dotenv = require('dotenv').config();

const {Productos, Mensajes, Usuarios} = require('./classContenedor');
const {productoSchema, mensajeSchema, userSchema} = require('../model/noSqlModel')

let productos;
let carritos;
let usuarios;

switch (process.env.tipoPersistencia.toLocaleLowerCase()) { // por ahora solo mongodb
    case 'mongodb':
        productos = new Productos(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
        carritos = new Mensajes(process.env.stringNoSql, process.env.coleccionMensajes, mensajeSchema);
        usuarios = new Usuarios(process.env.stringNoSql, process.env.coleccionUsuarios, userSchema);
        break;
    
    default:
        logger.info(`Tipo de persistencia ${tipoPersistencia} no existente`);
        break;
}


module.exports = {mensajes, productos, usuarios};

