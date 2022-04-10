"use strict";

let gameStarted = false;
let currentWord = "";
let currentHint = "";
let wordArray = [];
let correctAtm = 0;
let incorrectAtm = 0;
let currHiddenHint = [];
let guessHistory = [];
let usrScore = 0;
let cmpScore = 0;
let usrGuessScore = 0;
let usrFailAttemp = 0;
let tries = 10;

const selectNewWord = () => {
  /* Check if the game has started*/
  if (!gameStarted) {
    /* Read the JSON file with all the words for the game and create an array with the values.*/
    $.getJSON("./JSON/wordBank.json", function (data) {
      let items = [];
      $.each(data, function (key, val) {
        items.push(val);
      });
      /* Select and set the values for the game */
      let ranWord = Math.floor(Math.random() * 20);
      currentWord = items[ranWord].word;
      currentHint = items[ranWord].hint;
      wordArray = Array.from(currentWord);
      gameStarted = true;
      /* Print the lgnt hint for the html */
      genLengtHint();
      $("#h2-lngt-hint").text(hintToText());
      console.log(
        `A new game has started with the word ${currentWord} and hint ${currentHint}`
      );
      console.log(`Array generated: ${wordArray}`);
      /*Adding hearts*/
      addHearts(tries);
    });
  }
};

const genLengtHint = () => {
  /* Creates a lenght hint for a word */
  for (let i = 0; i <= currentWord.length - 1; i++) {
    currHiddenHint[i] = "_";
  }
};

const hintToText = () => {
  let textHint = "";
  for (let i = 0; i <= currentWord.length - 1; i++) {
    textHint += ` ${currHiddenHint[i]} `;
  }
  return textHint;
};

const guessWord = () => {
  if (!gameStarted) {
    alert(" El juego no ha inciado, presiona play! ");
  } else {
    /* Get value and guessed word */
    let userGuess = document.getElementById("userGuess").value;
    document.getElementById("pastAttempt").textContent = userGuess;
    let upperWord = userGuess.toUpperCase();
    let found = checkGuess(upperWord);
    updateScore(found);
  }
};

const addHearts = (triesLeft) => {
  let pTag = document.getElementById("fullHearts");
  pTag.innerHTML = "Numero de Intentos: ";
  for (let i = 1; i <= triesLeft; i++) {
    let heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart", "counterIcons");
    pTag.appendChild(heart);
  }
};

const addBrokenHearts = (failed) => {
  let pTag = document.getElementById("brokenHearts");
  pTag.innerHTML = "Numero de Intentos: ";
  for (let i = 1; i <= failed; i++) {
    let heart = document.createElement("i");
    heart.classList.add("fa-solid", "fa-heart-crack", "counterIcons");
    pTag.appendChild(heart);
  }
};

const checkIfGuessed = (guess) => {
  let isGuessed = false;
  if (guessHistory.length === 0) {
    isGuessed = false;
  } else {
    isGuessed = guessHistory.includes(guess);
  }

  return isGuessed;
};

const checkGuess = (guess) => {
  let found = false;
  let chk = checkIfGuessed(guess);

  if (!chk) {
    for (let i = 0; i <= wordArray.length - 1; i++) {
      if (wordArray[i] === guess) {
        currHiddenHint[i] = guess;
        $("#h2-lngt-hint").text(hintToText());
        usrGuessScore++;
        found = true;
      }
    }
  } else {
    alert(" Letra ya intentada, contara como fallido ");
  }

  guessHistory.push(guess);

  return found;
};

const viewHistory = () => {
  if (gameStarted && guessHistory.length > 0) {
    alert(`Historial: ${guessHistory.toString()}`);
  } else {
    alert(" El juego no ha inciado, presiona play! ");
  }
};

const updateScore = (chk) => {
  if (!chk) {
    usrFailAttemp++;
    tries--;
    addHearts(tries);
    addBrokenHearts(usrFailAttemp);
  }

  if (usrFailAttemp === 10) {
    alert("has perdio! ");
    cmpScore++;
  } else if (usrGuessScore === currentWord.length) {
    alert("Ganaste!");
    usrScore++;
  }
};

const getHint = () => {
  /* Displays word hint*/
  if (gameStarted) {
    alert(` Pista: ${currentHint}`);
    usrFailAttemp++;
    tries--;
    addHearts(tries);
    addBrokenHearts(usrFailAttemp);
  } else {
    alert(" El juego no ha inciado, presiona play! ");
  }
};

const resetGame = () => {
  /* Reset Variables*/
  gameStarted = false;
  currentWord = "";
  currentHint = "";
  wordArray = [];
  correctAtm = 0;
  incorrectAtm = 0;
  currHiddenHint = [];
  guessHistory = [];
  usrGuessScore = 0;
  usrFailAttemp = 0;
  tries = 10;

  /* Reset de UI*/
  /* Corazones*/
  let pTagFL = document.getElementById("fullHearts");
  pTagFL.innerHTML = "Numero de Intentos: ";
  let pTagBH = document.getElementById("brokenHearts");
  pTagBH.innerHTML = "Numero de Intentos: ";

  /*Hint text */
  $("#h2-lngt-hint").text("");
  document.getElementById("pastAttempt").textContent = "";
};

const getScore = () => {
  /* Displays current scores*/
  alert(
    ` Victorias de Maquina ${cmpScore} vs Victorias de Usuario ${usrScore} `
  );
};

$("#btn-game-start").click(function (e) {
  /* Starts a new game*/
  selectNewWord();
  e.preventDefault();
});
