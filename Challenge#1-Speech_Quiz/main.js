const synth = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance();

utterance.lang = "nl-BE";
utterance.pitch = 1.2;
utterance.rate = 0.9;

synth.onvoiceschanged = () => {
  let voices = synth.getVoices().filter(matchVoiceToLang);
  console.log(voices);
  utterance.voice = voices[2];
}

function matchVoiceToLang(voice) {
  if (voice.lang == utterance.lang) {
    return true;
  }
  return false;
}

document.querySelector("#btnSpeak").addEventListener("click", readQuestion);

const speakBtn = document.querySelector("#speakBtn");
const nextBtn = document.querySelector("#nextBtn"); // Knop voor volgende vraag
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'nl-BE';

let currentQuestionIndex = 0;

const questions = [
  {
    question: "Wat is de hoofdstad van Frankrijk?",
    correctAnswer: "Parijs"
  },
  {
    question: "Hoeveel planeten zijn er in ons zonnestelsel?",
    correctAnswer: "Acht"
  },
  // Voeg hier meer vragen toe
];

function readQuestion() {
  const question = questions[currentQuestionIndex];
  utterance.text = question.question;
  document.querySelector("#output").innerHTML = ""; // Leeg de output container
  synth.speak(utterance);
}

recognition.onresult = function(event) {
  const speechResult = event.results[0][0].transcript.trim().toLowerCase();
  const question = questions[currentQuestionIndex];
  const answerContainer = document.querySelector("#output");
  
  if (speechResult === question.correctAnswer.toLowerCase()) {
    answerContainer.innerHTML = "<span class='correct'>Correct: " + question.correctAnswer + "</span>";
    nextBtn.style.display = "inline"; // Toon de knop voor de volgende vraag
  } else {
    answerContainer.innerHTML = "<span class='incorrect'>Fout: " + speechResult + "</span>";
  }
  
  speakBtn.disabled = false;
};

speakBtn.addEventListener("click", function() {
  recognition.start();
  speakBtn.disabled = true;
});

nextBtn.addEventListener("click", function() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    readQuestion();
    nextBtn.style.display = "none"; // Verberg de knop voor de volgende vraag
  } else {
    document.querySelector("#output").innerHTML = "<span class='correct'>Alle vragen zijn beantwoord!</span>";
  }
});
