const Contenedor = require('../Contenedor');
let productos = new Contenedor("./files/productos.json");


const getProductos = async () => {
    const productosGuardados = await productos.getAll();
    return productosGuardados;
};

const saveProductos = async (prod) => {
    await productos.save(prod);
}

module.exports = { getProductos, saveProductos };