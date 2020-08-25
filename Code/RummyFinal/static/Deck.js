//class of cards which holds a suit and value
class Cards {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

//Class for deck which holds the deck of cards
export default class Deck {
  constructor() {
    this.deck = [];
  }
  //creats the deck
  createDeck(suits, values) {
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push(new Cards(suit, value));
      }
    }
    this.deck.push(new Cards("#ffb3ff", "J"));
    this.deck.push(new Cards("#ffb3ff", "J"));
    return this.deck;
  }
  makecustomDeck(item) {
    this.deck = item;
  }

  //shuffles the deck
  shuffleDeck() {
    let counter = this.deck.length,
      temp,
      i;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = this.deck[counter];
      this.deck[counter] = this.deck[i];
      this.deck[i] = temp;
    }
    return this.deck;
  }

  getdeck() {
    return this.deck;
  }

  //deals card from the deck
  deal() {
    let hand;
    hand = this.deck.pop();
    return hand;
  }

  //creates hand attribute on a div
  createCards(hand) {
    var playerCard = document.createElement("div");
    playerCard.setAttribute("class", "draggable");
    playerCard.setAttribute("draggable", "true");
    playerCard.setAttribute("data-name", `${hand.value}`);
    playerCard.setAttribute("value", `${hand.suit}`);

    playerCard.innerHTML = hand.value;
    playerCard.style.backgroundColor = hand.suit;

    document.getElementById("cards").appendChild(playerCard);
  }

  //deal from deck of cards array and creates a draggable element.
  drawCard() {
    var drawHand = this.deal();
    this.createCards(drawHand);
  }

  //for every card draggable element, there is a card element.
  CardEvents() {
    var draggables = document.querySelectorAll(".draggable");

    //drag Start event
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
        console.log("start");
      });

      //dragend event
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        console.log("end");
      });
    });
  }
}
