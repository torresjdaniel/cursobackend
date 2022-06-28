import {usuarios} from '../daos/contenedorImport.js';
import nuevoUser from '../model/user.js';
import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import logger from '../logger/lg4js.js'

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
   
        //  const newUser = {
        //      username: username,
        //      password: passHash,
        //      nombre: req.body.nombre,
        //      direccion: req.body.direccion,
        //      edad: req.body.edad,
        //      avatarImgName: path.join(__dirname,'..',`${req.file.path}`),
        //      idCarrito: ""
        //  }
        
         const newUser = await nuevoUser(username, passHash, req);

         user = await usuarios.saveUser(newUser);
   
         logger.info(`Este user se registro ${user[0]}`);
         
         return done(null, user[0]);
   
    }));
   
   
   passport.serializeUser((user, done) => {
     done(null, user._id);
   });
   
   passport.deserializeUser(async (id, done) => {
     const idF = await usuarios.getUserById(id)
     done(null, idF);
   });

   export default passport