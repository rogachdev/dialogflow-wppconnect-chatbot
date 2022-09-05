"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

// FIXME: CRIAR AS CONST DAS INTENTS
const welcome = require("./dialogflow/intents/welcome");
const Intent_menu = require('./dialogflow/intents/intent_menu');

// TODO: SETAR AS DEPENDECIAS NO PROJETO
const Whatsapp = require("@wppconnect-team/wppconnect");
const dialogflow = require("@google-cloud/dialogflow");
const fs = require("fs");
const moment = require("moment");

// TODO: SETAR O ARQUIVO JSON DO DIALOGFLOW
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "key_json/dialogflow-live-yywi-ff96a4a98b5b.json",
});

//  TODO: INFORMAÇÕES DO PROJETO DIALG
async function detectIntent(
  projectId,
  sessionId,
  query,
  contexts,
  languageCode
) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}
async function executeQueries(projectId, sessionId, queries, languageCode) {
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log(
        ">>> Processando....",
        intentResponse.queryResult.fulfillmentText
      );
      return intentResponse.queryResult;
    } catch (error) {
      console.log(error);
    }
  }
}

Whatsapp.create({
  session: "dialogflow-live",
  statusFind: (statusSession, session) => {
    console.log("Status Session: ", statusSession);
    console.log("Session name: ", session);
  },
})
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    (async () => {
      // FIXME: PUXAR O NOME DO USUARIO DO WHATSAPP
      const contact = await client
        .getContact(message.from)
        .then((result) => {
          return result.pushname || result.verifiedName || "";
        })
        .catch((error) => {
          console.log(error);
        });

      let TextResponse = await executeQueries(
      // FIXME: ID DO PROJETO DO DIALOGFLOW
        "dialogflow-live-yywi",
        message.from,
        [message.body],
        "pt-BR"
      );

      
      await client.sendText(message.from, TextResponse.fulfillmentText);

      switch (TextResponse.intent.displayName) {

        case "DefaultWelcomeIntent":
          welcome.welcome(client, message, TextResponse);
          break;

        case "Intent_menu":
          Intent_menu.Intent_menu(client, message, TextResponse);
          break;
      }
    })();
  });
}
