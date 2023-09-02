const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";
let bot = "O"; 

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function init() {
  selected = [];
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });

  if (player === bot) {
    setTimeout(() => {
      makeBotMove();
    }, 500);
  }
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");

  if (selected[index] || player !== "X") {
    return;
  }

  e.target.innerHTML = player;
  e.target.removeEventListener("click", newMove);
  selected[index] = player;
  check();

  if (!checkWinner()) {
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    if (!checkWinner() && player === bot) {
      setTimeout(() => {
        makeBotMove();
      }, 500);
    }
  }
}

function makeBotMove() {
  const emptyCells = document.querySelectorAll(".game button:not(.disabled)");

  if (emptyCells.length === 0) {
    return;
  }

  let randomIndex;

  do {
    randomIndex = Math.floor(Math.random() * 9);
  } while (selected[randomIndex] !== undefined);

  const randomCell = document.querySelector(`.game button[data-i="${randomIndex}"]`);

  randomCell.innerHTML = bot;
  randomCell.removeEventListener("click", newMove);
  selected[randomIndex] = bot;
  randomCell.classList.add("disabled");
  check();

  if (!checkWinner()) {
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  }
}

function check() {
  if (checkWinner()) {
    return;
  }

  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    init();
  }
}

function checkWinner() {
  let playerLastMove = player === "X" ? "O" : "X";

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1]);

  for (pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
      init();
      return true;
    }
  }

  return false;
}
