const express = require('express');
const compression = require ('compression');
const session= require("express-session");
const {passport} = require('./middlewares/passport');
const routerProductos = require('./routes/productosRouter');
const routerAuth = require('./routes/authRouter');
const routerInfo = require('./routes/infoRouter');
const routerRandoms = require('./routes/randomsRouter');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const {mensajes} = require('./databases/contenedorImport');
const {productos} = require('./databases/contenedorImport')
const {normalizarMensajes} = require('./model/normalizrModel');
const {logger} = require('./logger/loggerModel');

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

  app.use(
    session({
        secret: 'shhhhhhhhhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        cookie:{
          maxAge:600000
      }
    })
  )
  
  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use(routerAuth);
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