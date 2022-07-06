const {faker} = require('@faker-js/faker');
faker.locale = 'es';
const {logger} = require('../logger/loggerModel');
const productosService = require('../services/productosService');

function getTest(req, res){
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
};

async function get(req, res){
    const contenido = await productosService.listarProductos();
    req.app.io.sockets.emit('updateList', contenido);
    res.send(contenido);
    logger.info(`ruta: /api/productos | metodo: GET | res: ${contenido}`);
}

async function post(req, res){
    const producto = await productosService.registrarProducto(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    const productosActualizados = await productosService.listarProductos();
    req.app.io.sockets.emit('updateList', productosActualizados);
    logger.info(`ruta: /api/productos | metodo: POST | res: ${producto}`);
}

async function getByID(req, res){
    const producto = await productosService.listarProducto(req.params.id);
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: GET | res: ${producto}`);
}

async function put(req, res){
    const producto = await productosService.actualizarProducto(req.params.id, req.body);
    req.app.io.sockets.emit('updateList', await productosService.listarProductos());
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: PUT | res: ${producto}`);
}

async function del(req, res){
    const producto = await productosService.eliminarProducto(req.params.id);
    req.app.io.sockets.emit('updateList', await  productosService.listarProductos());
    res.send(producto);
    logger.info(`ruta: /api/productos/${req.params.id} | metodo: DELETE | res: ${producto}`);
}

module.exports ={getTest, get, post, getByID, put, del};