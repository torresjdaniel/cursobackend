import mongoose from 'mongoose';
import logger from '../logger/lg4js.js.js'
import DaoMongoDb from '../shared/daoMongoDb.js';

const model = mongoose.model;

export default class DaoCarritosMongoDb extends DaoMongoDb{

    constructor(dbOptions, coleccion, schema) {
        super(dbOptions, coleccion, schema);
        this.model = model(coleccion, schema);
    }


    async create(){
        try {
            super.setConexion();
            const contenido = await this.model.insertMany({productos: []});
            return contenido[0].id;
        } 
        catch (err) {
            logger.error(`Algo malo paso con create(), ${err}`);
            return `Fallo creando carrito con create():${err}`;
        }
        }

    async saveProduct(id, producto){
        try{
            super.setConexion();
            const contenido = await this.model.findById(id);
            if(contenido === null){
                return `No existe el carrito con id: ${id}`
            }else{
                const productos = contenido.productos;
                productos.push(producto)
                await this.model.findByIdAndUpdate(id, {productos: productos}); 
                return `Se guardo el producto con id: ${producto._id} en el carrito con id: ${id}`
            }
        }

        catch (err){
            logger.error(`Algo malo paso con saveProduct(), ${err}`);
            return `Algo malo paso en saveProduct(): ${err}`
        }
    }

    async deleteProductById(idCarrito, idProducto){
        try{
            this.#setConexion();
            const contenido = await this.model.findById(idCarrito);
            if(contenido === null){
                return `No existe el carrito con id: ${id}`
            }else{
                const productos = contenido.productos;
                const productosUpdate = productos.filter(idEliminado => idEliminado.id !== idProducto);
                await this.model.findByIdAndUpdate(idCarrito, {productos: productosUpdate});
                return `Se eliminó el producto con id: ${idProducto} en el carrito con id: ${idCarrito}`
            } 

        }

        catch (err){
            logger.error(`Algo malo paso con deleteProductById, ${err}`);
            return `Algo malo paso con deleteProductById, ${err}`;
        }
    }


}