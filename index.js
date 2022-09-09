"use strict";

// const __importDefault =
//   (this && this.__importDefault) ||
//   function (mod) {
//     return mod && mod.__esModule ? mod : { default: mod }
//   }

// FIXME: CRIAR AS CONST DAS INTENTS
const welcome_intent = require("./dialogflow/intents/wlecome");
const Intent_menu = require("./dialogflow/intents/intent_menu");
const intent_pedido = require("./dialogflow/intents/intent_pedido");

// TODO: SETAR AS DEPENDECIAS NO PROJETO
const Whatsapp = require("@wppconnect-team/wppconnect");
const dialogflow = require("@google-cloud/dialogflow").v2;
const fs = require("fs");
const { SessionsClient } = require("dialogflow/src/v2");

// TODO: SETAR O ARQUIVO JSON DO DIALOGFLOW
const sessionClient = new dialogflow.SessionsClient({
  // TODO: TESTE DE CODIGO!!!!!!!!!!!!!!!!!
	keyFilename: "key_json/dialogflow-live-yywi-ff96a4a98b5b.json",
});

// TODO: INFORMAÇÕES DO PROJETO DIALGFLOW
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
				languageCode,
			},
		},
	};

	if (contexts && contexts.length > 0) {
		request.queryParams = {
			contexts,
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
			// FIXME: MOSTRAR AS PROPRIEDADES DA RESPOSTA.
			// console.log(intentResponse)
			console.log(projectId);
			console.log(languageCode);
      console.log();

			return intentResponse.queryResult;
		} catch (error) {
			console.log(error);
		}
	}
}

Whatsapp.create({
	session: "dialogflow-live2",
	statusFind: (statusSession, session) => {
		console.log("Status Session: ", statusSession);
		console.log("Session name: ", session);
	},
})
	.then((client) => start(client))
	.catch((error) => console.log(error));

function start(client) {
	// FIXME: REGEITA A LIGAÇÃO E MANDA UMA MSG
	client.onIncomingCall(async (call) => {
		console.log(call);
		client.sendText(
			call.peerJid,
			"Olá, no momento não estamos atendendo as chamadas! Obrigado!"
		);
	});

	client.onMessage(async (message) => {
		(async () => {
			const TextResponse = await executeQueries(
				// FIXME: ID DO PROJETO DO DIALOGFLOW
				"dialogflow-live-yywi",
				message.from,
				[message.body],
				"pt-BR"
			);

			await client.sendText(message.from, TextResponse.fulfillmentText);

			// FIXME: TRATAMENTO DAS INTENTS.
			switch (TextResponse.intent.displayName) {
				case "DefaultWelcomeIntent":
					welcome_intent.welcome_intent(client, message, TextResponse);
					break;

				case "Intent_menu":
					Intent_menu.Intent_menu(client, message, TextResponse);
					break;

				case "IntentPedido":
					intent_pedido.intent_pedido(client, message, TextResponse);
					break;
			}
		})();
	});
}
