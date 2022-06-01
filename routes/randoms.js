const express = require('express');
const path = require("path");
const router = express.Router();
const {fork} = require('child_process');



router.get("/randoms?", (req, res) =>{
    let cant;
    req.query.cant ? cant = req.query.cant : cant = 'vacio';
    const randomFork = fork(path.join(__dirname,"..","batchFork/randomFork.js"));
    randomFork.on('message', msg =>{
        res.send(msg);
    })
    randomFork.send(cant);
    
});

router.get('/no', (req,res) =>{
    res.send('Esto no esta bloqueado');
})


module.exports = router;