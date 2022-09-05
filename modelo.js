"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

// FIXME: EXPORTAR AS CONST CRIADA NO INDEX.JS
exports.NomeConst= void 0;

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };


async function NomeConst(client, message, _intent) {
  if ( _intent.fulfillmentText === "frase do textResponse" &&  message.isGroupMsg === false) {
    
    (async () => {


    })();
  }
}

exports.NomeConst = NomeConst;
