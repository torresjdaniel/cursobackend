const express = require('express');
const router = express.Router();
const path = require("path");

const info = {
    argumentosDeEntrada: process.argv,
    nombreDeLaPlataforma: process.platform,
    versionDeNode: process.version,
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