const questions = [
    "Would you rather never read another book or never hear another song?",
    "Would you rather control the emotions of those around you or control the weather?",
    "Would you rather be unattractive but super funny or beautiful but quite boring?",
    "Would you rather live in a world without music or a world without movies?",
    "Would you rather go into the past and meet your ancestors or go into the future and meet your great-great-grandchildren?",
];

const choices = [
    { right: "never read another book", left: "never hear another song" },
    { right: "control the emotions of those around you", left: "control the weather" },
    { right: "unattractive but super funny", left: "beautiful but quite boring" },
    { right: "world without music", left: "world without movies" },
    { right: "go into the past and meet your ancestors", left: "go into the future and meet your great-great-grandchildren" },
];

let currentQuestionIndex = 0;

function displayQuestion(index) {
    const question = questions[index];
    const choice = choices[index];

    // Toon de vraag
    document.getElementById('question').innerText = question;

    // Bewaar de keuzes
    document.getElementById('leftChoice').innerText = choice.left;
    document.getElementById('rightChoice').innerText = choice.right;

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
    const currentChoice = choices[currentQuestionIndex].left;
    document.getElementById('answer').innerText = currentChoice;
    // Toon het antwoord en de "Ga Verder" knop, en verberg de keuze knoppen
    document.getElementById('answer').style.display = 'block';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('choices').style.display = 'none';
}

function chooseRight() {
    const currentChoice = choices[currentQuestionIndex].right;
    document.getElementById('answer').innerText = currentChoice;
    // Toon het antwoord en de "Ga Verder" knop, en verberg de keuze knoppen
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
        // Toon resultaat op basis van de keuzes van de gebruiker
    }
}

// Start het spel door de eerste vraag weer te geven
displayQuestion(0);
