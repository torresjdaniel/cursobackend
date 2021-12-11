const libros = [{nombre: "Libro 1", autor: "Autor 1"}, {nombre: "Libro 2", autor: "Autor 2"}, {nombre: "Libro 3", autor: "Autor 3"}];
const mascotas = ["Roco", "Gerardo", "Alberto"];


class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `Nombre: ${this.nombre} ${this.apellido}`;
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombreLibro, autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro});
    }

    getBookNames(){
        return this.libros.map(function(nombreLibro){
            return nombreLibro.nombre;
        })
    }

}

let persona1 = new Usuario("Daniel", "Torres", libros, mascotas);

console.log(persona1.getFullName());

persona1.addMascota("Zeus");
persona1.addMascota("Negrita");
persona1.addMascota("Jaguer");

console.log(`La cantidad de mascotas de ${persona1.nombre} es: ${persona1.countMascotas()}.`);

persona1.addBook("Libro 4", "Autor 4");
persona1.addBook("Libro 5", "Autor 5");
persona1.addBook("Libro 6", "Autor 6");

console.log(`Los libros de ${persona1.nombre} son: ${persona1.getBookNames()}`);



