import { carritos } from '../daos/contenedorImport.js';
import { usuarios } from '../daos/contenedorImport.js';
import logger from '../logger/lg4js.js';
import sendMail from '../messenger_service/nodeMailer.js';
import { sms, whatsApp } from '../messenger_service/twilio.js';
import { mailUser, adminTel } from '../config.js';

export async function post(req, res){
    const pedido = await crearPedido(req);
    res.send(pedido);
    logger.info(`ruta: /confirmarpedido | metodo: POST`);
};

async function crearPedido(req){
    const pedido = [];
    const carrito = await carritos.getById(req.user.idCarrito);
    if(carrito.productos){
        if(carrito.productos.length == 0){
            return 'Tu carrito esta vacio.'
        }
        for (const i of carrito.productos){
            const obj ={
                nombre: i.nombre, 
                precio: i.precio,
                foto: i.foto
            };
        
            pedido.push(obj);
        };
        await updateCarritoUser(req);
        await informarPedido(pedido, req);
        return pedido;
    } else{
        await updateCarritoUser(req);
        return 'Por algún motivo el carrito no existe más :(, probá relogearte y hacer nuevamente tu pedido.'
    }
};

async function updateCarritoUser(req){
    const newIdCarrito = await carritos.create();
    req.user.idCarrito = newIdCarrito;
    await usuarios.updateIdCarrito(req.user._id, newIdCarrito);
}

async function informarPedido(pedido, req){
    if(pedido[0]){
       await sendMail(mailUser, `Nuevo pedido de ${req.user.nombre} | ${req.user.username}`, JSON.stringify(pedido));
       await whatsApp(`Nuevo pedido de ${req.user.nombre} | ${req.user.username}`, adminTel);
       await sms('Su pedido ha sido recibido y se encuentra en proceso', req.user.tel)
    }
}