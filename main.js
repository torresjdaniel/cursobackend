const fs = require('fs');

const objeto = {                                                                                                                                                    
    title: 'Lapiz',                                                                                                                                 
    price: 12.5,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'                                                                                                                                                                                 
  };


  const arrayObj = [                                                                                                                                                     
    {                                                                                                                                                    
      title: 'Escuadra',                                                                                                                                 
      price: 123.45,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
      id: 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                
  ]


const leerContenido = async (fileName) =>{
      try {
        const contenido = JSON.parse(await fs.promises.readFile(`./${fileName}.txt`, 'utf-8'));
        return contenido;
      } 
      
      catch (error) {
        console.log("No se encontró el archivo o estaba vacio... Pero ya esta resuelto :)");
        const crearFile = await fs.promises.writeFile(`./${fileName}.txt`, "[]")
        const contenido = JSON.parse(await fs.promises.readFile(`./${fileName}.txt`, 'utf-8'));
        return contenido;
      }

 }

const escribirContenido = async (fileName, objeto) => {
  try {
    const contenido = await leerContenido(fileName);

    contenido.push(Object.defineProperty(objeto, 'id', {value: (contenido.length + 1),
      writable: true,
      configurable: true,
      enumerable: true}));
      
    const escribirContenido = await fs.promises.writeFile(`./${fileName}.txt`, JSON.stringify(contenido, null, 2));
    console.log("Se guardo OK");  

  } catch (error) {
    console.log(`Algo paso, error: ${error}`);
  }
  

}

// escribirContenido('test', objeto);
// getById(3);
// leerContenido('test')
// .then( contenido =>{
//   console.log(contenido)
// });

// const prueba = leerContenido('test');
// console.log(prueba);


async function getById(id){
  try {
    const contenido = await leerContenido('test');
    const resultado = contenido.find( idBuscado => idBuscado.id === id);
    if (resultado == undefined) {
      return null;
    } else {
      return resultado;
    }


  } catch (error) {
    console.log(`Algo paso, error: ${error}`);
  }
  
}


async function deleteById(id) {
  try {
    const contenido = await leerContenido('test');
    const resultado = contenido.filter( idEliminado => idEliminado.id !== id);

    const escribirContenido = await fs.promises.writeFile('test.txt', JSON.stringify(resultado, null, 2));
    console.log(resultado);

  } catch (error) {
   
  }


}

// deleteById(2);

deleteAll();

async function deleteAll(){

  try {
    const escribirContenido = await fs.promises.writeFile('test.txt', "[]");
  } catch (error) {
    console.log(`Algo paso, error: ${error}`);
  }

}