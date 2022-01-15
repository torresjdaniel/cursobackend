const express = require('express');
const productos = require('./routes/productos')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.use('/api', productos);

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP UP con Express, puerto: ${server.address().port}`)
  });
  
server.on('error', error => console.log(`Error en el servidor :( ... Error: ${error}`));
  


