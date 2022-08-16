import CustomError from './CustomErrorModel.js';
import { v4 as uuidv4 } from 'uuid';

export default class Producto {
    #id
    #name
    #description
    #price
    #image

    constructor({ id, name, description, price, image }) {
        this.#set_id(id);
        this.#set_name(name);
        this.#set_description(description);
        this.#set_price(price);
        this.#set_image(image);
    }

    get id() { return this.#id; }

    #set_id(id) {
        if (!id) throw new CustomError(500, 'Falta el campo "id"', '"id" es un campo requerido');
        this.#id = id;
    }

    get name() { return this.#name; }

    #set_name(name) {
        if (!name) throw new CustomError(400, 'Falta el campo "name"', '"name" es un campo requerido');
        this.#name = name;
    }

    get description() { return this.#description }

    #set_description(description) {
        if (!description) throw new CustomError(400, 'Falta el campo "description"', '"description" es un campo requerido');
        this.#description = description;
    }

    get price() { return this.#price }

    #set_price(price) {
        if (!price) throw new CustomError(400, 'Falta el campo "price"', '"price" es un campo requerido');
        if (isNaN(price)) throw new CustomError(400, 'Tipo de dato incorrecto', '"price" debe ser un dato del tipo númerico');
        this.#price = price
    }

    get image() { return this.#image }

    #set_image(image) {
        if (!image) throw new CustomError(400, 'Falta el campo "image"', '"image" es un campo requerido');
        this.#image = image;
    }

    static async homologateProduct(product){
        product.id = uuidv4();
        return product;
    }

    static validateProduct(product){
        if (!product.id) throw new CustomError(500, 'Falta el campo "id"', '"id" es un campo requerido');
        if (!product.name) throw new CustomError(400, 'Falta el campo "name"', '"name" es un campo requerido');
        if (!product.description) throw new CustomError(400, 'Falta el campo "description"', '"description" es un campo requerido');
        if (!product.price) throw new CustomError(400, 'Falta el campo "price"', '"price" es un campo requerido');
        if (isNaN(product.price)) throw new CustomError(400, 'Tipo de dato incorrecto', '"price" debe ser un dato del tipo númerico');
        if (!product.image) throw new CustomError(400, 'Falta el campo "image"', '"image" es un campo requerido');
    }
}    