const express = require('express');
const routerProductos = require('./routes/productos');
const routerLogIn = require('./routes/userLog');
const routerInfo = require('./routes/info');
// const routerRandoms = require('./routes/randoms');
const dotenv = require('dotenv').config();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {mensajes} = require('./daos/contenedorImport')
const {productos} = require('./daos/contenedorImport')
const {normalizarMensajes} = require('./model/normalizrModel');
const {fork} = require('child_process');

const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs
.default({
    PORT: 8080
})
.alias({
    p: 'PORT'
})
.argv;
 
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = args.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerLogIn);
app.use(express.static(__dirname + '/public'));
app.use(routerInfo);
app.use('/api', routerProductos);

app.get("/api/randoms?", (req, res) =>{
  let cant;
  req.query.cant ? cant = req.query.cant : cant = 'vacio';
  const randomFork = fork('./batchFork/randomFork.js');
  randomFork.on('message', msg =>{
      res.send(msg);
  })
  randomFork.send(cant);
  
});

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

  
