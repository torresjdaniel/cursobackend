const {productos} = require('../databases/contenedorImport');

async function listarProductos(){
    return await productos.getAll();

}

async function registrarProducto(producto){
    return await productos.save(producto);
}

async function listarProducto(id){
    return await productos.getById(id);
}

async function actualizarProducto(id, producto){
    return await productos.updateById(id, producto);
}

async function eliminarProducto(id){
    return await productos.deleteById(id);
}


module.exports ={
    listarProductos,
    registrarProducto,
    listarProducto,
    actualizarProducto,
    eliminarProducto
}