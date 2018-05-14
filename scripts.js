//user interface
$(document).ready(function(){
  var game = Object.create(Pig);
  var player1wins = 0;
  var player2wins = 0;
  var checkPlayer = function() {
    var player = game.activePlayer;
    if (player === 1) {
      $("h2#player1").css('color', 'red');
      $("h2#player2").css('color', 'white');
      $("#player2buttons").hide();
      $("#player1buttons").show();
    } else {
      $("h2#player2").css('color', 'red');
      $("h2#player1").css('color', 'white');
      $("#player1buttons").hide();
      $("#player2buttons").show();
    }
  };

  checkPlayer();


  var playerRoll = function() {
    var dice = game.rollDice();
    var output = "&#x268" + (dice-1) + ";";
    $("#showdice").html(output);
    $("#dice").text(dice);
    changePlayerAndRefreshResult();
  }

  $("button#roll").click(function(){
    playerRoll();
  });

  $("button#hold").click(function(){
    game.hold();
    changePlayerAndRefreshResult();
  });

  $(document).keypress(function(event) {
    if((event.which == 122) && (game.activePlayer===1)){
      playerRoll();
    }else if((event.which == 47) && (game.activePlayer == 2)){
      playerRoll();
    }else if((event.which == 32)){
      game.hold()
      changePlayerAndRefreshResult();
    }
  });


  var changePlayerAndRefreshResult = function(){
    winCheck();
    refreshResult();
    checkPlayer();
  }

  var winCheck = function(){
    if(game.player1 >= 20){
      alert("PLAYER 1 WINS");
      $("#player1wins").text(player1wins);
    } else if (game.player2 >= 20){
      alert("PLAYER 2 WINS");
      $("#player2wins").text(player2wins);
    }
  };

  var refreshResult = function(){
    $("#player1result").text(game.player1);
    $("#player2result").text(game.player2);
    $("#current").text(game.currentResult);
  }

});


//business logic
var Pig = {
  player1: 0,
  player2: 0,
  currentResult: 0,
  activePlayer: 1,
  rollDice: function(){
    var roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
      this.currentResult = 0;
      this.switchActivePlayer();
    }
    else {
      this.currentResult += roll;
    }
    return roll;
  },
  switchActivePlayer: function(){
    if(this.activePlayer === 1){
      this.player1 += this.currentResult;
      this.activePlayer = 2;
    }else{
      this.player2 += this.currentResult;
      this.activePlayer = 1;
    }
  },
  hold: function(){
    this.switchActivePlayer();
    this.currentResult = 0;
  }
};
