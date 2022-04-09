const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    method: ["GET", "POSt"],
  },
});

const VideoRoute = require("./route/playlist");

app.use(cors());
app.use("/media", VideoRoute);

io.on("connection", (socket) => {
  console.log("new client connected: " + socket.id);

  socket.on("join", function (data) {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnect");
  });  
});

server.listen(8080, function () {
  console.log("Listening on port 8080!");
});
