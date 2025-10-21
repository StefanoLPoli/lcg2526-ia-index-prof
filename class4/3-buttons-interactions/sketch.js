//variables for canva
let xMax = 400;
let yMax = 600;
//variables for rocket initial position
let xRocket = xMax/2;
let yRocket = yMax*0.6;
let rocketHeight = 180;
let rocketWidth = 80;
//other global variables
let table;
let star_img;

//learn to interact with DOM
let buttonText;
let buttonRolling;
let greeting;
let inpuText;
let bckgcolor = "#C0E1FC"
let sliderColor;
let rocketBodyColor = 220;


let colors = [ "red", "green", "pink", "blue", 
  "orange", "yellow" , "#C0E1FC", 220];

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  greeting = createElement('h2', 'What do you want to display?');
  greeting.style('color', 'deeppink');
  greeting.position(20, yMax - 50);

  // min, max, default, step
  sliderColor = createSlider(0, 7, 7, 1);
  sliderColor.position(20, yMax);
  sliderColor.size(100);

  inpuText = createInput();
  inpuText.position(20, yMax -  65);

  buttonText = createButton('submit');
  buttonText.position(inpuText.x + inpuText.width,yMax - 65);
  buttonText.mousePressed(newTextFunc);


  //bottone del colore
  buttonRolling = createButton("roll the color!");
  buttonRolling.position(20, yMax - 100);
  buttonRolling.mousePressed(rollColor);
  buttonRolling.style('background-color', '#ffffff');
  // Hover effect using mouse events
  buttonRolling.mouseOver(() => {
    buttonRolling.style('background-color', '#cccccc'); // hover color
  });
  buttonRolling.mouseOut(() => {
    buttonRolling.style('background-color', '#ffffff'); // normal color
  });
  buttonRolling.style('transition', 'background-color 0.1s');

}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

// Function to draw a rocket at position (x, y) with scale s
function drawRocket(x, y, scl=1, angle=0) {
  push();               // save current drawing settings
  translate(x, y);      // move origin to rocket position
  scale(scl);             // scale rocket size if needed
  rotate(angle);          // rotate rocket if needed
  // rocket body
  fill(rocketBodyColor);            // light gray
  stroke(40);           // dark outline
  strokeWeight(2);
  rectMode(CENTER);     // rectangle drawn from its center
  rect(0, 30, rocketWidth, rocketHeight, 20); // body rectangle with rounded corners

  // nose cone
  fill(200, 40, 40);    // red
  triangle(-40, -60, 40, -60, 0, -120); // triangle on top

  // window (circle)
  fill(40, 150, 220);   // blue glass
  stroke(255);          // white border
  strokeWeight(3);
  ellipse(0, 20, 48, 48); // window circle

  // fins on the left and right
  stroke(40);
  strokeWeight(2);
  fill(180, 30, 30);    // dark red
  triangle(-40, 90, -80, 130, -20, 90); // left fin
  triangle(40, 90, 80, 130, 20, 90);    // right fin

  pop(); // restore settings (so it won’t affect other drawings)
}

function moveRocket(y, step=1) {
  y = y - step;
  let soglia = -(yMax * 0.6);
  if (y < soglia) {
    y = yMax;
  }
  return y;
}

function draw() {
  background(bckgcolor);
  rocketBodyColor = colors[ceil(sliderColor.value())];
  fill(0); //nero
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);

  text("Color value "+ bckgcolor, 20, 70);

  drawStarsFromFile();
  drawRocket(xRocket, yRocket, 0.75, 0); 

  xRocket = (xRocket +1) % xMax;
  yRocket = moveRocket(yRocket); 
  let isover=false;
  if(isMouseOverRocket() ){
      isover=true
  } else{
    isover=false;
  }
  text("Is over the rocket? "+ isover, 20, 100);

}


  function isMouseOverRocket() { 
  return (mouseX > xRocket-(rocketWidth/2) &&
          mouseX < xRocket + (rocketWidth/2) &&
          mouseY > yRocket-(rocketHeight/2) &&
          mouseY < yRocket + yRocket+(rocketHeight/2));

}

function mousePressed() {
    // Start/stop the animation loop
    if (isLooping()) { //https://p5js.org/reference/p5/isLooping/
      noLoop(); //https://p5js.org/reference/p5/noLoop/
    } else {
      loop(); //https://p5js.org/reference/p5/loop/
    }
}


function keyPressed() { //https://p5js.org/reference/p5/keyPressed/
  // Draw one frame
  redraw(); //https://p5js.org/reference/p5/redraw/
}

function rollColor(){
  let  idx = random(0,7);
  //vogliamo solo numeri interi
  //intero inferiore, 1.1 --> 1
  // bckgcolor = floor(idx);
  //intero superiore, 1.1 --> 2
  //un numero intero 
  //tra 1 e 7
  //indice per accedere all'array
  bckgcolor = colors[ceil(idx)];
  //redraw();
}


function newTextFunc(){
  let text = inpuText.value();
  greeting.html("The text now is " + text);
}