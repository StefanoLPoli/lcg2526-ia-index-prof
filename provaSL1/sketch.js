let originalDataset;
let hexagons = [];

let minLat = -90;
let maxLat = 90;
let minLng = -180;
let maxLng = 180;

let isoColorMap = {
  "AFG": [45, 203, 167],
  "AGO": [189, 72, 201],
  "AIA": [107, 85, 238],
  "ALB": [213, 78, 56],
  "ARE": [76, 223, 239],
  "ARG": [158, 58, 57],
  "ARM": [234, 145, 89],
  "ASM": [167, 92, 215],
  "ATG": [89, 192, 123],
  "AUS": [201, 107, 178],
  "AUT": [67, 156, 223],
  "AZE": [145, 203, 78],
  "AZO": [223, 156, 67],
  "BDI": [178, 201, 107],
  "BEL": [123, 89, 192],
  "BEN": [56, 213, 78],
  "BFA": [238, 107, 85],
  "BGD": [203, 167, 45],
  "BGR": [192, 123, 89],
  "BHS": [85, 238, 107],
  "BIH": [78, 213, 56],
  "BLM": [156, 67, 223],
  "BLR": [92, 215, 167],
  "BLZ": [145, 89, 234],
  "BMU": [203, 45, 167],
  "BOL": [223, 67, 156],
  "BRA": [107, 178, 201],
  "BRB": [89, 234, 145],
  "BTN": [215, 167, 92],
  "BWA": [67, 223, 156],
  "CAF": [201, 178, 107],
  "CAN": [123, 192, 89],
  "CHE": [213, 56, 78],
  "CHL": [238, 85, 107],
  "CHN": [167, 45, 203],
  "CIV": [156, 223, 67],
  "CMR": [92, 167, 215],
  "COD": [234, 89, 145],
  "COG": [78, 56, 213],
  "COK": [107, 238, 85],
  "COL": [45, 203, 167],
  "COM": [201, 189, 72],
  "CPV": [223, 76, 239],
  "CRI": [158, 57, 58],
  "CUB": [89, 145, 234],
  "CYM": [215, 92, 167],
  "CYP": [67, 156, 223],
  "CZE": [178, 107, 201],
  "DEU": [123, 89, 192],
  "DJI": [56, 213, 78],
  "DMA": [238, 107, 85],
  "DNK": [203, 167, 45],
  "DOM": [192, 123, 89],
  "DZA": [85, 238, 107],
  "ECU": [78, 213, 56],
  "EGY": [156, 67, 223],
  "ERI": [92, 215, 167],
  "ESP": [145, 255, 234],
  "EST": [203, 45, 167],
  "ETH": [223, 67, 156],
  "FIN": [107, 178, 201],
  "FJI": [89, 234, 145],
  "FRA": [215, 167, 92],
  "FSM": [67, 223, 156],
  "GAB": [201, 178, 107],
  "GBR": [123, 192, 89],
  "GEO": [213, 56, 78],
  "GHA": [238, 85, 107],
  "GIN": [167, 45, 203],
  "GLP": [156, 223, 67],
  "GMB": [92, 167, 215],
  "GNB": [234, 89, 145],
  "GNQ": [78, 56, 213],
  "GRC": [107, 238, 85],
  "GRD": [45, 203, 167],
  "GTM": [201, 189, 72],
  "GUF": [223, 76, 239],
  "GUM": [158, 57, 58],
  "GUY": [89, 145, 234],
  "HKG": [215, 92, 167],
  "HND": [67, 156, 223],
  "HRV": [178, 107, 201],
  "HTI": [123, 89, 192],
  "HUN": [56, 213, 78],
  "IDN": [200, 50, 1],
  "IND": [1, 167, 45],
  "IRL": [192, 123, 89],
  "IRN": [85, 238, 107],
  "IRQ": [78, 213, 56],
  "ISL": [156, 67, 223],
  "ISR": [92, 215, 167],
  "ITA": [145, 89, 234],
  "JAM": [203, 45, 167],
  "JOR": [223, 67, 156],
  "JPN": [107, 178, 201],
  "KAZ": [89, 234, 145],
  "KEN": [215, 167, 92],
  "KGZ": [67, 223, 156],
  "KHM": [201, 178, 107],
  "KIR": [123, 192, 89],
  "KNA": [213, 56, 78],
  "KOR": [238, 85, 107],
  "KWT": [167, 45, 203],
  "LAO": [156, 223, 67],
  "LBN": [92, 167, 215],
  "LBR": [234, 89, 145],
  "LBY": [78, 56, 213],
  "LCA": [107, 238, 85],
  "LIE": [45, 203, 167],
  "LKA": [201, 189, 72],
  "LSO": [223, 76, 239],
  "LTU": [158, 57, 58],
  "LUX": [89, 145, 234],
  "LVA": [215, 92, 167],
  "MAC": [67, 156, 223],
  "MAF": [178, 107, 201],
  "MAR": [123, 89, 192],
  "MDA": [56, 213, 78],
  "MDG": [238, 107, 85],
  "MDV": [203, 167, 45],
  "MEX": [192, 123, 89],
  "MHL": [85, 238, 107],
  "MKD": [78, 213, 56],
  "MLI": [156, 67, 223],
  "MLT": [92, 215, 167],
  "MMR": [145, 89, 234],
  "MNE": [203, 45, 167],
  "MNG": [223, 67, 156],
  "MNP": [107, 178, 201],
  "MOZ": [89, 234, 145],
  "MRT": [215, 167, 92],
  "MSR": [67, 223, 156],
  "MTQ": [201, 178, 107],
  "MUS": [123, 192, 89],
  "MWI": [213, 56, 78],
  "MYS": [238, 85, 107],
  "MYT": [167, 45, 203],
  "NAM": [156, 223, 67],
  "NCL": [92, 167, 215],
  "NER": [234, 89, 145],
  "NGA": [78, 56, 213],
  "NIC": [107, 238, 85],
  "NIU": [45, 203, 167],
  "NLD": [201, 189, 72],
  "NOR": [223, 76, 239],
  "NPL": [158, 57, 58],
  "NZL": [89, 145, 234],
  "OMN": [215, 92, 167],
  "PAK": [67, 156, 223],
  "PAN": [178, 107, 201],
  "PER": [123, 89, 192],
  "PHL": [56, 213, 78],
  "PLW": [238, 107, 85],
  "PNG": [203, 167, 45],
  "POL": [192, 123, 89],
  "PRI": [85, 238, 107],
  "PRK": [78, 213, 56],
  "PRT": [156, 67, 223],
  "PRY": [92, 215, 167],
  "PSE": [145, 89, 234],
  "PYF": [203, 45, 167],
  "QAT": [223, 67, 156],
  "REU": [107, 178, 201],
  "ROU": [89, 234, 145],
  "RUS": [215, 167, 92],
  "RWA": [67, 223, 156],
  "SAU": [201, 178, 107],
  "SCG": [123, 192, 89],
  "SDN": [213, 56, 78],
  "SEN": [238, 85, 107],
  "SGP": [167, 45, 203],
  "SHN": [156, 223, 67],
  "SLB": [92, 167, 215],
  "SLE": [234, 89, 145],
  "SLV": [78, 56, 213],
  "SOM": [107, 238, 85],
  "SPI": [45, 203, 167],
  "SRB": [201, 189, 72],
  "SSD": [223, 76, 239],
  "STP": [158, 57, 58],
  "SUR": [89, 145, 234],
  "SVK": [215, 92, 167],
  "SVN": [67, 156, 223],
  "SWE": [178, 107, 201],
  "SWZ": [123, 89, 192],
  "SXM": [56, 213, 78],
  "SYC": [238, 107, 85],
  "SYR": [203, 167, 45],
  "TCA": [192, 123, 89],
  "TCD": [85, 238, 107],
  "TGO": [78, 213, 56],
  "THA": [156, 67, 223],
  "TJK": [92, 215, 167],
  "TKL": [145, 89, 234],
  "TKM": [203, 45, 167],
  "TLS": [223, 67, 156],
  "TON": [107, 178, 201],
  "TTO": [89, 234, 145],
  "TUN": [215, 167, 92],
  "TUR": [67, 223, 156],
  "TUV": [201, 178, 107],
  "TWN": [123, 192, 89],
  "TZA": [213, 56, 78],
  "UGA": [238, 85, 107],
  "UKR": [167, 45, 203],
  "URY": [156, 223, 67],
  "USA": [89, 145, 234],
  "UZB": [215, 92, 167],
  "VCT": [67, 156, 223],
  "VEN": [178, 107, 201],
  "VGB": [123, 89, 192],
  "VIR": [56, 213, 78],
  "VNM": [238, 107, 85],
  "VUT": [203, 167, 45],
  "WLF": [192, 123, 89],
  "WSM": [85, 238, 107],
  "YEM": [78, 213, 56],
  "ZAF": [156, 67, 223],
  "ZMB": [92, 215, 167],
  "ZWE": [145, 89, 234]
};

let coordinates = {};

function preload() {
  originalDataset = loadTable("assets/datasets/disastriNaturali2.CSV", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  let validCount = 0;
  let invalidCount = 0;
  let countriesWithCoords = new Set();

  console.log("=== ANALISI DATASET ===");
  console.log("Righe totali:", originalDataset.getRowCount());
  console.log("Colonne:", originalDataset.columns);

  for (let i = 0; i < originalDataset.getRowCount(); i++) {
    let latStr = originalDataset.getString(i, "LatitudeCalcolata");
    let lngStr = originalDataset.getString(i, "LongitudeCalcolata");
    let isoCode = originalDataset.getString(i, "ISO");
    let location = originalDataset.getString(i, "Location"); // Aggiungi questo

    // DEBUG DETTAGLIATO
    if (i < 10) { // Mostra solo prime 10 righe per debug
      console.log(`Riga ${i}:`, {
        ISO: isoCode,
        Location: location,
        Lat: latStr,
        Lng: lngStr,
        LatValid: !isNaN(parseFloat(latStr)),
        LngValid: !isNaN(parseFloat(lngStr))
      });
    }

    let lat = parseFloat(latStr);
    let lng = parseFloat(lngStr);

    if (!isNaN(lat) && !isNaN(lng)) {
      validCount++;
      countriesWithCoords.add(isoCode);
      
      let x = map(lng, minLng, maxLng, 50, width - 50);
      let y = map(lat, maxLat, minLat, 25, height - 25);
      let fillColor = getColorForISO(isoCode);

      hexagons.push({
        x: x,
        y: y,
        radius: 5,
        color: fillColor,
        iso: isoCode
      });
    } else {
      invalidCount++;
    }    
  }

  console.log("=== RISULTATI ===");
  console.log("Coordinate valide:", validCount);
  console.log("Coordinate non valide:", invalidCount);
  console.log("Paesi con coordinate:", Array.from(countriesWithCoords));
  console.log("Esagoni creati:", hexagons.length);
}

function draw() {
  background(50);


  // Disegna tutti gli esagoni
  drawAllHexagons();
}

function drawAllHexagons() {
  let hoveredISO = null;

  // Trova se il mouse è sopra un esagono
  for (let hex of hexagons) {
    let d = dist(mouseX, mouseY, hex.x, hex.y);
    if (d < hex.radius * 1.5) {
      hoveredISO = hex.iso;
      break;
    }
  }
  
  for (let hex of hexagons) {
    let r = hex.radius;
    if (hex.iso === hoveredISO) {
      r *= 1.5;
    }
    noStroke();
    fill(hex.color);
    circle(hex.x, hex.y, r/2);
    drawHexagon(hex.x, hex.y, r, hex.color);
  }

  // Mostra tooltip
  if (hoveredISO) {
    showTooltip(mouseX, mouseY, hoveredISO);
  }
}

function drawHexagon(x, y, radius, fillColor) {
  push();
  fill(fillColor);
  stroke(0);
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let vx = x + cos(angle) * radius;
    let vy = y + sin(angle) * radius;
    vertex(vx, vy);
  }
  endShape(CLOSE);
  pop();
}

function showTooltip(x, y, isoCode) {
  push();
  fill(255);
  stroke(0);
  rect(x + 10, y + 10, 80, 25, 5);
  fill(0);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text(isoCode, x + 15, y + 22);
  pop();
}

function getColorForISO(isoCode) {
  if (isoColorMap[isoCode]) {
    let c = isoColorMap[isoCode];
    return color(c[0], c[1], c[2]);
  } else {
    return color(random(100, 255), random(100, 255), random(100, 255));
  }
}
