// import { createTransport } from 'nodemailer';

// const TEST_MAIL = 'danitorres16.93@gmail.com'

// const transporter = createTransport({
//     service: 'gmail',
//     port: 587,
//     auth: {
//         user: 'danitorresfavs@gmail.com',
//         pass: 'gawuepfkvgounewg'
//     }

// });

// const mailOptions = {
//     from: 'Servidor Node.js',
//     to: TEST_MAIL,
//     subject: 'erik!!!!!',
//     html: '<h1 style="color: blue;">Te mando esto desde<span style="color: green;">Node.js sabpeeeee</span></h1>',
// }

// try {
//     const info = await transporter.sendMail(mailOptions)
//     console.log(info)
// } catch (error) {
//     console.log(error)
// }

// import twilio from 'twilio'

// const accountSid = 'AC6f8e298eb6a7caf57e6791283fdd9686'
// const authToken = '27e02ad21f656d5d32c0088928af238c'

// const client = twilio(accountSid, authToken)

// const options = {
//     body: 'Hola soy un SMS desde Node.js!',
//     from: '+19036239495',
//     to: '+541165144524'
// }

// try {
//     const message = await client.messages.create(options)
//     console.log(message)
// } catch (error) {
//     console.log(error)
// }

import twilio from 'twilio'

const accountSid = 'AC6f8e298eb6a7caf57e6791283fdd9686'
const authToken = '27e02ad21f656d5d32c0088928af238c'

const client = twilio(accountSid, authToken)

const options = {
    body: 'Hola soy un whatsapp desde Node.js!',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491165144524'
}

try {
    const message = await client.messages.create(options)
    console.log(message)
} catch (error) {
    console.log(error)
}
