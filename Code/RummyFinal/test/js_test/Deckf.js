const deck = {
  checkvalue: (x) => x,
  shuffleDeck: (Deck) => {
    let thisDeck = Deck;
    let counter = thisDeck.length,
      temp,
      i;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = thisDeck[counter];
      thisDeck[counter] = thisDeck[i];
      thisDeck[i] = temp;
    }
    return thisDeck;
  },
  deal: (Deck) => {
    let hand;
    let thisDeck = Deck;
    hand = thisDeck.pop();
    return hand;
  },
};

module.exports = deck;
