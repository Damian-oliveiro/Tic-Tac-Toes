// create array to hold board data
let boardData = [
[0,0,0],
[0,0,0],
[0,0,0]
]

// define game variables
let player = 1;


// pull in cells from DOM  
const cellElements = document.querySelectorAll(".cell");
console.log(cellElements);

// Add event listener
cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});

//create function for placing markers

function placeMarker(index){
    // Determine row and column from index
    let col = index % 3
    let row = (index - col) / 3
    // check if current cell is empty
    if (boardData[row][col] ==0){
    boardData[row][col] = player;
    // change player 
    player *= -1 ;
    console.log(boardData);
    }
}