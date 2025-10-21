//variabili globali
let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = [];

function isStarSizeValid(value){
  //se il dato ingresso è corretto o meno
  //restituire un booleano
  return value > 0;
}

//caricare asset prima che la pagina web venga caricata
function preload() {
  table = loadTable("../assets/datasets/stars.csv", "csv", "header");
  star_img = loadImage("../assets/img/star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  //filtrare i dati
  //tramite isStarSizeValid
  //applichiamo la funzione di filtro
  
  //scorriamo i valori con un ciclo
  //e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    }
  }

  angleMode(DEGREES);
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
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  
  //disegnare la stella più piccola
  // e la stella più grossa
  //stars_valid
  //image(star_img, 50, 50, min(stars_valid), min(stars_valid));
  //image(star_img, 100, 100, max(stars_valid), max(stars_valid));

  //1 rappresentare le statistiche
  //1.a - quante stelle valide ci sono
  text("Stelle valide: " + stars_valid.length, 20, height/2+100);
  //1.b - valore medio della dimensione delle stelle
  let mediaDimensioni = 0;
  mediaDimensioni = meanOfArray(stars_valid);
  text("Media dimensioni: " + mediaDimensioni.toFixed(2), 20, height/2+120);
  //1.c - la variazione standard, quanto variano la dimensione
  
  
  //2 disegnare il grafico
  //disegnare gli assi
  //assegnare le etichette agli assi
  //rappresentare i dati
  drawStarsSizePlot(stars_valid);
}

//Funzione per calcolare la media di un array
function meanOfArray(arrayInput){
  let mediaArray = 0;

  for(let i=0; i<arrayInput.length; i++){
    mediaArray += arrayInput[i];
  }

  return mediaArray/arrayInput.length;
}

function drawStarsSizePlot(arrayStelle){
  //asse x e asse y
  //assegnare le etichette
  //disegnare qualcosa
  push();
  let xMinChart = 30;
  let yMaxChart = height/2;
  let xMaxChart = width-20;
  let yMinChart = 40;
  //asse x
  line(xMinChart, yMaxChart, xMaxChart, yMaxChart);
  //asse y
  line(xMinChart, yMaxChart, xMinChart, yMinChart);
  //assegnare l'etichetta all'asse y
  push();
  translate(xMinChart, yMinChart);
  rotate(-90);
  translate(-xMinChart*2, -yMinChart);
  text("Size", xMinChart, yMinChart);
  pop();

  //rappresentare le dimensioni della stella
  for(let i=0; i<arrayStelle.length; i++){
    //definire coordinate x e y delle stelle con il map
    let x = map(i, 0, arrayStelle.length, xMinChart+5, yMaxChart-5);
    let y = map(arrayStelle[i], min(arrayStelle), max(arrayStelle), yMaxChart+5, yMinChart-5);    
    image(star_img, x, y, arrayStelle[i], arrayStelle[i]);
  }

  pop();
}