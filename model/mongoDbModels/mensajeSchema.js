import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mensajeSchema = Schema({
    
    author: { 
        email: {type: String, required: true},
        nombre: {type: String, required: true},
        apellido: {type: String, required: true},
        edad: {type: Number, required: true},
        aliass: {type: String, required: true},
        avatar: {type: String, required: true},
        type: Object, 
        require: true 
    },
    text: {type: String, required: true},
    date: {type: String, required: true}
    
});


export default mensajeSchema;
