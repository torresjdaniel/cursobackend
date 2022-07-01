import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const productoSchema = new Schema({
    nombre: { type: String, require: true },
    precio: { type: Number, require: true },
    foto: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    stock: { type: Number, require: true },
    timestamp: { type: Date, require: true }

});

const carritoSchema = new Schema({
    productos: [productoSchema],
});

const userSchema = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    nombre: {type: String, require: true},
    direccion: {type: String, require: true},
    edad: {type: Number, require: true},
    tel: {type: Number, require: true},
    avatarImg: { type: String, required: true },
    idCarrito:{ type: String, required: true }
});


export {productoSchema, carritoSchema, userSchema};
