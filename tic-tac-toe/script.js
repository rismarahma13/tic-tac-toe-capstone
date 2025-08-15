const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index, cell), {
    once: true,
  });
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick(index, cell) {
  if (!gameActive || boardState[index] !== "") return;

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken", "animated");

  // 🎨 Warna X dan O
  if (currentPlayer === "X") {
    cell.style.color = "#4a90e2"; // biru
  } else {
    cell.style.color = "#e94e77"; // merah
  }

  const winCombo = checkWin();
  if (winCombo) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    highlightWinner(winCombo);
    gameActive = false;
    return;
  }

  if (boardState.every((cell) => cell !== "")) {
    statusText.textContent = "🤝 It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return combo;
    }
  }
  return null;
}

function highlightWinner(combo) {
  combo.forEach((index) => {
    cells[index].style.background = "#ffd700";
    cells[index].style.color = "#000";
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "winner", "animated");
    cell.style.color = "#000";
    cell.style.background = "rgba(255, 255, 255, 0.9)";
    cell.replaceWith(cell.cloneNode(true));
  });
  document.querySelectorAll("[data-cell]").forEach((cell, index) => {
    cell.addEventListener("click", () => handleCellClick(index, cell), {
      once: true,
    });
  });
}
