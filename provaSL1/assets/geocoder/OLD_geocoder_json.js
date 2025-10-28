import fs from 'fs';
import csv from 'csv-parser';
import fetch from 'node-fetch';

// CONFIGURAZIONE VELOCE
const CONCURRENT_REQUESTS = 3;
const DELAY_BETWEEN_BATCHES = 300;

async function getCoordinates(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
      { headers: { 'User-Agent': 'MyGeocoderApp/1.0' } }
    );
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    return data.length > 0 ? {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      found: true
    } : { found: false };
    
  } catch (error) {
    console.log(`❌ Errore per "${location}": ${error.message}`);
    return { found: false, error: error.message };
  }
}

async function processInBatches(locations) {
  const results = {};
  let processed = 0;
  const total = locations.length;

  for (let i = 0; i < locations.length; i += CONCURRENT_REQUESTS) {
    const batch = locations.slice(i, i + CONCURRENT_REQUESTS);
    
    const batchPromises = batch.map(location => getCoordinates(location));
    const batchResults = await Promise.all(batchPromises);
    
    batch.forEach((location, index) => {
      results[location] = batchResults[index];
      processed++;
    });

    const percent = ((processed / total) * 100).toFixed(1);
    console.log(`📊 ${processed}/${total} (${percent}%) - Ultimo batch: ${batch.join(', ')}`);
    
    if (processed % 50 === 0) {
      fs.writeFileSync('coordinates_backup.json', JSON.stringify(results, null, 2));
      console.log('💾 Backup salvato!');
    }
    
    if (i + CONCURRENT_REQUESTS < locations.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  return results;
}

async function main() {
  console.log('🚀 INIZIO GEOCODING...');
  
  const locations = [];
  
  // LEGGE IL CSV - QUESTA PARTE MANCAVA!
  await new Promise((resolve, reject) => {
    fs.createReadStream('input.csv')
      .pipe(csv())
      .on('data', (row) => {
        const location = row.Location;
        if (location && !locations.includes(location)) {
          locations.push(location);
        }
      })
      .on('end', () => {
        console.log(`📍 CSV letto: ${locations.length} location uniche`);
        resolve();
      })
      .on('error', reject);
  });
  
  const coordinates = await processInBatches(locations);
  
  const found = Object.values(coordinates).filter(c => c.found).length;
  console.log(`\n✅ COMPLETATO!`);
  console.log(`📈 Coordinate trovate: ${found}/${locations.length}`);
  
  fs.writeFileSync('coordinates_final.json', JSON.stringify(coordinates, null, 2));
  console.log('💾 File coordinates_final.json salvato!');
}

main();