//Specials thanks to https://editor.p5js.org/ellacyt/sketches/B1lmPZgoZ

//Built with P5.js

let trigger = false;
let trigger2 = false;

let y = 0;
let speed=1;
let gravity=0.2;
let x = 0;
let speedX=1;


//Preloading Function
function preload()
{
    //Default Images
    imgError = loadImage('errorTest.png');
    imgBack = loadImage('download.jpg')
}

//The setup function only runs at startup
function setup()
{
    //File Input
    
    //Input 1 - Background 
    input = createFileInput(handleFileError);
    input.position(100, 5);
    
    //Input 2 - Object
    input2 = createFileInput(handleFileBackground);
    input2.position(400, 5);
    
    
    createCanvas(innerWidth,innerHeight);
    image(imgBack,0,0);
    //Sets Framerate, default to 30
    frameRate(30);
    
}

//The draw function runs at the desired framerate (60FPS)
function draw()
{
    //if true, it will call the background, if false, the background will not update
    if(trigger){
            //Displays an image
            image(imgBack,0,0);
        }
    
       
    
    if(trigger2){
        image(imgError,x,y);
    }
    else{
      image(imgError,mouseX,mouseY);

    }
    
    
    
  y=y+speed;
  speed=speed + gravity;
    
  x=x+speedX;
  speedX=speedX + gravity

  
  if(y>innerHeight || y < 0){
  //reverse the speed
    speed= -1 * speed;
  }
  if(x>innerWidth || x < 0){
  //reverse the speed
    speedX= -1 * speedX;
  }
    

    //HUD RELATED ITEMS
    rect(0,0,innerWidth,30)
    text("Click to trigger object duplication, Press X to toggle Gravity Mode",600,20);
    text("Object : ",55,20);
    text("Background : ",325,20)


}

function mousePressed()
{
    trigger = !trigger;
}

function keyPressed()
{
    if(keyCode == '88')
        {
            trigger2 = !trigger2;
            x = mouseX;
            y = mouseY;
        }

}

//Taken from https://p5js.org/reference/#/p5/createFileInput
function handleFileError(file) {
  print(file);
  if (file.type === 'image') {
    imgError = createImg(file.data, '');
    } 
    else 
    {
    img = null;
    }
}

function handleFileBackground(file) {
  print(file);
  if (file.type === 'image') {
    imgBack = createImg(file.data, '');
    } 
    else 
    {
    img = null;
    }
}