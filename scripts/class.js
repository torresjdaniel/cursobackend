
class Productos {

    constructor() {
        this.productos = [
            {
                nombre: 'regla',
                precio: '50',
                foto: 'https://via.placeholder.com/150',
                descripcion: 'Regla de 30 cm',
                codigo: 'r1',
                stock: '25',
                id: 1,
                timestamp: '1644376463120'
              },
              {
                nombre: 'lapiz',
                precio: '20',
                foto: 'https://via.placeholder.com/150',
                descripcion: 'Lapiz naranja',
                codigo: 'l1',
                stock: '150',
                id: 2,
                timestamp: '1644376872819'
              },
              {
                nombre: 'lapicera',
                precio: '15',
                descripcion: 'Lapicera azul',
                codigo: 'l2',
                stock: '75',
                foto: 'https://via.placeholder.com/150',
                id: 3,
                timestamp: '1644376901140'

              }
        ]
    }


    getAll() {
        return this.productos;
    }

    getById(id) {

        const resultado = this.productos.find(idBuscado => idBuscado.id === parseInt(id));
        if (resultado === undefined) {
            return { error: 'producto no encontrado' };
        } else {
            return resultado;
        }
    }

    save(producto) {
        let id;
            
        this.productos.length === 0 ? (id = 1) : (id = this.productos[this.productos.length - 1].id + 1);

        if (producto.nombre && producto.precio && producto.foto && producto.stock && producto.codigo && producto.descripcion) {

            // if (this.productos.find(nombre => nombre === parseInt(producto.nombre)).length > 0 && this.productos.find(codigo => codigo === parseInt(producto.codigo)).length > 0){

            // }

            producto.id = id;
            producto.timestamp = Date.now();
            this.productos.push(producto);
            return this.productos[this.productos.length - 1];
        } else {
            return 'No es el formato de producto que podes ingresar';
        }
    }

    updateById(id, producto) {
        const resultado = this.productos.find(idBuscado => idBuscado.id === parseInt(id));

        if (resultado === undefined) {
            return { error: 'producto no encontrado' };
        } else {
            if (producto.nombre && producto.precio && producto.foto && producto.stock && producto.codigo && producto.descripcion) {
                this.productos[id-1].nombre = producto.nombre;
                this.productos[id-1].precio = producto.precio;
                this.productos[id-1].foto = producto.foto;
                this.productos[id-1].codigo = producto.codigo;
                this.productos[id-1].stock = producto.stock;
                this.productos[id-1].descripcion = producto.descripcion;
                // this.productos[id-1].timestamp = producto.timestamp;
            } else {
                return 'No es el formato de producto que podes ingresar';
            }
        }
    }

    deleteById(id) {
        const resultado = this.productos.find(idBuscado => idBuscado.id === parseInt(id));

        if (resultado === undefined) {
            return { error: 'producto no encontrado' };
        } else {
            this.productos = this.productos.filter(idEliminado => idEliminado.id !== parseInt(id));
        }
    }
}


module.exports = {Productos};