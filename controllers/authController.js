const {logger} = require('../logger/loggerModel');
const path = require("path");
// require("dotenv").config();

function getIndex (req, res){
    res.status(301).sendFile(path.join(__dirname,"..","public/index.html"));
    logger.info(`ruta: / | metodo: GET | res: index.html`)

}

function getLogin (req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/login.html"));
    logger.info(`ruta: /login | metodo: GET | res: login.html `);
}

function postLogin(req, res){
    logger.info(`ruta: /login | metodo: POST | authenticate(login) `);
}

function getFailLogin(req, res){
    res.json("'estado': 'fallo ok'");
    logger.info(`ruta: /faillogin | metodo: GET | res: 'estado': 'fallo ok' `);
}

function getRegister(req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/register.html"));
    logger.info(`ruta: /register | metodo: GET | res: register.html `);
}

function postRegister(req, res){
    logger.info(`ruta: /register | metodo: POST | authenticate(register) `);
}

function getFailRegister(req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/failregister.html"));
    logger.info(`ruta: /failregister | metodo: GET | res: failregister.html `);
}

function getLogOut(req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/logout.html"));
    logger.info(`ruta: /logout | metodo: GET | res: logout.html `);
}

function postLogOut(req, res){
    req.logout();
    req.session.destroy();
    logger.info(`ruta: /logout | metodo: POST | logout()`);
}

module.exports = {
    getIndex,
    getLogin,
    postLogin,
    getRegister,
    getFailLogin,
    postRegister,
    getFailRegister,
    getLogOut,
    postLogOut
}