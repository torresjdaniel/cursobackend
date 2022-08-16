import mongoose from 'mongoose';
import DaoMongoDb from '../shared/DaoMongoDb.js';

const model = mongoose.model;

export default class DaoUsuariosMongoDb extends DaoMongoDb {

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
        this.model = model(coleccion, schema);
    }

    async getUser(email) {
        const contenido = await this.model.findOne({ email: email });
        return contenido;
    }


}