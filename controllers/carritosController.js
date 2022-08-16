import * as carritosService from '../services/carritosService.js'
import * as productosService from '../services/productosService.js' 
import logger from '../logger/lg4js.js'

// en el caso que la respuesta del servicio sea null, se envia un 404

export async function get(req, res, next) {
    logger.info(`ruta: /api/shoppingcartproducts | metodo: GET`);
    try {
        const carrito = await carritosService.listCart(req.user.id);
        res.status(200).json(carrito.products);
    }

    catch (error) {
        next(error);
    }
}

export async function post(req, res, next){
    logger.info(`ruta: /api/shoppingcartproducts | metodo: POST`);
    try {
        const producto = await productosService.listProduct(req.body.productId);
        if (producto == null){
            res.sendStatus(404)
            return
        }
        await carritosService.addProductToCart(req.user.id, producto)
        res.sendStatus(200);
    }

    catch (error) {
        next(error);
    }
}

export async function del(req, res, next){
    logger.info(`ruta: /api/shoppingcartproducts | metodo: DELETE`);
    try {
        await carritosService.deleteProductFromCart(req.user.id, req.params.id)
        res.sendStatus(200);
    }

    catch (error) {
        next(error);
    }
}

