const express = require('express');
const router = express.Router();

const {Contenedor} = require('../scripts/classContenedor');

const mysql = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'ecommerce'
    },
    pool: { min: 0, max: 7 }
  }
const api = new Contenedor(mysql, 'productos');


router.get('/productos', async (req, res) =>{
        const productos = await api.getAll();
        req.app.io.sockets.emit('updateList', productos);
        res.send(productos);
        console.log(productos);
});

router.post('/productos', async (req, res) =>{
    const producto = await api.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
    const productosActualizados = await api.getAll();
    req.app.io.sockets.emit('updateList', productosActualizados);
});

router.get('/productos/:id', async (req, res) =>{
    const producto = await api.getById(req.params.id);
    res.send(producto);
    console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
});

router.put('/productos/:id', async (req, res) =>{
    const producto = await api.updateById(req.params.id, req.body);
    req.app.io.sockets.emit('updateList', await api.getAll());
    res.send((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

router.delete('/productos/:id', async (req, res) =>{
    const producto = await api.deleteById(req.params.id);
    req.app.io.sockets.emit('updateList', await api.getAll());
    res.send((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

module.exports.router = router;
module.exports.api = api;

