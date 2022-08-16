import log4js from 'log4js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

log4js.configure({
    appenders: {
      console: { type: "console" },
      fileWarn: { type: 'file', filename: path.join(__dirname, '..', `logs/warn.log`) },
      fileError: { type: 'file', filename: path.join(__dirname, '..', `logs/error.log`) },
      loggerConsole: { type: 'logLevelFilter', appender: 'console', level: 'info'},
      loggerWarn: { type: 'logLevelFilter', appender: 'fileWarn', level: 'warn', maxLevel: 'warn'},
      loggerError: { type: 'logLevelFilter', appender: 'fileError', level: 'error'}
    },
    categories: {
        default: {
          appenders: ['loggerConsole'], level: 'all'
        },
        generalLogger: {
          appenders: ['loggerConsole', 'loggerWarn', 'loggerError'], level: 'all'
        }
      }   
   })
   
   const logger = log4js.getLogger('generalLogger');

   export default logger;