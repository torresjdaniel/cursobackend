import CustomError from './CustomErrorModel.js'

export default class Mensaje{
    #email
    #date
    #text

    constructor({email, date, text}){
        this.#set_email(email);
        this.#set_date(date);
        this.#set_text(text);
    }

    get email() { return this.#email; }

    #set_email(email) {
        if (!email) throw new CustomError(500, 'Falta el campo "email"', '"email" es un campo requerido');
        this.#email = email;
    }

    get date() { return this.#date; }

    #set_date(date) {
        if (!date) throw new CustomError(500, 'Falta el campo "date"', '"date" es un campo requerido');
        this.#date = date;
    }

    get text() { return this.#text; }

    #set_text(text) {
        if (!text) throw new CustomError(500, 'Falta el campo "text"', '"text" es un campo requerido');
        this.#text = text;
    }
}