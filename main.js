const contenedor = require('./clase.js');

const objeto1 = {                                                                                                                                                    
  title: 'Lapiz',                                                                                                                                 
  price: 12.5,                                                                                                                                     
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                                 
};

const objeto2 = {                                                                                                                                                    
  title: 'Goma',                                                                                                                                 
  price: 5,                                                                                                                                     
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                                 
};

const objeto3 = {                                                                                                                                                    
  title: 'Transportador',                                                                                                                                 
  price: 30,                                                                                                                                     
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                                 
};   
const prueba = new contenedor.Contenedor('productos');

console.log('Esto es un demo del programa');
console.log('.............................');

prueba.save(objeto3)
  .then(id => {
    console.log('Metodo save(objeto) = número de id del objeto en el array');
    console.log(`Se guardo el objeto con id: ${id}`);
    prueba.save(objeto1)
      .then(id => {
        console.log(`Se guardo el objeto con id: ${id}`);
        prueba.save(objeto2)
          .then(id => {
            console.log(`Se guardo el objeto con id: ${id}`);
            console.log('.............................');
            console.log('Metodo getById(número de id) = devuelve el objeto con ese id y sino null');
            prueba.getById(9)
              .then(producto => {
                console.log('Se pide el objeto con id: 9 (que no existe)')
                console.log(producto);
                prueba.getById(5)
                  .then(producto => {
                    console.log('Se pide el objeto con id: 5')
                    console.log(producto);
                    console.log('.............................');
                    console.log('Metodo getAll() = devuelve un array con la lista de ojetos actuales');
                    prueba.getAll()
                      .then(productos => {
                        console.log(productos);
                        console.log('.............................');
                        console.log('Metodo deleteById(número de id) = no devuelve nada solo elimina el id pedido, sino existe no hace nada.');
                        prueba.deleteById(3)
                          .then(() => {
                            prueba.getAll()
                              .then(productos => {
                                console.log('A modo de ejemplo, dejo una muestra decomo queda el array sin ese objeto borrado.');
                                console.log(productos)
                                console.log('.............................');
                                console.log('Metodo deleteAll() = no devuelve nada, elimina todos los objetos del array');
                                prueba.deleteAll()
                                  .then(() => {
                                    prueba.getAll()
                                      .then(productos => {
                                        console.log('A modo de ejemplo, dejo una muestra decomo queda el array vacio.');
                                        console.log(productos);
                                      })
                                  })
                              })
                          })
                      })
                  })
              })
          })
      })
  });











