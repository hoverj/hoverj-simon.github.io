const buttonColors = ["red", "blue","green","yellow"];
let randomChosenColor = "";
let gamePattern = [];
let userClickedPattern = [];
let userChosenColor = "";
let level = 0;
let gameHasStarted = false;
let gameEnded = false;

//make the entire document clickable to be able to start the game
$(document).keypress(function(event){
  if((event.key === "a" && !gameHasStarted) || (gameEnded && event)){
    gameHasStarted = true;
    gameEnded = false;
    $("h1").text("Level 0");
    nextSequence();
  }
});

//make the buttons clickable and define their behavior
$(".btn").click(function(){
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //send the most recent click to be checked
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      console.log("success");

      //check to see if the user has completed all the clicks for the current level
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }

  }else{
      gameOver(currentLevel);
  }
}//end of check answer

function gameOver(currentLevel) {
  gameHasStarted = false;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over")}, 200);

  $("h1").text("Game over, Press Any Key to Restart");
  //show the user which button was missed by flashing it
  buttonFlash(gamePattern[currentLevel]);
  buttonFlash(gamePattern[currentLevel]);
  buttonFlash(gamePattern[currentLevel]);

  //reset the game Pattern
  gamePattern = [];
  level = 0;
  gameEnded = true
}


//make the buttons flash gray for 0.1 seconds
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed")}, 100);
}

//generate a random next value in the sequence
function nextSequence(){
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);

  //increase the level counter and change title to reflect it
  level++
  $("h1").text("Level " + level);

  //show the random button chosen to the user
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonFlash(randomChosenColor);
  playSound(randomChosenColor);
  return randomNumber;
}

function buttonFlash(color){
  $("#" + color).fadeOut(100).fadeIn(100);
}

//button make cool noise
function playSound(color){
  if(color === "red"){
    const redSound = new Audio("sounds/red.mp3");
    redSound.play();

  }else if(color === "blue"){
    const blueSound = new Audio("sounds/blue.mp3");
    blueSound.play();

  }else if(color === "green"){
    const greenSound = new Audio("sounds/green.mp3");
    greenSound.play();

  }else if(color === "yellow"){
    const yellowSound = new Audio("sounds/yellow.mp3");
    yellowSound.play();

  }else if("wrong"){
      const wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
  }else{
    console.log("Uh-oh. Something went wrong in play sound");
  }

}
