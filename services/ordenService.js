import OrdenesRepository from "../repositories/OrdenesRepository.js";
import Orden from "../models/OrdenModel.js";
import CustomError from "../models/CustomErrorModel.js";

const ordenesRepo = new OrdenesRepository();

export function setUpProduct(order){ // Acá preparo a la orden antes de ser agregado (se agrega ID y timestamp)
    const newOrder = Orden.homologateOrder(order);
    return newOrder;
}

export async function addOrder(order){
    const newOrder = new Orden(order)
    await ordenesRepo.saveOrder(newOrder);
}

export async function listUserOrders(userId) {
    const orders = await ordenesRepo.getOrders();
    const userOrders = Orden.getUserOrders(userId, orders); // filtro solamente las ordenes del usuario
    return userOrders
}