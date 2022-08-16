import CustomError from './CustomErrorModel.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default class Usuario {
    #id
    #email
    #password
    #name
    #lastname
    #phone
    #image

    constructor({ id, email, password, name, lastname, phone, image }) {
        this.#set_id(id);
        this.#set_email(email);
        this.#set_password(password);
        this.#set_name(name);
        this.#set_lastname(lastname);
        this.#set_phone(phone);
        this.#set_image(image);
    }

    get id() { return this.#id; }

    #set_id(id) {
        if (!id) throw new CustomError(500, 'Falta el campo "id"', '"id" es un campo requerido');
        this.#id = id;
    }

    get email() { return this.#email; };

    #set_email(email) {
        if (!email) throw new CustomError(400, 'Falta el campo "email"', '"email" es un campo requerido');
        this.#email = email;
    }

    get password() { return this.#password; };

    #set_password(password) {
        if (!password) throw new CustomError(400, 'Falta el campo "password"', '"password" es un campo requerido');
        this.#password = password;
    }

    get name() { return this.#name; }

    #set_name(name) {
        if (!name) throw new CustomError(400, 'Falta el campo "name"', '"name" es un campo requerido');
        this.#name = name;
    }

    get lastname() { return this.#lastname }

    #set_lastname(lastname) {
        if (!lastname) throw new CustomError(400, 'Falta el campo "lastname"', '"lastname" es un campo requerido');
        this.#lastname = lastname;
    }

    get phone() { return this.#phone }

    #set_phone(phone) {
        if (!phone) throw new CustomError(400, 'Falta el campo "phone"', '"phone" es un campo requerido');
        if (isNaN(phone)) throw new CustomError(400, 'Tipo de dato incorrecto', '"phone" debe ser un dato del tipo númerico');
        this.#phone = phone
    }

    get image() { return this.#image}

    #set_image(image) {
        if (!image) throw new CustomError(400, 'Falta el campo "image"', '"image" es un campo requerido');
        this.#image = image;
    }

    static async encryptPassword(password) { 
        try {
            return await bcrypt.hash(password, 10);
        }

        catch (error) {
            throw new CustomError(500, 'Error encriptando password', error);
        }
    }

    async checkPassword(reqPassword) {
        try {
            return await bcrypt.compare(reqPassword, this.#password);   
        } 
        
        catch (error) {
            throw new CustomError(500, 'Error comparando passwords', error);
        }
    }

    static createId(){
        return uuidv4();
    }

    static async homologateUser(user){
        if (!user.password) throw new CustomError(400, 'Falta el campo "password"', '"password" es un campo requerido');
        user.id = uuidv4();
        user.password = await this.encryptPassword(user.password);
        return user;
    }
}
