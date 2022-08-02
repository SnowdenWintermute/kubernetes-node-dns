require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const server = require("http").createServer(app);
import { WebSocket } from "ws";
const dns = require("node:dns");

const connectToServerNode = (address: string) => {
  const ws = new WebSocket(address);
  let pingTimeout: NodeJS.Timeout;

  ws.onopen = (event: any) => {
    console.log("connected to zone node at ip of " + address);
  };
  ws.onmessage = (message) => console.log(message.data);
  ws.onerror = (error) => console.log(error);
  ws.onclose = (e) => {
    clearTimeout(pingTimeout);
    console.log("connection terminated, reconnecting...");
    setTimeout(() => connectToServerNode(address), 6000);
  };
};

dns.lookup(
  "server-node-headless-service",
  { all: true },
  (err: any, addresses: any) => {
    console.log(addresses);
    addresses.forEach((addressAndFamily: any) => {
      const serverNodeIp = addressAndFamily.address;
      if (serverNodeIp) connectToServerNode(`ws://${serverNodeIp}`);
    });
  }
);

server.listen(port, () => console.log("listening on " + port));
