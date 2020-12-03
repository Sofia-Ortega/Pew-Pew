
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('player', (oppClass) => {
        socket.broadcast.emit('opp', oppClass)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})