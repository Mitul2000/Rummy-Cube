var express = require("express");
var http = require("http");
var path = require("path");
var socketIO = require("socket.io");
var app = express();
var server = http.Server(app);
var io = socketIO(server);
var fs = require("fs");
var turncounter = 1;

const bodyParser = require("body-parser");
var deckcards = 0;
app.set("port", 5000);
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

// function ID() {
//   // Math.random should be unique because of its seeding algorithm.
//   // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//   // after the decimal.
//   return "_" + Math.random().toString(36).substr(2, 9);
// }
const roomid = "_" + Math.random().toString(36).substr(2, 9);

const people = [];
function databasePeoples(name, isAdmin, roomid) {
  this.name = name;
  this.isAdmin = isAdmin;
  this.roomid = roomid;
}

app.post("/game", (req, res) => {
  console.log("logging new user");
  console.log("name: " + req.body.name);
  console.log("roomid: " + req.body.JoinRoom);

  if (req.body.CreateRoom) {
    const newUser = new databasePeoples(req.body.name, true, "null");
    people.push(newUser);
    res.sendFile(path.join(__dirname, "/static/playerloby.html"));
  } else {
    if (roomid == req.body.JoinRoom) {
      const newUser = new databasePeoples(
        req.body.name,
        false,
        req.body.JoinRoom
      );
      people.push(newUser);
      res.sendFile(path.join(__dirname, "/static/playerloby.html"));
    } else {
      console.log("invalid room id");
      res
        .status(404) // HTTP status 404: NotFound
        .send("Not found");
    }
  }
  console.log(people);
  // res.sendFile(path.join(__dirname, "/static/games.html"));
});

app.post("/api", (request, response) => {
  // console.log("api request");
  // console.log(request.body);
  response.json({
    status: "success",
    roomid: roomid,
    user: people,
    datavalue: request.body.date,
  });
});

app.post("/rummy", (request, response) => {
  console.log(request.body);
  response.sendFile(path.join(__dirname, "/static/games.html"));
});

server.listen(5000, function () {
  console.log("Starting server on port 5000");
});
const database = [];
const users = {};
function Player(Vnames, id) {
  this.Vnames = Vnames;
  this.id = id;
}

app.get("/info", (req, res) => {
  res.json({ playerturn: turncounter, data: deckcards, status: "success" });
});

const man = [];

io.on("connection", function (connect) {
  console.log("first connection");
  connect.on("hello", (data) => {
    console.log(data);
    man.push(connect.id);
    console.log(man);
    if (man.length == 4) {
      setTimeout(() => {
        io.to(man[0]).emit("go", "startinggame");
      }, 1000);
      setTimeout(() => {
        io.to(man[1]).emit("go", "startinggame");
      }, 2000);
      setTimeout(() => {
        io.to(man[2]).emit("go", "startinggame");
      }, 3000);
      setTimeout(() => {
        io.to(man[3]).emit("go", "startinggame");
      }, 4000);
    }
  });
});

const peps = [];

io.on("connection", function (socket) {
  socket.on("goinglive", (info) => {
    peps.push(socket.id);
    io.to(socket.id).emit("iniciateseq", people[peps.length - 1].name);
  });

  console.log("new-connection ");
  socket.on("new-user", (name) => {
    const newPlayer = new Player(name, socket.id);
    database.push(newPlayer);
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
    console.log(database);

    if (database.length == 4) {
      // startgame();
      setTimeout(() => {
        io.to(database[0].id).emit("startGame", database[0].Vnames);
      }, 200);
    }

    io.to(database[database.length - 1].id).emit(
      "event",
      database[database.length - 1]
    );
  });

  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", users[socket.id]);
      delete users[socket.id];
    });
  });

  socket.on("ending-turn", () => {
    console.log("player 1 ended turn " + turncounter);
    io.to(database[turncounter].id).emit(
      "startGame",
      database[turncounter].Vnames
    );
    turncounter++;
    if (turncounter == 4) {
      turncounter = 0;
    }
  });

  socket.on("deck", (cards) => {
    deckcards = cards;
  });

  socket.on("curdeck", (data) => {
    socket.broadcast.emit("updatepDeck", data);
  });

  socket.on("currentboard", (data) => {
    socket.broadcast.emit("updateBoard", data);
  });
});
