class OrdenDTO {
    constructor({ id, date, userId, products}) {
        this.id = id;
        this.date = date;
        this.userId = userId;
        this.products = products;
    }
}

export default function orderToDTO(order) {
    if (Array.isArray(order))
        return order.map(o => new OrdenDTO(o));
    else
        return new OrdenDTO(order);
}