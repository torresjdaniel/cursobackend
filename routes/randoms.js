const express = require('express');
const path = require("path");
const router = express.Router();
const {fork} = require('child_process');
const {logger} = require('../model/loggerModel')



router.get("/randoms?", (req, res) =>{
    let cant;
    req.query.cant ? cant = req.query.cant : cant = 'vacio';
    const randomFork = fork(path.join(__dirname,"..","batchFork/randomFork.js"));
    randomFork.on('message', msg =>{
        res.send(msg);
        logger.info(`ruta: /api/randoms?cant=${cant} | Metodo: GET | res: ${msg}`)
    })
    randomFork.send(cant);
    
});


module.exports = router;