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

document.querySelector("#voorleesBtn").addEventListener("click", readQuestion);

const antwoordBtn = document.querySelector("#antwoordBtn");
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
  {
    question: "Wat is de grootste planeet in ons zonnestelsel?",
    correctAnswer: "Jupiter"
  },
  {
    question: "Hoeveel continenten zijn er op aarde?",
    correctAnswer: "Zeven"
  },
  {
    question: "Wat is de hoofdstad van Japan?",
    correctAnswer: "Tokio"
  }
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
  
  antwoordBtn.disabled = false;
};

antwoordBtn.addEventListener("click", function() {
  recognition.start();
  antwoordBtn.disabled = true;
});

nextBtn.addEventListener("click", function() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    readQuestion();
    nextBtn.style.display = "none"; // Verberg de knop voor de volgende vraag
  } else {
    document.querySelector("#output").innerHTML = "<span class='correct'>Alle vragen zijn beantwoord!</span>";
    document.querySelector("#answers").innerHTML = ""; // Leeg de antwoordlijst
  }
});
