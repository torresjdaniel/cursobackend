const express = require('express');
const productos = require('./routes/productos');
const db = require('./scripts/db');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

db.createTableProductos();
db.createTableMensajes();
      
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
  socket.emit('messages', await db.listMessages());
    
  
  socket.on('newMessages', async (data) =>{
    db.addMessages(data)
        .then(async () =>{
            socket.emit('messages', await db.listMessages());
        });
  });

});

app.io = io;

httpServer.listen(PORT, () => {
  console.log(`Server UP en el puerto ${PORT}`);
});

  
