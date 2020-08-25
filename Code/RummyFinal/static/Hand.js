export default class Hands {
  constructor(playerId) {
    this.playerId = playerId;
  }

  cardDroppableEvent() {
    var hand = document.getElementById("cards");
    hand.addEventListener("dragover", (e) => {
      const draggable = document.querySelector(".dragging");
      hand.appendChild(draggable);
    });
  }

  sortHand() {
    var $wrapper = $("#cards");
    $wrapper
      .find(".draggable")
      .sort(function (a, b) {
        return +a.dataset.name - +b.dataset.name;
      })
      .appendTo($wrapper);
  }
  //updates playerhand
  updateplayerhand() {
    this.playerHand = $("#cards").html();
  }

  returnCards() {
    $("#cards").html(this.playerHand);
  }
}
