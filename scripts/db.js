const knexx = require("knex");
const { getDefaultFlags } = require("mysql/lib/ConnectionConfig");

const mysql = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'ecommerce'
  },
  pool: { min: 0, max: 7 }
}

const knex = knexx(mysql);

function createTableProductos () {
    knex.schema
    .hasTable('productos')
    .then((exists) => {
        if (exists) {
            console.log('Tabla "productos" existente en la bdd');
        } else {
            return knex.schema
                .createTable('productos', (table) => {
                    table.increments();
                    table.string('title');
                    table.float('price');
                    table.string('thumbnail');
                })
                .then(() => {
                    console.log('Tabla productos creada');
                })
        }
    })
    .catch((err) => {
        console.log('Error creando la tabla productos', err);
    })
    .finally(() =>{
        knex.destroy((err) => {
            if (err) {
                console.log('Algo salio mal terminando la conexión creando la tabla productos', err) ;
            } else {
                knex.initialize();
                console.log('Conexión bdd retomada luego de crear tabla productos');
            }
        });
    });
}

function createTableMensajes (){
    knex.schema
    .hasTable('mensajes')
    .then((exists) => {
        if (exists) {
            console.log('Tabla "mensajes" existente en la bdd');
        } else {
            return knex.schema
                .createTable('mensajes', (table) => {
                    table.increments();
                    table.string('author');
                    table.string('date');
                    table.string('text');
                })
                .then(() => {
                    console.log('Tabla mensajes creada');
                    knex('mensajes').insert([{author: 'ADMIN'}, {text: '¡Bienvenidos al chat!'}]).then();
                })
        }
    })
    .catch((err) => {
        console.log('Error creando la tabla mensajes', err);
    })
    .finally(() =>{
        knex.destroy((err) => {
            if (err) {
                console.log('Algo salio mal terminando la conexión creando la tabla mensajes', err) ;
            } else {
                knex.initialize();
                console.log('Conexión bdd retomada luego de crear tabla mensajes');
            }
        });
    });
}

// async function addMessages(data) {
//     return new Promise(() => {
//         knex('mensajes').insert(data)
//             .then(() => {
//                 console.log(`Mensaje recibido de ${data.author} | ${data.date}`);
//             })
//             .catch((err) => {
//                 console.log('Error agregando un nuevo mensaje en addMessages', err);
//             });
//     });
// }

async function addMessages(data){
    try{
        await knex('mensajes').insert(data)
        console.log(`Mensaje recibido de ${data.author} | ${data.date}`);
    }
    catch(err){
        console.log('Error agregando un nuevo mensaje en addMessages', err);
    }
}

async function listMessages () {
    try {
        return await knex('mensajes');
    } 
    catch (err){
        console.log('Error listando mensajes en listMessages', err);
    }
}

function destroyKnex(){
    knex.destroy((err) => {
        if (err) {
            console.log('Algo salio mal terminando la conexión desde db.js', err) ;
        } else {
            knex.initialize();
            console.log('Conexión bdd retomada desde db.js');
        }
    });
}

module.exports.knex = knex;
module.exports.createTableProductos = createTableProductos;
module.exports.createTableMensajes = createTableMensajes;
module.exports.addMessages = addMessages;
module.exports.listMessages = listMessages;
module.exports.destroyKnex = destroyKnex;


    
        
