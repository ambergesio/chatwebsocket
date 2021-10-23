const fs = require('fs');
        
class Contenedor {
    constructor (file) {
        this.file = file;
    }

    async save (producto) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            let datos = [];
            if (data === ''){
                producto.id = 1;
                datos.push(producto);
            } else {
                datos = JSON.parse(data);
                producto.id = datos[datos.length -1].id + 1;
                datos.push(producto);
            }
            await fs.promises.writeFile(this.file, JSON.stringify(datos, null, 2));
        }
        catch (err){
            console.log(err);
        }
    }

    async saveMensaje (mensaje) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            let datos = [];
            if (data === '' || data === []){
                datos.push(mensaje);
            } else {
                datos = JSON.parse(data);
                datos.unshift(mensaje);
            }
            await fs.promises.writeFile(this.file, JSON.stringify(datos, null, 2));
        }
        catch (err){
            console.log(err);
        }
    }

    async update (prodEditado, id){
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            if (productos === '') {
                return ("no hay productos en la base de datos");
            } else {
                const arrProds = JSON.parse(productos);
                const edit= arrProds.find(item => item.id === id);
                const existe = arrProds.findIndex(item => item.id === id);

                if (existe !== -1) {
                    const updated = {
                        ...edit,
                        ...prodEditado
                    }
                    arrProds[existe] = updated;
                    await fs.promises.writeFile(this.file, JSON.stringify(arrProds, null, 2));
                    return ("Producto editado con éxito");
                } else {
                    return (`no existe un producto con el id ${id}`);
                }
            }
        }
        catch (err){
            console.log(err);
        }
    }

    async getById (id){
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            if (productos === '' || productos === '[]') {
                return null;
            } else {
                const arrProds = JSON.parse(productos);
                const existe = arrProds.filter(item => item.id === id);
                if (existe.length) {
                    return existe;
                } else {
                    return null;
                }
            }
        }
        catch (err){
            console.log(err);
        }
    }

    async getAll () {
        try {
            const pedirDatos = await fs.promises.readFile(this.file, 'utf-8');
            if (pedirDatos === '' || pedirDatos === '[]') {
                return null;
            } else {
                const datos = JSON.parse(pedirDatos);
                return datos;
            }
        }
        catch (err){
            console.log(err);
        }
    }
    
    async deleteById (id) {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            const arrProds = await JSON.parse(productos);
            const existe = arrProds.filter(item => item.id === id);
            if (existe.length) {
                const borrado = arrProds.filter(item => item.id !== id)
                await fs.promises.writeFile(this.file, JSON.stringify(borrado, null, 2));
                return borrado;
            } else  {
                return ("no se pudo borrar el producto con el id ", id, "porque no existe en la base de datos");
            }
        }
        catch (err){
            console.log(err);
        }
    }
    async deleteAll () {
        try {
            await fs.promises.writeFile(this.file, '');
            console.log("Todos los productos han sido borrados de la base de datos");
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = Contenedor;