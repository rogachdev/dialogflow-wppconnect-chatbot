"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.Intent_menu = void 0;

var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

const moment = require("moment");

async function Intent_menu(client, message, _intent) {
  if (
    _intent.fulfillmentText === "Iniciando o menu..." &&
    message.isGroupMsg === false
  ) {
    (async () => {
      const now = moment().format("DD/MM/YYYY  *H:m:ss*");

      await client
        .sendImage(
          message.from,
          "img/wppconnect-banner.jpeg",
          "image.jpeg",
          `Olá *FULANO* 😉\n\nNós da _*PIZZARIA DOIS IRMÃOS*_ estamos felizes em atende-lo!, digite um número para iniciar o\nseu atendimento.\n` +
            `--------------------------------------------- \n` +
            `[1]  - 🛍️ | *FAZER CADASTRO.*  \n` +
            `[2️]  - 📍 | *NOSSA LOCALIZAÇÃO.* \n` +
            `[3️]  - 🎉 | *PROMOÇÕES* \n` +
            `[4️]  - 👨🏻‍💻 | *CONTATO* \n` +
            `--------------------------------------------- \n` +
            `*️  - *Para sair*\n\n` +
            `*Horário do atendimento:*\n ${now}`
        )
        .then((result) => {})
        .catch((error) => {
          console.log(error);
        });
    })();
  }
}

exports.Intent_menu = Intent_menu;
