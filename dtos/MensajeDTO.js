class MensajeDTO {
    constructor({ email, date, text}) {
        this.email = email;
        this.date = date;
        this.text = text;
    }
}

export default function messageToDTO(message) {
    if (Array.isArray(message))
        return message.map(m => new MensajeDTO(m));
    else
        return new MensajeDTO(message);
}