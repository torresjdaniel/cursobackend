import DaoMongoDb from '../shared/DaoMongoDb.js';


export default class DaoOrdenesMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
    }

}