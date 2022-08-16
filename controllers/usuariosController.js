import logger from '../logger/lg4js.js';
import passport from '../auth/passportConfig.js';
import { setUpUser } from '../services/usuariosService.js';

export async function post(req, res, next) {
    logger.info(`ruta: api/users | metodo: POST`);

    try {
        const newUser = await setUpUser(req.body); // Si cumple las validaciones de la entidad, sigue el flujo.
        req.body = newUser;
    }
    catch (error) {
        next(error);
        return
    }


    passport.authenticate('register', { session: false }, (error, _user) => { // Acá uso passport para generar el registro, si falla lanzo la excepción.
        if (error) {
            next(error);
            return
        };
        res.sendStatus(201);
    })(req, res);

}
