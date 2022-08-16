import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productoSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }
    
});

export default productoSchema;
