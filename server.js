const express = require('express');
const compression = require ('compression');
const routerProductos = require('./routes/productos');
const routerLogIn = require('./routes/userLog');
const routerInfo = require('./routes/info');
const routerRandoms = require('./routes/randoms');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {mensajes} = require('./daos/contenedorImport')
const {productos} = require('./daos/contenedorImport')
const {normalizarMensajes} = require('./model/normalizrModel');
const {logger} = require('./model/loggerModel');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

function server(port, compre) {
  if (compre !== 'NO') {
    app.use(compression());
    logger.info('Server con compresión');
  };
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routerLogIn);
  app.use(express.static(__dirname + '/public'));
  app.use(routerInfo);
  app.use('/api', routerProductos, routerRandoms);

  app.use((req, res) => {
    const { url, method } = req;
    res.send(`Ruta ${method} ${url} no está implementada`);
    logger.warn(`Ruta ${method} ${url} no implementada`);
  })

  io.on('connection', async (socket) => {
    logger.info("Cliente nuevo conectado :O");
    socket.emit('updateList', await productos.getAll());
    const mensajeUpDate = await mensajes.listMessages();
    const mensajesNormalizados = normalizarMensajes(mensajeUpDate);
    socket.emit('messages', mensajesNormalizados);


    socket.on('newMessages', async (data) => {
      await mensajes.addMessages(data);
      const mensajeUpDate = await mensajes.listMessages();
      const mensajesNormalizados = normalizarMensajes(mensajeUpDate);
      socket.emit('messages', mensajesNormalizados);
    });

  });

  app.io = io;

  httpServer.listen(port, () => {
    logger.info(`Server UP en el puerto ${port}, proceso '${process.pid}'`);
  });
}



module.exports = {server};