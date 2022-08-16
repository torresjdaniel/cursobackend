import * as productosService from '../services/productosService.js' 
import logger from '../logger/lg4js.js'

// en el caso que la respuesta del servicio sea null, se envia un 404

export async function get(req, res, next) {
    logger.info(`ruta: /api/products | metodo: GET`);
    try {
        if (req.params.id) {
            const producto = await productosService.listProduct(req.params.id);
            producto == null ? res.sendStatus(404) : res.status(200).json(producto);
        } else {
            const productos = await productosService.listProducts();
            res.status(200).json(productos);
        }
    }

    catch (error) {
        next(error);
    }
}

export async function post(req, res, next){
    logger.info(`ruta: /api/products | metodo: POST`);
    try {
        const newProduct = await productosService.setUpProduct(req.body);
        await productosService.addProduct(newProduct);
        res.sendStatus(201);
    }

    catch (error) {
        next(error);
    }
}

export async function put(req, res, next){
    logger.info(`ruta: /api/products | metodo: PUT`);
    try {
        productosService.acceptProduct(req.body);
        const updateProduct = await productosService.updateProduct(req.params.id, req.body);
        updateProduct == null ? res.sendStatus(404) : res.sendStatus(200);
    }

    catch (error) {
        next(error);
    }
}

export async function del(req, res){
    logger.info(`ruta: /api/products | metodo: DELETE`);
    try {
        const deleteProduct = await productosService.deleteProduct(req.params.id);
        deleteProduct == null ? res.sendStatus(404) : res.sendStatus(200);
    }

    catch (error) {
        next(error);
    }
}


