
import express, { json, urlencoded } from 'express';
import productosRouter from './routes/productosRouter.js';
import carritosRouter from './routes/carritosRouter.js';
import logInRouter from './routes/logInRouter.js';
import usuariosRouter from './routes/usuariosRouter.js';
import ordenesRouter from './routes/ordenesRouter.js';
import imagenesRouter from './routes/imagenesRouter.js';
import infoRouter from './routes/infoRouter.js';
import passport from './auth/passportConfig.js';
import logger from './logger/lg4js.js'
import noImplemented from './middlewares/noImplementedMdw.js';
import { PORT } from './config.js';
import path from 'path'
import { fileURLToPath } from 'url';
import manejadorDeErrores from './middlewares/errorsMdw.js';
import { createServer } from 'http'
import { Server } from 'socket.io';
import * as mensajesService from './services/mensajesService.js'


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());

app.use(logInRouter, infoRouter);

app.use(
  '/api',
  imagenesRouter,
  logInRouter,
  usuariosRouter,
  productosRouter,
  carritosRouter,
  ordenesRouter
  );

app.use(noImplemented);

app.use(manejadorDeErrores);

io.on('connection', async (socket) => {
  logger.info("Cliente nuevo conectado :O");
  socket.emit('messages', await mensajesService.listMessages());

  socket.on('newMessages', async data =>{
    await mensajesService.addMessage(data);
    io.sockets.emit('messages', await mensajesService.listMessages());
  });

});

app.io = io;

let server;

export async function conectar() {
  return new Promise((resolve, reject) => {
      server = httpServer.listen(PORT, () => {
        logger.info(`Server UP en el puerto ${PORT}`);
        resolve()
      });
  })
}

export async function desconectar() {
  return new Promise((resolve, reject) => {
      server.close(() => {
          resolve()
      })
  })
}  


