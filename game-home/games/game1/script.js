const board = document.getElementById("board");
const status = document.getElementById("status");
const playerScoreEl = document.getElementById("playerScore");
const aiScoreEl = document.getElementById("aiScore");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let playerScore = 0;
let aiScore = 0;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function initBoard() {
  board.innerHTML = "";
  cells = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  status.textContent = "Your turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("button");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index] !== "") return;

  cells[index] = "X";
  e.target.textContent = "X";

  if (checkWinner(cells, "X")) {
    playerScore++;
    showEndMessage(`You win! 🎉 Scored: ${playerScore}`);
    playerScoreEl.textContent = playerScore;
    return;
  }

  if (!cells.includes("")) {
    showEndMessage("It's a draw! 🤝");
    return;
  }

  status.textContent = "AI is thinking...";
  setTimeout(() => {
    const bestMove = getBestMove(cells);
    cells[bestMove] = "O";
    board.children[bestMove].textContent = "O";

    if (checkWinner(cells, "O")) {
      aiScore++;
      showEndMessage(`AI wins! 💻 Scored: ${aiScore}`);
      aiScoreEl.textContent = aiScore;
    } else if (!cells.includes("")) {
      showEndMessage("It's a draw! 🤝");
    } else {
      status.textContent = "Your turn";
    }
  }, 500);
}

function showEndMessage(message) {
  gameActive = false;
  status.textContent = message;

  setTimeout(() => {
    initBoard();
  }, 2000); // Restart after 2 seconds
}

function getBestMove(newBoard) {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < newBoard.length; i++) {
    if (newBoard[i] === "") {
      newBoard[i] = "O";
      let score = minimax(newBoard, 0, false);
      newBoard[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function minimax(board, depth, isMaximizing) {
  if (checkWinner(board, "O")) return 10 - depth;
  if (checkWinner(board, "X")) return depth - 10;
  if (!board.includes("")) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = "";
      }
    }
    return best;
  }
}

function checkWinner(board, player) {
  return winCombos.some(combo => combo.every(i => board[i] === player));
}

function resetGame() {
  playerScore = 0;
  aiScore = 0;
  playerScoreEl.textContent = "0";
  aiScoreEl.textContent = "0";
  initBoard();
}

initBoard();
