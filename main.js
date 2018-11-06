$(document).ready(function() {


  //Variable declaration
  var scores, roundScore, activePlayer, gamePlaying;

  //Call init function to start game
  initialization();

/********DICE ROLL BUTTON FUNCTIONALITY********/
$(".btn-roll").on("click", function() {
    if (gamePlaying) {
      //random number generator
      var dice = Math.floor(Math.random() * 6) + 1;
      //console.log(dice);

      //Display results of the roll
      //this is the correct way to hide/show the dice image
      //$('.dice').hide();
      //$('.dice').show();
      //this is an alternative method
      $(".dice").css("display", "block");
      $(".dice").attr("src", "./images/dice-" + dice + ".png");

      //update the score IF rolled number was not a 1
      if (dice !== 1) {
        //add score
        roundScore += dice;
        $("#current-" + activePlayer).text(roundScore);
      } else {
        //next player
        nextPlayer();
      }
    }
  });



/********HOLD BUTTON FUNCTIONALITY*******/
$(".btn-hold").on("click", function() {
    if (gamePlaying) {
      //add current score to global score
      scores[activePlayer] += roundScore;

      //update UI
      $("#score-" + activePlayer).text(scores[activePlayer]);
      //check who won
      if (scores[activePlayer] >= 100) {
          //change PLAYER # to Winner
        $("#name-" + activePlayer).text("WINNER!!!");
        //Hide the dice
        $(".dice").hide();
        //add classlist winner to activePlayer
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.add("winner");
        
          //Remove active from activePlayer
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.remove("active");

          //change gamePlaying to flase
        gamePlaying = false;
      } else {
        nextPlayer();
      }

      //next player
      nextPlayer();
    }
  });



/*NEXT PLAYER FUNCTIONALITY*/
function nextPlayer() {
    //next player
    //if activPlayer=0 then activePlayer should be 1 else activPlayer should be 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    //change current score to 0
    $("#current-0").text("0");
    $("#current-1").text("0");

    //toggles active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    $(".dice").css("display", "none");
}

    $(".btn-new").on("click", initialization);


  /******INITIALIZATION FUNCTIONALITY******/
  function initialization() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying=true;

    //this is the correct wy to hide the dice image
    //$('.dice').hide();
    //this is an alternative method
    $(".dice").css("display", "none");

    //Score reset
    $("#sore-0").text("0");
    $("#score-1").text("0");
    $("#current-0").text("0");
    $("#current-1").text("0");
    $("#name-0").text("Player 1");
    $("#name-1").text("Player 2");


    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");
  }

  
});