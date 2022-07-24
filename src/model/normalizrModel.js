const { normalize, schema } = require("normalizr");
const autor = new schema.Entity('autor',{},{idAttribute: 'email'});

const mensaje = new schema.Entity('mensaje',{
    author: autor
},{idAttribute: '_id'});

const mensajes = new schema.Entity('mensajes', {
    mensajes: [mensaje]
});


function normalizarMensajes(data){
    const mensajesJSON = JSON.stringify(data) // Por algún motivo sino paso a JSON y lo vuelvo a Parsear
    const mensajesParse = JSON.parse(mensajesJSON) // A un objeto JS Normalizr lo rompe. No sé si Mongoose crea de manera distinta el obj.
    const mensajesANormalizar = {id: "mensajes", mensajes: mensajesParse};
    return normalize(mensajesANormalizar, mensajes);
}

module.exports = {normalizarMensajes};

