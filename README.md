

Create a Tic-Tac-Toe game for the console. Mainly use modules and factory functions. Use as little global code as possible

---------------------------------------------------------------

Start game
- Game.start()
- Gameboard.render(Game.get_Status())
- Promt.playerTurn()

Gameboard
- render(Game.get_Status())
    

Game
- let status = [{cell: 1, marked: false}, ...]
- let players = [{player1: '', mark: "X"}, ...]
- start() 
    | reset_status()
    | reset_players()
    | Promt.playerTurn()
- get_status()
- edit_status(cell, mark)
- check_gameOver()
- reset()
    | reset_status()
    | reset_players()
- reset_status()
- reset_players()
- check_playerNames()
let winningCombos = []

return {
    start(), 
}


Input
- Edit board
    | 
- Switch player turns

Promt
- playerTurn()
- error_cellChosen()
- gameOver()
- gameStart()
