var app = angular.module('game',[])
.factory('socket', function(){
  var socket = io();
  return socket;
})
.factory('tictactoe', function(){
  return new TicTacToe();
})
.controller(
  'loginCtrl',
  ['$scope', '$rootScope', 'socket', 'tictactoe',
    function($scope, $rootScope, socket, tictactoe){
      $scope.$on('localPlayer', function(){
        $rootScope.player = new Player($scope.name, $scope.sign);
        $rootScope.loggedIn = true;
        socket.emit('join', {name: $scope.name, sign: $scope.sign});
      });
    }])

.controller(
  'gameCtrl',
  ['$scope', '$rootScope', 'socket', 'tictactoe',
    function($scope, $rootScope, socket, tictactoe){
      $scope.tictactoe = tictactoe;
      socket.on('players', function(data){
        if (data.players.player1) {
          tictactoe.players[0] = new Player(
            data.players.player1.name, data.players.player1.sign);
        }
        if (data.players.player2) {
          tictactoe.players[1] = new Player(
            data.players.player2.name, data.players.player2.sign);
        }
      });
      $scope.move = function(X,Y){
        console.log(tictactoe.players);
        tictactoe.move($rootScope.player.name, X, Y);
      };
    }]);