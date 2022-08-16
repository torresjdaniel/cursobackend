import * as usuariosService from '../services/usuariosService.js'
import * as carritoService from '../services/carritosService.js'
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import CustomError from '../models/CustomErrorModel.js'
import userToDTO from "../dtos/UsuarioDto.js";


passport.use('register', new LocalStrategy({
  usernameField: 'email',
  session: false,
  passReqToCallback: true
},
  async (req, email, _password, done) => {

    try {
      const newUser = req.body;
      const userCheck = await usuariosService.getUserByEmail(email);

      if (userCheck) {
        return done(new CustomError(400, 'Usuario ya registrado'), false);
      };

      await usuariosService.addUser(newUser);
      await carritoService.createCart(newUser.id); // creo el carrito y le asigno el mismo id que el user

      return done(null, newUser);
    }

    catch (error) {
      return done(error, false)
    }

  }));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  session: false
},
  async (email, password, done) => {
    try {
      const user = await usuariosService.getUserByEmail(email);

      if (user == null) {
        return done(new CustomError(401, 'Credenciales incorrectas'), false);
      };

      const passCheck = await user.checkPassword(password); // Uso el metodo del user rehidratado proveniente del repository

      if (passCheck == false) {
        return done(new CustomError(401, 'Credenciales incorrectas'), false)
      };

      let carrito = await carritoService.listCart(user.id);

      if(!carrito) await carritoService.createCart(user.id) // Si por algún motivo no existe el carrito del user, se vuelve a crear.
      
      return done(null, userToDTO(user))
    }

    catch (error) {
      return done(error, false)
    }


  }));


export default passport