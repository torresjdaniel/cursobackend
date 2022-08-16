import CustomError from './CustomErrorModel.js'
import { v4 as uuidv4 } from 'uuid';

export default class Orden {
    #id
    #date
    #userId
    #products

    constructor({id, date, userId, products}){
        this.#set_id(id);
        this.#set_date(date);
        this.#set_userId(userId);
        this.#set_products(products);
    }

    get id() { return this.#id; }

    #set_id(id) {
        if (!id) throw new CustomError(500, 'Falta el campo "id"', '"id" es un campo requerido');
        this.#id = id;
    }

    get date() { return this.#date; }

    #set_date(date) {
        if (!date) throw new CustomError(500, 'Falta el campo "date"', '"date" es un campo requerido');
        this.#date = date;
    }

    get userId() { return this.#userId; }

    #set_userId(userId) {
        if (!userId) throw new CustomError(500, 'Falta el campo "userId"', '"userId" es un campo requerido');
        this.#userId = userId;
    }

    get products() { return this.#products; }

    #set_products(products) {
        if (!products) throw new CustomError(500, 'Falta el campo "products"', '"products" es un campo requerido');
        this.#products = products;
    }

    static getUserOrders(userId, orders){
        const userOrders = orders.filter( ordenBuscada => ordenBuscada.userId == userId);
        return userOrders;
    }

    static homologateOrder(order){
        const date = new Date();
        order.date = `[${date.getDate()}/${date.getMonth()+1}/${date.getUTCFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
        order.id = uuidv4();
        return order;
    }
}