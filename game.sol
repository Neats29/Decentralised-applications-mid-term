pragma solidity ^0.4.0;

// future expansions:

// players bets on winning the game, and chooses the numebr of assassins and agents, and the size of board
// the lower the odds the winning, the higher the stakes (win codenames crypto)

contract CodeNames {

    uint guesses = 0;
    bool[] boardState = [false, false, false, false, false, false, false, false, false];

    // Player 1 clicks on attack board to fire shot
    // Board updates

    // SOL
    /* event GuessCounter(uint guesses); */

    function GuessCounter() public returns (uint){
        guesses += 1;
        return guesses;
    }

    function BoardState(uint square) public returns (bool[])  {
        boardState[square] = true;
        return boardState;
    }

    function recordResult(bool winner) public returns (bool) {

        return winner;
    }
}
