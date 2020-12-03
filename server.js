
// const express = require('express');
// //const socket = require('socket.io');
//
// const app = express();
// const http = require('http').createServer(app)
// var io = socket(http);

const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

//const server = app.listen(3000);

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('My socket server is running on port 3000');
})