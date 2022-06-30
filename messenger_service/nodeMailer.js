import { createTransport } from 'nodemailer';
import { mailUser, mailPass  } from '../config.js';
import logger from '../logger/lg4js.js';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: mailUser,
        pass: mailPass
    }

});

export default async function sendMail(mailTo, subject, text){
    const mailOptions = {
        from: 'Servidor Node.js',
        to: mailTo,
        subject: subject,
        text: text
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info(info)
    } catch (err) {
        logger.error(err)
    }

}



