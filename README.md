<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leer Cijfers Spel</title>
    <style>
        body { text-align: center; font-family: Arial, sans-serif; }
        #number { font-size: 100px; margin: 20px; }
        #message { font-size: 30px; margin: 20px; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1>Leer Cijfers Spel</h1>
    <p>Druk op de knop om een cijfer te laten zien en zeg het hardop!</p>
    <button onclick="generateNumber()">Start Spel</button>
    <div id="number"></div>
    <button onclick="startListening()">Zeg het getal</button>
    <p id="message"></p>
    <script>
        let currentNumber = null;
        
        function generateNumber() {
            currentNumber = Math.floor(Math.random() * 10) + 1;
            document.getElementById("number").innerText = currentNumber;
            document.getElementById("message").innerText = "";
        }
        
        function startListening() {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                document.getElementById("message").innerText = "❌ Spraakherkenning wordt niet ondersteund in deze browser.";
                return;
            }
            
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "nl-NL";
            recognition.start();
            
            recognition.onresult = function(event) {
                const spokenNumber = event.results[0][0].transcript.trim().toLowerCase();
                console.log("Gezegd: ", spokenNumber);
                checkAnswer(spokenNumber);
            };
            
            recognition.onerror = function(event) {
                document.getElementById("message").innerText = "❌ Er is een fout opgetreden bij de spraakherkenning.";
                console.error("Spraakherkenning fout: ", event.error);
            };
        }
        
        function checkAnswer(spoken) {
            const numberWords = {
                "een": 1, "twee": 2, "drie": 3, "vier": 4, "vijf": 5,
                "zes": 6, "zeven": 7, "acht": 8, "negen": 9, "tien": 10
            };
            
            let spokenNumber = numberWords[spoken] || parseInt(spoken);
            if (spokenNumber === currentNumber) {
                document.getElementById("message").innerText = "✅ Correct!";
            } else {
                document.getElementById("message").innerText = "❌ Fout, probeer opnieuw.";
            }
        }
    </script>
</body>
</html>
de_cijfers.index…]()
