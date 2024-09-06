const palavrasComDicas = [
    {
        palavra: "javascript",
        dicas: ["Linguagem de programação", "Usada para desenvolvimento web", "Popular entre desenvolvedores"]
    },
    {
        palavra: "html",
        dicas: ["Linguagem de marcação", "Estrutura páginas web", "Usa tags"]
    },
    {
        palavra: "css",
        dicas: ["Folhas de estilo", "Usada para estilizar páginas web", "Trabalha junto com HTML"]
    },
    {
        palavra: "programacao",
        dicas: ["Atividade de escrever código", "Criação de software", "Envolve lógica e algoritmos"]
    },
    {
        palavra: "computador",
        dicas: ["Dispositivo eletrônico", "Usado para processar dados", "Tem CPU, memória e armazenamento"]
    },
    {
        palavra: "internet",
        dicas: ["Rede global", "Conecta dispositivos", "Usada para comunicação e informação"]
    },
    {
        palavra: "desenvolvimento",
        dicas: ["Processo de criação", "Pode ser de software", "Envolve várias etapas"]
    },
    {
        palavra: "tecnologia",
        dicas: ["Aplicação de conhecimento", "Inovações e ferramentas", "Evolui rapidamente"]
    },
    {
        palavra: "algoritmo",
        dicas: ["Sequência de passos", "Resolve problemas", "Usado em programação"]
    },
    {
        palavra: "software",
        dicas: ["Programa de computador", "Executa tarefas específicas", "Pode ser aplicativo ou sistema"]
    },
    {
        palavra: "abacaxi",
        dicas: ["Fruta tropical", "Tem casca espinhosa", "Amarela por dentro"]
    },
    {
        palavra: "borboleta",
        dicas: ["Inseto", "Tem asas coloridas", "Passa por metamorfose"]
    },
    {
        palavra: "canguru",
        dicas: ["Animal marsupial", "Salta alto", "Nativo da Austrália"]
    },
    {
        palavra: "delfim",
        dicas: ["Mamífero marinho", "Inteligente", "Vive em grupos"]
    },
    {
        palavra: "elefante",
        dicas: ["Grande mamífero", "Tem tromba", "Vive na savana"]
    },
    {
        palavra: "fenix",
        dicas: ["Ave mitológica", "Renasce das cinzas", "Símbolo de renascimento"]
    },
    {
        palavra: "girafa",
        dicas: ["Animal alto", "Pescoço longo", "Vive na África"]
    }
];

let selectedWordObj;
let selectedWord;
let guessedLetters = [];
let mistakes = 0;

const wordContainer = document.getElementById("word");
const lettersContainer = document.getElementById("letters");
const messageContainer = document.getElementById("message");
const wordCountContainer = document.getElementById("word-count");
const canvas = document.getElementById("hangman");
const ctx = canvas.getContext("2d");
const hintContainer = document.getElementById("hint");

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
    selectedWordObj = palavrasComDicas[Math.floor(Math.random() * palavrasComDicas.length)];
    selectedWord = selectedWordObj.palavra;
    guessedLetters = [];
    mistakes = 0;
    messageContainer.textContent = "";
    displayWord();
    displayLetters();
    drawHangman();
    wordCountContainer.textContent = `Quantidade de palavras: ${palavrasComDicas.length}`;
    displayHint();
}

function displayHint() {
    hintContainer.innerHTML = selectedWordObj.dicas.map((dica, index) => 
        `<p>Dica ${index + 1}: ${dica}</p>`
    ).join("");
}

document.addEventListener("keydown", (event) => {
    const letter = event.key.toLowerCase();
    if (letter.match(/[a-z]/) && !guessedLetters.includes(letter)) {
        guess(letter);
    }
});

resetGame();
