const cluster = require('cluster')
const os = require('os')
const yargs = require('yargs/yargs')(process.argv.slice(2));
const {server} = require('./server');
const {logger} = require('./logger/loggerModel');

const args = yargs
.default({
    PORT: 8080,
    MODE: 'FORK',
    COMPRE: 'NO'
})
.alias({
    p: 'PORT',
    m: 'MODE',
    c: "COMPRE"
})
.argv;

const PORT = parseInt(args.PORT);
const MODE = args.MODE;
const COMPRE = args.COMPRE;

if(MODE == 'CLUSTER' && cluster.isMaster) {
    const numCPUs = os.cpus().length
    
    logger.info(`Número de procesadores: ${numCPUs}`)
    logger.info(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.info('Worker', worker.process.pid, 'la quedo :(', new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    server(PORT, COMPRE);
}