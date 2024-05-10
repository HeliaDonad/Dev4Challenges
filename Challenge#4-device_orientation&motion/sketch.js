const questions = [
    "Would you rather read or do sports?",
    "Would you rather have invisibility or flight?",
    "Would you rather live in the mountains or at the beach?",
    "Would you rather prefer winter or summer?",
    "Would you rather play video games or go to the gym?",
    "Would you rather eat something salty or sweet?",
    "Would you rather watch a horror movie or a romantic movie?",
    "Would you rather study scientific subjects or humanistic subjects?",
    "Would you rather eat sushi or pizza?",
    "Would you rather have a elegant style or an sporty style?",
];

const choices = [
    { left: "images/read.jpg", right: "images/sport.jpg" },
    { left: "images/invisibility.svg", right: "images/flight.svg" },
    { left: "images/mountain.svg", right: "images/beach.svg" },
    { left: "images/winter.svg", right: "images/summer.svg" },
    { left: "images/videogames.svg", right: "images/gym.svg" },
    { left: "images/salty.svg", right: "images/sweet.svg" },
    { left: "images/horrormovie.svg", right: "images/romanticmovie.svg" },
    { left: "images/scientific.svg", right: "images/humanistic.svg" },
    { left: "images/sushi.svg", right: "images/pizza.svg" },
    { left: "images/elegantstyle.svg", right: "images/sportystyle.svg" },
];

let currentQuestionIndex = 0;
let rightCount = 0;
let leftCount = 0;

function displayQuestion(index) {
    const question = questions[index];
    const choice = choices[index];

    // Toon de vraag
    document.getElementById('question').innerText = question;

    // Stel de bronnen van de afbeeldingen in
    document.getElementById('leftChoice').src = choice.left;
    document.getElementById('rightChoice').src = choice.right;

    // Toon de keuze knoppen en verberg de "Ga Verder" knop en het antwoord
    document.getElementById('choices').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('answer').style.display = 'none';
}

// Detecteer bewegingen van het apparaat en neem keuzes op basis van de beweging
window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    const gamma = event.gamma;

    if (gamma > 15) {
        // Beweging naar rechts
        chooseRight();
    } else if (gamma < -15) {
        // Beweging naar links
        chooseLeft();
    }
}

function chooseLeft() {
    leftCount++;
    const currentChoice = "Left";
    document.getElementById('answer').innerText = currentChoice;
    // Antwoord en de "Ga Verder" knop tonen, keuze knoppen verbergen
    document.getElementById('answer').style.display = 'block';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('choices').style.display = 'none';
}

function chooseRight() {
    rightCount++;
    const currentChoice = "Right";
    document.getElementById('answer').innerText = currentChoice;
    // Antwoord en de "Ga Verder" knop tonen, keuze knoppen verbergen
    document.getElementById('answer').style.display = 'block';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('choices').style.display = 'none';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        // Alle vragen zijn beantwoord
        document.getElementById('questionContainer').style.display = 'none';
        document.getElementById('resultContainer').style.display = 'block';
        // Resultaat op basis van de keuzes van de gebruiker
        displayResult();
    }
}

function displayResult() {
    let result;
    if (rightCount > leftCount) {
        result = "golden retriever";
    } else if (leftCount > rightCount) {
        result = "black cat";
    } else {
        result = "gelijkspel";
    }
    document.getElementById('result').innerText = result;
}

// Start het spel door de eerste vraag weer te geven
displayQuestion(0);
