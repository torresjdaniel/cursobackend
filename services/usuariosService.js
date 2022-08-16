import UsuariosRepository from "../repositories/UsuariosRepository.js";
import Usuario from "../models/UsuarioModel.js";

const usuariosRepo = new UsuariosRepository();

export async function setUpUser(user){ // Acá preparo al usuario antes de ser agregado (se agrega ID y hashea password)
    const newUser = await Usuario.homologateUser(user);
    return new Usuario(newUser);
}

export async function addUser(user){
    await usuariosRepo.addUser(user);
}

export async function getUserByEmail(userEmail){
    return await usuariosRepo.getUserByEmail(userEmail);
}

