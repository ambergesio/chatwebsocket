const Contenedor = require('../Contenedor');
let mensajesDelChat = new Contenedor("./files/chat.json");

const getMensajes = async () => {
    const mensajesGuardados = await mensajesDelChat.getAll();
    return mensajesGuardados;
};

const saveMensajes = async (mens) => {
    await mensajesDelChat.saveMensaje(mens);
}
module.exports = { getMensajes, saveMensajes };