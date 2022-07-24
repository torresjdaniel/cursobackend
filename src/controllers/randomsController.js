const path = require("path");
const {fork} = require('child_process');
const {logger} = require('../logger/loggerModel')

function get(req, res){
    let cant;
    req.query.cant ? cant = req.query.cant : cant = 'vacio';
    const randomFork = fork(path.join(__dirname,"..","scripts/randomFork.js"));
    randomFork.on('message', msg =>{
        res.send(msg);
        logger.info(`ruta: /api/randoms?cant=${cant} | Metodo: GET | res: ${msg}`)
    })
    randomFork.send(cant);   
}

module.exports = {get};