import {carritos}  from '../daos/contenedorImport.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default async function nuevoUser(username, passHash, req) {
    return {
        username: username,
        password: passHash,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        tel: req.body.tel,
        avatarImg: path.join(__dirname, '..', `${req.file.path}`),
        idCarrito: await carritos.create()
    }
}