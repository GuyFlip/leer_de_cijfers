<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leer Cijfers Spel</title>
    <style>
        body { text-align: center; font-family: Arial, sans-serif; }
        #number { font-size: 100px; margin: 20px; color: blue; }
        #message { font-size: 30px; margin: 20px; }
        #score { font-size: 24px; margin: 10px; }
        #timer-bar {
            width: 100%;
            height: 20px;
            background-color: green;
            transition: width 4s linear;
        }
        .hidden { display: none; }
        .start-button {
            background-color: green;
            color: white;
            font-size: 20px;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h1>Leer Cijfers Spel</h1>
    <button id="startButton" class="start-button" onclick="startGame()">START SPEL</button>
    <p id="score">Score: 0</p>
    <div id="number"></div>
    <div id="timer-bar"></div>
    <p id="message"></p>
    
    <script>
        let currentNumber = null;
        let score = 0;
        let questionCount = 0;
        const totalQuestions = 10;
        let recognition;
        let isAnswering = false;

        document.addEventListener("keydown", function(event) {
            if (event.code === "Space") {
                startGame();
            }
        });
        
        function startGame() {
            score = 0;
            questionCount = 0;
            document.getElementById("score").innerText = "Score: " + score;
            document.getElementById("startButton").disabled = true;
            initSpeechRecognition();
            nextQuestion();
        }
        
        function nextQuestion() {
            if (questionCount >= totalQuestions) {
                document.getElementById("message").innerText = "Spel afgelopen! Je score: " + score + "/10";
                document.getElementById("startButton").disabled = false;
                return;
            }
            
            questionCount++;
            currentNumber = Math.floor(Math.random() * 10) + 1;
            document.getElementById("number").innerText = currentNumber;
            document.getElementById("message").innerText = "";
            isAnswering = true;
            startTimer();
            recognition.start();
        }
        
        function startTimer() {
            let timerBar = document.getElementById("timer-bar");
            timerBar.style.width = "100%";
            setTimeout(() => {
                timerBar.style.width = "0%";
            }, 100);
            
            setTimeout(() => {
                if (isAnswering) {
                    document.getElementById("message").innerText = "❌ Te laat!";
                    isAnswering = false;
                    recognition.stop();
                    setTimeout(nextQuestion, 2000);
                }
            }, 4000);
        }
        
        function initSpeechRecognition() {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                document.getElementById("message").innerText = "❌ Spraakherkenning wordt niet ondersteund in deze browser.";
                return;
            }
            
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "nl-NL";
            recognition.continuous = true;
            recognition.interimResults = false;
            
            recognition.onresult = function(event) {
                if (!isAnswering) return;
                const spokenNumber = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                console.log("Gezegd:", spokenNumber);
                checkAnswer(spokenNumber);
            };
            
            recognition.onerror = function(event) {
                console.error("Spraakherkenning fout:", event.error);
                document.getElementById("message").innerText = "⚠️ Spraakherkenning fout, probeer opnieuw.";
                setTimeout(() => recognition.start(), 1000); // Herstart na een fout
            };
            
            recognition.onend = function() {
                if (isAnswering) {
                    console.warn("Spraakherkenning onverwacht gestopt. Herstarten...");
                    recognition.start();
                }
            };
        }
        
        function checkAnswer(spoken) {
            if (!isAnswering) return;
            isAnswering = false;
            
            const numberWords = {
                "een": 1, "twee": 2, "drie": 3, "vier": 4, "vijf": 5,
                "zes": 6, "zeven": 7, "acht": 8, "negen": 9, "tien": 10
            };
            
            let spokenNumber = numberWords[spoken] || parseInt(spoken);
            console.log("Herkenning:", spoken, "Geconverteerd naar:", spokenNumber, "Correcte antwoord:", currentNumber);
            
            if (spokenNumber === currentNumber) {
                score++;
                document.getElementById("score").innerText = "Score: " + score;
                document.getElementById("message").innerText = "✅ Correct!";
            } else {
                document.getElementById("message").innerText = "❌ Fout, probeer opnieuw.";
            }
            
            setTimeout(nextQuestion, 2000);
        }
    </script>
</body>
</html>
