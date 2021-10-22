const express = require('express');
const port = process.env.PORT || 8080;
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

const mensajes = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('mensajesEmitidos', mensajes);
    socket.on('nuevoMensaje', (mensaje) => {
        mensajes.unshift(mensaje);
        io.sockets.emit('mensajesEmitidos', mensajes);
    });
});

const servidor = httpServer.listen(port, () => {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${servidor.address().port}`);
});
servidor.on('error', error => console.log(`Error en servidor ${error}`));