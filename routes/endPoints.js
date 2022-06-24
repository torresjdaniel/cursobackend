import { Router } from 'express';
const router = Router();

import {productos}  from '../daos/contenedorImport.js';
import {carritos}  from '../daos/contenedorImport.js';


router.get('/productos/:id?', async (req, res) =>{
    const id = req.params.id;
    if (id) {
        const producto = await productos.getById(id);
        res.send(producto);
        console.log(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
    } else {
        const productosActuales = await productos.getAll();
        res.send(productosActuales);
        console.log(productosActuales);
    }   
});

router.post('/productos', async (req, res) =>{
    const producto = await productos.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    console.log(`Se recibió el producto: ${JSON.stringify(producto)}`);
});

router.put('/productos/:id', async (req, res) =>{
    const producto = await productos.updateById(req.params.id, req.body);
    res.send((producto === undefined ? `Se actualizó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se actualizó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
});

router.delete('/productos/:id', async (req, res) =>{
    const producto = await productos.deleteById(req.params.id);
    res.send((producto === undefined ? `Se eliminó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
    console.log((producto === undefined ? `Se eliminó el producto con id: ${req.params.id}` : JSON.stringify(producto)));
});

router.post('/carrito', async (req, res) =>{
    const carrito = await carritos.create();
    console.log(carrito);
    res.send(`Se creo el carrito con id: ${carrito}`);
});

router.post('/carrito/:id/productos', async (req, res) =>{
    const carrito = await carritos.saveProduct(req.params.id, req.body);
    res.send((carrito === undefined ? `Se guardo el producto con id: ${req.body.id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se guardo el producto con id: ${req.body.id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
});

router.delete('/carrito/:id', async (req, res) =>{
    const carrito = await carritos.deleteById(req.params.id);
    res.send((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
});

router.delete('/carrito/:id/productos/:id_prod', async (req, res) =>{
    const carrito = await carritos.deleteProductById(req.params.id, req.params.id_prod);
    res.send((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
    console.log((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
});

router.get('/carrito/:id/productos', async (req, res) =>{
       const carrito = await carritos.getById(req.params.id);
       res.send(carrito);
       console.log(carrito);
});


export default router;
