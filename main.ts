
function operacion(num1: number, num2: number, op: string) {
    return new Promise((resolve, reject) => {
        import("./clases.js")
        .then(operacion => {
            resolve(`La operación que escribiste da como resultado: ${new operacion.Operacion(num1,num2,op).resultado()}`);
        }) 
        .catch(() => {
            reject("Algo paso que esto no funciono :(")
        })  
    })
}


async function operaciones(num1: number, num2: number, op: string) {
    return await operacion(num1,num2,op);
}

operaciones(1,2,"suma")
    .then(resultado => {console.log(resultado)})
    .catch(error => {console.error(error)});

operaciones(6,2,"resta")
    .then(resultado => {console.log(resultado)})
    .catch(error => {console.error(error)});
    
 operaciones(1,2,"division")
    .then(resultado => {console.log(resultado)}) 
    .catch(error => {console.error(error)}); 