import express, { json, urlencoded } from 'express';
import session from 'express-session';
import validarSession from './mdw/validarSession.js';
import productosRouter from './routes/productosRouter.js';
import carritosRouter from './routes/carritosRouter.js';
import logInRouter from './routes/logInRouter.js';
import logInOkRouter from './routes/logInOkRouter.js';
import failLogInRouter from './routes/failLogInRouter.js';
import registerRouter from './routes/registerRouter.js';
import registerOkRouter from './routes/registerOkRouter.js';
import failRegisterRouter from './routes/failRegisterRouter.js';
import logOutRouter from './routes/logOutRouter.js';
import userRouter from './routes/userRouter.js';
import confirmarPedidoRouter from './routes/confirmarPedidoRouter.js';
import passport from './auth/passportConfig.js';
import logger from './logger/lg4js.js'
import { PORT } from './config.js';
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

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

app.use(
  logInRouter,
  logInOkRouter, 
  failLogInRouter, 
  registerRouter, 
  registerOkRouter, 
  failRegisterRouter, 
  logOutRouter, 
  userRouter, 
  confirmarPedidoRouter
  );

app.use('/api', validarSession, productosRouter, carritosRouter);

app.post('/prueba', (req, res) =>{
  res.send(req.user.username);
  logger.info(req.user.username);
})

app.use((req, res) => {
  const { url, method } = req;
  res.send(`Ruta ${method} ${url} no está implementada`);
  logger.warn(`Ruta ${method} ${url} no implementada`);
})

app.listen(PORT, () => {
  logger.info(`Server UP en el puerto ${PORT}`);
});

  


