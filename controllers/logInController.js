import logger from '../logger/lg4js.js';
import passport from '../auth/passportConfig.js';
import { generateAuthToken } from '../auth/jwt.js';

export function post(req, res, next){
    logger.info(`ruta: /login | metodo: POST`);
    passport.authenticate('login', {session: false}, (error, user) =>{
        if(error){
            next(error);
            return
        };
        const token = generateAuthToken(user);
        res.status(200).send(token);
    })(req, res);
};