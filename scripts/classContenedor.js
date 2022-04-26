const knex = require("knex");

class Contenedor {

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

module.exports = {Contenedor};