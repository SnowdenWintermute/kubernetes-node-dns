require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const ws = require("ws");
const wss = new ws.Server({ server }, { clientTracking: true });
import WebSocket from "ws";

let broadcastInterval: NodeJS.Timer;

wss.on("connection", (socket: WebSocket) => {
  console.log("a proxy connected to " + process.env.MY_POD_NAME);
  socket.send(
    "you have connected to node " +
      process.env.MY_POD_ID +
      " with ip of " +
      process.env.MY_POD_IP
  );
  broadcastInterval = setInterval(() => {
    wss.clients.forEach((client: WebSocket) => {
      client.send(
        "test message from " +
          process.env.MY_POD_NAME +
          " with ip of " +
          process.env.MY_POD_IP
      );
    });
  }, 4000);
});

server.listen(port, () => console.log("listening on " + port));
