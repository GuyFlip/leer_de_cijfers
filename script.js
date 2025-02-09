const numbers = ["een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen", "tien"];
let score = 0;
let questionIndex = 0;
let recognition;
let correctAlternatives = {
    "een": ["één"],
    "vijf": ["fijf", "veif", "fuf", "vij", "fij"]
};

function startGame() {
    score = 0;
    questionIndex = 0;
    document.getElementById("score").innerText = "Score: 0";
    askQuestion();
    startSpeechRecognition();
}

function askQuestion() {
    if (questionIndex >= 10) {
        alert("Spel voorbij! Score: " + score + "\nWil je nog een keer spelen?");
        return;
    }
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let number = numbers[randomIndex];
    document.getElementById("number").innerText = number;
    document.getElementById("timer").style.width = "100%";
    setTimeout(() => {
        document.getElementById("timer").style.width = "0%";
    }, 4000);
    questionIndex++;
}

function startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Spraakherkenning wordt niet ondersteund op deze browser.");
        return;
    }
    recognition = new webkitSpeechRecognition();
    recognition.lang = "nl-NL";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = (event) => {
        let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
        checkAnswer(transcript);
    };
}

function checkAnswer(answer) {
    let correctAnswer = document.getElementById("number").innerText.toLowerCase();
    if (answer === correctAnswer || (correctAlternatives[correctAnswer] && correctAlternatives[correctAnswer].includes(answer))) {
        score++;
        document.getElementById("score").innerText = "Score: " + score;
        askQuestion();
    }
}

document.getElementById("start-button").addEventListener("click", startGame);
