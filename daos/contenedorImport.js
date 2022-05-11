const contenedorSql = require('./contenedorSql');
const contenedorNoSql = require('./contenedorNoSql');
const contenedorMemoria = require('./contenedorMemoria');
const {productoSchema} = require('../model/noSqlModel');
const {carritoSchema} = require('../model/noSqlModel');
const dotenv = require('dotenv').config();
let productos;
let carritos;

switch (process.env.tipoPersistencia.toLocaleLowerCase()) {
    case 'nosql':
        productos = new contenedorNoSql.Productos(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
        carritos = new contenedorNoSql.Carritos(process.env.stringNoSql, process.env.coleccionCarritos, carritoSchema);
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

module.exports = {carritos, productos};

