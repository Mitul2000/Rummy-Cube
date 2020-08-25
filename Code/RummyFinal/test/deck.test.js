const deck = require("./js_test/Deckf.js");
const playerdeck = [
  "A Hearts",
  "A Spades",
  "A Dimonds",
  "A Clover",
  "2 Hearts",
  "2 Spades",
  "2 Dimonds",
  "2 Clover",
];

test("Should be falsy", () => {
  expect(deck.checkvalue(null)).toBeFalsy();
});
test("testing drawing a card", () => {
  expect(deck.deal(playerdeck)).toEqual("2 Clover");
});

test("testing shuffling deck", () => {
  expect(deck.shuffleDeck(playerdeck)).toEqual(playerdeck);
});
