import { carritos } from '../daos/contenedorImport.js';
import { usuarios } from '../daos/contenedorImport.js';
import logger from '../logger/lg4js.js';


export async function get(req, res){
    const pedido = await crearPedido(req);
    res.send(pedido);
    logger.info(informarPedido(pedido));
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

function informarPedido(pedido){
    if(pedido[0]){
        return 'Se informa al admin y user sobre el pedido'
    }
}