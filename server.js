
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var startPlayers = {}

app.use(express.static('public'));

io.sockets.on('connect', (socket) => {
    console.log('a user connected:', socket.id);

    io.to(socket.id).emit("startInfo", startPlayers);

    socket.on('player', (data) => {
        //console.log(socket.id);
        socket.broadcast.emit('opp', data)
    })
    socket.on('startInfo', (data) => {
        startPlayers[socket.id] = data;
        console.log(startPlayers)
    })
    socket.on('p1XY', data => {
        socket.broadcast.emit('oppXY', data)
    })
    socket.on('bullets', data => {
        socket.broadcast.emit('oppBullets', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        delete startPlayers[socket.id]
        console.log(startPlayers)

    })

});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})