import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

// const wss = new WebSocket.Server({ server });
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "anonymous";

//   console.log("Connected to Browser ✅");

//   socket.on("close", () => {
//     console.log("Disconnected to Browser ❌");
//   });

//   socket.on("message", (message) => {
//     const { type, payload } = JSON.parse(message);
//     switch (type) {
//       case "new_message":
//         sockets.forEach((socket) => {
//           socket.send(`${socket.nickname}: payload`);
//         });
//         break;
//       case "nickname":
//         socket["nickname"] = payload;
//         break;
//     }
//   });
// });

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(3000, handleListen);
