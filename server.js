
const express = require('express');
const socket = require('socket.io');


const app = express();
const server = app.listen(3000);

const io = socket(server);

app.use(express.static('public'));

console.log('My socket server is running on port 3000');