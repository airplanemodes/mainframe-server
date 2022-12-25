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

// Run when client connects
io.on('connection', socket => {
  console.log("New user connected");
  
})

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`*** Server running on port ${port}`);
});