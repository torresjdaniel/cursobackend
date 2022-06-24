import mongoose from 'mongoose';

const model = mongoose.model;
const connect = mongoose.connect;


class ProductosMongoDb {

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await connect(this.dbOptions);         
        }
        catch(err){
            console.log(`Algo paso conectandose a la bdd de Mongo, ${err}`);
        }
    }


    async getAll() {
        try{
            this.#setConexion();
            const contenido = await this.model.find();
            return contenido;
        }

        catch (err){
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
            return `Algo malo paso: ${err}`
        }
        
    }

}

class CarritosMongoDb{

    constructor(dbOptions, coleccion, schema) {
        this.dbOptions = dbOptions;
        this.model = model(coleccion, schema);
    }

    async #setConexion(){
        try{
            await connect(this.dbOptions);         
        }
        catch(err){
            console.log(`Algo paso conectandose a la bdd de Mongo, ${err}`);
        }
    }

    async create(){
        try {
            this.#setConexion();
            const contenido = await this.model.insertMany({productos: "[]"});
            return contenido[0].id;
        } 
        catch (err) {
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
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
    }

    async getById(id) {
        try{
            this.#setConexion();
            let contenido = await this.model.findById(id);
            return (contenido.length === 0 ? contenido = `No existe el carrito con id: ${id}` : contenido );

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
        
    }

    async saveProduct(id, producto){
        try{
            this.#setConexion();
            const contenido = await this.model.findById(id);
            const productos = JSON.parse(contenido.productos);
            productos.push(producto);
            await this.model.insertMany(productos);
        }

        catch (err){
            return `Algo malo paso en saveProduct(): ${err}`
        }
    }

    async deleteProductById(idCarrito, idProducto){
        try{
            this.#setConexion();
            const carrito = await this.model.findById(idCarrito);
            const productosParse = JSON.parse(carrito.productos);
            const productosUpdate = productosParse.filter(idEliminado => idEliminado.id !== parseInt(idProducto));
            await this.model.findByIdAndUpdate(idCarrito, JSON.parse(productosUpdate));

        }

        catch (err){
            return `Algo malo paso: ${err}`
        }
    }


}

export {ProductosMongoDb, CarritosMongoDb};