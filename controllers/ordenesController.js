import * as ordenesService from '../services/ordenService.js'
import * as carritosService from '../services/carritosService.js'
import { sendMailToAdmin, sendMailToUser  } from '../messenger_service/nodeMailer.js';
import logger from '../logger/lg4js.js'

export async function get(req, res, next) {
    logger.info(`ruta: /api/orders | metodo: GET`);
    try {
        const ordenes = await ordenesService.listUserOrders(req.user.id);
        res.status(200).json(ordenes);
    }

    catch (error) {
        next(error);
    }
}

export async function post(req, res, next){
    logger.info(`ruta: /api/orders | metodo: POST`);
    try {
        const carrito = await carritosService.listCart(req.user.id); // Obtengo productos del carrito del cliente para agregar a la orden
        if(carrito.products.length == 0) return res.status(400).json({msg:'Carrito sin productos'})
        const newOrder = ordenesService.setUpProduct({userId: req.user.id, products: carrito.products}); // Voy armando la orden para validarla en el servicio
        await ordenesService.addOrder(newOrder); 
        await carritosService.emptyCart(carrito); // Vacio carrito
        await sendMailToAdmin(req.user, newOrder);
        await sendMailToUser(req.user, newOrder);
        res.sendStatus(201);
    }

    catch (error) {
        next(error);
    }
}