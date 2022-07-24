
const mongoose = require('mongoose');
const {logger} = require('../logger/loggerModel');

class Productos {

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = mongoose.model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await mongoose.connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo paso conectandose a la bdd de Mongo desde Productos, ${err}`);
        }
    }

    async getAll() {
        try{
            this.#setConexion();
            const contenido = await this.model.find();
            return contenido;
        }

        catch (err){
            logger.error(`Algo malo paso con getAll(): ${err}`);
            return `Algo malo paso con getAll(): ${err}`
        }

    }

    async getById(id) {
        try{
            this.#setConexion();
            let contenido = await this.model.findById(id);
            return (contenido === null ? contenido = `No existe el producto con id: ${id}` : contenido );

        }

        catch (err){
            logger.error(`Algo malo paso con getById(): ${err}`);
            return `Algo malo paso con getById(): ${err}`;
        }
        
    }

    async save(producto) {
        try{
            this.#setConexion();
            const contenido = await this.model.insertMany(producto);
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con save(): ${err}`);
            return `Algo malo paso con save(): ${err}`
        }
    
    }

    async updateById(id, producto) {
        try{
            this.#setConexion();
            const contenido = await this.model.findByIdAndUpdate(id, producto);
            return contenido === null ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} actualizado`;

        }

        catch (err){
            logger.error(`Algo malo paso con updateById(): ${err}`);
            return `Algo malo paso con updateById(): ${err}`
        }
        
    }

    async deleteById(id) {
        try{
            this.#setConexion();
            const contenido = await this.model.findByIdAndDelete(id);
            return contenido === null ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} eliminado`;
            

        }

        catch (err){
            logger.error(`Algo malo paso con deleteById(): ${err}`);
            return `Algo malo paso con deleteById(): ${err}`
        }
        
    }
        
}


class Mensajes{

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = mongoose.model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await mongoose.connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo paso conectandose a la bdd de Mongo desde Mensajes, ${err}`);
        }
    }

    async listMessages(){
        try{
            this.#setConexion();
            const contenido = await this.model.find();
            return contenido;
        }

        catch (err){
            logger.error(`Algo malo paso con listMessages(): ${err}`);
            return `Algo malo paso con listMessages(): ${err}`
        }
    }

    async addMessages(mensaje){
        try{
            this.#setConexion();
            const contenido = await this.model.insertMany(mensaje);
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con addMessages(): ${err}`);
            return `Algo malo paso con addMessages(): ${err}`
        }
    }
}

class Usuarios {

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = mongoose.model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await mongoose.connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo paso conectandose a la bdd de Mongo desde Usuarios, ${err}`);
        }
    }

    async saveUser(user){
        try{
            this.#setConexion();
            const contenido = await this.model.insertMany(user);
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con saveUser(): ${err}`);
            return `Algo malo paso con saveUser(): ${err}`
        }
    }

    async getUser(userName) {
        try{
            this.#setConexion();
            let contenido = await this.model.findOne({username: userName});
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con getUser() : ${err}`);
            return `Algo malo paso con getUser(): ${err}`;
        }
        
    }

    async getUserById(id) {
        try{
            this.#setConexion();
            let contenido = await this.model.findById(id);
            return contenido;

        }

        catch (err){
            logger.error(`Algo malo paso con getUserById() : ${err}`);
            return `Algo malo paso con getUserById(): ${err}`;
        }
        
    }



}

module.exports = {Productos, Mensajes, Usuarios};