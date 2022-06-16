const express = require('express');
const router = express.Router();
const {faker} = require('@faker-js/faker');
const {productos} = require('../daos/contenedorImport');
faker.locale = 'es';
const {logger} = require('../model/loggerModel');

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
    logger.info(`ruta: /api/productos-test | metodo: GET | res: ${productos}`);
})

router.get('/productos', async (req, res) =>{
        const contenido = await productos.getAll();
        req.app.io.sockets.emit('updateList', contenido);
        res.send(contenido);
        logger.info(`ruta: /api/productos | metodo: GET | res: ${contenido}`);
});

router.post('/productos', async (req, res) =>{
    const producto = await productos.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    const productosActualizados = await productos.getAll();
    req.app.io.sockets.emit('updateList', productosActualizados);
    logger.info(`ruta: /api/productos | metodo: POST | res: ${producto}`);
});

router.get('/productos/:id', async (req, res) =>{
    const producto = await productos.getById(req.params.id);
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: GET | res: ${producto}`);
});

router.put('/productos/:id', async (req, res) =>{
    const producto = await productos.updateById(req.params.id, req.body);
    req.app.io.sockets.emit('updateList', await productos.getAll());
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: PUT | res: ${producto}`);
});

router.delete('/productos/:id', async (req, res) =>{
    const producto = await productos.deleteById(req.params.id);
    req.app.io.sockets.emit('updateList', await productos.getAll());
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: DELETE | res: ${producto}`);
});

module.exports= router;
