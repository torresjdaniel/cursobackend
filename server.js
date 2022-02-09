const express = require('express');
const productos = require('./routes/productos');
const { Server: HttpServer } = require("http");

const app = express();
const httpServer = new HttpServer(app);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/public'));
app.use('/api', productos.router);


httpServer.listen(PORT, () => {
  console.log(`Server UP en el puerto ${PORT}`);
});

  


