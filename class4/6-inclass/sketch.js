let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;

let arrayStars=[];

function isStarSizeValid(value){
  //se il valore è ok restituiamo un booleano
  return value > 0;
}

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);

  //filtriamo i dati
  for(let i = 0; i<table.getRowCount(); i++){
    let starSize = table.getNum(i,"starSize");
    if (isStarSizeValid(starSize))
    {
      arrayStars.push(starSize);
    }
  }
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + nf(mouseX,1,0) + "\
     mouseY: " + nf(mouseY,1,0),20,20);

  //disegno stella più grande e più piccola
  image(star_img, 50, 50, min(arrayStars), min(arrayStars));
  image(star_img, 100, 100, max(arrayStars), max(arrayStars));


  //drawStarsFromFile();
}
