const express = require('express')
const initBoard = require('./init-board')
const game = require('./game')

// const Web3 = require('web3')
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// var shh = web3.shh

const app = express()
app.use(express.static('public'))

app.get('/init-board', function(req, res) {
  // this might come from the sol file?
  const config = {
    boardSize: 9,
    spyCount: 4,
    assassinCount: 1,
    boardState: [],
    randomWords: []
  }

  console.log(game())

  // console.log(shh)
  res.send(initBoard(config))
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
