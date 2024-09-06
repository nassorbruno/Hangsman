const words = ["javascript", "html", "css", "programacao", "computador", "internet", "desenvolvimento", "tecnologia", "algoritmo", "software", "abacaxi", "borboleta", "canguru", "delfim", "elefante", "fenix", "girafa"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let mistakes = 0;

const wordContainer = document.getElementById("word");
const lettersContainer = document.getElementById("letters");
const messageContainer = document.getElementById("message");
const wordCountContainer = document.getElementById("word-count");
const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");
// Desenho do personagem
function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;

    // Post
    ctx.beginPath();
    ctx.moveTo(50, 130);
    ctx.lineTo(50, 10);
    ctx.lineTo(100, 10);
    ctx.lineTo(100, 20);
    ctx.stroke();

    if (mistakes > 0) {
        // Head
        ctx.beginPath();
        ctx.arc(100, 30, 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (mistakes > 1) {
        // Body
        ctx.beginPath();
        ctx.moveTo(100, 40);
        ctx.lineTo(100, 80);
        ctx.stroke();
    }
    if (mistakes > 2) {
        // Left Arm
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(80, 70);
        ctx.stroke();
    }
    if (mistakes > 3) {
        // Right Arm
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(120, 70);
        ctx.stroke();
    }
    if (mistakes > 4) {
        // Left Leg
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(80, 110);
        ctx.stroke();
    }
    if (mistakes > 5) {
        // Right Leg
        ctx.beginPath();
        ctx.moveTo(100, 80);
        ctx.lineTo(120, 110);
        ctx.stroke();
    }
}

function displayWord() {
    wordContainer.innerHTML = selectedWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
}

function displayLetters() {
    lettersContainer.innerHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => 
        `<button onclick="guess('${letter}')" ${guessedLetters.includes(letter) ? "disabled" : ""}>${letter}</button>`
    ).join("");
}

function guess(letter) {
    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        displayWord();
        checkWin();
    } else {
        mistakes++;
        drawHangman();
        checkLose();
    }
    displayLetters();
}

function checkWin() {
    if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        messageContainer.textContent = "Você venceu!";
        setTimeout(resetGame, 2000);
    }
}

function checkLose() {
    if (mistakes === 6) {
        messageContainer.textContent = `Você perdeu! A palavra era ${selectedWord}`;
        setTimeout(resetGame, 2000);
    }
}

function resetGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    messageContainer.textContent = "";
    displayWord();
    displayLetters();
    drawHangman();
    wordCountContainer.textContent = `Quantidade de palavras: ${words.length}`;
}

document.addEventListener("keydown", (event) => {
    const letter = event.key.toLowerCase();
    if (letter.match(/[a-z]/) && !guessedLetters.includes(letter)) {
        guess(letter);
    }
});

resetGame();
