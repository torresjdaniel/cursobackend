import {usuarios} from '../daos/contenedorImport.js';
import nuevoUser from '../model/user.js';
import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import logger from '../logger/lg4js.js';
import {mailUser} from '../config.js';
import sendMail from '../messenger_service/nodeMailer.js';
import {generateAuthToken} from './jwt.js';

passport.use('login', new LocalStrategy({
    session: false
    },
    async (username, password, done) => {
   
       const user = await usuarios.getUser(username);
   
       if(user == null){
         logger.info('user no existe'); 
         return done('user no existe', false);
       };
   
       const passCheck = await bcrypt.compare(password, user.password);
   
       if(passCheck == false){
         logger.info('contraseña incorrecta');
         return done('contraseña incorrecta', false)
       };
   
       logger.info('usuario registrado, Ingreso OK')
       return done(null, user)
   
    }));
   
   passport.use('register', new LocalStrategy({
        session: false,
        passReqToCallback: true
      },
       async (req, username, password, done) => {
         let user = await usuarios.getUser(username);
         
         if(user){
           logger.info('Usuario ya registrado');
           return done('Usuario ya registrado', false);
         };
   
         const passHash = await bcrypt.hash(password, 10);
    
         const newUser = await nuevoUser(username, passHash, req);

         user = await usuarios.saveUser(newUser);

        //  await sendMail(mailUser, 'Nuevo Registro', JSON.stringify(user));
   
         logger.info(`Este user se registro ${user[0]}`);
        
         return done(null, user[0]);
   
    }));

  

   export default passport