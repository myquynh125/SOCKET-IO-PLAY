const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: [`http://localhost:3000`],
    method: ["GET", "POSt"],
  },
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PhimRoute = require("./route/phim");
app.use("/phim", PhimRoute);
const UserRoute = require("./route/user");
app.use("/user", UserRoute);

io.on("connection", (socket) => {
  console.log("Connect: " + socket.id);

  socket.on("connect", function () {
    console.log("WS connect");
    console.log(socket.connected);
  });

  let socketRoom;
  socket.on("join-room", (room) => {
    socket.join(room);
    socketRoom = room;
    console.log(`Client id: ${socket.id} join room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnect : ${socket.id}`);
  });

  socket.on("reset", function () {
    io.in(socketRoom).to(socketRoom).emit("reset");
    console.log("reset video");
  });

  socket.on("skip", function (value) {
    io.in(socketRoom).emit("skip", value);
    console.log("skip video");
  });

  socket.on("playPause", function (data) {
    io.in(socketRoom).emit("playPause", data);
  });

  socket.on("current", function (data) {
    io.to(socketRoom).emit("current", data);
  });

  socket.on("sound", function () {
    io.to(socketRoom).emit("sound");
    console.log("Toggle sound");
  });
  socket.on("fullscreen", function () {
    io.to(socketRoom).emit("fullscreen");
    console.log("FullScreen Toggle");
  });
});

server.listen(8080, function () {
  console.log("Listening on port 8080!");
});
