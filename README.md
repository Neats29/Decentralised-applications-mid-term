### How to run

* `npm install`
* `ganache-cli`
* `node src/app.js`
* `geth --shh --rpc --rpccorsdomain '*'` for whisper

### Tech stack

* Nodejs Server
* Whisper protocol used to send a 'clue' to the other users
* Solidity to store the results of the game
* IPFS to store the images

### Codenames

##### Rules:

This is a 2 player game.

One player is the 'spymaster' and the other is the 'field operative. _Due to lack of time, the current game shows both views on one page, the view that is visible to the spymaster, and the one visible to the field operative._

The board presents a random set of cards with a word on them. The spymaster is given a 'key' which reveals the secret identity of the cards.

The spymaster has to try and reveal as many of the cards with the secret identity (agent cards, marked red) by thinking of a word that encompasses those words. E.g.: if the cards have France and China on them, the spymaster could give the clue 'country'.

In addition to the agent cards, there are two other types of cards. The bystanders and the assassin. If the field operative accidentally chooses a word, to which a bystander is associated, then they will not get any points, however, if they accidentally pick the word that is associated with the assassin, they immediately lose.

The goal of the game is to find all the agent (red) cards in as few turns as possible.

![](https://github.com/Neats29/Decentralised-applications-mid-term/blob/develop/preview.png)

### Tasks

* #### Html & JS
* write docs as we go...

1.  [ ] Set up the rest of the UI, click events, the master key, the input box for the clue, a win/loose output
2.  [x] set up the board (data structures in the backend)
3.  [ ] set up the players (take their name, then randomise who is the clue giver and who is the guesser, then alternate after that?)
4.  [x] click event on the clue input box, needs to talk to web3 which talks to whisper??
5.  [x] Any assets or just css to represent the agents, assassin and bystanders? (could use IPFS if assets used)
6.  [x] create a list of words
7.  [x] setup the whisper boilerplate and send the input
8.  [ ] how do we deploy?
9.  [ ] add a simple list of roles to show at the same time we take the player's name when they 1st play the game
10. [ ] add a loading icon while the images are loading, can be slow to load on a slow network
