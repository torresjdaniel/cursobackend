import { Operacion } from "./clases.js";

function operacion(num1: number, num2: number, op: string) {
    return new Promise(resolve => {
        import("./cla.js")
        .then((Operacion) => {
            let prueba: object = new Operacion(num1,num2,op);
            // resolve(`La operación que escribiste da como resultad:`);
        })   
    })
}


async function operaciones() {
    
}

