import mongoose from 'mongoose';
import productoSchema from './productoSchema.js';

const Schema = mongoose.Schema;

const carritoSchema = new Schema({
    id: { type: String, required: true },
    products: [{
        product: productoSchema,
        amount: { type: Number, required: true }
    }]
});

export default carritoSchema;
