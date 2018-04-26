pragma solidity ^0.4.0;

contract CodeNames {

    uint public guessCount = 0;
    address public guesser;
    address public spymaster;
    bool public gameover = false;
    bool[] public boardState = [false, false, false, false, false, false, false, false, false];

    function guessCounter() public returns (uint){
        guessCount += 1;
        return guessCount;
    }

    function updateBoardState(uint square) public returns (bool[])  {
        boardState[square] = true;
        return boardState;
    }

    function endGame() public returns (bool) {
        gameover = true;
        for (uint i=0; i<boardState.length; i++) {
            if (boardState[i] == false) {
                gameover = false;
            }
        }
        return gameover;
    }

}
