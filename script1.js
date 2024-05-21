const gameContainer = document.getElementById('game');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = {};
let playerMarks = { 'X': [], 'O': [] };

const createBoard = (size) => {
    gameContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.addEventListener('click', () => placeMark(i, j));
            gameContainer.appendChild(cell);
        }
    }
};

const placeMark = (x, y) => {
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

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

createBoard(3);


// // create array to hold board data
// let boardData = [
// [0,0,0],
// [0,0,0],
// [0,0,0]
// ]

// // define game variables
// let player = 1;


// // pull in cells from DOM  
// const cellElements = document.querySelectorAll(".cell");
// console.log(cellElements);

// // Add event listener
// cellElements.forEach((cell, index) => {
//     cell.addEventListener("click", () => {
//         placeMarker(index);
//     });
// });

// //create function for placing markers

// function placeMarker(index){
//     // Determine row and column from index
//     let col = index % 3
//     let row = (index - col) / 3
//     // check if current cell is empty
//     if (boardData[row][col] ==0){
//     boardData[row][col] = player;
//     // change player 
//     player *= -1 ;
//     console.log(boardData);
//     }
// }