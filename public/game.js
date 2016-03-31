var app = angular.module('game',[])
    .factory('socket', function(){
        return io();
    })
    .controller('loginCtrl',['$scope', '$rootScope', 'socket', function($scope,$rootScope , socket){
        $scope.$on('player1', function(){
            $rootScope.player = new Player($scope.name, $scope.sign);
            socket.emit('join', $scope.name, $scope.sign);
            $rootScope.loggedIn = true;
        })
    }])
    .controller('gameCtrl', ['$scope', '$rootScope', 'socket', function($scope,$rootScope , socket){
        $rootScope.$on('player1', function(){
            $scope.ttt = new TicTacToe([
                $rootScope.player,
                new Player('Robot', 'O')
            ]);
        })
        socket.on('join', function(){
            console.log('Hello');
        })
        $scope.move = function(X,Y){
            $scope.ttt.move($rootScope.player.name, X, Y);
        }
    }]);