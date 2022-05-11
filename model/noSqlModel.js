const mongoose = require('mongoose');


const productoSchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    precio: { type: Number, require: true },
    foto: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    stock: { type: Number, require: true },
    timestamp: { type: Date, require: true }

});

const carritoSchema = new mongoose.Schema({
    productos: [productoSchema],
});


module.exports = {productoSchema, carritoSchema};
