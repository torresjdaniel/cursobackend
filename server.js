import express, { json, urlencoded } from 'express';
import session from 'express-session';
import validarSession from './mdw/validarSession.js';
import productosRouter from './routes/productosRouter.js';
import carritosRouter from './routes/carritosRouter.js';
import logInRouter from './routes/loginRouter.js';
import failLogInRouter from './routes/failLogInRouter.js';
import registerRouter from './routes/registerRouter.js';
import failRegisterRouter from './routes/failRegisterRouter.js';
import logOutRouter from './routes/logOutRouter.js';
import passport from './auth/passportConfig.js';
import logger from './logger/lg4js.js'
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(json());
app.use(urlencoded({ extended: true }));

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

app.use(logInRouter, failLogInRouter, registerRouter, failRegisterRouter, logOutRouter);

app.use('/api', validarSession, productosRouter, carritosRouter);

app.use((req, res) => {
  const { url, method } = req;
  res.send(`Ruta ${method} ${url} no está implementada`);
  logger.warn(`Ruta ${method} ${url} no implementada`);
})

app.listen(PORT, () => {
  logger.info(`Server UP en el puerto ${PORT}`);
});

  


