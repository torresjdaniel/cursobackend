import mongoose from 'mongoose';
import DaoMongoDb from '../shared/DaoMongoDb.js';

const model = mongoose.model;

export default class DaoCarritosMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
        this.model = model(coleccion, schema);
    }

}