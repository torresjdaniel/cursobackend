import mongoose from 'mongoose';
import logger from '../logger/lg4js.js.js'
import DaoMongoDb from '../shared/daoMongoDb.js';

const model = mongoose.model;

export default class DaoUsuariosMongoDb extends DaoMongoDb {

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }



    async getUser(userName) {
        try{
            super.setConexion();
            let contenido = await this.model.findOne({username: userName});
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con getUser() : ${err}`);
            return `Algo malo paso con getUser(): ${err}`;
        }
        
    }


    async updateIdCarrito(idUser, idCarrito){
            try{
                super.setConexion();
                const contenido = await this.model.findByIdAndUpdate(idUser, {idCarrito: idCarrito});
                return contenido === 0 ? `User con id: ${idUser} no existente en la bdd` : `User con id: ${idUser} actualizado`;
    
            }
    
            catch (err){
                logger.error(`Algo malo paso con updateIdCarrito, ${err}`);
                return `Algo malo paso con updateIdCarrito: ${err}`
            }  
    }

}