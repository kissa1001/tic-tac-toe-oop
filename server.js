var http = require('http');
var express = require('express');
var socket_io = require('socket.io');
var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var connectCounter = 0;
var players = {player1: null, player2: null};

io.on('connection', function(socket){

  socket.on('join', function(data){
    socket.user = {name: data.name, sign: data.sign};
    if (!players.player1) {players.player1 = socket.user;}
    else if (!players.player2) {players.player2 = socket.user;}
    connectCounter++;
    socket.emit('players', {players: players});
    socket.broadcast.emit('players', {players: players});
    console.log(data.name + ' with sign: '+ data.sign + ' connected');
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
    var name = socket.name;
    console.log(name + ' said:', message);
    socket.broadcast.emit('message', name + ': ' + message);
    socket.emit('message', 'Me: ' + message);
  });
});

server.listen(8080);