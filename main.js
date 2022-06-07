const cluster = require('cluster')
const os = require('os')
const yargs = require('yargs/yargs')(process.argv.slice(2));
const {server} = require('./server')
const express = require('express')
const app = express()

const args = yargs
.default({
    PORT: 8080,
    MODE: 'FORK'
})
.alias({
    p: 'PORT',
    m: 'MODE'
})
.argv;

const PORT = parseInt(args.PORT);
const MODE = args.MODE;

if(MODE == 'CLUSTER' && cluster.isMaster) {
    const numCPUs = os.cpus().length
    
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'la quedo :(', new Date().toLocaleString())
        cluster.fork()
    })
}

else {
    app.get('/', (req, res) => {
        res.send(`Servidor express en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`)
    })
    
    app.listen(PORT, err => {
        if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}