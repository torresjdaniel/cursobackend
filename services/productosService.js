import ProductosRepository from "../repositories/ProductosRepository.js";
import Producto from "../models/ProductoModel.js";

const productosRepo = new ProductosRepository();

export async function setUpProduct(product){ // Acá preparo al producto antes de ser agregado (se agrega ID)
    const newProduct = await Producto.homologateProduct(product);
    return new Producto(newProduct);
}

export function acceptProduct(product) { // Acá valido el formato del producto a actualizar
    Producto.validateProduct(product);
}

export async function addProduct(product){
    await productosRepo.addProduct(product);
}

export async function listProducts(){
    return await productosRepo.getProducts();
}

export async function listProduct(id){
    return await productosRepo.getProductById(id);
}

export async function updateProduct(id, newProduct){
    return await productosRepo.updateProductById(id, newProduct);
}

export async function deleteProduct(id){
    return await productosRepo.deleteProductById(id);
}

