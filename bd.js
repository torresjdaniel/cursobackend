var knex = require('knex');

 const conex = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'autos'
    },
    pool: { min: 0, max: 7 }
  }); 

module.exports = conex;