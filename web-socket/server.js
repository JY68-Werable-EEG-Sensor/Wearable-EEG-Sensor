const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000", // Only allow requests from this origin
      methods: ["GET", "POST"]
    }
  });

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendEEGData', (data) => {
        console.log('Received Data: ', data)
        // Broadcast EEG data to all connected clients
        io.emit('eegData', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = 4000; // Use whatever port you prefer
server.listen(port, () => console.log(`Listening on port ${port}`));
