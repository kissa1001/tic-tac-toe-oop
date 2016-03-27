$board = $('.board');
var Player = function(name, sign, gridSize){
  this.name = name;
  this.sign = sign;
  this.populate();
  this.setGrid(gridSize);
};

var TicTacToe = function(players){
    this.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    this.players = players;
    this.filledSquares = 0;
};

TicTacToe.prototype.setGrid = function(gridSize){
    // gridSize should be something like '10x10'
    var dimensions = gridSize.split('x').map(Number);
    var rows = dimensions[0],
        columns = dimensions[1];

    this.grid = new Array(rows).fill(0).map(function(row){
        return new Array(columns).fill(EMPTY);
    });
};

TicTacToe.prototype.prototype.populate = function(){
    var self = this;
    this.board.grid.forEach(function(line, line_index) {
        line.forEach(function(cell, cell_index) {
            $('<div class="square"></div>')
            .data('board-position', [line_index, cell_index])
            .appendTo(self.$board);
        });
    });
};

TicTacToe.prototype.currentPlayer = function() {
    var index = this.filledSquares % 2;
    return this.players[index]; // returns Player object
};

TicTacToe.prototype.playerBySign = function(sign) {
    // return the Player that has the sign
    for (var i=0; i < this.players.length; i++) {
        if (this.players[i].sign === sign) {
            return this.players[i].name;
        }
    }
};

TicTacToe.prototype.move= function(name, posX, posY) {
  if (this.validatePosition(posX, posY) && this.validatePlayer(name)){
      this.board[posX][posY] = this.currentPlayer().sign;
      console.log(name + ' chose '+ [posX, posY]);
      this.filledSquares++;
      console.log(this.winner());
  }
};


TicTacToe.prototype.validatePosition = function(posX,posY){
  if (this.board[posX][posY] === null) { return true; }
  else { console.log('This cell is not available!'); }
};

TicTacToe.prototype.validatePlayer = function(name) {
    if (this.currentPlayer().name === name) { return true; }
    else { console.log("This is not " + name + "'s turn."); }
};

TicTacToe.prototype.winner = function() {
    var winner;
    
    this.board.forEach(function(line){
        if (line[0] !== null && line[0] === line[1] && line[1] === line[2]) {
            winner = line[0];
        }
    });
    
    var board = this.board;
    [0, 1, 2].forEach(function(index){
        var column = board.map(function(line){ return line[index]; });
        if (column[0] !== null && column[0] == column[1] && column[1] == column[2]) { winner = column[0]; }
    });
    
    if (this.board[0][0] !== null && this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2]) { winner = this.board[0][0]; }
    
    if (this.board[2][0] !== null && this.board[2][0] == this.board[1][1] && this.board[1][1] == this.board[0][2]) { winner = this.board[2][0]; }
    
    return this.playerBySign(winner);
};

var ttt = new TicTacToe([
    new Player('lina', 'x'),
    new Player('capi', 'o')
],'3x3', 3);

ttt.move('lina', 0, 0);
ttt.move('capi', 0, 2);
ttt.move('lina', 1, 0);
ttt.move('capi', 1, 1);
ttt.move('lina', 2, 0);