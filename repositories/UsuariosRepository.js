import DaoUsuariosFactory from "../daos/usuarios/UsuariosDaoFactory.js";
import Usuario from "../models/UsuarioModel.js";
import userToDTO from "../dtos/UsuarioDTO.js";
import CustomError from "../models/CustomErrorModel.js";

export default class UsuariosRepository{
    #dao

    constructor(){
        this.#dao = DaoUsuariosFactory.getDao();
    }

    async getUserByEmail(email) {
        try {
            const dto = await this.#dao.getUser(email);
            if (dto) {
                return new Usuario(dto);
            } else {
                return null;
            }

        }

        catch (error) {
            throw new CustomError(500, 'Algo malo pasó obteniendo el usuario por email', error.message);
        }

    }

    async addUser(newUser){
        try {
            await this.#dao.save(userToDTO(newUser));

        } 
        
        catch (error) {
            throw new CustomError(500, 'Algo malo pasó agregando un usuario nuevo', error);
        }
    }

}