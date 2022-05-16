// const {faker} = require('@faker-js/faker');
// const express = require('express');

// faker.locale = 'es';

// const app = express();

// app.get('/api/productos-test', (req, res)=>{
//     const productos = [];
//     for (let i = 0; i < 5; i++) {
//         const producto = {
//             title: faker.commerce.product(),
//             price: faker.commerce.price(0, 100, 0),
//             thumbnail: faker.image.abstract(150, 80)
//         };  
//         productos.push(producto);
//     }
//     res.json(productos);

// });

// const server = app.listen(8080, ()=>{
//     console.log('Server Up probando faker')
// })

// server.on('err', err => console.log(`Error levantando server ${err}`));


fetch('http://127.0.0.1:8080/api/productos-test')
    .then( response => response.json())
        .then(data => console.log(data));