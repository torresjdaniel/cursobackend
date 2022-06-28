import mongoose from 'mongoose';
import logger from '../logger/lg4js.js'

const model = mongoose.model;
const connect = mongoose.connect;


class Productos{

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo malo paso con setConexion() Productos, ${err}`);
        }
    }


    async getAll() {
        try{
            this.#setConexion();
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
            this.#setConexion();
            let contenido = await this.model.findById(id);
            return (contenido.length === 0 ? contenido = `No existe el producto con id: ${id}` : contenido );

        }

        catch (err){
            logger.error(`Algo malo paso con getById(), ${err}`);
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
            logger.error(`Algo malo paso con save(), ${err}`);
            return `Algo malo paso con save(): ${err}`
        }
    
    }

    async updateById(id, producto) {
        try{
            this.#setConexion();
            const contenido = await this.model.findByIdAndUpdate(id, producto);
            return contenido === 0 ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} actualizado`;

        }

        catch (err){
            logger.error(`Algo malo paso con updateById(), ${err}`);
            return `Algo malo paso con updateById(): ${err}`
        }
        
    }

    async deleteById(id) {
        try{
            this.#setConexion();
            const contenido = await this.model.findByIdAndDelete(id);
            return contenido === 0 ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} eliminado`;
            

        }

        catch (err){
            logger.error(`Algo malo paso con deleteById(), ${err}`);
            return `Algo malo paso con deleteById(), ${err}`;
        }
        
    }

}

class Carritos{

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await connect(this.dbOptions);         
        }
        catch(err){
            logger.error(`Algo malo paso con setConexion Carritos, ${err}`);
        }
    }

    async create(){
        try {
            this.#setConexion();
            const contenido = await this.model.insertMany({productos: []});
            return contenido[0].id;
        } 
        catch (err) {
            logger.error(`Algo malo paso con create(), ${err}`);
            return `Fallo creando carrito con create():${err}`;
        }
        }

    async deleteById(id){
        try{
            this.#setConexion();
            const contenido = await this.model.findByIdAndDelete(id);
            return contenido === 0 ? `Carrito con id: ${id} no existente en la bdd` : `Carrito con id: ${id} eliminado`;
            

        }

        catch (err){
            logger.error(`Algo malo paso con deleteById, ${err}`);
            return `Algo malo paso con deleteById, ${err}`;
        }
    }

    async getById(id) {
        try{
            this.#setConexion();
            let contenido = await this.model.findById(id);
            return (contenido.length === 0 ? contenido = `No existe el carrito con id: ${id}` : contenido );

        }

        catch (err){
            logger.error(`Algo malo paso con getById(), ${err}`);
            return `Algo malo paso con getById(), ${err}`;
        }
        
    }

    async saveProduct(id, producto){
        try{
            this.#setConexion();
            const contenido = await this.model.findById(id);
            const productos = contenido.productos;
            productos.push(producto);
            await this.model.findByIdAndUpdate(id, {productos: productos});
        }

        catch (err){
            logger.error(`Algo malo paso con saveProduct(), ${err}`);
            return `Algo malo paso en saveProduct(): ${err}`
        }
    }

    async deleteProductById(idCarrito, idProducto){
        try{
            this.#setConexion();
            const carrito = await this.model.findById(idCarrito);
            const productos = carrito.productos;
            const productosUpdate = productos.filter(idEliminado => idEliminado.id !== idProducto);
            await this.model.findByIdAndUpdate(idCarrito, {productos: productosUpdate});

        }

        catch (err){
            logger.error(`Algo malo paso con deleteProductById, ${err}`);
            return `Algo malo paso con deleteProductById, ${err}`;
        }
    }


}

class Usuarios {

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await connect(this.dbOptions);         
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

export {Productos, Carritos, Usuarios};