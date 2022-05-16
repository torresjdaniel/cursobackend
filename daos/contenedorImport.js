const dotenv = require('dotenv').config();

const {Productos} = require('../daos/classContenedor');
const {Mensajes} = require('../daos/classContenedor');
const {productoSchema} = require('../model/noSqlModel')
const {mensajeSchema} = require('../model/noSqlModel')

const productos = new Productos(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
const mensajes = new Mensajes(process.env.stringNoSql, process.env.coleccionMensajes, mensajeSchema);

module.exports = {mensajes, productos};
