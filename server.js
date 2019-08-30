var express = require("express");

var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(4000);

io.on("connection", function(socket) {
  console.log("Có người kết nối");

  socket.on("disconnect", function() {
    console.log(socket.id + " ngắt kết nối");
  });

  socket.on("Client-send-data", function(data) {
    console.log(data);
    // io.sockets.emit("Server-send-data",data+"XXX"); //all
    //socket.emit("Server-send-data",data+"XXX"); // A=>A
    socket.broadcast.emit("Server-send-data", data + "XXX"); //A=>B
  });
});

app.get("/", function(req, res) {
  res.render("home");
});
