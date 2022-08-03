import mongoose from 'mongoose';
import logger from '../../logger/lg4js.js'

const model = mongoose.model;
const connect = mongoose.connect;


export default class DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async setConexion(){
        try{
            await connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo malo paso con setConexion() ${err}`);
        }
    }


    async getAll() {
        try{
            this.setConexion();
            const contenido = await this.model.find();
            return contenido;
        }

        catch (err){
            logger.error(`Algo malo paso con getAll(), ${err}`);
            return `Algo malo paso con getAll(): ${err}`
        }

    }

    async getById(id) {
        try{
            this.setConexion();
            let contenido = await this.model.findById(id);
            return (contenido.length === 0 ? contenido = `No existe el documento con id: ${id}` : contenido );

        }

        catch (err){
            logger.error(`Algo malo paso con getById(), ${err}`);
            return `Algo malo paso con getById(): ${err}`;
        }
        
    }

    async save(documento) {
        try{
            this.setConexion();
            const contenido = await this.model.insertMany(documento);
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con save(), ${err}`);
            return `Algo malo paso con save(): ${err}`
        }
    
    }

    async updateById(id, documento) {
        try{
            this.setConexion();
            const contenido = await this.model.findByIdAndUpdate(id, documento);
            return contenido === 0 ? `Documento con id: ${id} no existente en la bdd` : `Documento con id: ${id} actualizado`;

        }

        catch (err){
            logger.error(`Algo malo paso con updateById(), ${err}`);
            return `Algo malo paso con updateById(): ${err}`
        }
        
    }

    async deleteById(id) {
        try{
            this.setConexion();
            const contenido = await this.model.findByIdAndDelete(id);
            return contenido === 0 ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} eliminado`;
            

        }

        catch (err){
            logger.error(`Algo malo paso con deleteById(), ${err}`);
            return `Algo malo paso con deleteById(), ${err}`;
        }
        
    }

}


