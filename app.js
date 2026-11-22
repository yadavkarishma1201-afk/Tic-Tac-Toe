// grab elements from html page
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

//game state (the memory of the game)
let board = ["", "", "", "", "", "", "", "", ""] ;// 9 empty square
let currentPlayer = "X";
let gameActive = true;

// all 8 ways to win( by cell index)
const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]    // dignals
];

// what happens when a cell is clicked
function handleCellClick(event) {
  const cell = event.target;
  const index = Number(cell.dataset.index);

  // Ignore the click if the square is taken or the game is over
  if (board[index] !== "" || !gameActive) return;

  // Save the move and show it on screen
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

// 5. Check for a win or a draw, otherwise switch turns
function checkResult() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
      gameActive = false;
      pattern.forEach((i) => cells[i].classList.add("win"));
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// 6. Reset everything to start over
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "win");
  });
}

// 7. Connect clicks to the functions
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);



