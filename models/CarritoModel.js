import CustomError from './CustomErrorModel.js';

export default class Carrito {
    #id
    #products

    constructor({id, products}) {
        this.#set_id(id);
        this.#products = products || [];
    }

    get id() { return this.#id; }

    #set_id(id) {
        if (!id) throw new CustomError(500, 'Falta el campo "id"', '"id" es un campo requerido');
        this.#id = id;
    }

    get products() { return this.#products; }

    saveProduct(newProduct){
        const producto = this.#products.find(productoBuscado => productoBuscado.product.id == newProduct.id); 
        if(!producto) {
            this.#products.push({product: newProduct, amount: 1}); //Si el producto no existe en el carrito, se guarda
        } else {
            const index = this.#products.findIndex(indexBuscado => indexBuscado.product.id == newProduct.id); //Si el producto existe en el carrito, incrementa la el amount 1 valor
            this.#products[index].amount ++;
        }
    }

    deleteProduct(productId, totalDelete) { // Al poner en true en 'totalDelete', elimina el producto por completo, sino reduce su amount en uno
        const producto = this.#products.find(productoBuscado => productoBuscado.product.id == productId);
        if (!producto) {
            throw new CustomError(400, `Error al eliminar el producto`, `Producto con ID: ${productId} no existente en el carrito`)
        }
        if (totalDelete) {
            const productosFiltrados = this.#products.filter(productos => productos.product.id != productId);
            this.#products = productosFiltrados;
            return
        }
        const index = this.#products.findIndex(indexBuscado => indexBuscado.product.id == productId);
        
        if (this.#products[index].amount == 1) { // Si el amount del producto del carrito es 1, lo elimina directamente.
            const productosFiltrados = this.#products.filter(productos => productos.product.id != productId);
            this.#products = productosFiltrados;
            return
        }

        this.#products[index].amount--;
    }

    deleteAllProducts(){
        this.#products = [];
    }
}