






const Game = (() => {
    let gameBoard;
    let players;
    let game_LIVE = true;
    let winner;

    const start = () => {
        gameBoard = create_gameBoard()
        players = [create_player('Mark', 'x', true), create_player('Ben', 'o', false)]

        Log.gameStart()
        Log.gameBoard(gameBoard)
        Log.whoseTurn(players)
    }
    const get_playerInfo = () => {return players}
    const get_playerInfo_turn = () => {
        return players.filter(x => x.turn === true)[0]
    }

    const edit_playerTurn = () => {
        const players_new = players.map(x => {
            return {...x,turn: !x.turn};
        });
        players = players_new;
    };
    const edit_gameBoard = (number) => {
        const mark = get_playerInfo_turn().mark
        const board_new = gameBoard.map(x => {
            if (x.cell === number) {
                return { ...x, marked: mark };
            }
            return { ...x };
        });
        gameBoard = board_new
    }
    const check_gameOver = (board) => {
        let isOver = false;
        let winner = '';
        let message = '';
        const winningCombos = [
            [1, 2, 3], // Top row
            [4, 5, 6], // Middle row
            [7, 8, 9], // Bottom row
            [1, 4, 7], // Left column
            [2, 5, 8], // Middle column
            [3, 6, 9], // Right column
            [1, 5, 9], // Diagonal from top left
            [3, 5, 7]  // Diagonal from top right
        ];
        const playerPositions = board.reduce((box, item) => {
            if (item.marked == 'x') {box.x.push(item.cell)}
            if (item.marked == 'o') {box.o.push(item.cell)}
            return box

        },{x: [], o: []})

        for (const combo of winningCombos) {
            const x_wins = combo.every(cell => playerPositions.x.includes(cell))
            const o_wins = combo.every(cell => playerPositions.o.includes(cell))
            const draw = [...playerPositions.x, playerPositions.o].length === 9

            if (x_wins) return {isOver: true, winner: "x", message: 'X wins!'}
            if (o_wins) return {isOver: true, winner: "o", message: 'O wins!'}
            if (draw) return {isOver: true, winner: "draw", message: "It's a draw!"}
        }

        return {isOver, winner, message}
    }
    const validate_input = (number) => {
        let error = false;
        let error_text = "";
        
        const is_numberInRange = number > 0 && number < 10
        if (!is_numberInRange){return {error: true, error_text: `You can only choose numbers from 1 to 9! Try again, ${Game.get_playerInfo_turn().name}.`}}

        const is_cellAvailable = gameBoard.find(x => x.cell == number).marked == false
        if (!is_cellAvailable){return {error: true, error_text: `This cell is already taken. Try again, ${Game.get_playerInfo_turn().name}!`}}
        
        return {error, error_text}
    }
    const get_gameBoard = () => {
        return gameBoard
    }


    const input = (number) => {
        if (!game_LIVE) {
            Log.gameOver(winner + "wins!")
            Log.gameBoard(gameBoard)
            return
        } 

        const is_errorDetected = validate_input(number).error == true
        if (is_errorDetected) {
            Log.gameBoard(gameBoard)
            console.log(validate_input(number).error_text)
            return 
        };

        edit_gameBoard(number) 

        const gameInfo = check_gameOver(get_gameBoard())
        if (gameInfo.isOver == true) {
            game_LIVE = false
            winner = gameInfo.winner

            console.log('--------------------------------------------');
            Log.gameOver(gameInfo.message)
            Log.gameBoard(gameBoard)
            console.log('--------------------------------------------');
            return
        }
        
        edit_playerTurn()
        Log.gameBoard(gameBoard)
        Log.whoseTurn()
    }
    // ------------------------------------------------------------------------

    return {
        start,
        get_playerInfo,
        get_playerInfo_turn,
        edit_playerTurn,
        edit_gameBoard,
        input
    }

})()



const Log = (() => {
    const gameStart = () => {console.log("The game has begun!")}
    const gameBoard = (gameBoard) => {
        const board = gameBoard.map(x => {
            return x.marked || "-"
        })
        console.log(`${board[0]} ${board[1]} ${board[2]}\n${board[3]} ${board[4]} ${board[5]}\n${board[6]} ${board[7]} ${board[8]}`);
    }
    const whoseTurn = () => {
        const name = Game.get_playerInfo_turn().name
        console.log(`${name}, it's your turn! Type "Game.input(nr)"`); 
    }
    const gameOver = (message) => {
        console.log(`Game over! ${message}`);
    }
    // ------------------------------------------------------------------------

    return {
        gameStart,
        whoseTurn,
        gameBoard,
        gameOver
    }
})()





function create_player(name, mark, turn) {
    return {name, mark, turn}
} 
function create_gameBoard() {
    let box = [];
    for (let i = 1; i <= 9; i++) {
        box.push({cell: i, marked: false})
    }
    return box
}
 

(function() { 
    Game.start()
    
})();





