const knex = require("./bd");

// knex.schema
//     .createTable('cars', (table) =>{
//         table.increments();
//         table.string('name');
//         table.float('price');
//     })
//     .then((data) => {
//         console.log('Tabla cars creada');
//     })
//     .catch((err) =>{
//         console.log('Error de base de datos', err);
//     })
//     .finally(() =>{
//         knex.destroy();
//     });

// knex('cars')
//     .insert({name: 'El One', price: 10000})
//     .then((data) =>{
//         console.log('Se creo la entrada');
//     })
//     .catch((err) =>{
//         console.log(err.sqlMessage);
//         console.log(err.sql);
//     })
//     .finally(() =>{
//         knex.destroy();
    // });