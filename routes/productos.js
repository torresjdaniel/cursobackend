const express = require('express');
const router = express.Router();
const {faker} = require('@faker-js/faker');
const {productos} = require('../daos/contenedorImport')
faker.locale = 'es';

router.get('/productos-test', (req, res) =>{
    const productos = [];
    for (let i = 0; i < 5; i++) {
        const producto = {
            title: faker.commerce.product(),
            price: faker.commerce.price(0, 100, 0),
            thumbnail: faker.image.abstract(150, 80)
        };  
        productos.push(producto);
    }
    res.json(productos);
})

router.get('/productos', async (req, res) =>{
        const contenido = await productos.getAll();
        req.app.io.sockets.emit('updateList', contenido);
        res.send(contenido);
        console.log(contenido);
});

router.post('/productos', async (req, res) =>{
    const producto = await productos.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
    const productosActualizados = await productos.getAll();
    req.app.io.sockets.emit('updateList', productosActualizados);
});

router.get('/productos/:id', async (req, res) =>{
    const producto = await productos.getById(req.params.id);
    res.send(producto);
    console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
});

router.put('/productos/:id', async (req, res) =>{
    const producto = await productos.updateById(req.params.id, req.body);
    req.app.io.sockets.emit('updateList', await productos.getAll());
    res.send((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se actualizó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

router.delete('/productos/:id', async (req, res) =>{
    const producto = await productos.deleteById(req.params.id);
    req.app.io.sockets.emit('updateList', await productos.getAll());
    res.send((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se eliminó el producto con id ${req.params.id}` : JSON.stringify(producto)));
});

module.exports= router;
