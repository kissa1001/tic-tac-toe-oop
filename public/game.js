var app = angular.module('game',[])
    .controller('loginCtrl', function($rootScope, $scope){
        if(!$rootScope.socket){
            $rootScope.socket = io();
        }
        $scope.$on('player1', function(){
            $rootScope.player = new Player($scope.name, $scope.sign);
            $rootScope.socket.emit('join', $scope.name, $scope.sign);
            $rootScope.loggedIn = true;
        })
    })
    .controller('gameCtrl', function($rootScope, $scope){
        if(!$rootScope.socket){
            $rootScope.socket = io();
        }
        $rootScope.$on('player1', function(){
            $scope.ttt = new TicTacToe([
                $rootScope.player,
                new Player('Robot', 'O')
            ]);
        })
        $rootScope.socket.on('join', function(){
            console.log('Hello');
        })
        $scope.move = function(X,Y){
            $scope.ttt.move($rootScope.player.name, X, Y);
        }
    });