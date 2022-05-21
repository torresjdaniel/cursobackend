const {usuarios} = require('../daos/contenedorImport')
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


passport.use('login', new LocalStrategy(
 async (username, password, done) => {

    const user = await usuarios.getUser(username);

    if(user == null){
      console.log('user no existe'); 
      return done(null, false);
    };

    const passCheck = await bcrypt.compare(password, user.password);

    if(passCheck == false){
      console.log('contraseña incorrecta');
      return done(null, false)
    };

    console.log('usuario registrado, Ingreso OK')
    return done(null, user)

 }));

passport.use('register', new LocalStrategy({
    passReqToCallback: true
   },
    async (req, username, password, done) => {
      let user = await usuarios.getUser(username);
      
      if(user){
        console.log('Usuario ya registrado');
        return done(null, false);
      };

      const passHash = await bcrypt.hash(password, 10);

      const newUser = {
          username: username,
          password: passHash
      }

      user = await usuarios.saveUser(newUser);

      console.log(`Este user se registro ${user}`);
      
      return done(null, user);

 }));

 passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
     
 module.exports = {passport};      