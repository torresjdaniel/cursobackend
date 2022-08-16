import logger from '../logger/lg4js.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export function getDatos (req, res){
    res.send(infoSysteam);
    logger.info(`ruta: /infoDatos | metodo: GET`);
}

export function get (req, res){
    res.sendFile(path.join(__dirname,"..","public/pages/info.html"));
    logger.info(`ruta: /info | metodo: GET`);
};