var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('public'));

var io = require('socket.io')(server);


var startPlayers = {}

io.on('connect', (socket) => {
    console.log('a user connected:', socket.id);
    console.log(startPlayers);
    io.to(socket.id).emit("startPacket", startPlayers);

    socket.on('player', (data) => {
        socket.broadcast.emit('opp', data)
    })
    socket.on('startInfo', (data) => {
        startPlayers[socket.id] = data;
        data.id = socket.id;
        socket.broadcast.emit('oppConnect', data)

    })
    socket.on('xyPlayer', data => {
        data.id = socket.id;
        socket.broadcast.emit('oppXY', data);
    })
    socket.on('thetaPlayer', data => {
        data.id = socket.id
        socket.broadcast.emit('oppTheta', data);

    })
    socket.on('newBullet', data => {
        socket.broadcast.emit('bulletShot', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        delete startPlayers[socket.id]
        socket.broadcast.emit('oppDisconnect', socket.id)

    })

});

server.listen(PORT, function() {
    console.log('My Server is running on port 3000');
});