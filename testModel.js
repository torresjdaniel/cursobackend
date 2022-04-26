const mongoose = require('mongoose');


const pruebaSchema = new mongoose.Schema({
    nombre : {type: String, require: true},
    apellido: {type: String, require: true}
});

module.exports = mongoose.model('pruebaCollection', pruebaSchema);