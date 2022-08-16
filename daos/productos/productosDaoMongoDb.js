import DaoMongoDb from '../shared/DaoMongoDb.js';


export default class DaoProductosMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
    }

}