const fs = require('fs');
 
class Contenedor {

    constructor (fileName){
        this.fileName = fileName.toLowerCase();
       
    };

    async save(product){
        try {
            const contenido = await this.getAll();
            const id = contenido.length + 1;
        
            contenido.push(Object.defineProperty(product, 'id', {value: id,
              writable: true,
              configurable: true,
              enumerable: true}));
              
            const escribirContenido = await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(contenido, null, 2));  
            return id;
        
          } catch (error) {
            console.log(`Algo paso, error: ${error}`);
          }
                   
    };
    
    async getById(id){
        try {
            const contenido = await this.getAll();
            const resultado = contenido.find( idBuscado => idBuscado.id === id);
            if (resultado == undefined) {
              return null;
            } else {
              return resultado;
            }
        
        
          } catch (error) {
            console.log(`Algo paso, error: ${error}`);
          }
    };

    async getAll(){
        try {
            const contenido = JSON.parse(await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8'));
            return contenido;
          } 
          
          catch (error) {
            console.log("No se encontró el archivo o estaba vacio... Pero ya esta resuelto :)");
            const crearFile = await fs.promises.writeFile(`./${this.fileName}.txt`, "[]")
            const contenido = JSON.parse(await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8'));
            return contenido;
          }
    };

    async getAllRandom(){
      try {
        const contenido = JSON.parse(await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8'));
        const iRandom = parseInt(Math.random() * ((contenido.length)));
        if (contenido[iRandom] == undefined) {
          return 'No hay ningún producto en la lista';
        } else{
          return contenido[iRandom];
        }
        
      } catch (error) {
        console.log("No se encontró el archivo o estaba vacio... Pero ya esta resuelto :)");
            const crearFile = await fs.promises.writeFile(`./${this.fileName}.txt`, "[]")
            const contenido = JSON.parse(await fs.promises.readFile(`./${this.fileName}.txt`, 'utf-8'));
            return contenido;
      }
    }

    async deleteById(id){
        try {
            const contenido = await this.getAll();
            const resultado = contenido.filter( idEliminado => idEliminado.id !== id);
        
            const escribirContenido = await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(resultado, null, 2));
        
          } catch (error) {
            console.log(`Algo paso, error: ${error}`);
          }
        
    };

    async deleteAll(){
        try {
            const escribirContenido = await fs.promises.writeFile(`./${this.fileName}.txt`, "[]");
          } catch (error) {
            console.log(`Algo paso, error: ${error}`);
          }
        
    };

}


module.exports ={
  Contenedor
}


