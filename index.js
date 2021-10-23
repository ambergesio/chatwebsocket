const express = require('express');
const port = process.env.PORT || 8080;
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const mensajes = [
    {
    email: 'Centro de mensajes',
    fecha: '0000/00/00',
    hora: '00:00:00 AM',
    mensaje: 'Chat inicializado'
    }
];

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('mensajesEmitidos', mensajes);
    socket.on('nuevoMensaje', (men) => {
        let email = men.email;
        let mensaje = men.mensaje;
        let emailEdited = email.replace(/[<>{}:\=\/]/gi, '');
        let mensajeEdited = mensaje.replace(/[<>{}:\=\/]/gi, '');
        let menss = mensajeEdited.substring(0,140);
        let editado = {...men, email: emailEdited, mensaje: menss};
        mensajes.unshift(editado);
        io.sockets.emit('mensajesEmitidos', mensajes);
    });
});

const servidor = httpServer.listen(port, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${servidor.address().port}`);
});
servidor.on('error', error => console.log(`Error en servidor ${error}`));
