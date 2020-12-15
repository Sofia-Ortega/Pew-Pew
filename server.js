var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('public'));

server.listen(PORT, function() {
    console.log('My Server is running on port 3000');
});

var io = require('socket.io')(server);


var startPlayers = {}

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
        //console.log(data)
        socket.broadcast.emit('oppXY', data);
    })
    socket.on('thetaPlayer', data => {
        data.id = socket.id
        //console.log(data);
        socket.broadcast.emit('oppTheta', data);

    })
    socket.on('newBullet', data => {
       // data.id = socket.id;
        socket.broadcast.emit('bulletShot', data);
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        delete startPlayers[socket.id]
        socket.broadcast.emit('oppDisconnect', socket.id)
        console.log(startPlayers)

    })

});

// http.listen(PORT, () => {
//     console.log('My socket server is running on port 3000');
// })