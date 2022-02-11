const express = require('express');
const router = express.Router();

const {Productos} = require('../scripts/class');
const {Carritos} = require('../scripts/class');

const productos = new Productos();
const carritos = new Carritos();


router.get('/productos/:id?', (req, res) =>{
    const id = req.params.id;
    if (id) {
        const producto = productos.getById(id);
        res.send(producto);
        console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
    } else {
        const productosActuales = productos.getAll();
        res.send(productosActuales);
        console.log(productosActuales);
    }   
});

router.post('/productos', (req, res) =>{
    const producto = productos.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
});

router.put('/productos/:id', (req, res) =>{
    const producto = productos.updateById(req.params.id, req.body);
    res.send((producto === undefined ? `Se actualizó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se actualizó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
});

router.delete('/productos/:id', (req, res) =>{
    const producto = productos.deleteById(req.params.id);
    res.send((producto === undefined ? `Se eliminó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se eliminó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
});

router.post('/carrito', (req, res) =>{
    const carrito = carritos.create();
    console.log(carrito);
    res.send(`Se creo el carrito con id: ${carrito}`);
});

router.post('/carrito/:id/productos', (req, res) =>{
    const carrito =carritos.saveProduct(req.params.id, req.body);
    res.send((carrito === undefined ? `Se guardo el producto con id: ${req.body.id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se guardo el producto con id: ${req.body.id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
});

router.delete('/carrito/:id', (req, res) =>{
    const carrito = carritos.deleteById(req.params.id);
    res.send((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
});

router.delete('/carrito/:id/productos/:id_prod', (req, res) =>{
    const carrito = carritos.deleteProductById(req.params.id, req.params.id_prod);
    res.send((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
});

router.get('/carrito/:id/productos', (req, res) =>{
       const carrito = carritos.getById(req.params.id);
       res.send(carrito);
       console.log(carrito);
});





module.exports = router;
