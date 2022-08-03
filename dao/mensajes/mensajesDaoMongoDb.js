import DaoMongoDb from '../shared/daoMongoDb.js';


export default class DaoMensajesMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
    }

    // Usar getAll para listar los mensajes y save para guardar los mensajes

}