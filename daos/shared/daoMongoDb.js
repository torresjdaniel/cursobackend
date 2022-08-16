import mongoose from 'mongoose';
import logger from '../../logger/lg4js.js'

const model = mongoose.model;
const connect = mongoose.connect;


export default class DaoMongoDb {

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async setConexion() {
        try {
            await connect(this.dbOptions);
        }
        catch (err) {
            logger.error(`Algo malo paso con setConexion() ${err}`);
        }
    }


    async getAll() {
        ;
        return await this.model.find();
    }

    async getById(id) {
        return await this.model.findOne({ id: id });
    }

    async save(documento) {
        return await this.model.insertMany(documento);
    }

    async updateById(id, documento) {
        return await this.model.findOneAndUpdate({ id: id }, { $set: documento });

    }

    async deleteById(id) {
        return await this.model.findOneAndDelete({ id: id });

    }

}


