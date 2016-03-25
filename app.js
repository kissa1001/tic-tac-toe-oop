Player = function(name,sign){
  this.name = name;
  this.sign = sign;
};
var player1 = new Player('lina','x');
var player2 = new Player('capi','o');

TicTacToe = function(players){
  this.board = [[null,null,null],
                [null,null,null],
                [null,null,null]
               ];
  this.players = [player1,player2];
  this.filledSquare = 0;
};
TicTacToe.prototype.move= function(players,posX,posY){
  if(this.validate(posX,posY)){
    if(this.filledSquare % 2 === 0){
      this.board[posX][posY]=player1.sign;
      console.log(player1.name + ' chose '+ [posX,posY]);
      ttt.winner();
    }
    else{
      this.board[posX][posY]=player2.sign;
      console.log(player2.name + ' chose '+ [posX,posY]);
      ttt.winner();
    }
    this.filledSquare++;
  }
};
TicTacToe.prototype.validate = function(posX,posY){
  if(this.board[posX][posY] === null){
    return true;
  }
  else{
    console.log('This cell is not available!');
  }
};
TicTacToe.prototype.winner= function(value){
  this.value = 'x' || 'o';
  if(this.board[0][0] === this.value && this.board[0][1] ===this.value && this.board[0][2] === this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[1][0] === this.value && this.board[1][1] === this.value && this.board[1][2] === this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[2][0] === this.value && this.board[2][1] === this.value && this.board[2][2]=== this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[0][0] === this.value && this.board[2][0] === this.value && this.board[2][0]=== this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[0][1] === this.value && this.board[1][1] === this.value && this.board[2][1] === this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[0][2] === this.value && this.board[1][2] === this.value && this.board[2][2] === this.value){
    console.log(this.value + ' won');
  }
  else if(this.board[0][0] === this.value && this.board[1][1] === this.value && this.board[2][2]=== this.value){
    console.log(this.this.value + ' won');
  }
  else if(this.board[0][2] === this.value && this.board[1][1] === this.value && this.board[2][0]=== this.value){
    console.log(this.value + ' won');
  }
};
var ttt = new TicTacToe();
ttt.move('lina',0,0);
ttt.move('capi',2,0);
ttt.move('lina',0,1);
ttt.move('capi',2,1);
ttt.move('lina',0,2);
