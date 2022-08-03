import mongoose from 'mongoose';
import productoSchema from './productoSchema';

const Schema = mongoose.Schema;

const carritoSchema = new Schema({
    productos: [productoSchema]
});

export default carritoSchema;
