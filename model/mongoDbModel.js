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


export default {productoSchema, carritoSchema};