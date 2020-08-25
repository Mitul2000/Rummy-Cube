const socket = io();
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

var name = "";

socket.emit("goinglive", "player");
socket.on("iniciateseq", (data) => {
  console.log(data);
  sequence(data);
});

function sequence(Name) {
  name = Name;
  document.getElementById("playerName").innerText = name;
  document.getElementById("playerNames").innerText = name;
  appendYourMessage("You Joined");
  socket.emit("new-user", name);
}

socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendYourMessage(`${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "Oncommingtext");
  messageElement.innerHTML = "<span>" + message + "</span>";
  messageContainer.append(messageElement);
}

function appendYourMessage(message) {
  const yourMessageElement = document.createElement("div");
  yourMessageElement.setAttribute("class", "yourMessage");
  yourMessageElement.innerHTML = "<span>" + message + "</span>";
  messageContainer.append(yourMessageElement);
}

export { socket };
