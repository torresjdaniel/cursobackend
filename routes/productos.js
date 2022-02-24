const express = require('express');
const router = express.Router();

const {Contenedor} = require('../scripts/class');

const api = new Contenedor();


router.get('/productos', (req, res) =>{
    const productos = api.getAll();
    req.app.io.sockets.emit('updateList', api.getAll());
    res.send(productos);
    console.log(productos);
});

router.post('/productos', (req, res) =>{
    const producto = api.save(req.body);
    req.app.io.sockets.emit('updateList', api.getAll());
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
});

router.get('/productos/:id', (req, res) =>{
    const producto = api.getById(req.params.id);
    res.send(producto);
    console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
});

router.put('/productos/:id', (req, res) =>{
    const producto = api.updateById(req.params.id, req.body);
    res.send((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

router.delete('/productos/:id', (req, res) =>{
    const producto = api.deleteById(req.params.id);
    res.send((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

module.exports.router = router;
module.exports.api = api;