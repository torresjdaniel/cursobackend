const express = require('express');
const router = express.Router();

const {Productos} = require('../scripts/class');

const api = new Productos();


router.get('/productos', (req, res) =>{
    
    if(Object.entries(req.query).length > 0){
        const producto = api.getById(req.query.id);
        console.log(req.query);
        res.send(producto);
        console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
    } else {
        const productos = api.getAll();
        res.send(productos);
        console.log(productos);
    }    
});

router.post('/productos', (req, res) =>{
    const producto = api.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
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