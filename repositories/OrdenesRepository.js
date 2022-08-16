import orderToDTO from "../dtos/OrdenDTO.js";
import CustomError from "../models/CustomErrorModel.js";
import DaoOrdenesFactory from "../daos/ordenes/ordenesDaoFactory.js";

export default class OrdenesRepository {
    #dao

    constructor(){
        this.#dao =  DaoOrdenesFactory.getDao();
    }

    async saveOrder(order) {
        try {
            await this.#dao.save(orderToDTO(order))

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó creando la orden', error.message);
        }
    }

    async getOrders(){
        try {
            const dto = await this.#dao.getAll();
            return dto;
        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo la lista de ordenes', error.message);
        }
    }
}