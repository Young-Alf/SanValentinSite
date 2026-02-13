// Función para verificar contraseña (igual)
function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === '21092024') {
        window.location.href = 'menu.html';
    } else {
        document.getElementById('error').style.display = 'block';
    }
}

// Lógica del pupiletras (word search)
const gridSize = 10;
const words = ['AMOR', 'CORAZON', 'BESO', 'FLORES']; // Palabras románticas
let grid = [];
let selectedCells = [];
let foundWords = [];
let score = 0;

function generateGrid() {
    // Genera una cuadrícula con letras aleatorias y coloca palabras
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
    // Coloca palabras (simplificado: horizontal)
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * (gridSize - word.length));
            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
                if (grid[row][col + i] !== '') canPlace = false;
            }
            if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                }
                placed = true;
            }
        }
    });
    // Llena el resto con letras aleatorias
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
}

function renderGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'letra';
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', selectCell);
            gridElement.appendChild(cell);
        }
    }
}

function selectCell(e) {
    const cell = e.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (cell.classList.contains('seleccionada')) {
        cell.classList.remove('seleccionada');
        selectedCells = selectedCells.filter(c => !(c.row === row && c.col === col));
    } else {
        cell.classList.add('seleccionada');
        selectedCells.push({ row, col });
    }
    checkWord();
}

function checkWord() {
    const word = selectedCells.map(c => grid[c.row][c.col]).join('');
    if (words.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        score++;
        document.getElementById('score').textContent = 'Puntuación: ' + score;
        document.getElementById('message').textContent = `¡Encontraste "${word}"!`;
        selectedCells.forEach(c => {
            const cell = document.querySelector(`[data-row="${c.row}"][data-col="${c.col}"]`);
            cell.classList.add('marcada');
            cell.classList.remove('seleccionada');
        });
        selectedCells = [];
    }
}

window.onload = function() {
    generateGrid();
    renderGrid();
};
