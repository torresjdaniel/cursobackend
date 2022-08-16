import 'dotenv/config';

export const PORT = process.env.PORT || 8080;
export const tipoPersistencia = process.env.tipoPersistencia;
export const stringNoSql = process.env.stringNoSql;
export const coleccionProductos = process.env.coleccionProductos;
export const coleccionCarritos = process.env.coleccionCarritos;
export const coleccionUsuarios = process.env.coleccionUsuarios;
export const coleccionMensajes = process.env.coleccionMensajes;
export const coleccionOrdenes = process.env.coleccionOrdenes;
export const mailAdmin = process.env.mailAdmin;
export const mailPass = process.env.mailPass;
export const PRIVATE_KEY = process.env.privateKeyJWT;
export const admin = process.env.admin;



