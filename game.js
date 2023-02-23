
var buttonColors=["red", "blue", "green", "yellow"];

var userClickedPattern=[];

var gamePattern=[];

var started=false;

var level=0;

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }


  
});

function nextSequence(){
  userClickedPattern=[];
  level++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level "+level);

};

$(".btn").click(function() {
  
  var userChosenColor=$(this).attr("id");

  userClickedPattern.push(userChosenColor);
  
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColor){

  var activeButton = ("#" + currentColor);

  $(activeButton).addClass("pressed");

  setTimeout(function() {
    $(activeButton).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

     
      if (userClickedPattern.length === gamePattern.length){

     
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var wrong_audio = new Audio("sounds/wrong.mp3");
      wrong_audio.play();
      $("body").addClass("game-over");

      setTimeout(function() {
      $("body").removeClass("game-over");
  }, 100);
      startover();
    }

}

function startover() {
  level=0;
  started=false;
  gamePattern=[];
  $("#level-title").text("Game Over. Press any key to start again!");
}