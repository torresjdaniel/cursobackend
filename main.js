class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
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

let persona1 = new Usuario("Daniel", "Torres");

console.log(persona1.getFullName());

persona1.addMascota("Roco");
persona1.addMascota("Gerardo");
persona1.addMascota("Alberto");

console.log(`La cantidad de mascotas de ${persona1.nombre} es: ${persona1.countMascotas()}.`);

persona1.addBook("Libro 1", "Autor 1");
persona1.addBook("Libro 2", "Autor 2");
persona1.addBook("Libro 2", "Autor 2");

console.log(`Los libros de ${persona1.nombre} son: ${persona1.getBookNames()}`);



