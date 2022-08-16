import messageToDTO from "../dtos/MensajeDTO.js";
import CustomError from "../models/CustomErrorModel.js";
import DaoMensajesFactory from "../daos/mensajes/MensajesDaoFactory.js"

export default class MensajesRepository {
    #dao

    constructor(){
        this.#dao =  DaoMensajesFactory.getDao();
    }

    async saveMessage(message) {
        try {
            await this.#dao.save(messageToDTO(message))

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó guardando el mensaje', error.message);
        }
    }

    async getMessages(){
        try {
            const dto = await this.#dao.getAll();
            return dto;
        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo la lista de mensajes', error.message);
        }
    }
}