const express = require('express')
// var server = require('http').createServer(express).listen(8080);
// var io = require('socket.io').listen(server);
var bodyParser = require('body-parser')
const initBoard = require('./init-board')
const game = require('./game')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/init-board', function(req, res) {
  // this might come from the sol file?
  const config = {
    boardSize: 9,
    spyCount: 4,
    assassinCount: 1,
    boardState: [],
    randomWords: []
  }

  res.send(initBoard(config))
})

app.post('/send-clue', (req, res) => {
  const topic = '0x07678231' //needs to be 8 characters, work this out when at the start of the game

  game(topic, req.body.clue)
    .send()
    .then(data => res.send(data))
})

app.listen(3000)

// const updateBoard = () => {
//   // if their guess corresponds to the assassin, the guessers loses, calls ReturnResults()
//   // while there are undiscovered agents, the game continues
//   // once finished call ReturnResults()
// }
