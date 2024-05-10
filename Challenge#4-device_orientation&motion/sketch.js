const questions = [
    "Would you rather never read another book or never hear another song?",
    "Would you rather control the emotions of those around you or control the weather?",
    "Would you rather be unattractive but super funny or beautiful but quite boring?",
    "Would you rather live in a world without music or a world without movies?",
    "Would you rather go into the past and meet your ancestors or go into the future and meet your great-great-grandchildren?",
];

const choices = [
    { left: "never read another book", right: "never hear another song" },
    { left: "control the emotions of those around you", right: "control the weather" },
    { left: "unattractive but super funny", right: "beautiful but quite boring" },
    { left: "world without music", right: "world without movies" },
    { left: "go into the past and meet your ancestors", right: "go into the future and meet your great-great-grandchildren" },
];

let currentQuestionIndex = 0;
let rightCount = 0;
let leftCount = 0;

function displayQuestion(index) {
    const question = questions[index];
    const choice = choices[index];

    // vraag tonen
    document.getElementById('question').innerText = question;

    // keuzes bewaren
    document.getElementById('leftChoice').innerText = choice.left;
    document.getElementById('rightChoice').innerText = choice.right;

    // keuze knoppen tonen en verbergen van "Ga Verder" knop en het antwoord
    document.getElementById('choices').style.display = 'block';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('answer').style.display = 'none';
}

// bewegingen van het apparaat detecteren en neem keuzes op basis van de beweging
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
    const currentChoice = choices[currentQuestionIndex].left;
    document.getElementById('answer').innerText = currentChoice;
    // antwoord en de "Ga Verder" knop, keuze knoppen verborgen
    document.getElementById('answer').style.display = 'block';
    document.getElementById('continueButton').style.display = 'block';
    document.getElementById('choices').style.display = 'none';
}

function chooseRight() {
    rightCount++;
    const currentChoice = choices[currentQuestionIndex].right;
    document.getElementById('answer').innerText = currentChoice;
    // antwoord en de "Ga Verder" knop, keuze knoppen verborgen
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
        // resultaat op basis van de keuzes van de gebruiker
        displayResult();
    }
}

function displayResult() {
    let result;
    if (rightCount > leftCount) {
        result = "rechts";
    } else if (leftCount > rightCount) {
        result = "links";
    } else {
        result = "gelijkspel";
    }
    document.getElementById('result').innerText = result;
}

// Start spel + eerste vraag weergeven
displayQuestion(0);
