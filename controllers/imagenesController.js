import logger from '../logger/lg4js.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function post(req, res, next) {
    logger.info(`ruta: api/images | metodo: POST`);
    
    try {
        const imgName = `${req.hostname}/${req.file.filename}`;
        logger.info(imgName);
        res.status(201).send(imgName); 
    } 
    
    catch (error) {
        next(error);
    }
}