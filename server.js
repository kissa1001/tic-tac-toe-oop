var http = require('http');
var express = require('express');
var socket_io = require('socket.io');
var connectCounter = 0;
var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function(socket){
	socket.on('join', function(name, sign){
    	socket.nickname = name;
    	socket.sign = sign;
        socket.broadcast.emit('join', name);
        socket.emit('join',name);
        console.log(name + ' with sign: '+ sign + ' connected');
        connectCounter++;
        console.log('Connected users: ' + connectCounter); 
    });

    socket.on('disconnect', function() {
        connectCounter--;
        console.log('Connected users: ' + connectCounter);
    });
    //User is typing
    socket.on("sender", function (data) {
        socket.broadcast.emit("sender", data); 
    });

    socket.on('message', function(message) {
        var nickname = socket.nickname;
        console.log(nickname + ' said:', message);
        socket.broadcast.emit('message', nickname + ': ' + message);
        socket.emit('message', 'Me: ' + message);
    });
});

server.listen(8080);