const words = require('./words')

const rand = max => Math.floor(Math.random() * Math.floor(max))

// Pick 9 (boardSize) words from the list of words
// Make sure there are no duplicates
const randomiseWords = (i, config) => {
  if (i < config.boardSize) {
    let randWord = words[rand(words.length)]
    if (!config.randomWords.includes(randWord)) {
      config.randomWords.push(randWord)
      i++
      randomiseWords(i, config)
    } else {
      randomiseWords(i, config)
    }
  }
}

// Once boardState in populated by S (spies) and A assassin,
// make the remaining S's bystanders (B)
const addBystanders = (s, config, bystanderCount) => {
  if (s < bystanderCount) {
    let bystander = rand(config.boardSize)
    if (config.boardState[bystander] == 'S') {
      config.boardState[bystander] = 'B'
      s++
      addBystanders(s, config, bystanderCount)
    } else {
      addBystanders(s, config, bystanderCount)
    }
  }
}

// A test to ensure all the calculations have gone to plan
const boardInitialisedCorrectly = (config, bystanderCount) => {
  const squareType = type => config.boardState.filter(a => a == type).length
  return (
    squareType('B') == bystanderCount &&
    squareType('A') == config.assassinCount &&
    squareType('S') == config.spyCount
  )
}

let guessCount = 0
// boardSize, spyCount, assassinCount, boardState,
module.exports = initBoard = config => {
  const { boardSize, spyCount, assassinCount, boardState, randomWords } = config


  randomiseWords(0, config)

  // we want to end up with an array, e.g: ["S", "A", "S", "S", "B", "S", "B", "B", "B"]
  // S = spy, A = assassin, B = Bystander
  let square = 0
  while (square < boardSize) {
    boardState.push('S')
    square++
  }
  const assassin = rand(boardSize)
  boardState[assassin] = 'A'

  //workout the number of bystanders by taking away the spies and the assassin
  const bystanderCount = boardSize - spyCount - assassinCount

  addBystanders(0, config, bystanderCount)


  if (boardInitialisedCorrectly(config, bystanderCount)) {
    return { boardState, randomWords, guessCount }
  } else {
    throw new Error("The board wasn't initialised correctly")
  }

}
