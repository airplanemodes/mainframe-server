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
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});



// *** Socket.io configuration ***
io.on('connection', (socket) => {
  console.log("* New client connected");

  socket.emit('msgFromServer', 'Welcome to Mainframe!');
  socket.broadcast.emit('msgFromServer', 'User connected');

  socket.on('msgFromClient', (data) => {
    io.emit('msgFromServer', data);
  })

  socket.on('disconnect', () => {
    io.emit('msgFromServer', 'User disconnected');
  });
});



// *** Server launch ***
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`*** Server running on port ${port}`);
});