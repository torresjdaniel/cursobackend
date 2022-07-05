const dotenv = require('dotenv').config();

const {Productos, Mensajes, Usuarios} = require('../daos/classContenedor');
const {productoSchema, mensajeSchema, userSchema} = require('../model/noSqlModel')

const productos = new Productos(process.env.stringNoSql, process.env.coleccionProductos, productoSchema);
const mensajes = new Mensajes(process.env.stringNoSql, process.env.coleccionMensajes, mensajeSchema);
const usuarios = new Usuarios(process.env.stringNoSql, process.env.coleccionUsuarios, userSchema);

module.exports = {mensajes, productos, usuarios};

