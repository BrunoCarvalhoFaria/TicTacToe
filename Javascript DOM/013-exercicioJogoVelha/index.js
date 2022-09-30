let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let statusBtn = document.querySelectorAll(".charKey");
const main = document.querySelector("main");
const root = document.querySelector(":root");
const resultInput = document.getElementById("result");

let playerTime = 1;
let jogadas = [];
let winner = false;
let winnerPlace = "";
let winnerSymbol = "";
const INITIAL = "_";

//Começar o jogo
document.getElementById("start").addEventListener("click", function () {
  if (player1.value !== "" && player2.value !== "") {
    player1.disabled = true;
    player2.disabled = true;
    statusBtn.forEach(function (charKeyBtn) {
      charKeyBtn.innerText = INITIAL;
      charKeyBtn.disabled = false;
    });
  } else {
    alert("Insira o nome dos jogadores");
  }
});
//funçao que realiza a jogada
statusBtn.forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    if (playerTime === 1) {
      charKeyBtn.innerText = "X";
      charKeyBtn.disabled = true;
      playerTime = 2;
    } else {
      charKeyBtn.innerText = "O";
      charKeyBtn.disabled = true;
      playerTime = 1;
    }
    checkWinner();
  });
});

function checkWinner() {
  statusBtn.forEach(function (btn) {
    jogadas.push(btn.innerText);
  });
  //verificar se houve ganhador
  winnerPlace = checkLine(jogadas);
  if (!winner) {
    winnerPlace = checkCol(jogadas);
  }
  if (!winner) {
    winnerPlace = checkCross(jogadas);
  }
  //Declara o ganhador
  if (winner) {
    highlightLine();
    if (winnerSymbol === "X") {
      resultInput.value = player1.value + " ganhou!";
    } else {
      resultInput.value = player2.value + " ganhou!";
    }
  }
  jogadas = [];
}

function highlightLine() {
  switch (winnerPlace) {
    case "Line-1":
      document.getElementById("pos11").classList.add("winner");
      document.getElementById("pos12").classList.add("winner");
      document.getElementById("pos13").classList.add("winner");
      break;
    case "Line-2":
      document.getElementById("pos21").classList.add("winner");
      document.getElementById("pos22").classList.add("winner");
      document.getElementById("pos23").classList.add("winner");
      break;
    case "Line-3":
      document.getElementById("pos31").classList.add("winner");
      document.getElementById("pos32").classList.add("winner");
      document.getElementById("pos33").classList.add("winner");
      break;
    case "Col-1":
      document.getElementById("pos11").classList.add("winner");
      document.getElementById("pos21").classList.add("winner");
      document.getElementById("pos31").classList.add("winner");
      break;
    case "Col-2":
      document.getElementById("pos12").classList.add("winner");
      document.getElementById("pos22").classList.add("winner");
      document.getElementById("pos32").classList.add("winner");
      break;
    case "Col-3":
      document.getElementById("pos13").classList.add("winner");
      document.getElementById("pos23").classList.add("winner");
      document.getElementById("pos33").classList.add("winner");
      break;
    case "x-1":
      document.getElementById("pos11").classList.add("winner");
      document.getElementById("pos22").classList.add("winner");
      document.getElementById("pos33").classList.add("winner");
      break;
    case "x-2":
      document.getElementById("pos13").classList.add("winner");
      document.getElementById("pos22").classList.add("winner");
      document.getElementById("pos31").classList.add("winner");
      break;
  }
}

function checkLine(jogadas) {
  if (
    jogadas[0] === jogadas[1] &&
    jogadas[0] === jogadas[2] &&
    jogadas[0] !== INITIAL
  ) {
    //linha 1
    winner = true;
    winnerSymbol = jogadas[0];
    return "Line-1";
  } else if (
    jogadas[3] === jogadas[4] &&
    jogadas[3] === jogadas[5] &&
    jogadas[3] !== INITIAL
  ) {
    //linha 2
    winner = true;
    winnerSymbol = jogadas[3];
    return "Line-2";
  } else if (
    jogadas[6] === jogadas[7] &&
    jogadas[6] === jogadas[8] &&
    jogadas[6] !== INITIAL
  ) {
    //linha 3
    winner = true;
    winnerSymbol = jogadas[6];
    return "Line-3";
  } else {
    return "";
  }
}

function checkCol(jogadas) {
  if (
    jogadas[0] === jogadas[3] &&
    jogadas[0] === jogadas[6] &&
    jogadas[0] !== INITIAL
  ) {
    //coluna 1
    winner = true;
    winnerSymbol = jogadas[0];
    return "Col-1";
  } else if (
    jogadas[1] === jogadas[4] &&
    jogadas[1] === jogadas[7] &&
    jogadas[1] !== INITIAL
  ) {
    //coluna 2
    winner = true;
    winnerSymbol = jogadas[1];
    return "Col-2";
  } else if (
    jogadas[2] === jogadas[5] &&
    jogadas[2] === jogadas[8] &&
    jogadas[2] !== INITIAL
  ) {
    //coluna 3
    winner = true;
    winnerSymbol = jogadas[2];
    return "Col-3";
  } else {
    return "";
  }
}

function checkCross(jogadas) {
  if (
    jogadas[0] === jogadas[4] &&
    jogadas[0] === jogadas[8] &&
    jogadas[0] !== INITIAL
  ) {
    //cross 1
    winner = true;
    winnerSymbol = jogadas[0];
    return "x-1";
  } else if (
    jogadas[2] === jogadas[4] &&
    jogadas[2] === jogadas[6] &&
    jogadas[2] !== INITIAL
  ) {
    //cross 2
    winner = true;
    winnerSymbol = jogadas[2];
    return "x-2";
  } else {
    return "";
  }
}

//Reinicia o jogo
document.getElementById("restart").addEventListener("click", function () {
  //reseta botões
  statusBtn.forEach(function (charKeyBtn) {
    charKeyBtn.innerText = "_";
    charKeyBtn.disabled = true;
    charKeyBtn.classList.remove("winner");
  });
  //reseta nomes
  player1.disabled = false;
  player2.disabled = false;
  player1.value = "";
  player2.value = "";
  resultInput.value = "";

  winner = false;
  playerTime = 1;
  jogadas = [];
  winnerPlace = "";
  winnerSymbol = "";
});

//troca o tema do jogo
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});
