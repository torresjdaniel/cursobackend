const log4js = require('log4js');

log4js.configure({
    appenders: {
      console: { type: "console" },
      fileWarn: { type: 'file', filename: './logs/warn.log' },
      fileError: { type: 'file', filename: './logs/error.log' },
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

  module.exports = {logger};
