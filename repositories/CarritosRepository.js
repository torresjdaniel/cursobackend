import DaoCarritosFactory from "../daos/carritos/CarritosDaoFactory.js";
import cartToDTO from "../dtos/CarritoDTO.js";
import Carrito from '../models/CarritoModel.js';
import CustomError from "../models/CustomErrorModel.js";

export default class CarritosRepository {
    #dao

    constructor() {
        this.#dao = DaoCarritosFactory.getDao();
    }

    async saveCart(cart) {
        try {
            await this.#dao.save(cartToDTO(cart))

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó creando el carrito', error.message);
        }
    }

    async getCartById(id) {
        try {
            const dto = await this.#dao.getById(id);
            if (dto) {
                return new Carrito(dto);
            } else {
                return null;
            }
        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo el carrito', error.message);
        }

    }


    async updateCartById(id, cart){
        try {
            const validacion = await this.#dao.updateById(id, cartToDTO(cart));
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


    async deleteCartById(id) {
        try {
            const validacion = await this.#dao.deleteById(id);
            if (validacion) {
                return true;
            } else {
                return null;
            }

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó eliminando un carrito', error.message);
        }
    }

}