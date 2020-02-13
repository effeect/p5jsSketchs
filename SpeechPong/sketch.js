/* 
    A silly take on Pong
    
*/

var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 10;

let speechRecNumber = 200;

let foo = new p5.SpeechRec('en-US', parseResult); // speech recognition object (will prompt for mic access)
foo.continuous = true;
foo.interimResults = true;

function setup() {
  createCanvas(800, 400);
  //frameRate(6);

  paddleA = createSprite(30, height/2, 10, 100);
  paddleA.immovable = true;

  paddleB = createSprite(width-28, height/2, 10, 100);
  paddleB.immovable = true;

  wallTop = createSprite(width/2, -30/2, width, 30);
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height+30/2, width, 30);
  wallBottom.immovable = true;

  ball = createSprite(width/2, height/2, 10, 10);
  ball.maxSpeed = MAX_SPEED;

  paddleA.shapeColor = paddleB.shapeColor =ball.shapeColor = color(255, 255, 255);

  ball.setSpeed(MAX_SPEED, -180);
    
  foo.start()
}

function draw() {
  background(128,76,200);
  if(foo.resultString == "up")
      {
          speechRecNumber--
          console.log("Going Up")
      }
  if(foo.resultString == "down")
      {
          speechRecNumber++
          console.log("Going Down")
      }
  if(foo.resultString == "stop") //Stops moving the paddle
      {
          speechRecNumber = speechRecNumber
          console.log("Stopping")
      }
    else {
        speechRecNumber = speechRecNumber
//        console.log("Word not compatiable")
    }
    
    
  paddleA.position.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);
  paddleB.position.y = constrain(speechRecNumber, paddleA.height/2, height-paddleA.height/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);

  var swing;
    
  if(ball.bounce(paddleA)) {
    swing = (ball.position.y-paddleA.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }

  if(ball.bounce(paddleB)) {
    swing = (ball.position.y-paddleB.position.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }

  if(ball.position.x<0) {
    ball.position.x = width/2;
    ball.position.y = height/2;
    ball.setSpeed(MAX_SPEED, 0);
  }

  if(ball.position.x>width) {
    ball.position.x = width/2;
    ball.position.y = height/2;
    ball.setSpeed(MAX_SPEED, 180);
  }

  drawSprites();

}
 
//Function taken from https://github.com/IDMNYU/p5.js-speech/blob/master/examples/05continuousrecognition.html
function parseResult()
	{
		// recognition system will often append words into phrases.
		// so hack here is to only use the last word:
		var mostrecentword = foo.resultString.split(' ').pop();
		if(mostrecentword.indexOf("left")!==-1) { dx=-1;dy=0; }
		else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
		else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
		else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
		else if(mostrecentword.indexOf("clear")!==-1) { background(255); }
		console.log(mostrecentword);
	}
