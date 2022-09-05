"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.welcome = void 0;

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

  
const moment = require("moment");

async function welcome(client, message, _intent) {
  if (
    _intent.fulfillmentText === "Iniciando o Projeto..." &&
    message.isGroupMsg === false
  ) {
    (async () => {

        await client.sendText(message.from, "👋 Hello from wppconnect!")
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });

    })();
  }
}

exports.welcome = welcome;
