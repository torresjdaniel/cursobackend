const fs = require('fs');
class Contenedor{

    constructor (fileName, product, id){
        this.fileName = fileName.toLowerCase();
        this.product = product;
        this.id = id;
       
    };

    save(){
        async () =>{
            try{
                const readFile = await fs.promises.readFile(this.fileName, 'utf-8');
                async () =>{
                    try{
                        const writeFile = await fs.promises.appendFile(this.fileName, JSON.stringify(this.product, null, 2));
                    }
                    catch(err){
                        console.log("No se pudo agregar el producto");
                    }
                }


            }
            
            catch (err){
                console.log("No existe el archivo para leer");
            }  

        } 
                   
    };
    
    getById(){

    };

    getAll(){

    };

    deleteById(){

    };

    deleteAll(){

    };

}