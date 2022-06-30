import twilio from 'twilio'
import { twilioAccountSid, twilioAuthToken, twilioTel, twilioWsp } from '../config.js'
import logger from '../logger/lg4js.js'

const client = twilio(twilioAccountSid, twilioAuthToken)

export async function sms(msg, telTo){
    const options = {
        body: msg,
        from: twilioTel,
        to: `+${telTo}`
    };

    try {
        const message = await client.messages.create(options);
        logger.info(message);
    } catch (err) {
        logger.error(err);
    }
}

export async function whatsApp(msg, telTo){
    const options = {
        body: msg,
        from: twilioWsp,
        to: `whatsapp:+${telTo}`
    };

    try {
        const message = await client.messages.create(options);
        logger.info(message);
    } catch (err) {
        logger.error(err);
    }
}



