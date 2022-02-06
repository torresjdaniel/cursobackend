
class Productos {

    constructor() {
        this.productos = [
            {
                title: 'Regla',
                price: '50',
                thumbnail: 'https://via.placeholder.com/150',
                id: 1
              },
              {
                title: 'Lapiz',
                price: '20',
                thumbnail: 'https://via.placeholder.com/150',
                id: 2
              },
              {
                title: 'Lapicera',
                price: '15',
                thumbnail: 'https://via.placeholder.com/150',
                id: 3
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

        if (producto.title && producto.price && producto.thumbnail) {
            this.productos.push(Object.defineProperty(producto, 'id', {
                value: id,
                writable: true,
                configurable: true,
                enumerable: true
            }));

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
            if (producto.title && producto.price && producto.thumbnail) {
                this.productos[id-1].title = producto.title;
                this.productos[id-1].price = producto.price;
                this.productos[id-1].thumbnail = producto.thumbnail;
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