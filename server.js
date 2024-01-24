// *** Core ***
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { allowAccessControl, routes } = require('./routes/config');
const mainframe = express();

mainframe.use(express.json());
allowAccessControl(mainframe);
routes(mainframe);

const server = http.createServer(mainframe);

// *** Socket.io configuration ***
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    socket.on('msgFromClient', (data) => {
        io.emit('msgFromServer', data);
    });
});



// *** Server launch ***
const hostname = "localhost";
const port = process.env.PORT || 4000;
server.listen(port, hostname, () => {
    console.log(`*** Server running at http://${hostname}:${port}/`);
});