const board = document.getElementById('board');
const scoreDisplay = document.getElementById('score');
const width = 8;
let squares = [];
let score = 0;
const candyColors = [
  'url(assets/red.png)',
  'url(assets/yellow.png)',
  'url(assets/green.png)',
  'url(assets/blue.png)',
  'url(assets/orange.png)',
  'url(assets/purple.png)'
];

// Create board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i);
    let randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
    square.style.backgroundImage = randomColor;
    board.appendChild(square);
    squares.push(square);
  }
}
createBoard();

// Drag and drop logic (dragstart, dragend, etc.) — can be added here

// Match checking and score updating — can be added here
