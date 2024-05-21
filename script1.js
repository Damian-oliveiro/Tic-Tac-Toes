const gameContainer = document.getElementById('game');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = {};
let playerMarks = { 'X': [], 'O': [] };
let gameOver = false;

const createBoard = (size) => {
    gameContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.addEventListener('click', handleClick);
            gameContainer.appendChild(cell);
        }
    }
};

const resetGame = () => {
    board = {};
    playerMarks = { 'X': [], 'O': [] };
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    gameContainer.innerHTML = '';
    createBoard(3);
};

const placeMark = (x, y) => {
    if (gameOver) return;

    const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    if (cell.textContent !== '') return;
    
    if (playerMarks[currentPlayer].length === 3) {
        const [oldX, oldY] = playerMarks[currentPlayer].shift();
        const oldCell = document.querySelector(`[data-x="${oldX}"][data-y="${oldY}"]`);
        oldCell.textContent = '';
        delete board[`${oldX},${oldY}`];
    }

    cell.textContent = currentPlayer;
    board[`${x},${y}`] = currentPlayer;
    playerMarks[currentPlayer].push([x, y]);

    if (checkWin(x, y)) {
        statusText.innerHTML = `Player ${currentPlayer} wins! <button id="playAgain">Play Again</button>`;
        document.getElementById('playAgain').addEventListener('click', resetGame);
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = (x, y) => {
    const directions = [
        [[0, 1], [0, -1]], // Horizontal
        [[1, 0], [-1, 0]], // Vertical
        [[1, 1], [-1, -1]], // Diagonal /
        [[1, -1], [-1, 1]]  // Diagonal \
    ];

    for (let direction of directions) {
        let count = 1;
        for (let [dx, dy] of direction) {
            let nx = x + dx;
            let ny = y + dy;
            while (board[`${nx},${ny}`] === currentPlayer) {
                count++;
                if (count === 3) return true;
                nx += dx;
                ny += dy;
            }
        }
    }

    return false;
};

const handleClick = (event) => {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    placeMark(x, y);
};

createBoard(3);
