const { normalize, denormalize, schema } = require("normalizr");
const util = require('util')
const {mensajes} = require('./daos/contenedorImport')

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
  }


const mensajeTest = [
 {  
    id: 'id1', 
    author: {
        email: 'mail1@mail', 
        nombre: 'nombre del usuario1', 
        apellido: 'apellido del usuario1', 
        edad: 'edad del usuario1', 
        alias: 'alias del usuario1',
        avatar: 'url avatar (foto, logo) del usuario1'
    },
    text: 'mensaje del usuario1'
},
{   
    id: 'id2',
    author: {
        email: 'mail2@mail', 
        nombre: 'nombre del usuario2', 
        apellido: 'apellido del usuario2', 
        edad: 'edad del usuario2', 
        alias: 'alias del usuario2',
        avatar: 'url avatar (foto, logo) del usuario2'
    },
    text: 'mensaje del usuario2'
},
{   
    id: 'id3',
    author: {
        email: 'mail3@mail', 
        nombre: 'nombre del usuario3', 
        apellido: 'apellido del usuario3', 
        edad: 'edad del usuario3', 
        alias: 'alias del usuario3',
        avatar: 'url avatar (foto, logo) del usuario3'
    },
    text: 'mensaje del usuario3'
}

];
// mensajes.listMessages().then(data => console.log(data));


const mensajeANorma = {id: "mensajes", mensajes: mensajeTest };

const autor = new schema.Entity('autor',{},{idAttribute: 'email'});
    
const mensaje = new schema.Entity('mensaje',{
    author: autor
},{idAttribute: '_id'});

const mensajess = new schema.Entity('mensajes', {
    mensajes: [mensaje],
})

mensajes.listMessages().then( data =>{
    const obj = JSON.stringify(data)
    const obj2 = JSON.parse(obj)
    const mensajeANorm = {id: "mensajes", mensajes: obj2 };
    // console.dir(obj2)
    const normalizedData = normalize( mensajeANorm, mensajess);
    print(normalizedData);
})  

// const normalizedData = normalize(mensajeANorm, mensajess);
// print(normalizedData);

// const denormalizeData = denormalize(normalizedData.result, mensajes, normalizedData.entities);

// console.log('el obejeto original tiene  ' + JSON.stringify(mensajeTest).length);

// console.log('el obejeto normalizado tiene ' + JSON.stringify(normalizedData).length);

// console.log('el obejeto normalizado tiene ' + JSON.stringify(denormalizeData).length);

