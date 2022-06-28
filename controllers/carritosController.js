import {carritos}  from '../daos/contenedorImport.js';
import logger from '../logger/lg4js.js'

export async function get(req, res){
    const carrito = await carritos.getById(req.params.id);
    res.send(carrito);
    logger.info(carrito);
}

export async function post(req, res){
    const carrito = await carritos.create();
    logger.info(carrito);
    res.send(`Se creo el carrito con id: ${carrito}`);
}

export async function postProductos(req, res){
    const carrito = await carritos.saveProduct(req.params.id, req.body);
    res.send((carrito === undefined ? `Se guardo el producto con id: ${req.body._id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    logger.info((carrito === undefined ? `Se guardo el producto con id: ${req.body._id} en el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
}

export async function del(req, res){
    const carrito = await carritos.deleteById(req.params.id);
    res.send((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
    logger.info((carrito === undefined ? `Se eliminó el carrito con id: ${req.params.id}` : JSON.stringify(carrito)));
}

export async function delProductos(req, res){
    const carrito = await carritos.deleteProductById(req.params.id, req.params.id_prod);
    res.send((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
    logger.info((carrito === undefined ? `Se eliminó el producto con id: ${req.params.id} en el carrito con id: ${req.params.id_prod}` : JSON.stringify(carrito)));
}