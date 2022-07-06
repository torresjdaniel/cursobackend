const os = require('os');

const infoSysteam = {
    argumentosDeEntrada: process.argv,
    nombreDeLaPlataforma: process.platform,
    versionDeNode: process.version,
    numeroDeProcesadores: os.cpus().length,
    memoriaTotalReservada: process.memoryUsage().rss,
    pathDeEjecucion: process.execPath,
    processId: process.pid,
    carpetaDelProyecto: process.cwd()

}

module.exports = infoSysteam;