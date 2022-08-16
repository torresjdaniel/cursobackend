class CarritoDTO {
    constructor({ id, products}) {
        this.id = id;
        this.products = products;
    }
}

export default function cartToDTO(cart) {
    if (Array.isArray(cart))
        return cart.map(c => new CarritoDTO(c));
    else
        return new CarritoDTO(cart);
}