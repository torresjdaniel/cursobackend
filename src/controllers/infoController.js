const path = require("path");
const infoSysteam = require('../model/infoModel')

const {logger} = require('../logger/loggerModel');

function getDatos (req, res){
    res.send(infoSysteam);
    logger.info(`ruta: /infoDatos | metodo: GET |res: ${infoSysteam}`);
}

function get (req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/info.html"));
    logger.info(`ruta: /info | metodo: GET | res: info.html`);
};

module.exports = {getDatos, get};