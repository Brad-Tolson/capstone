const MAX_DECK_SIZE = 100;
const deckList = document.getElementById("deck-list");
const cardNameInput = document.getElementById("card-name");
const landCountInput = document.getElementById("land-count");
const landColorInput = document.getElementById("land-color");
const cardCounts = {};

let hand = [];

const defaultDeck = ["Card A", "Card B", "Card C", "Card D", "Card E", "Land", "Land", "Land"];

let deck = defaultDeck;

function renderHand(cards) {
  const handElement = document.getElementById("hand-container");
  handElement.innerHTML = "";

  cards.forEach(card => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.textContent = card;

    handElement.appendChild(cardElement);
  });
}

function renderDeckList() {
  deckList.innerHTML = "";

  deck.forEach((card) => {
    const li = document.createElement("li");
    const text = document.createTextNode(card);
    li.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteCard(card);
      renderDeckList(); 
    });
    li.appendChild(deleteButton);

    deckList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDeckList();
});

function deleteCard(card) {
  const index = deck.indexOf(card);
  if (index > -1) {
    deck.splice(index, 1);
    cardCounts[card]--;

    if (cardCounts[card] === 0) {
      delete cardCounts[card];
    }

    renderDeckList();
  }
}

function addCard() {
  const cardName = cardNameInput.value.trim();

  if (!cardName) {
    return;
  }

  if (deck.length >= MAX_DECK_SIZE) {
    alert("Deck is full.");
    return;
  }

  if (!cardCounts[cardName]) {
    deck.push(cardName);
    cardCounts[cardName] = 1;
  } else {
    if (deck.length + 1 - cardCounts[cardName] > MAX_DECK_SIZE) {
      alert("Deck is full.");
      return;
    }
    cardCounts[cardName]++;
    deck.push(cardName);
  }

  cardNameInput.value = "";
  renderDeckList();
}

const addCardButton = document.querySelector('button[data-action="add-card"]');
addCardButton.addEventListener("click", addCard);

function addLands() {
  const landCount = Number(landCountInput.value);
  const landColor = landColorInput.value;

  if (isNaN(landCount) || landCount < 1) {
    alert("Please enter a valid land count.");
    return;
  }

  const landName = `${landColor} `;

  for (let i = 0; i < landCount; i++) {
    if (deck.length >= MAX_DECK_SIZE) {
      alert("Deck is full.");
      return;
    }

    deck.push(landName);
  }

  landCountInput.value = "";
  renderDeckList();
}

const addLandsButton = document.querySelector('button[data-action="add-lands"]');
addLandsButton.addEventListener("click", addLands);

function getRandomCards(numCards = 7) {
  if (deck.length < numCards) {
    alert("Deck does not have enough cards.");
    return;
  }

  for (let i = 0; i < numCards; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck.splice(randomIndex, 1)[0];
    hand.push(randomCard);
  }

  renderDeckList();
  renderHand(hand);
}

const getRandomCardsButton = document.querySelector('button[data-action="get-random-cards"]');
getRandomCardsButton.addEventListener("click", () => {
  getRandomCards(7);
});

function drawCard() {
  if (deck.length === 0) {
    alert("The deck is empty.");
    return;
  }

  const cardIndex = Math.floor(Math.random() * deck.length);
  const card = deck[cardIndex];

  
  deck.splice(cardIndex, 1);


  hand.push(card);

  renderHand(hand);
  renderDeckList();
}

const drawCardButton = document.querySelector('button[data-action="draw-card"]');
drawCardButton.addEventListener("click", drawCard);


function returnToDeck() {
  while (hand.length > 0) {
    deck.push(hand.shift());
  }
  renderDeckList();
  renderHand(hand);
}

const returnToDeckButton = document.querySelector('button[data-action="return-to-deck"]');
returnToDeckButton.addEventListener("click", returnToDeck);

function clearDeck() {
  while (deckList.firstChild) {
    deckList.removeChild(deckList.firstChild);
  }

  deck = [];
}

const clearDeckButton = document.querySelector('button[data-action="clear-deck"]');
clearDeckButton.addEventListener("click", clearDeck);



