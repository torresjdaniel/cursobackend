import MensajesRepository from "../repositories/MensajesRepository.js";
import Mensaje from "../models/MensajeModel.js";

const mensajesRepo = new MensajesRepository();

export async function addMessage(message){
    const newMessage = new Mensaje(message)
    await mensajesRepo.saveMessage(newMessage);
}

export async function listMessages() {
     return await mensajesRepo.getMessages();
    
}