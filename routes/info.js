const express = require('express');
const router = express.Router();
const path = require("path");
const os = require('os');

const info = {
    argumentosDeEntrada: process.argv,
    nombreDeLaPlataforma: process.platform,
    versionDeNode: process.version,
    numeroDeProcesadores: os.cpus().length,
    memoriaTotalReservada: process.memoryUsage().rss,
    pathDeEjecucion: process.execPath,
    processId: process.pid,
    carpetaDelProyecto: process.cwd()

}

router.get('/infoDatos', (req, res) =>{
    res.send(info);
});

router.get('/info', (req, res) =>{
    res.sendFile(path.join(__dirname,"..","public/pages/info.html"));
});

module.exports = router;