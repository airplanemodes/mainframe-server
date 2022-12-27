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
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: "http://localhost:3000",
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  }
});



// *** Socket.io configuration ***
// TODO: Listening only on the main page of client-side
// Run when client connects on the 'connection' event
io.on('connection', (socket) => {
  console.log("* New client connected");

  // Send to client
  socket.emit('msgFromServer', 'Welcome to Mainframe!');

  // Broadcast to all, except the user
  socket.broadcast.emit('msgFromServer', 'User connected');

  socket.on('msgFromClient', (data) => {
    console.log(data);
    io.emit('msgFromServer', data);
  })

  socket.on('disconnect', () => {
    // Send to all
    io.emit('msgFromServer', 'User disconnected');
  });
});



// *** Server launch ***
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`*** Server running on port ${port}`);
});