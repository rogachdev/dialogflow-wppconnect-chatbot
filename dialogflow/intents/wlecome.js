'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

exports.welcome_intent = void 0

// var __importDefault = (this && this.__importDefault) || function (mod) {
//   return mod && mod.__esModule ? mod : { default: mod };
// };

const moment = require('moment')

async function welcome_intent (client, message, _intent) {
  if (
    _intent.fulfillmentText === 'Iniciando o Projeto...' &&
		message.isGroupMsg === false
  ) {
    (async () => {
      client.sendFile(
        message.from,
        // 'img/wppconnect-banner.jpeg',
        'https://img.elo7.com.br/product/zoom/41A090B/kit-3-calca-jogger-masculina-punho-com-elastico.jpg',
        {
          useTemplateButtons: true, // False for legacy
          buttons: [
            {
              url: 'https://wppconnect.io/',
              text: 'WPPConnect Site'
            },
            {
              phoneNumber: '+55 11 22334455',
              text: 'Call me'
            },
            {
              id: 'your custom id 1',
              text: 'Some text'
            },
            {
              id: 'another id 2',
              text: 'Another text'
            }
          ],
          title: 'Title text', // Optional
          footer: 'Footer text' // Optional
        }
      )

      // await client.sendListMessage(message.from, {
      // 	buttonText: "Cardapio",
      // 	description: "Escolha aqui o seu lanche.",
      // 	sections: [
      // 		{
      // 			title: "Lanches variados.",
      // 			rows: [
      // 				{
      // 					rowId: "1",
      // 					title: "Pastel de carne.",
      // 					description: "R$ 12,00",
      // 				},
      // 				{
      // 					rowId: "2",
      // 					title: "Pastel de Queijo",
      // 					description: "R$ 13,00",
      // 				},
      // 				{
      // 					rowId: "3",
      // 					title: "Pizza de calabresa: R$ 42,00",
      // 					description:
      // 						"Calabresa, queijo, alface, presunto, cebola e ovo.",
      // 				},
      // 				{
      // 					rowId: "4",
      // 					title: "Lanche de outro sabor",
      // 					description: "Description do lanche de outro sabor.",
      // 				},
      // 				{
      // 					rowId: "5",
      // 					title: "Hamburguer de outro sabor",
      // 					description: "Description do hamburguer de outro sabor",
      // 				},
      // 				{
      // 					rowId: "6",
      // 					title: "Outro lanche",
      // 					description: "Description de outro lanche de outro sabor.",
      // 				},
      // 			],
      // 		},
      // 	],
      // });

      // await client.sendImage(
      //   message.from,
      //   'https://img.elo7.com.br/product/zoom/41A090B/kit-3-calca-jogger-masculina-punho-com-elastico.jpg',
      //   'img/image.jpg'
      // )
      // await client.sendMessageOptions(message.from, 'Kit 3 Calça Jogger Masculina Punho com Elástico', {
      //   title: 'Calça Jogger Masculina',
      //   // footer: "Escolha uma opção abaixo:",
      //   isDynamicReplyButtonsMsg: true,
      //   dynamicReplyButtons: [
      //     {
      //       buttonId: 'id1',
      //       buttonText: {
      //         displayText: 'Pedido'
      //       },
      //       type: 1
      //     },
      //     {
      //       buttonId: 'id2',
      //       buttonText: {
      //         displayText: ' + Informações'
      //       },
      //       type: 1
      //     }
      //   ]
      // }).then((result) => { }).catch((error) => {
      //   console.log(error)
      // })
    })()
  }
}

exports.welcome_intent = welcome_intent
