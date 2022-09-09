'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

exports.intent_pedido = void 0

// var __importDefault = (this && this.__importDefault) || function (mod) {
//   return mod && mod.__esModule ? mod : { default: mod };
// };

const moment = require('moment')

async function intent_pedido (client, message, _intent) {
  if (
    _intent.fulfillmentText === 'Salvando o cadastro, por favor aguarde...' &&
		message.isGroupMsg === false
  ) {
    (async () => {
      const now = moment().format(' DD/MM/YYYY  *:*  HH:mm:ss')
      const id = Math.random().toString(4).slice(-4)

      const nome = _intent.parameters.fields.nome.stringValue
      const email = _intent.parameters.fields.email.stringValue
      const telefone = _intent.parameters.fields.telefone.stringValue

      const phone = [message.from, '559988554765@c.us']
      for (const i in phone) {
        await client
          .sendImage(
            phone[i],
            'img/wppconnect-banner.jpeg',
            'image.jpeg',
            '\n' +
							'_*DESCRIÇÃO DO CADASTRO*_\n' +
							'--------------------------------------------- \n' +
							`*ID:* ${id} \n` +
							'--------------------------------------------- \n' +
							'*CLIENTE* : ' +
							nome +
							'\n' +
							'--------------------------------------------- \n' +
							'*TELEFONE* : ' +
							telefone +
							'\n' +
							'--------------------------------------------- \n' +
							'*EMAIL* : ' +
							email +
							'\n' +
							'--------------------------------------------- \n' +
							'\n\n' +
							`*CADASTRO FEITO EM:*\n${now}`
          )
          .then((result) => {})
          .catch((error) => {
            console.log(error)
          })
      }
      await client.sendMessageOptions(
        message.from,
				`${nome}, Posso lhe ajudar em algo mais?`,
				{
				  // footer: "_Toque nos botões para interagir._",
				  footer: '',
				  isDynamicReplyButtonsMsg: true,
				  dynamicReplyButtons: [
				    {
				      buttonId: 'id1',
				      buttonText: {
				        displayText: 'Sim por favor'
				      },
				      type: 1
				    },
				    {
				      buttonId: 'id2',
				      buttonText: {
				        displayText: 'Não obrigado'
				      },
				      type: 1
				    }
				  ]
				}
      )
    })()
  }
}

exports.intent_pedido = intent_pedido
