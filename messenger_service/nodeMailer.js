import { createTransport } from 'nodemailer';
import { mailAdmin, mailPass  } from '../config.js';
import logger from '../logger/lg4js.js';
import CustomError from '../models/CustomErrorModel.js';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: mailAdmin,
        pass: mailPass
    }
    
});

export async function sendMailToAdmin(user, order) {
    const mailOptions = {
        from: 'Servidor Ecommerce CoderHouser',
        to: mailAdmin,
        subject: `Nuevo Pedido de ${user.name} | Orden: ${order.id}`,
        text: `Email: ${user.email}, Datos del Pedido: ${JSON.stringify(order.products)}`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info(info)
    } catch (err) {
        throw new CustomError(500, 'Error enviando mail al admin', err)
    }

}

export async function sendMailToUser(user, order) {
    const mailOptions = {
        from: 'Servidor Ecommerce CoderHouser',
        to: user.email,
        subject: `¡Has realizadó un nuevo pedido | Orden: ${order.id}`,
        text: `¡Hola ${user.name}!, Pronto nos comunicaremos contigo.
         Datos del Pedido: ${orderToUser(order.products)}`
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info(info)
    } catch (err) {
        throw new CustomError(500, 'Error enviando mail al usuario', err)
    }

}

function orderToUser(products){
    const map = products.map(m => `Compraste ${m.amount} de ${m.product.name}. Precio por unidad: ${m.product.price}$, Precio Total: ${m.product.price*m.amount}$ \n`)
    return map;
}



