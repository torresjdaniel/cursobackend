const express = require('express');
const router = require('./routes/productos');
const dotenv = require('dotenv').config();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {mensajes} = require('./daos/contenedorImport')
const {productos} = require('./daos/contenedorImport')
const {normalizarMensajes} = require('./model/normalizrModel');
 
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/api', router);

io.on('connection', async (socket) => {
  console.log("Cliente nuevo conectado :O");
  socket.emit('updateList', await productos.getAll());
  const mensajeUpDate = await mensajes.listMessages();
  const mensajesNormalizados = normalizarMensajes(mensajeUpDate);
  socket.emit('messages', mensajesNormalizados);
    
  
  socket.on('newMessages', async (data) =>{
    await mensajes.addMessages(data);
    const mensajeUpDate = await mensajes.listMessages();
    const mensajesNormalizados = normalizarMensajes(mensajeUpDate);
    socket.emit('messages', mensajesNormalizados );
  });

});

app.io = io;

httpServer.listen(PORT, () => {
  console.log(`Server UP en el puerto ${PORT}`);
});

  
