const mongoose = require('mongoose');
const model = require('./testModel.js');

connectBDD();
addTest();
readTest();

async function connectBDD(){
    try{
        const URL = 'mongodb+srv://torresjdaniel:2minutos@cluster0.c7ey7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
        await mongoose.connect(URL)
        console.log('Conectado a BDD')
    }

    catch(err){
        console.log('Error al conectarse a la bdd', err);

    }
}

async function addTest(){
    try {
         const daniTest = new model({nombre: "Dani", apellido: "Torres"});
         await daniTest.save();
         console.log(`Se guardo ok ${daniTest}`);

    } 
    catch (err) {
        console.log('Paso algo guardando', err);
    }
}

async function readTest(){
    try {
        const leerDani = await model.find({nombre: "Dani"});
        console.log(leerDani);
    }

    catch (err) {
        console.log('Paso algo leyendo', err);       
    }
}