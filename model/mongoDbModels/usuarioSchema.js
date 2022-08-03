import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    edad: {type: Number, required: true},
    tel: {type: Number, required: true},
    // avatarImg: { type: String, required: true },
    idCarrito:{ type: String, required: true }
});

export default usuarioSchema;
