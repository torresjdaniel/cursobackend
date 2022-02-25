const express = require('express');
const productos = require('./routes/productos');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const knexx = require("knex");

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
        console.log('Error de base de datos', err);
    });
  

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
        console.log('Error de base de datos', err);
    });
      


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/api', productos.router);

io.on('connection', async (socket) => {
  console.log("Cliente nuevo conectado :O");
  socket.emit('updateList', await productos.api.getAll());
  socket.emit('messages', await knex('mensajes'));

  socket.on('newMessages', async data =>{
    await knex('mensajes').insert(data);
    io.sockets.emit('messages', await knex('mensajes'));
  });

});

app.io = io;

httpServer.listen(PORT, () => {
  console.log(`Server UP en el puerto ${PORT}`);
});

  


