const MAX_DECK_SIZE = 100;
const deckList = document.getElementById("deck-list");
const cardNameInput = document.getElementById("card-name");
const landCountInput = document.getElementById("land-count");
const landColorInput = document.getElementById("land-color");
const cardCounts = {};

let hand = [];

const defaultDeck = [ "Arid Mesa",
"Arid Mesa",
"Bloodstained Mire",
"Bloodstained Mire",
"Bloodstained Mire",
"Boros Charm",
"Boros Charm",
"Boros Charm",
"Boros Charm",
"Eidolon of the Great Revel",
"Eidolon of the Great Revel",
"Eidolon of the Great Revel",
"Eidolon of the Great Revel",
"Fiery Islet",
"Goblin Guide",
"Goblin Guide",
"Goblin Guide",
"Goblin Guide",
"Inspiring Vantage",
"Inspiring Vantage",
"Inspiring Vantage",
"Inspiring Vantage",
"Lava Spike",
"Lava Spike",
"Lava Spike",
"Lava Spike",
"Lightning Bolt",
"Lightning Bolt",
"Lightning Bolt",
"Lightning Bolt",
"Lightning Helix",
"Lightning Helix",
"Monastery Swiftspear",
"Monastery Swiftspear",
"Monastery Swiftspear",
"Monastery Swiftspear",
"Mountain",
"Mountain",
"Mountain",
"Rift Bolt",
"Rift Bolt",
"Rift Bolt",
"Rift Bolt",
"Sacred Foundry",
"Sacred Foundry",
"Searing Blaze",
"Searing Blaze",
"Searing Blaze",
"Searing Blaze",
"Skewer the Critics",
"Skewer the Critics",
"Skewer the Critics",
"Skewer the Critics",
"Skullcrack",
"Skullcrack",
"Sunbaked Canyon",
"Sunbaked Canyon",
"Sunbaked Canyon",
"Sunbaked Canyon",
"Wooded Foothills"];

let deck = defaultDeck;

async function renderHand(cards) {
  const handElement = document.getElementById("hand-container");
  handElement.innerHTML = "";

  for (const card of cards) {
    const cardElement = document.createElement("img");
    cardElement.classList.add("card");
    cardElement.style.width = "250px"; // set width to desired size
    cardElement.style.height = "350px"; // set height to desired size
    const imageUrl = await getCardImageUrl(card);
    cardElement.src = imageUrl;

    handElement.appendChild(cardElement);
  }
}

async function getCardImageUrl(cardName) {
  const response = await fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`);
  const cardData = await response.json();
  return cardData.image_uris.normal;
}




function renderDeckList() {
  deckList.innerHTML = "";

  deck.forEach((card) => {
    const li = document.createElement("li");
    const text = document.createTextNode(card);
    li.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style.marginLeft = "10px"; 
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

const addCardButton = document.getElementById("add-card-btn");
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

const addLandButton = document.getElementById("add-land-btn");
addLandButton.addEventListener("click", addLands);

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

const drawCardButton = document.getElementById("draw-card-btn");
drawCardButton.addEventListener("click", drawCard);


function returnToDeck() {
  while (hand.length > 0) {
    deck.push(hand.shift());
  }
  renderDeckList();
  renderHand(hand);
}

const returnToDeckButton = document.getElementById("return-to-deck-btn");
returnToDeckButton.addEventListener("click", returnToDeck);

function clearDeck() {
  while (deckList.firstChild) {
    deckList.removeChild(deckList.firstChild);
  }

  deck = [];
}

const clearDeckButton = document.getElementById("clear-deck-btn");
clearDeckButton.addEventListener("click", clearDeck);