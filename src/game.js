const words = require('./words')
const Web3 = require('web3')
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}
web3.eth.defaultAccount = web3.eth.accounts[0]
var CodenamesABI = [
  {
    constant: true,
    inputs: [],
    name: 'gameover',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'spymaster',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'boardState',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'guesser',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'square',
        type: 'uint256'
      }
    ],
    name: 'updateBoardState',
    outputs: [
      {
        name: '',
        type: 'bool[]'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'endGame',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'guessCounter',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'guessCount',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]

var CodenamesInstance = new web3.eth.Contract(CodenamesABI, '0xbbec99775b85d346bbc828fea1bdf71a33aa6c54')

// Commenting out as getting an error
// CodenamesInstance.methods.guessCounter().call(function(error, result) {
//   if (!error) {
//     console.log(result)
//   } else console.error(error)
// })

// ------ WHISPER CODE ---------
var shh = web3.shh

const fromAscii = str => shh.extend.utils.fromAscii(str)
const toAscii = str => shh.extend.utils.toAscii(str)

const setUp = () => shh.newKeyPair()

const keyPairID = setUp()

const filter = topic => {
  let f = {}

  return new Promise((resolve, reject) => {
    keyPairID
      .then(id => {
        // privateKeyID is the same as the asymKeyId which newKeyPair returns
        f.privateKeyID = id
        f.topics = [topic]
        resolve(f)
      })
      .catch(console.log)
  })
}

let msgs = []

const receiveMsgs = messages => {
  for (let msg of messages) {
    let message = toAscii(msg.payload)
    msgs.push({ name: message.name, text: message.text })
  }
}

const config = topic => {
  let clue = ''
  return new Promise((resolve, reject) => {
    filter(topic)
      .then(filter => {
        shh.newMessageFilter(filter).then(filterId => {
          setInterval(() => {
            shh.getFilterMessages(filterId).then(messages => {
              clue = messages && messages[0] && toAscii(messages[0].payload)
              resolve({ clue })
            })
          }, 1000)
        })
      })
      .catch(console.log)
  })
}

const pubKey = keyPairID.then(id => shh.getPublicKey(id))

const sendMsg = (topic, pkey, clue) => {
  var payload = fromAscii(clue)
  return new Promise((resolve, reject) => {
    shh
      .post({ pubKey: pkey, payload, ttl: 7, powTarget: 2.01, powTime: 100, topic })
      .then(config(topic).then(res => resolve(res)))
      .catch(console.log)
  })
}

const send = (topic, clue) => {
  return pubKey.then(p => sendMsg(topic, p, clue)).catch(console.log)
}

module.exports = (topic, clue) => ({
  send: () => send(topic, clue)
})
