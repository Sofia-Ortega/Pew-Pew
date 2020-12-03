
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('player', (data) => {
        socket.broadcast.emit('opp', data)
    })
    socket.on('bullets', data => {
        socket.broadcast.emit('oppBullets', data);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})