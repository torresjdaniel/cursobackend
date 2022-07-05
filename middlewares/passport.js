const {usuarios} = require('../daos/contenedorImport')
// const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {logger} = require('../model/loggerModel');


passport.use('login', new LocalStrategy(
 async (username, password, done) => {

    const user = await usuarios.getUser(username);

    if(user == null){
      logger.info('user no existe'); 
      return done(null, false);
    };

    const passCheck = await bcrypt.compare(password, user.password);

    if(passCheck == false){
      logger.info('contraseña incorrecta');
      return done(null, false)
    };

    logger.info('usuario registrado, Ingreso OK')
    return done(null, user)

 }));

passport.use('register', new LocalStrategy({
    passReqToCallback: true
   },
    async (req, username, password, done) => {
      let user = await usuarios.getUser(username);
      
      if(user){
        logger.info('Usuario ya registrado');
        return done(null, false);
      };

      const passHash = await bcrypt.hash(password, 10);

      const newUser = {
          username: username,
          password: passHash
      }

      user = await usuarios.saveUser(newUser);

      logger.info(`Este user se registro ${user}`);
      
      return done(null, user);

 }));


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const idF = await usuarios.getUserById(id)
  done(null, idF);
});
     
 module.exports = {passport};      