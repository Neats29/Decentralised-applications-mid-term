const express = require('express')
const words = require('./words')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
const app = express()
app.use(express.static('public'))

app.get('/d', function(req, res) {
  const CodenamesABI = [
    {
      constant: false,
      inputs: [{ name: 'winner', type: 'bool' }],
      name: 'recordResult',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [],
      name: 'GuessCounter',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      constant: false,
      inputs: [{ name: 'square', type: 'uint256' }],
      name: 'BoardState',
      outputs: [{ name: '', type: 'bool[]' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
  // const CodenamesBytecode = "60606040526000805561012060405190810160405280600015151515815260200160001515151581526020016000151515158152602001600015151515815260200160001515151581526020016000151515158152602001600015151515815260200160001515151581526020016000151515158152506001906009610086929190610097565b50341561009257600080fd5b61016d565b82805482825590600052602060002090601f0160209004810192821561012c5791602002820160005b838211156100fd57835183826101000a81548160ff02191690831515021790555092602001926001016020816000010492830192600103026100c0565b801561012a5782816101000a81549060ff02191690556001016020816000010492830192600103026100fd565b505b509050610139919061013d565b5090565b61016a91905b8082111561016657600081816101000a81549060ff021916905550600101610143565b5090565b90565b61025c8061017c6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631e8ded4c1461005c5780637767fe2914610099578063f27f91f4146100c2575b600080fd5b341561006757600080fd5b61007f6004808035151590602001909190505061013a565b604051808215151515815260200191505060405180910390f35b34156100a457600080fd5b6100ac610144565b6040518082815260200191505060405180910390f35b34156100cd57600080fd5b6100e3600480803590602001909190505061015e565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b8381101561012657808201518184015260208101905061010b565b505050509050019250505060405180910390f35b6000819050919050565b600060016000808282540192505081905550600054905090565b61016661021c565b6001808381548110151561017657fe5b90600052602060002090602091828204019190066101000a81548160ff021916908315150217905550600180548060200260200160405190810160405280929190818152602001828054801561021057602002820191906000526020600020906000905b82829054906101000a900460ff161515815260200190600101906020826000010492830192600103820291508084116101da5790505b50505050509050919050565b6020604051908101604052806000815250905600a165627a7a72305820ddcb06b631dddc98218e621606eab733a067502cee724b12f8cff4d105514f7c0029"
  const PlayerAddress = '0x2D46F0B94F3efbC09aCa25Be0fe4fF50204DD5d4'
  const Codenames = new web3.eth.Contract(CodenamesABI, PlayerAddress, {
    from: web3.eth.accounts[0],
    gas: 3000000
  })

  //pasting it here while we haven't managed to connect to our sol code
  const boardState = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]

  const initBoard = (boardSize, spyCount, assassinCount) => {
    // selects a random sample of words
    // select a number 0-8, make one the assasin
    // for (number of spies, eg 0-3), choose a number from 0-8 which is not the asssin, make it the agent,
    // then make the rest bystanders
    const rand = max => Math.floor(Math.random() * Math.floor(max))

    const randomisedWords = ['x', 'z', 'mo', 'ji']

    //we want to end up with an array like: ["S", "A", "S", "S", "B", "S", "B", "B", "B"]
    // S = spy, A = assassin, B = Bystander
    let square = 0
    let board = []
    while (square < boardSize) {
      board.push('S')
      square++
    }
    const assassin = rand(boardSize)
    board[assassin] = 'A'

    //workout the number of bystanders by taking away the spies and the assassin
    const bystanderCount = boardSize - spyCount - assassinCount

    const addBystanders = s => {
      if (s < bystanderCount) {
        let bystander = rand(boardSize)
        if (board[bystander] == 'S') {
          board[bystander] = 'B'
          s++
          addBystanders(s)
        } else {
          addBystanders(s)
        }
      }
    }

    addBystanders(0, bystanderCount)

    const boardInitialisedCorrectly = () => {
      const squareType = type => board.filter(a => a == type).length
      return (
        squareType('B') == bystanderCount &&
        squareType('A') == assassinCount &&
        squareType('S') == spyCount
      )
    }

    if (boardInitialisedCorrectly()) {
      //then play
    }
  }

  initBoard(9, 4, 1)

  res.send()
})

app.listen(3000)

// const play = () => {}

// // const fireShot = () => {
// //   // the frontent fires a click event which calls this func
// //   //update number of total guesses in that round
// // }

// const updateBoard = () => {
//   // if their guess corresponds to the assassin, the guessers loses, calls ReturnResults()
//   // while there are undiscovered agents, the game continues
//   // once finished call ReturnResults()
// }

// const returnResults = () => {
//   // stores the result on the blockchain
// }

// const getGuess = () => {
//   //onClick returns index number
// }

// UI
