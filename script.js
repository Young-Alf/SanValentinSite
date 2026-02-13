// Función para verificar contraseña
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === '21092024') {
        window.location.href = 'menu.html';
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

// Lógica del juego (quiz simple)
const questions = [
    {
        question: "¿Cuál es nuestra fecha especial?",
        options: ["21 de septiembre del 2024", "14 de febrero", "Otro día"],
        answer: 0
    },
    {
        question: "¿Qué canción nos gusta bailar?",
        options: ["Una romántica", "Rock", "Pop"],
        answer: 0
    },
    // Agrega más preguntas aquí si quieres
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById('question').textContent = questions[currentQuestion].question;
        const buttons = document.querySelectorAll('#quiz button');
        buttons.forEach((btn, index) => {
            btn.textContent = questions[currentQuestion].options[index];
        });
    } else {
        document.getElementById('quiz').innerHTML = '<p>¡Juego terminado! Tu puntuación final: ' + score + '</p>';
    }
}

function answer(selected) {
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    document.getElementById('score').textContent = 'Puntuación: ' + score;
    loadQuestion();
}

window.onload = loadQuestion;
