const express = require('express');
const port = process.env.PORT || 8080;
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const { getMensajes, saveMensajes } = require('./modulos/chat');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


io.on('connection', async (socket) => {
    const enviarMensajesAlFront = await getMensajes();
    socket.emit('mensajesEmitidos', enviarMensajesAlFront);
    socket.on('nuevoMensaje', async (men) => {
        let email = men.email;
        let mensaje = men.mensaje;
        let emailEdited = email.replace(/[<>{}:\=\/]/gi, '');
        let mensajeEdited = mensaje.replace(/[<>{}:\=\/]/gi, '');
        let menss = mensajeEdited.substring(0,140);
        let editado = {...men, email: emailEdited, mensaje: menss};
        await saveMensajes(editado);
        const enviarMensajesAlFront = await getMensajes();
        io.sockets.emit('mensajesEmitidos', enviarMensajesAlFront);
    });
});

const servidor = httpServer.listen(port, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${servidor.address().port}`);
});
servidor.on('error', error => console.log(`Error en servidor ${error}`));
