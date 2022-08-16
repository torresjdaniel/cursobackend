import CarritosRepository from "../repositories/CarritosRepository.js";
import Carrito from "../models/CarritoModel.js";
import CustomError from "../models/CustomErrorModel.js";

const carritosRepo = new CarritosRepository();

export async function createCart(id){
    const newCart = new Carrito({id})
    await carritosRepo.saveCart(newCart);
}

export async function listCart(id) {
    return await carritosRepo.getCartById(id);    
}

export async function addCarrito(cart) {
    await carritosRepo.saveCart(cart);
}

export async function addProductToCart(cartId, product){
    const cart = await carritosRepo.getCartById(cartId);
    if (cart == null) throw new CustomError(400, 'Error al agregar producto al carrito', `Carrito con ID: ${cartId} no existente.`); // Sino existe el carrito lanza la excepción
    cart.saveProduct(product);
    await carritosRepo.updateCartById(cartId, cart);
}

export async function emptyCart(cart) {
    cart.deleteAllProducts(); // elimino todos los productos del carrito
    await carritosRepo.updateCartById(cart.id, cart);
}

export async function deleteProductFromCart(cartId, productId) {
    const cart = await carritosRepo.getCartById(cartId);
    if (cart == null) throw new CustomError(400, 'Error al eliminar producto del carrito', `Carrito con ID: ${cartId} no existente.`); // Sino existe el carrito lanza la excepción
    cart.deleteProduct(productId, true); // configurando true en el segund parametro, elimina todas las cantidades del producto del carrito 
    await carritosRepo.updateCartById(cartId, cart);
}



