const parse = require("nodemon/lib/cli/parse");

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
            return { error: `Producto no id: ${id} encontrado` };
        } else {
            return resultado;
        }
    }

    save(producto) {
        let id;
            
        this.productos.length === 0 ? (id = 1) : (id = this.productos[this.productos.length - 1].id + 1);

        if (producto.nombre && producto.precio && producto.foto && producto.stock && producto.codigo && producto.descripcion) {

            if (this.productos.findIndex(nombreBuscado => nombreBuscado.nombre === producto.nombre) !== -1 && this.productos.findIndex(codigoBuscado => codigoBuscado.codigo === producto.codigo) !== -1){
                const index = this.productos.findIndex(indexBuscado => indexBuscado.codigo === producto.codigo);
                this.productos[index].stock = parseInt(this.productos[index].stock) + parseInt(producto.stock);
                this.productos[index].precio = producto.precio;
                this.productos[index].foto = producto.foto;
                this.productos[index].descripcion = producto.descripcion;
                this.productos[index].timestamp = Date.now();
                return `Encontramos que ya existe este producto con id: ${this.productos[index].id}. Sumamos el stock nuevo al existente y actualizamos los demás datos`;
            } else {
                producto.id = id;
                producto.timestamp = Date.now();
                this.productos.push(producto);
                return this.productos[this.productos.length - 1];
            }

        } else {
            return `Producto no id: ${id} encontrado`;
        }
    }

    updateById(id, producto) {
        const index = this.productos.findIndex(indexBuscado => indexBuscado.id === parseInt(id));

        if (index === -1) {
            return { error: `Producto no id: ${id} encontrado` };
        } else {
            if (producto.nombre || producto.precio || producto.foto || producto.stock || producto.codigo || producto.descripcion) {
                this.productos[index].nombre = (producto.nombre === undefined ? this.productos[index].nombre : producto.nombre);
                this.productos[index].precio = (producto.precio === undefined ? this.productos[index].precio : producto.precio);
                this.productos[index].foto = (producto.foto === undefined ? this.productos[index].foto : producto.foto);
                this.productos[index].codigo = (producto.codigo === undefined ? this.productos[index].codigo : producto.codigo);
                this.productos[index].stock = (producto.stock === undefined ? this.productos[index].stock : producto.stock);
                this.productos[index].descripcion = (producto.descripcion === undefined ? this.productos[index].descripcion : producto.descripcion);
                this.productos[index].timestamp = Date.now();
            } else {
                return 'No estas ingresando ningún dato a actualizar';
            }
        }
    }

    deleteById(id) {
        const resultado = this.productos.find(idBuscado => idBuscado.id === parseInt(id));

        if (resultado === undefined) {
            return { error: `Producto no id: ${id} encontrado` };
        } else {
            this.productos = this.productos.filter(idEliminado => idEliminado.id !== parseInt(id));
        }
    }
}

class Carritos{

    constructor(){
        this.carritos = [];
    }

    create(){
        let id;
        const carrito = {};

        this.carritos.length === 0 ? (id = 1) : (id = this.carritos[this.carritos.length - 1].id + 1);
        carrito.id = id;
        carrito.productos = [];
        this.carritos.push(carrito);
        return id;
    
    }

    deleteById(id) {
        const resultado = this.carritos.find(idBuscado => idBuscado.id === parseInt(id));

        if (resultado === undefined) {
            return { error: `Carrito con id: ${id} no encontrado` };
        } else {
            this.carritos = this.carritos.filter(idEliminado => idEliminado.id !== parseInt(id));
        }
    }

    getById(id) {

        const resultado = this.carritos.find(idBuscado => idBuscado.id === parseInt(id));
        if (resultado === undefined) {
            return { error: `Carrito no id: ${id} encontrado` };
        } else {
            return resultado.productos;
        }
    }

    saveProduct(id, producto){
        const index = this.carritos.findIndex(indexBuscado => indexBuscado.id === parseInt(id));
        if (index === -1) {
            return { error: `Carrito con id: ${idCarrito} no encontrado`};
        } else {
            this.carritos[index].productos.push(producto);
        }

    }

    deleteProductById(idCarrito, idProducto){
        const index = this.carritos.findIndex(indexBuscado => indexBuscado.id === parseInt(idCarrito));

        if (index === -1) {
            return { error: `Carrito con id: ${idCarrito} no encontrado`};
        } else {
            console.log(index);
            console.log(this.carritos[index].productos)
            const resultado = this.carritos[index].productos.find(idBuscado => parseInt(idBuscado.id) === parseInt(idProducto));

            if (resultado === undefined) {
                return { error: `Producto con id: ${idProducto} no encontrado en el carrito con id: ${idCarrito}`};
            } else {
                this.carritos[index].productos = this.carritos[index].productos.filter(idEliminado => parseInt(idEliminado.id) !== parseInt(idProducto));
        }

        }

        
    }

}


module.exports = {Productos, Carritos};
