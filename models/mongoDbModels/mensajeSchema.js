import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mensajeSchema = Schema({
    
    email: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true}
    
});


export default mensajeSchema;
