const player1 = "O";
const player2 = "X";

let boardFull = false; 
let playBoard = ["", "", "", "", "", "", "", "", ""];

const showPlayer = document.querySelector('.show-player');

const boardContainer = document.querySelector(".board");

const winnerStatement = document.getElementById("winner");

checkBoardComplete = () => {
    let flag = true;
    playBoard.forEach(element => {
      if (element != player1 && element != player2) {
        flag = false;
      }
    });
    boardFull = flag;
  };

const checkLine = (a, b, c) => {
     return (
      playBoard[a] == playBoard[b] &&
      playBoard[b] == playBoard[c] &&
      (playBoard[a] == player1 || playBoard[a] == player2)
    );
  };

const checkMatch = () => {
    for (i = 0; i < 9; i += space3) {
      if (checkLine(i, i + 1, i + 2)) {
        return playBoard[i];
      }
    }
    for (i = 0; i < 3; i++) {
      if (checkLine(i, i + 3, i + 6)) {
        return playBoard[i];
      }
    }
    if (checkLine(0, 4, 8)) {
      return playBoard[0];
    }
    if (checkLine(2, 4, 6)) {
      return playBoard[2];
    }
    return "";
  };

const loadBoard = () => {
  boardContainer.innerHTML = "";
  playBoard.forEach((e, i) => {
    boardContainer.innerHTML += `<div id="space${i}" class="space" onclick="addPlayerMove(${i})">${playBoard[i]}</div>`
    if (e == player1 || e == player2) {
      document.querySelector(`#space${i}`).classList.add("occupied");
    }
  });
};

const gameLoop = () => {
    loadBoard();
    checkBoardComplete();
  };


const nextPlayer = () => {
    showPlayer.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    showPlayer.innerText = currentPlayer;
    showPlayer.classList.add(`player${currentPlayer}`);
}

const addPlayer1Move = e => {
    if (!boardFull && playBoard[e] == "") {
      playBoard[e] = player1;
      gameLoop();
      addPlayer2Move();
    }
  };

const addPlayer2Move = () => {
    if (!boardFull) {
      do {
        selected = Math.floor(Math.random() * 9);
      } while (playBoard[selected] != "");
    playBoard[selected] = player2;
    gameLoop();
    }
  };

const resetBoard = () => {
    playBoard = ["", "", "", "", "", "", "", "", ""];
    boardFull = false;
    winner.innerText = "";
    loadBoard();
  };

loadBoard();