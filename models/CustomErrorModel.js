export default class CustomError {
    
    constructor(estado, descripcion, detalles) {
        this.estado = estado;
        this.descripcion = descripcion;
        this.detalles = detalles || 'N/A';
    }

}
