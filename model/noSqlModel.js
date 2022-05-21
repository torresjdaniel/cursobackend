const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    thumbnail: { type: String, required: true },
});

const mensajeSchema = new mongoose.Schema({
    
    author: { 
        email: {type: String, require: true},
        nombre: {type: String, require: true},
        apellido: {type: String, require: true},
        edad: {type: Number, require: true},
        aliass: {type: String, require: true},
        avatar: {type: String, require: true},
        type: Object, 
        require: true 
    },
    text: {type: String, require: true},
    date: {type: String, require: true}
    
});

const userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports = {productoSchema, mensajeSchema, userSchema};

