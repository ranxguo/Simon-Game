var level = 1;
var start = false;

var userClickedPattern = [];
var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

function nextSequence() {
  //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").click(function(){
  if(start){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animationPress(userChosenColour);
    playSound(userChosenColour);

    //console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animationPress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


  $(document).keypress(function(){
    if(!start){
      nextSequence();
      start = true;
    }
  });


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success!");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
      //console.log("wrong!");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart!");

      setTimeout(function(){
        $("body").removeClass("game-over")
      }, 200);

      startOver();
  }
}

function startOver(){
  level = 1;
  gamePattern = [];
  start = false;
}










///
