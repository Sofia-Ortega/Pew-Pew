
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.sockets.on('connect', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('player', (data) => {
        //console.log(socket.id);
        socket.broadcast.emit('opp', data)
    })
    socket.on('startInfo', (data) => {
        console.log("Sending startInfo to:", socket.id)
        socket.broadcast.emit('startInfo', data)
    })
    socket.on('p1XY', data => {
        socket.broadcast.emit('oppXY', data)
    })
    socket.on('bullets', data => {
        socket.broadcast.emit('oppBullets', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    })

});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})