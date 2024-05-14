const map = L.map('map').setView([0, 0], 2); // World view

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// locaties zeven moderne wereldwonderen + vragen
const sevenWonders = [
  { name: "Chichén Itzá", coords: [20.6830, -88.5686], question: "Welke oude Maya-stad staat bekend om zijn piramide, El Castillo, waarvan de trappen fungeren als een kalender met 365 treden?", answer: "Chichén Itzá" }, // Mexico
  { name: "Christus de Verlosser", coords: [-22.9519, -43.2105], question: "Op welke berg staat het iconische Jezusbeeld dat uitkijkt over Rio de Janeiro?", answer: "Corcovadoberg" }, //Brazilië
  { name: "Het Colosseum", coords: [41.8902, 12.4922], question: "Hoe heet het beroemde amfitheater in Rome dat ooit werd gebruikt voor gladiatorengevechten?", answer: "Colosseum" },
  { name: "De Chinese Muur", coords: [40.4319, 116.5704], question: "Welke oude nomadische stam vormde een van de belangrijkste bedreigingen voor China en leidde tot de bouw van de Grote Muur?", answer: "Hunnen" },
  { name: "Petra", coords: [30.3285, 35.4427], question: "Petra was ooit de hoofdstad van welk koninkrijk en staat bekend om zijn prachtige rotsarchitectuur?", answer: "Nabateese koninkrijk" }, //Jordanië
  { name: "Machu Picchu", coords: [-13.1631, -72.5450], question: "Hoe heet deze oude Inca-stad, hoog in de Andes en omringd door spectaculaire bergen?", answer: "Machu Picchu" }, // Peru
  { name: "Taj Mahal", coords: [27.1751, 78.0421], question: "In welk land bevindt zich de Taj Mahal?", answer: "India" }
];

// Definieer variabelen voor het bijhouden van de score en bezochte wonderen
let correctAnswers = 0; // Aantal correct beantwoorde vragen
let visitedWonders = new Set(); // Set om bezochte wonderen bij te houden

// Voeg markers toe voor elk wereldwonder
sevenWonders.forEach(wonder => {
  L.marker(wonder.coords).addTo(map)
    .bindPopup(`<b>${wonder.name}</b><br>Vind het antwoord op deze vraag: ${wonder.question}`);
});

// Controleer bij locatieverandering
map.on('locationfound', onLocationFound);
map.locate({ setView: true, maxZoom: 16, watch: true });

function onLocationFound(e) {
  const userLat = e.latitude;
  const userLon = e.longitude;

  // Controleer afstand tot elk wereldwonder
  sevenWonders.forEach(wonder => {
    const distance = calculateDistance(userLat, userLon, wonder.coords[0], wonder.coords[1]);
    if (distance < 0.1) { // Binnen 100 meter
      if (!visitedWonders.has(wonder.name)) { // Controleer of het wonder al is bezocht
        visitedWonders.add(wonder.name); // Voeg bezocht wonder toe aan de set
        askQuestion(wonder); // Stel vraag over het wonder
      }
      if (visitedWonders.size === 7) { // Controleer of alle wonderen zijn bezocht
        congratulatePlayer();
      }
    }
  });
}

// Functie om vraag te stellen aan de gebruiker
function askQuestion(wonder) {
  const userAnswer = prompt(wonder.question);
  if (userAnswer) {
    // Controleer of het antwoord van de gebruiker correct is
    if (userAnswer.toLowerCase() === wonder.answer.toLowerCase()) {
      correctAnswers++; // Verhoog het aantal correct beantwoorde vragen
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  }
}

// Functie om de speler te feliciteren met het verkennen van alle wonderen
function congratulatePlayer() {
  alert(`Proficiat! Je hebt alle zeven moderne wereldwonderen verkend!\nScore: ${correctAnswers}/7 voor de vragen.`);
}

// Functie om afstand tussen twee punten te berekenen
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Straal van de aarde in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Afstand in km
  return d;
}
