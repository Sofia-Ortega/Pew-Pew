
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var startPlayers = {}
var posPlayers = {}

app.use(express.static('public'));

io.sockets.on('connect', (socket) => {
    console.log('a user connected:', socket.id);
    io.to(socket.id).emit("startPacket", startPlayers);

    socket.on('player', (data) => {
        //console.log(socket.id);
        socket.broadcast.emit('opp', data)
    })
    socket.on('startInfo', (data) => {
        startPlayers[socket.id] = data;

        data.id = socket.id;
        socket.broadcast.emit('oppConnect', data)

        console.log(startPlayers)
    })
    socket.on('xyPlayer', data => {
        data.id = socket.id;
        console.log(data)
        posPlayers[socket.id] = data
        socket.broadcast.emit('oppXY', data);
    })
    socket.on('bullets', data => {
        socket.broadcast.emit('oppBullets', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        delete startPlayers[socket.id]
        delete posPlayers[socket.id]
        socket.broadcast.emit('oppDisconnect', socket.id)
        console.log(startPlayers)

    })

});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})