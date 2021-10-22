const socket = io.connect();

const renderMensajes = (mensajes) => {
    const contenido = mensajes.map((mens) => {
        return(`
            <div>
                <strong>${mens.email}</strong> - <span>${mens.fecha} - ${mens.hora}</span> dijo:
                <p>${mens.mensaje}</p>
            </div>
        `);
    });
    const joined = contenido.join(" ");
    document.getElementById('menss').innerHTML = joined;
}

const agregarMensaje = (event) => {
    event.preventDefault();
    let date = new Date();
    let fecha = new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    let horario = date.toLocaleTimeString('en-US');
    const nuevoMensaje = {
        email: document.getElementById('email').value,
        fecha: fecha,
        hora: horario,
        mensaje: document.getElementById('mensaje').value
    };

    socket.emit('nuevoMensaje', nuevoMensaje);
    document.getElementById('mensaje').value = '';
};

const formMensaje = document.getElementById('cargarNuevoMensaje');
formMensaje.addEventListener('submit', agregarMensaje);

socket.on('mensajesEmitidos', datos => {
    renderMensajes(datos);
});