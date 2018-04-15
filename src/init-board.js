const words = require('./words')

const rand = max => Math.floor(Math.random() * Math.floor(max))

const randomiseWords = (i, boardSize, randomWords) => {
  if (i < boardSize) {
    let randWord = words[rand(words.length)]
    if (!randomWords.includes(randWord)) {
      randomWords.push(randWord)
      i++
      randomiseWords(i, boardSize, randomWords)
    } else {
      randomiseWords(i, boardSize, randomWords)
    }
  }
}

const addBystanders = (s, boardSize, bystanderCount, boardState) => {
  if (s < bystanderCount) {
    let bystander = rand(boardSize)
    if (boardState[bystander] == 'S') {
      boardState[bystander] = 'B'
      s++
      addBystanders(s, boardSize, bystanderCount, boardState)
    } else {
      addBystanders(s, boardSize, bystanderCount, boardState)
    }
  }
}

const boardInitialisedCorrectly = (
  bystanderCount,
  assassinCount,
  spyCount,
  boardState
) => {
  const squareType = type => boardState.filter(a => a == type).length
  return (
    squareType('B') == bystanderCount &&
    squareType('A') == assassinCount &&
    squareType('S') == spyCount
  )
}

module.exports = initBoard = (
  boardSize,
  spyCount,
  assassinCount,
  boardState,
  randomWords
) => {
  randomiseWords(0, boardSize, randomWords)

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

  addBystanders(0, boardSize, bystanderCount, boardState)

  if (
    boardInitialisedCorrectly(
      bystanderCount,
      assassinCount,
      spyCount,
      boardState
    )
  ) {
    return { boardState, randomWords }
  } else {
    throw new Error("The board wasn't initialised correctly")
  }
}
