import DaoProductosFactory from "../daos/productos/productosDaoFactory.js";
import productToDTO  from "../dtos/ProductoDTO.js";
import CustomError from "../models/CustomErrorModel.js";

export default class ProductosRepository{
    #dao

    constructor(){
        this.#dao = DaoProductosFactory.getDao();
    }

    async getProducts() {
        try {
            const dto = await this.#dao.getAll();
            return dto
        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo la lista de productos', error);
        }

    }

    async getProductById(id) {
        try {
            const dto = await this.#dao.getById(id);
            if (dto) {
                return dto;
            } else {
                return null;
            }

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo el producto por id', error.message);
        }

    }

    async addProduct(newProduct){
        try {
            await this.#dao.save(productToDTO(newProduct));

        } 
        
        catch (error) {
            throw new CustomError(500, 'Algo malo pasó agregando un producto nuevo', error.message);
        }
    }

    async updateProductById(id, newProduct){
        try {
            const validacion = await this.#dao.updateById(id, productToDTO(newProduct));
            if (validacion) {
                return true;
            } else {
                return null;
            }

        } 
        
        catch (error) {
            throw new CustomError(500, 'Algo malo pasó actualizando un producto', error.message);
        }
    }

    async deleteProductById(id){
        try {
            const validacion = await this.#dao.deleteById(id);
            if (validacion) {
                return true;
            } else {
                return null;
            }

        } 
        
        catch (error) {
            throw new CustomError(500, 'Algo malo pasó eliminando un producto', error.message);
        }
    }

}