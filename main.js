const express = require('express');
const contenedor = require('./clase');


const contenedor1 = new contenedor.Contenedor('productos');

const app = express();
const PORT = 8080;


const server = app.listen(PORT, () =>{
  console.log(`Servidor HTTP UP con Express, puerto: ${server.address().port}`)
});

server.on('error', error => console.log(`Error en el servidor :( ... Error: ${error}`));

app.get('/', (req, res) =>{
  res.send('Entrega Clase 6')
})

app.get('/productos', (req, res) =>{
  contenedor1.getAll()
    .then( productos => {
      res.send(productos)
    })
})

app.get('/productoRandom', (req, res) =>{
  contenedor1.getAllRandom()
    .then( producto => {
      res.send(producto)
    })
})

