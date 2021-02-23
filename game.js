var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenColor = [];
var level = 0;
var started = false;


$(".btn").click(function() {
  var userClicked = $(this).attr("id");
  userChosenColor.push(userClicked);
  playSound(userClicked);
  animatePress(userClicked);
  checkAnswer(userClicked);
})



$("body").keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})


function nextSequence() {
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if (gamePattern[gamePattern.length - 1] === userChosenColor[userChosenColor.length - 1]) {
    setTimeout(function() {
      nextSequence();
    }, 1000)
    userChosenColor = [];
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)

    $("h1").text("Game Over, Press Any Key to Restart");

    restartGame();
  }
}

function restartGame() {
  gamePattern = [];
  userChosenColor = [];
  level = 0;
  started = false;
}
