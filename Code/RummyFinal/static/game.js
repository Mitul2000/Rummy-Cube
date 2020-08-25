import Deck from "./Deck.js";
import Board from "./Board.js";
// import Tile from "./tiles.js";
import Hand from "./Hand.js";
import BoardState from "./BoardState.js";
import { socket } from "./Chat.js";

//used for creating a deck
let suits = ["#f54842", "#42cbf5", "#55c25b", "#6f487a"];
let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var Id = 0;
var seconds = 0;

//Deck Initilization
let deck = 0;
// deck.createDeck(suits, values);
let shuffleDeck = 0;
// console.log(shuffleDeck);

async function info() {
  const response = await fetch("/info");
  const val = await response.json();

  showinfo(val.data);
}
info();

function showinfo(info) {
  var impdata = info;
  if (impdata == 0) {
    deck = new Deck();
    deck.createDeck(suits, values);
    shuffleDeck = deck.shuffleDeck();
    for (var i = 0; i < 5; i++) {
      generateDeck();
    }
    hand.updateplayerhand();
    sharedeck();
    console.log(deck);
  } else {
    deck = new Deck();
    deck.makecustomDeck(impdata);
    shuffleDeck = deck.shuffleDeck();
    for (var i = 0; i < 5; i++) {
      generateDeck();
    }
    hand.updateplayerhand();
    sharedeck();
    emitrecentDeck();
    console.log(deck);
  }
  console.log(impdata);
}

//consoles board.
let board = new Board(suits);
board.createGrid();
board.snap();

const database = [];

socket.on("event", (data) => {
  database.push(data);
  console.log(database);
});

//------------------

socket.on("startGame", (data) => {
  console.log("player : " + data + " turn");
  starttimer();
});

function starttimer() {
  Id = window.setInterval(printmsg, 1000);
}
function stoptimer() {
  window.clearInterval(Id);
}

function generateDeck() {
  deck.drawCard();
  deck.CardEvents();
}

function printmsg() {
  $("#op").html(20 - seconds + " s");
  seconds++;
  if (seconds == 22) {
    generateDeck();
    emitrecentDeck();
    endturn();
  }
}
//-------------

var boardState = new BoardState();
boardState.UpdateState();

var hand = new Hand("player 1");
$("#decks").click(function () {
  if (seconds != 0) {
    endturn();
  }
});

//allows player to drop the hard in their hand
hand.cardDroppableEvent();
//sorts the hand when sorthand is clicked
$("#sorthand").click(function () {
  hand.sortHand();
});

$("#validate").click(function () {
  if (seconds != 0) {
    endturn();
  }
});

function endturn() {
  stoptimer();
  seconds = 0;
  $("#op").html("Opponent Turn");
  if (board.validate()) {
    boardState.UpdateState();
    emitboard();
  } else {
    console.log("False");
    boardState.PreviousBoard();
    board.snap();
    hand.returnCards();
    hand.cardDroppableEvent();
    deck.CardEvents();
    generateDeck();
    emitrecentDeck();
  }
  hand.updateplayerhand();
  socket.emit("ending-turn", "nextplayer");
}

function sharedeck() {
  socket.emit("deck", shuffleDeck);
}

function emitrecentDeck() {
  var curdeck = deck.getdeck();
  socket.emit("curdeck", curdeck);
}
socket.on("updatepDeck", (data) => {
  deck.makecustomDeck(data);
  console.log(data);
});

function emitboard() {
  var curboard = boardState.getboard();
  socket.emit("currentboard", curboard);
}

socket.on("updateBoard", (data) => {
  boardState.setboard(data);
  boardState.UpdateState();
  board.snap();
  hand.cardDroppableEvent();
  deck.CardEvents();
});
