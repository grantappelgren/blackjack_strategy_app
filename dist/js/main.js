var dealerSum = 0;
var yourSum = 0;

var playerCards = [];

var yourAceCount = 0;

var deck;

var playerCard;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGameSingleDeck();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "" + types[i]); //A-C -> K-C, A-D -> K-D
    }
  }
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function startGameSingleDeck() {
  document.getElementById("responseResult__icon").classList.remove("hidden");
  document.getElementById("responseResultMulti__icon").classList.add("hidden");
  document.getElementById("responseResult__icon").innerHTML = "";
  document.getElementById("responseResult__explanation").innerHTML = "";
  document.getElementById("multiDeck").classList.remove("gameButtonCurrent");
  document.getElementById("hit").classList.remove("hidden");
  document.getElementById("stand").classList.remove("hidden");
  document.getElementById("double").classList.remove("hidden");
  document.getElementById("split").classList.remove("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.add("hidden");
  document.getElementById("dealerCard").innerHTML = "";
  document.getElementById("playerCards").innerHTML = "";
  yourSum = 0;
  playerCards.length = 0;

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./img/" + card + ".png";
  dealerSum = getValue(card);
  document.getElementById("singleDeck").classList.add("gameButtonCurrent");
  document.getElementById("dealerCard").append(cardImg);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let playerCard = deck.pop();
    cardImg.src = "./img/" + playerCard + ".png";
    yourSum += getValue(playerCard);
    yourAceCount += checkAce(playerCard);
    document.getElementById("playerCards").append(cardImg);
    playerCards.push(playerCard[0]);
  }

  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);

  if (yourSum == 21) {
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHand__button").classList.remove("hidden");
    document
      .getElementById("newHand__button")
      .addEventListener("click", startGameSingleDeck);
    let blackJackImg = document.createElement("img");
    blackJackImg.src = "./img/checkMark.png";
    document.getElementById("responseResult__icon").append(blackJackImg);
    document.getElementById("responseResult__explanation").innerText =
      "Black Jack!";
  } else {
    document.getElementById("hit").addEventListener("click", hitSingleDeck);
    document.getElementById("stand").addEventListener("click", standSingleDeck);
    document
      .getElementById("double")
      .addEventListener("click", doubleSingleDeck);
    document.getElementById("split").addEventListener("click", splitSingleDeck);
  }
}

function hitSingleDeck() {
  {
    let responseResultCorrectImg = document.createElement("img");
    let responseResultIncorrectImg = document.createElement("img");
    let responseResultCorrectExplanation = "";
    let responseResultIncorrectExplanation = "";
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHand__button").classList.remove("hidden");
    document.getElementById("newHandMulti__button").classList.add("hidden");
    document
      .getElementById("singleDeck")
      .addEventListener("click", startGameSingleDeck);
    document
      .getElementById("multiDeck")
      .addEventListener("click", startGameMultiDeck);
    document
      .getElementById("newHand__button")
      .addEventListener("click", startGameSingleDeck);
    responseResultCorrectImg.src = "./img/checkMark.png";
    responseResultIncorrectImg.src = "./img/x.png";

    function incorrectResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultIncorrectImg);
    }

    function correctResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultCorrectImg);
    }

    if (
      (dealerSum == 2 || dealerSum >= 8) &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultCorrectExplanation = "Correct! Hit 2s against 2 & 8-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 7 &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 2s against 3-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 5) {
      responseResultCorrectExplanation = "Correct! Always hit 5";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 6 && !playerCards.includes("3")) {
      responseResultCorrectExplanation = "Correct! Always hit 6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum <= 3 || dealerSum >= 8) &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultCorrectExplanation = "Correct! Hit 3s against 2-3 & 8-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 7 &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 7) {
      responseResultCorrectExplanation = "Correct! Always hit 7";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if ((dealerSum == 5 || dealerSum == 6) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Double 8 against 5-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum <= 4 || dealerSum >= 7) && yourSum == 8) {
      responseResultCorrectExplanation = "Correct! Hit 8 against 2-4 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultCorrectExplanation = "Correct! Hit 9 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 12 && playerCards.includes("6")) {
      responseResultCorrectExplanation = "Correct! Hit 6s against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Split 6s against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 8 && yourSum == 14 && playerCards.includes("7")) {
      responseResultCorrectExplanation = "Correct! Hit 7s against 8-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 7 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 16 && playerCards.includes("8")) {
      responseResultIncorrectExplanation = "Incorrect. Always split 8s";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 7 || dealerSum >= 10) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on 9s against 7 & 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      ((dealerSum >= 2 && dealerSum <= 6) ||
        dealerSum == 8 ||
        dealerSum == 9) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Split 9s against 2-6 & 8-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 22) {
      responseResultIncorrectExplanation = "Incorrect. Always split As";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 11) {
      responseResultIncorrectExplanation = "Incorrect. Always double 11";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 10 && yourSum == 10) {
      responseResultCorrectExplanation = "Correct! Hit 10 against 10-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 9 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultCorrectExplanation = "Correct! Hit 9 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Double 9 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultCorrectExplanation =
        "Correct! Hit soft 13-16 against 2-3 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultCorrectExplanation =
        "Correct! Hit soft 13-16 against 2-3 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultCorrectExplanation =
        "Correct! Hit soft 13-16 against 2-3 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultCorrectExplanation =
        "Correct! Hit soft 13-16 against 2-3 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 17 && playerCards.includes("6")) {
      responseResultCorrectExplanation = "Correct! Hit soft 17 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 17 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
      responseResultCorrectExplanation = "Correct! Hit soft 18 against 9-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 6 &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 18 against 3-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultCorrectExplanation =
        "Correct! Hit hard 12 against 2-3 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 12 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 17 && !playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 19 && !playerCards.includes("8")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      yourSum == 18 &&
      !playerCards.includes("7") &&
      !playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && !playerCards.includes("9")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 7 || dealerSum == 8) &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 18 against 2 & 7-8";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 19 against 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum !== 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 19 against 2-5 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && playerCards.includes("9")) {
      responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    }
  }
}

function standSingleDeck() {
  {
    let responseResultCorrectImg = document.createElement("img");
    let responseResultIncorrectImg = document.createElement("img");
    let responseResultCorrectExplanation = "";
    let responseResultIncorrectExplanation = "";
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHand__button").classList.remove("hidden");
    document.getElementById("newHandMulti__button").classList.add("hidden");
    document
      .getElementById("singleDeck")
      .addEventListener("click", startGameSingleDeck);
    document
      .getElementById("multiDeck")
      .addEventListener("click", startGameMultiDeck);
    document
      .getElementById("newHand__button")
      .addEventListener("click", startGameSingleDeck);
    responseResultCorrectImg.src = "./img/checkMark.png";
    responseResultIncorrectImg.src = "./img/x.png";

    function incorrectResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultIncorrectImg);
    }

    function correctResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultCorrectImg);
    }

    if (
      (dealerSum == 2 || dealerSum >= 8) &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 7 &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 2s against 3-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 5) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 5";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 6 && !playerCards.includes("3")) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum <= 3 || dealerSum >= 8) &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit 3s against 2-3 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 7 &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 7) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum == 5 || dealerSum == 6) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Double 8 against 5-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum <= 4 || dealerSum >= 7) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Hit 8 against 2-4 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 6s against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Split 6s against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 8 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 7s against 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 7 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 16 && playerCards.includes("8")) {
      responseResultIncorrectExplanation = "Incorrect. Always split 8s";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 7 || dealerSum >= 10) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on 9s against 7 & 10-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      ((dealerSum >= 2 && dealerSum <= 6) ||
        dealerSum == 8 ||
        dealerSum == 9) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Split 9s against 2-6 & 8-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 22) {
      responseResultIncorrectExplanation = "Incorrect. Always split As";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 11) {
      responseResultIncorrectExplanation = "Incorrect. Always double 11";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 10 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 9 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Double 9 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 17 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 17 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 6 &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 18 against 3-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 12 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on hard 12 against 4-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultCorrectExplanation =
        "Correct! Stand on hard 13-16 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on hard 13-16 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultCorrectExplanation =
        "Correct! Stand on hard 13-16 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on hard 13-16 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 17 && !playerCards.includes("6")) {
      responseResultCorrectExplanation =
        "Correct! Always stand on hard 17-18 and 19-20";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 19 && !playerCards.includes("8")) {
      responseResultCorrectExplanation =
        "Correct! Always stand on hard 17-18 and 19-20";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      yourSum == 18 &&
      !playerCards.includes("7") &&
      !playerCards.includes("9")
    ) {
      responseResultCorrectExplanation =
        "Correct! Always stand on hard 17-18 and 19-20";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 20 && !playerCards.includes("9")) {
      responseResultCorrectExplanation =
        "Correct! Always stand on hard 17-18 and 19-20";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 7 || dealerSum == 8) &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on soft 18 against 2 & 7-8";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 19 against 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum !== 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultCorrectExplanation =
        "Correct! Stand on soft 19 against 2-5 & 7-A";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 20 && playerCards.includes("9")) {
      responseResultCorrectExplanation = "Correct! Always stand on 19-20";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    }
  }
}

function doubleSingleDeck() {
  {
    let responseResultCorrectImg = document.createElement("img");
    let responseResultIncorrectImg = document.createElement("img");
    let responseResultCorrectExplanation = "";
    let responseResultIncorrectExplanation = "";
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHand__button").classList.remove("hidden");
    document.getElementById("newHandMulti__button").classList.add("hidden");
    document
      .getElementById("singleDeck")
      .addEventListener("click", startGameSingleDeck);
    document
      .getElementById("multiDeck")
      .addEventListener("click", startGameMultiDeck);
    document
      .getElementById("newHand__button")
      .addEventListener("click", startGameSingleDeck);
    responseResultCorrectImg.src = "./img/checkMark.png";
    responseResultIncorrectImg.src = "./img/x.png";

    function incorrectResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultIncorrectImg);
    }

    function correctResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultCorrectImg);
    }

    if (
      (dealerSum == 2 || dealerSum >= 8) &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 7 &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 2s against 3-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 5) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 5";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 6 && !playerCards.includes("3")) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum <= 3 || dealerSum >= 8) &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit 3s against 2-3 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 7 &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 7) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum == 5 || dealerSum == 6) && yourSum == 8) {
      responseResultCorrectExplanation = "Correct! Double 8 against 5-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if ((dealerSum <= 4 || dealerSum >= 7) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Hit 8 against 2-4 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 6s against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Split 6s against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 8 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 7s against 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 7 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 16 && playerCards.includes("8")) {
      responseResultIncorrectExplanation = "Incorrect. Always split 8s";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 7 || dealerSum >= 10) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on 9s against 7 & 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      ((dealerSum >= 2 && dealerSum <= 6) ||
        dealerSum == 8 ||
        dealerSum == 9) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Split 9s against 2-6 & 8-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 22) {
      responseResultIncorrectExplanation = "Incorrect. Always split As";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 11) {
      responseResultCorrectExplanation = "Correct! Always double 11";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 10 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 9 && yourSum == 10) {
      responseResultCorrectExplanation = "Correct! Double 10 against 2-9";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 9) {
      responseResultCorrectExplanation = "Correct! Double 9 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultCorrectExplanation =
        "Correct! Double soft 13-16 against 4-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultCorrectExplanation =
        "Correct! Double soft 13-16 against 4-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultCorrectExplanation =
        "Correct! Double soft 13-16 against 4-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultCorrectExplanation =
        "Correct! Double soft 13-16 against 4-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 17 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 17 && playerCards.includes("6")) {
      responseResultCorrectExplanation = "Correct! Double soft 17 against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 6 &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultCorrectExplanation = "Correct! Double soft 18 against 3-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 12 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 12 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 17 && !playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 19 && !playerCards.includes("8")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      yourSum == 18 &&
      !playerCards.includes("7") &&
      !playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && !playerCards.includes("9")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 7 || dealerSum == 8) &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 18 against 2 & 7-8";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultCorrectExplanation = "Correct! Double soft 19 against 6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum !== 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 19 against 2-5 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && playerCards.includes("9")) {
      responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    }
  }
}

function splitSingleDeck() {
  {
    let responseResultCorrectImg = document.createElement("img");
    let responseResultIncorrectImg = document.createElement("img");
    let responseResultCorrectExplanation = "";
    let responseResultIncorrectExplanation = "";
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHand__button").classList.remove("hidden");
    document.getElementById("newHandMulti__button").classList.add("hidden");
    document
      .getElementById("singleDeck")
      .addEventListener("click", startGameSingleDeck);
    document
      .getElementById("multiDeck")
      .addEventListener("click", startGameMultiDeck);
    document
      .getElementById("newHand__button")
      .addEventListener("click", startGameSingleDeck);
    responseResultCorrectImg.src = "./img/checkMark.png";
    responseResultIncorrectImg.src = "./img/x.png";

    function incorrectResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultIncorrectImg);
    }

    function correctResponseResult() {
      document
        .getElementById("responseResult__icon")
        .append(responseResultCorrectImg);
    }

    if (
      (dealerSum == 2 || dealerSum >= 8) &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 7 &&
      yourSum == 4 &&
      playerCards.includes("2")
    ) {
      responseResultCorrectExplanation = "Correct! Split 2s against 3-7";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 5) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 5";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 6 && !playerCards.includes("3")) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum <= 3 || dealerSum >= 8) &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit 3s against 2-3 & 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 7 &&
      yourSum == 6 &&
      playerCards.includes("3")
    ) {
      responseResultCorrectExplanation = "Correct! Split 3s against 4-7";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 7) {
      responseResultIncorrectExplanation = "Incorrect. Always hit 7";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum == 5 || dealerSum == 6) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Double 8 against 5-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if ((dealerSum <= 4 || dealerSum >= 7) && yourSum == 8) {
      responseResultIncorrectExplanation = "Incorrect. Hit 8 against 2-4 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 12 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 6s against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 12 && playerCards.includes("6")) {
      responseResultCorrectExplanation = "Correct! Split 6s against 2-6";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (dealerSum >= 8 && yourSum == 14 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit 7s against 8-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 7 && yourSum == 14 && playerCards.includes("7")) {
      responseResultCorrectExplanation = "Correct! Split 7s against 2-7";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 16 && playerCards.includes("8")) {
      responseResultCorrectExplanation = "Correct! Always split 8s";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (
      (dealerSum == 7 || dealerSum >= 10) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on 9s against 7 & 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      ((dealerSum >= 2 && dealerSum <= 6) ||
        dealerSum == 8 ||
        dealerSum == 9) &&
      yourSum == 18 &&
      playerCards.includes("9")
    ) {
      responseResultCorrectExplanation = "Correct! Split 9s against 2-6 & 8-9";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 22) {
      responseResultCorrectExplanation = "Correct! Always split As";
      correctResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultCorrectExplanation;
    } else if (yourSum == 11) {
      responseResultIncorrectExplanation = "Incorrect. Always double 11";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 10 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 9 && yourSum == 10) {
      responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Hit 9 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 9) {
      responseResultIncorrectExplanation = "Incorrect. Double 9 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 13 &&
      playerCards.includes("2")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 14 &&
      playerCards.includes("3")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit soft 13-16 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 15 &&
      playerCards.includes("4")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 16 &&
      playerCards.includes("5")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 13-16 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 17 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 17 && playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 17 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
      responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 3 &&
      dealerSum <= 6 &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 18 against 3-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 12 against 2-3 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 4 &&
      dealerSum <= 6 &&
      yourSum == 12 &&
      !playerCards.includes("6")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 12 against 4-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 14 &&
      !playerCards.includes("3") &&
      !playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum >= 7 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Hit hard 13-16 against 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      dealerSum <= 6 &&
      yourSum == 16 &&
      !playerCards.includes("5") &&
      !playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on hard 13-16 against 2-6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 17 && !playerCards.includes("6")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 19 && !playerCards.includes("8")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      yourSum == 18 &&
      !playerCards.includes("7") &&
      !playerCards.includes("9")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && !playerCards.includes("9")) {
      responseResultIncorrectExplanation =
        "Incorrect. Always stand on hard 17-18 and 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 2 || dealerSum == 7 || dealerSum == 8) &&
      yourSum == 18 &&
      playerCards.includes("7")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 18 against 2 & 7-8";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum == 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Double soft 19 against 6";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (
      (dealerSum !== 6) & (yourSum == 19) &&
      playerCards.includes("8")
    ) {
      responseResultIncorrectExplanation =
        "Incorrect. Stand on soft 19 against 2-5 & 7-A";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    } else if (yourSum == 20 && playerCards.includes("9")) {
      responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
      incorrectResponseResult();
      document.getElementById("responseResult__explanation").innerText =
        responseResultIncorrectExplanation;
    }
  }
}

function getValue(card) {
  let data = card.split(""); // "4C" => ["4", "C"]
  let value = data[0];

  if (value == "1") {
    return 10;
  }

  if (isNaN(value)) {
    //A J Q K
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function startGameMultiDeck() {
  document
    .getElementById("responseResultMulti__icon")
    .classList.remove("hidden");
  document.getElementById("responseResult__icon").classList.add("hidden");
  document.getElementById("responseResultMulti__icon").innerHTML = "";
  document.getElementById("responseResult__explanation").innerHTML = "";
  document.getElementById("singleDeck").classList.remove("gameButtonCurrent");
  document.getElementById("hit").classList.remove("hidden");
  document.getElementById("stand").classList.remove("hidden");
  document.getElementById("double").classList.remove("hidden");
  document.getElementById("split").classList.remove("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.add("hidden");
  document.getElementById("dealerCard").innerHTML = "";
  document.getElementById("playerCards").innerHTML = "";
  yourSum = 0;
  playerCards.length = 0;

  let cardImg = document.createElement("img");
  let card = deck[Math.floor(Math.random() * deck.length)];
  cardImg.src = "./img/" + card + ".png";
  dealerSum = getValue(card);
  document.getElementById("multiDeck").classList.add("gameButtonCurrent");
  document.getElementById("dealerCard").append(cardImg);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let playerCard = deck[Math.floor(Math.random() * deck.length)];
    cardImg.src = "./img/" + playerCard + ".png";
    yourSum += getValue(playerCard);
    yourAceCount += checkAce(playerCard);
    document.getElementById("playerCards").append(cardImg);
    playerCards.push(playerCard[0]);
  }

  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);

  if (yourSum == 21) {
    document.getElementById("hit").classList.add("hidden");
    document.getElementById("stand").classList.add("hidden");
    document.getElementById("double").classList.add("hidden");
    document.getElementById("split").classList.add("hidden");
    document.getElementById("newHandMulti__button").classList.remove("hidden");
    document
      .getElementById("newHandMulti__button")
      .addEventListener("click", startGameMultiDeck);
    let blackJackImg = document.createElement("img");
    blackJackImg.src = "./img/checkMark.png";
    document.getElementById("responseResultMulti__icon").append(blackJackImg);
    document.getElementById("responseResult__explanation").innerText =
      "Black Jack!";
  } else {
    document.getElementById("hit").addEventListener("click", hitMultiDeck);
    document.getElementById("stand").addEventListener("click", standMultiDeck);
    document
      .getElementById("double")
      .addEventListener("click", doubleMultiDeck);
    document.getElementById("split").addEventListener("click", splitMultiDeck);
  }
}

function hitMultiDeck() {
  let responseResultCorrectImg = document.createElement("img");
  let responseResultIncorrectImg = document.createElement("img");
  let responseResultCorrectExplanation = "";
  let responseResultIncorrectExplanation = "";
  document.getElementById("hit").classList.add("hidden");
  document.getElementById("stand").classList.add("hidden");
  document.getElementById("double").classList.add("hidden");
  document.getElementById("split").classList.add("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.remove("hidden");
  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);
  document
    .getElementById("newHandMulti__button")
    .addEventListener("click", startGameMultiDeck);
  responseResultCorrectImg.src = "./img/checkMark.png";
  responseResultIncorrectImg.src = "./img/x.png";

  function incorrectResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultIncorrectImg);
  }

  function correctResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultCorrectImg);
  }

  if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultCorrectExplanation = "Correct! Hit 2s against 2-3 & 8-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 2s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 5) {
    responseResultCorrectExplanation = "Correct! Always hit 5";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 6 && !playerCards.includes("3")) {
    responseResultCorrectExplanation = "Correct! Always hit 6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultCorrectExplanation = "Correct! Hit 3s against 2-3 & 8-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 7) {
    responseResultCorrectExplanation = "Correct! Always hit 7";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 8 && !playerCards.includes("4")) {
    responseResultCorrectExplanation = "Correct! Always hit 8";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 8 && playerCards.includes("4")) {
    responseResultCorrectExplanation = "Correct! Always hit 4s";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultCorrectExplanation = "Correct! Hit 9 against 2 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Hit 6s against 2 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 6s against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 8 && yourSum == 14 && !playerCards.includes("7")) {
    responseResultCorrectExplanation = "Correct! Hit 14 against 8-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 7 &&
    yourSum == 14 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 16 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always split 8s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum >= 10) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on 9s against 7 & 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 6) || dealerSum == 8 || dealerSum == 9) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Split 9s against 2-6 & 8-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 22) {
    responseResultIncorrectExplanation = "Incorrect. Always split As";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum == 11 && yourSum == 11) {
    responseResultCorrectExplanation = "Correct! Hit 11 against A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum <= 10 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Double 11 against 2-10";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 10 && yourSum == 10) {
    responseResultCorrectExplanation = "Correct! Hit 10 against 10-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum <= 9 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultCorrectExplanation = "Correct! Hit 9 against 2 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 3 && dealerSum <= 6 && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Double 9 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultCorrectExplanation =
      "Correct! Hit soft 13 and soft 14 against 2-4 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultCorrectExplanation =
      "Correct! Hit soft 13 and soft 14 against 2-4 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultCorrectExplanation =
      "Correct! Hit soft 15 and soft 16 against 2-3 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultCorrectExplanation =
      "Correct! Hit soft 15 and soft 16 against 2-3 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Hit soft 17 against 2 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 17 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
    responseResultCorrectExplanation = "Correct! Hit soft 18 against 9-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 6 &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 18 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Hit hard 12 against 2-3 & 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 12 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultCorrectExplanation = "Correct! Hit hard 13-16 against 7-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 17 && !playerCards.includes("6")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && !playerCards.includes("8")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    yourSum == 18 &&
    !playerCards.includes("7") &&
    !playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && !playerCards.includes("9")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum == 8) &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on soft 18 against 7-8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && playerCards.includes("9")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  }
}

function standMultiDeck() {
  let responseResultCorrectImg = document.createElement("img");
  let responseResultIncorrectImg = document.createElement("img");
  let responseResultCorrectExplanation = "";
  let responseResultIncorrectExplanation = "";
  document.getElementById("hit").classList.add("hidden");
  document.getElementById("stand").classList.add("hidden");
  document.getElementById("double").classList.add("hidden");
  document.getElementById("split").classList.add("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.remove("hidden");
  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);
  document
    .getElementById("newHandMulti__button")
    .addEventListener("click", startGameMultiDeck);
  responseResultCorrectImg.src = "./img/checkMark.png";
  responseResultIncorrectImg.src = "./img/x.png";

  function incorrectResponseResultMulti() {
    document
      .getElementById("responseResulMulti__icon")
      .append(responseResultIncorrectImg);
  }

  function correctResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultCorrectImg);
  }

  if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 2s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 5) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 5";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 6 && !playerCards.includes("3")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 3s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 7) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 4s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 6s against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 6s against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 8 && yourSum == 14 && !playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit 14 against 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 7 &&
    yourSum == 14 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 16 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always split 8s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum >= 10) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultCorrectExplanation = "Correct! Stand on 9s against 7 & 10-A";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 6) || dealerSum == 8 || dealerSum == 9) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Split 9s against 2-6 & 8-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 22) {
    responseResultIncorrectExplanation = "Incorrect. Always split As";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum == 11 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Hit 11 against A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 10 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Double 11 against 2-10";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 10 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 9 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 3 && dealerSum <= 6 && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Double 9 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 17 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 17 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 6 &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 18 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 12 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Stand on hard 12 against 4-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultCorrectExplanation =
      "Correct! Stand on hard 13-16 against 2-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultCorrectExplanation =
      "Correct! Stand on hard 13-16 against 2-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultCorrectExplanation =
      "Correct! Stand on hard 13-16 against 2-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultCorrectExplanation =
      "Correct! Stand on hard 13-16 against 2-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 17 && !playerCards.includes("6")) {
    responseResultCorrectExplanation =
      "Correct! Always stand on hard 17-18 and 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 19 && !playerCards.includes("8")) {
    responseResultCorrectExplanation =
      "Correct! Always stand on hard 17-18 and 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    yourSum == 18 &&
    !playerCards.includes("7") &&
    !playerCards.includes("9")
  ) {
    responseResultCorrectExplanation =
      "Correct! Always stand on hard 17-18 and 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 20 && !playerCards.includes("9")) {
    responseResultCorrectExplanation =
      "Correct! Always stand on hard 17-18 and 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum == 8) &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultCorrectExplanation = "Correct! Stand on soft 18 against 7-8";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 19 && playerCards.includes("8")) {
    responseResultCorrectExplanation = "Correct! Always stand on 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 20 && playerCards.includes("9")) {
    responseResultCorrectExplanation = "Correct! Always stand on 19-20";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  }
}

function doubleMultiDeck() {
  let responseResultCorrectImg = document.createElement("img");
  let responseResultIncorrectImg = document.createElement("img");
  let responseResultCorrectExplanation = "";
  let responseResultIncorrectExplanation = "";
  document.getElementById("hit").classList.add("hidden");
  document.getElementById("stand").classList.add("hidden");
  document.getElementById("double").classList.add("hidden");
  document.getElementById("split").classList.add("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.remove("hidden");
  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);
  document
    .getElementById("newHandMulti__button")
    .addEventListener("click", startGameMultiDeck);
  responseResultCorrectImg.src = "./img/checkMark.png";
  responseResultIncorrectImg.src = "./img/x.png";

  function incorrectResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultIncorrectImg);
  }

  function correctResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultCorrectImg);
  }

  if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 2s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 5) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 5";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 6 && !playerCards.includes("3")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 3s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 3s against 4-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 7) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 4s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 6s against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 6s against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 8 && yourSum == 14 && !playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit 14 against 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 7 &&
    yourSum == 14 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Split 7s against 2-7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 16 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always split 8s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum >= 10) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on 9s against 7 & 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 6) || dealerSum == 8 || dealerSum == 9) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Split 9s against 2-6 & 8-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 22) {
    responseResultIncorrectExplanation = "Incorrect. Always split As";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum == 11 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Hit 11 against A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 10 && yourSum == 11) {
    responseResultCorrectExplanation = "Correct! Double 11 against 2-10";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 10 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 9 && yourSum == 10) {
    responseResultCorrectExplanation = "Correct! Double 10 against 2-9";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 3 && dealerSum <= 6 && yourSum == 9) {
    responseResultCorrectExplanation = "Correct! Double 9 against 3-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultCorrectExplanation =
      "Correct! Double soft 13 and soft 14 against 5-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultCorrectExplanation =
      "Correct! Double soft 13 and soft 14 against 5-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultCorrectExplanation =
      "Correct! Double soft 15 and soft 16 against 4-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultCorrectExplanation =
      "Correct! Double soft 15 and soft 16 against 4-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 17 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Double soft 17 against 3-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 6 &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultCorrectExplanation = "Correct! Double soft 18 against 2-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 12 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 12 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 17 && !playerCards.includes("6")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && !playerCards.includes("8")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    yourSum == 18 &&
    !playerCards.includes("7") &&
    !playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && !playerCards.includes("9")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum == 8) &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on soft 18 against 7-8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && playerCards.includes("9")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  }
}

function splitMultiDeck() {
  let responseResultCorrectImg = document.createElement("img");
  let responseResultIncorrectImg = document.createElement("img");
  let responseResultCorrectExplanation = "";
  let responseResultIncorrectExplanation = "";
  document.getElementById("hit").classList.add("hidden");
  document.getElementById("stand").classList.add("hidden");
  document.getElementById("double").classList.add("hidden");
  document.getElementById("split").classList.add("hidden");
  document.getElementById("newHand__button").classList.add("hidden");
  document.getElementById("newHandMulti__button").classList.remove("hidden");
  document
    .getElementById("singleDeck")
    .addEventListener("click", startGameSingleDeck);
  document
    .getElementById("multiDeck")
    .addEventListener("click", startGameMultiDeck);
  document
    .getElementById("newHandMulti__button")
    .addEventListener("click", startGameMultiDeck);
  responseResultCorrectImg.src = "./img/checkMark.png";
  responseResultIncorrectImg.src = "./img/x.png";

  function incorrectResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultIncorrectImg);
  }

  function correctResponseResultMulti() {
    document
      .getElementById("responseResultMulti__icon")
      .append(responseResultCorrectImg);
  }

  if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 2s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 4 &&
    playerCards.includes("2")
  ) {
    responseResultCorrectExplanation = "Correct! Split 2s against 4-7";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 5) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 5";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 6 && !playerCards.includes("3")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum <= 3 || dealerSum >= 8) &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 3s against 2-3 & 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 7 &&
    yourSum == 6 &&
    playerCards.includes("3")
  ) {
    responseResultCorrectExplanation = "Correct! Split 3s against 4-7";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 7) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 7";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 8 && playerCards.includes("4")) {
    responseResultIncorrectExplanation = "Incorrect. Always hit 4s";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation = "Incorrect. Hit 6s against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    playerCards.includes("6")
  ) {
    responseResultCorrectExplanation = "Correct! Split 6s against 3-6";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum >= 8 && yourSum == 14 && !playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit 14 against 8-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 7 &&
    yourSum == 14 &&
    playerCards.includes("7")
  ) {
    responseResultCorrectExplanation = "Correct! Split 7s against 2-7";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 16 && playerCards.includes("8")) {
    responseResultCorrectExplanation = "Correct! Always split 8s";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum >= 10) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on 9s against 7 & 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 6) || dealerSum == 8 || dealerSum == 9) &&
    yourSum == 18 &&
    playerCards.includes("9")
  ) {
    responseResultCorrectExplanation = "Correct! Split 9s against 2-6 & 8-9";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (yourSum == 22) {
    responseResultCorrectExplanation = "Correct! Always split As";
    correctResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultCorrectExplanation;
  } else if (dealerSum == 11 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Hit 11 against A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 10 && yourSum == 11) {
    responseResultIncorrectExplanation = "Incorrect. Double 11 against 2-10";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 10 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Hit 10 against 10-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 9 && yourSum == 10) {
    responseResultIncorrectExplanation = "Incorrect. Double 10 against 2-9";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if ((dealerSum == 2 || dealerSum >= 7) && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Hit 9 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 3 && dealerSum <= 6 && yourSum == 9) {
    responseResultIncorrectExplanation = "Incorrect. Double 9 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    ((dealerSum >= 2 && dealerSum <= 4) || dealerSum >= 7) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 13 and soft 14 against 2-4 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 13 &&
    playerCards.includes("2")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 5 || dealerSum == 6) &&
    yourSum == 14 &&
    playerCards.includes("3")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 13 and soft 14 against 5-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 15 and soft 16 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 15 &&
    playerCards.includes("4")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 16 &&
    playerCards.includes("5")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 15 and soft 16 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum >= 7) &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit soft 17 against 2 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 3 &&
    dealerSum <= 6 &&
    yourSum == 17 &&
    playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 17 against 3-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 9 && yourSum == 18 && playerCards.includes("7")) {
    responseResultIncorrectExplanation = "Incorrect. Hit soft 18 against 9-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 2 &&
    dealerSum <= 6 &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Double soft 18 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 2 || dealerSum == 3 || dealerSum >= 7) &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 12 against 2-3 & 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 4 &&
    dealerSum <= 6 &&
    yourSum == 12 &&
    !playerCards.includes("6")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 12 against 4-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 13 && !playerCards.includes("2")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 14 &&
    !playerCards.includes("3") &&
    !playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum >= 7 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (dealerSum <= 6 && yourSum == 15 && !playerCards.includes("4")) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum >= 7 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Hit hard 13-16 against 7-A";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    dealerSum <= 6 &&
    yourSum == 16 &&
    !playerCards.includes("5") &&
    !playerCards.includes("8")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on hard 13-16 against 2-6";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 17 && !playerCards.includes("6")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && !playerCards.includes("8")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    yourSum == 18 &&
    !playerCards.includes("7") &&
    !playerCards.includes("9")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && !playerCards.includes("9")) {
    responseResultIncorrectExplanation =
      "Incorrect. Always stand on hard 17-18 and 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (
    (dealerSum == 7 || dealerSum == 8) &&
    yourSum == 18 &&
    playerCards.includes("7")
  ) {
    responseResultIncorrectExplanation =
      "Incorrect. Stand on soft 18 against 7-8";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 19 && playerCards.includes("8")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  } else if (yourSum == 20 && playerCards.includes("9")) {
    responseResultIncorrectExplanation = "Incorrect. Always stand on 19-20";
    incorrectResponseResultMulti();
    document.getElementById("responseResult__explanation").innerText =
      responseResultIncorrectExplanation;
  }
}
