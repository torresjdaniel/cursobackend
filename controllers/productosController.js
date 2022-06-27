import {productos}  from '../daos/contenedorImport.js';
import logger from '../logger/lg4js.js'

export async function get(req, res){
    const id = req.params.id;
    if (id) {
        const producto = await productos.getById(id);
        res.send(producto);
        logger.info(`Este es el producto que buscas: ${JSON.stringify(producto)}`);
    } else {
        const productosActuales = await productos.getAll();
        res.send(productosActuales);
        logger.info(productosActuales);
    }   
}

export async function post(req, res){
    const producto = await productos.save(req.body);
    res.send(`Se recibió el producto: ${JSON.stringify(producto)}`);
    logger.info(`Se recibió el producto: ${JSON.stringify(producto)}`);
}

export async function put(req, res){
    const producto = await productos.updateById(req.params.id, req.body);
    res.send(producto);
    logger.info(producto);
}

export async function del(req, res){
    const producto = await productos.deleteById(req.params.id);
    res.send(producto);
    logger.info(producto);
}


