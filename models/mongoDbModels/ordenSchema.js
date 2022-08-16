import mongoose from 'mongoose';
import productoSchema from './productoSchema.js';

const Schema = mongoose.Schema;

const ordenSchema = new Schema({
    id: { type: String, required: true },
    date: {type: String, required: true},
    userId: { type: String, required: true },
    products: [{
        product: productoSchema,
        amount: { type: Number, required: true }
    }]
});

export default ordenSchema;