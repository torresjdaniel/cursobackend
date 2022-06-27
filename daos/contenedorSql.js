import knex from "knex";

class Productos {

    constructor(dbOptions, table) {
        this.knex = knex(dbOptions);
        this.table = table;
    }


    async getAll() {
        try{
            const contenido = await this.knex(this.table);
            return contenido;
        }

        catch (err){
            return `Algo malo paso: ${err} ${err.sqlMessage}\n${err.sql}`
        }

    }

    async getById(id) {
        try{
            let contenido = await this.knex.from(this.table).select('*').where('id', parseInt(id));
            return (contenido.length === 0 ? contenido = `No existe el producto con id: ${id}` : contenido );

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
        
    }

    async save(producto) {
        try{
            const contenido = await this.knex(this.table).insert(producto);
            return contenido;

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
    
    }

    async updateById(id, producto) {
        try{
            const contenido = await this.knex.from(this.table).where('id', parseInt(id)).update(producto);
            return contenido === 0 ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} actualizado`;

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
        
    }

    async deleteById(id) {
        try{
            const contenido = await this.knex.from(this.table).where('id', parseInt(id)).del();
            return contenido === 0 ? `Producto con id: ${id} no existente en la bdd` : `Producto con id: ${id} eliminado`;
            

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
        
    }

}

class Carritos{

    constructor(dbOptions, table){
        this.knex = knex(dbOptions);
        this.table = table;
    }

    async create(){
        try {
            const id = await this.knex(this.table).insert({productos: "[]"});
            return id
        } 
        catch (err) {
            return `Fallo creando carrito con productos, ${err} ${err.sqlMessage}\n${err.sql}`
        }
        }

    async deleteById(id){
        try{
            const contenido = await this.knex.from(this.table).where('id', parseInt(id)).del();
            return contenido === 0 ? `Carrito con id: ${id} no existente en la bdd` : `Carrito con id: ${id} eliminado`;
            

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
    }

    async getById(id) {
        try{
            let contenido = await this.knex.from(this.table).select('*').where('id', parseInt(id));
            return (contenido.length === 0 ? contenido = `No existe el carrito con id: ${id}` : contenido );

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
        
    }

    async saveProduct(id, producto){
        try{
            const contenido = await this.knex.from(this.table).select('*').where('id', parseInt(id));
            const productos = JSON.parse(contenido.productos);
            productos.push(producto);
            await this.knex.from(this.table).where('id', parseInt(id)).update({"productos": JSON.stringify(productos)});
        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
    }

    async deleteProductById(idCarrito, idProducto){
        try{
            const carrito = await this.knex.from(this.table).select('*').where('id', parseInt(idCarrito));
            const productosParse = JSON.parse(carrito.productos);
            const productosUpdate = productosParse.filter(idEliminado => idEliminado.id !== parseInt(idProducto));
            await this.knex.from(this.table).where('id', parseInt(idCarrito)).update({"productos": JSON.stringify(productosUpdate)});

        }

        catch (err){
            return `Algo malo paso: ${err.sqlMessage}\n${err.sql}`
        }
    }


}

export {Productos, Carritos};

