class ProductoDTO {
    constructor({ id, name, description, price, image }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}

export default function productToDTO(product) {
    if (Array.isArray(product)) {
        return product.map(p => new ProductoDTO(p));
    } else
        return new ProductoDTO(product);
}