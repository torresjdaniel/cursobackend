import DaoMongoDb from '../shared/daoMongoDb.js';


export default class DaoProductosMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
    }

}