export default class BoardState {
  constructor() {
    this.grid = $("#board").html();
  }

  UpdateState() {
    this.grid = $("#board").html();
  }

  PreviousBoard() {
    $("#board").html(this.grid);
  }
  getboard() {
    return this.grid;
  }
  setboard(item) {
    $("#board").html(item);
  }
}
