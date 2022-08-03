import logger from '../logger/lg4js.js';
import passport from '../auth/passportConfig.js';
import { generateAuthToken } from '../auth/jwt.js';

export function post(req, res){
    logger.info(`ruta: /register | metodo: POST`);
    passport.authenticate('register', {session: false}, (error, user) =>{
        if(error){
            res.send(error)
            return
        };
        const token = generateAuthToken(user);
        res.json({msg: 'Usuario creado', token});
    })(req, res);
};

