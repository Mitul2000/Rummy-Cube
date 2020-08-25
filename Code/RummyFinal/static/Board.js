import Tile from "./tiles.js";
export default class Board {
  constructor(boardstate) {
    this.Board = boardstate;
  }
  createGrid() {
    for (var x = 0; x < 126; x++) {
      var div = document.createElement("div");
      div.setAttribute("class", "empty");
      document.getElementById("board").appendChild(div);
    }
  }

  display() {
    console.log(this.Board);
  }

  snap() {
    const empties = document.querySelectorAll(".empty");
    empties.forEach((empty) => {
      empty.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (empty.hasChildNodes() == false) {
          const draggable = document.querySelector(".dragging");
          empty.appendChild(draggable);
        }
      });
    });
  }

  getBoard() {
    var boardData = [];

    var Data = [];
    var temprow = [];
    $(".empty").each(function (item) {
      var tile = new Tile(
        item,
        $(this).children().text(),
        $(this).children().attr("value")
      );
      boardData.push(tile);
    });

    for (var i = 0; i < boardData.length; i++) {
      temprow.push(boardData[i]);
      if (i == 20 || i == 41 || i == 62 || i == 83 || i == 104 || i == 125) {
        Data.push(temprow);
        temprow = [];
      }
    }

    return Data;
  }

  //validates the board and to see if player move is valid.
  validate() {
    var subrow = [];
    var tempnumberSet = [];
    var refBoard = this.getBoard();
    var Boardvalidity = true;

    for (var i = 0; i < refBoard.length; i++) {
      for (var j = 0; j < refBoard[i].length; j++) {
        if (refBoard[i][j].value != 0) {
          var refTile = new Tile(
            refBoard[i][j].index,
            refBoard[i][j].value,
            refBoard[i][j].color
          );
          tempnumberSet.push(refTile);
        } else {
          if (tempnumberSet.length > 0) {
            subrow.push(tempnumberSet);
            tempnumberSet = [];
          }
        }
      }
    }
    if (subrow.length == 0) {
      Boardvalidity = false;
    }

    for (var i = 0; i < subrow.length; i++) {
      if (subrow[i].length < 3) {
        Boardvalidity = false;
      } else if (!isSet(subrow[i])) {
        if (!isRun(subrow[i])) {
          Boardvalidity = false;
        }
      }
    }
    return Boardvalidity;
  }
}

// function which identifies if a given subarray is a Run
function isRun(set) {
  var count = 0;
  var subRowLength = set.length;
  var output = false;
  for (var i = 0; i < set.length - 1; i++) {
    if (
      (set[i].value - set[i + 1].value == -1 &&
        set[i].color.localeCompare(set[i + 1].color) == 0) ||
      set[i].value.includes("J")
    ) {
      count++;
    }
  }
  if (subRowLength == count + 1) {
    output = true;
  }
  return output;
}

// function which identifies if a given subarray is a Set
function isSet(set) {
  var setValue = set[0].value;
  var output = false;
  var count = 0;

  for (var i = 0; i < set.length; i++) {
    if (setValue == set[i].value || set[i].value.includes("J")) {
      count++;
    }
  }
  if (count == set.length) {
    output = true;
  }
  return output;
}
