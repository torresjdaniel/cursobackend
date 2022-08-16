import { conectar } from "./server.js";
import logger from "./logger/lg4js.js";

try {
    await conectar();
} 

catch (error) {
    logger.error(error);
}