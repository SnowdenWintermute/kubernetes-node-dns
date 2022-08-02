"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const message_types_1 = require("@permadeath/message-types");
const message_types_2 = require("@permadeath/message-types");
const axios_1 = __importDefault(require("axios"));
const WS_ADDRESS = "ws://zone-node-cluster-ip-service";
let reconnectAttemps = 0;
const testAxios = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    setInterval(
      () =>
        __awaiter(void 0, void 0, void 0, function* () {
          console.log("trying axios");
          const res = yield axios_1.default.get("http://localhost:5001");
          console.log(res.data);
        }),
      3000
    );
  });
testAxios();
//
// setInterval(() => console.log("client node running"), 1000);
const handleSocketConnection = (address) => {
  const ws = new ws_1.WebSocket(address);
  // console.log(ws);
  console.log("ws ready state: " + ws.readyState);
  ws.onopen = (event) => {
    reconnectAttemps = 0;
    console.log(ws.readyState);
    console.log("connected to zone node");
    const pingServer = () => {
      setTimeout(() => {
        console.log(new message_types_1.UserInput("eyy", "lmao"));
        console.log((0, message_types_2.add)(1, 5, 3));
        console.log("pinging...");
        ws.send("some text");
        pingServer();
      }, 3000);
    };
    pingServer();
  };
  ws.onerror = (error) => {
    console.log("ws readyState: " + ws.readyState);
    console.log(error);
  };
  ws.onclose = (e) => {
    console.log("ws readyState: " + ws.readyState);
    console.log("connection terminated, reconnecting...");
    setTimeout(() => handleSocketConnection(WS_ADDRESS), 3000);
  };
};
// handleSocketConnection(WS_ADDRESS);
