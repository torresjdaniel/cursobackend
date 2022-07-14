// let persona = {
//     configurable: true,
//     enumerable: true,
//     nombre: 'Daniel',
//     apellido: "Torres",

//     get nombreCompleto (){

//         return `${this.nombre} ${this.apellido}`
//     }
// }

// function personaF(nombre, apellido){
//     const nombreNew = nombre || "Daniel";
//     const apellidoNew= apellido ||  "Torres";
//     return `${nombreNew} ${apellidoNew}`
// }



// console.log(persona.nombre = 'Franco', persona.apellido = "Jukis")
// console.log(personaF('Juan', 'Sanja'))

let persona = {
    nombre: 'Yeison',
    apellido: 'Daza',
    get nombreCompleto() {
      return `${nombre} ${apellido}`
    },
    set nombreCompleto(nom) {
      const palabras = nom.split(' ');
      this.nombre = palabras[0] || '';
      this.apellido = palabras[1] || '';
    }
  }
  
  persona.nombreCompleto = 'Camilo Sanchez'
  
  console.log(persona.nombre); //camilo
  console.log(persona.apellido); //sanchez