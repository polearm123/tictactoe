const Player = (symbol) => { //player has a symbol X or O

    const getSymbol = () => {

        return symbol;

    }

    return{getSymbol}

}

const Computer = (symbol) => { //makes moves according to minMax

    getSymbol = () => {

        return symbol;

    }

    const minimax = function(currentBoard,maxPlayer){

        //base case, checks if the current state being checked is a winning or losing move for the max player

        if(boardModule.checkWinningMove() && maxPlayer){

            return 1;

        }else if(boardModule.checkWinningMove() && !maxPlayer){

            return -1;

        }else{

            return 0;

        }

        if(maxPlayer){//go through each possible move from the current state and run the minimax on them aswell

            var maxScore = -Infinity;
            let tempBoard = currentBoard;
            let maxEval;
            let eval;

            for(let i=0;i<currentBoard.length;i++){

                for(let j=0;j<currentBoard[0].length;j++){

                    if(currentBoarrd[i][j] == ""){ //this empty square represents a possible move

                        tempBoard = currentBoard;
                        tempBoard[i][j] = 'O';
                        eval = minimax(tempBoard,false);
                        maxEval = Math.max(eval,maxEval);
                        
                    }

                }

            }

            return maxEval;

        }


        if(!maxPlayer){

            var minScore = Infinity;
            let tempBoard = currentBoard;
            let minEval;
            let eval;

            for(let i=0;i<currentBoard.length;i++){

                for(let j=0;j<currentBoard[0].length;j++){

                    if(currentBoarrd[i][j] == ""){ //this empty square represents a possible move

                        tempBoard = currentBoard;
                        tempBoard[i][j] = 'X';
                        eval = minimax(tempBoard,false);
                        minEval = Math.min(eval,minEval);
                        
                    }

                }

            }

            return minEval;

        }

    }

    const makeMove = (currentBoard) => {

        console.log(minimax(currentBoard,true));

    }

    return {makeMove};

}


var boardModule = (function() { //Module holding the board and methods around board population and move legality logic

    var boardArray = [['','',''],
                      ['','',''],
                      ['','','']];

    const gameGrid = document.querySelector(".game-grid"); //selects the game grid container
    
    const printBoardOnscreen = function(){ //adds the board to the DOM alongside the event listeners of the squares

        gameGrid.innerHTML = ""; //clear the inner HTML before generating the grid, if this is not done elements are appended and grid grows larger every move
        currentBoardState = boardModule.getBoard();
        var square;

        for(let i=0;i<currentBoardState.length;i++){//creates a square and fills it with content from the current board state
            
            for(let j=0;j<currentBoardState[0].length;j++){

                square = document.createElement("div");
                square.classList.add("square");
                square.id = `${i},${j}`;
                square.textContent = currentBoardState[i][j];
                gameGrid.appendChild(square);

            }
        }

        let squares = document.querySelectorAll(".square"); //adds event listener after populating the game board

        squares.forEach(element => {

            element.addEventListener("click", function(e){
                
                gameModule.playTurn(e);

            });

        });

    }
    
    const resetBoard =  function() { //resets the board to empty strings

        for(let i=0;i<boardArray.length;i++){

            for(let j=0;j<boardArray[0].length;j++){

                boardArray[i][j] = '';

            }

        }

    };

    //NEEDED?
    const getBoard = function() { //returns the board array

        return boardArray;

    }

    const addToBoard = function(coordinates,symbol){ //adds symbol to board at specified coordinates

        if(checkLegalMove(coordinates)){

            boardArray[coordinates[0]][coordinates[1]] = symbol;
            return true;

        }else{

            return false;

        } //if return 0 current player should not be changed

    } 

    const checkLegalMove = function(coordinates){ //checks if that part of the board is already populated, if so return false

        if(boardArray[coordinates[0]][coordinates[1]] == 'X' || boardArray[coordinates[0]][coordinates[1]]=='O'){

            return false;

        }else{

            return true;

        }

    }

    const matchingArrays= function(arr1,arr2){ //compares two arrays for index wise identical

        if(arr1.length != arr2.length){

            return false;

        }

        for(let i=0;i<arr1.length;i++){

            if(arr1[i] !== arr2[i]){

                return false;

            }

        }

        return true;

    }

    const getColumn = function(currentGrid,columnNumber){ //returns all grid elements in specific column number
        
        column = [];

        for(let i=0;i<currentGrid.length;i++){

            column.push(currentGrid[i][columnNumber]);

        }

        return column;

    }

    const getRow = function(arr,rowNumber){//returns all grid elements in specific row number 

       let row = []
       
        for(let i=0;i<arr[0].length;i++){

            row.push(arr[rowNumber][i]);

        }

       return row;

    }

    const getDiagonal = (arr,diagNumber) => {//lazy way to retrieve diagonals, cant generalise to larger grids unlike get row and column, REFACTOR LATER

        if(diagNumber === 0){

            return [arr[0][0],arr[1][1],arr[2][2]];

        }else if(diagNumber === 1){

            return [arr[0][2],arr[1][1],arr[2][0]];

        }

    }

    const checkAllSpacesFilled = () => { //counts the number of X and 0, if it adds to 9 - meaning there have been 9 turns - a draw is printed

        let turnCounter = 0;
        console.log("inside");
        for(let i=0;i<boardArray.length;i++){
            for(let j=0;j<boardArray[0].length;j++){
                console.log("inside the checkspaces board array it");
                if(boardArray[i][j] == 'X' || boardArray[i][j] == 'O'){
                    
                    turnCounter++;
                    console.log(turnCounter);

                }

            }

        }

        return (turnCounter==9) ? true:false;

    }

    const checkWinningMove = () => { //processes the current state of the board, and determines if there has been a winning move or not

        let winningXArray = ['X','X','X'];
        let winningOArray = ['O','O','O'];

        //check horizontals
        let allRows = [getRow(boardArray,0),getRow(boardArray,1),getRow(boardArray,2)];

        //check vertical
        let allColumns = [getColumn(boardArray,0),getColumn(boardArray,1),getColumn(boardArray,2)];

        //check diagonals
        let allDiagonals = [getDiagonal(boardArray,0),getDiagonal(boardArray,1)];

        //pushes all the arrays together
        let final = []
        final.push(allRows,allColumns,allDiagonals);

        let merged = [].concat.apply([],final); //merges all the current possible winnable arrays into one array to iterate without nested forloops

        for(let i=0;i<merged.length;i++){ //checks each possible winning sub grid of the board for a winning move, comparing them to winningX or winning 0 arrays
            
            if(matchingArrays(merged[i],winningXArray)){
                
                return 1;

            }else if(matchingArrays(merged[i],winningOArray)){

                return 1;

            }else continue;

        }


        if(checkAllSpacesFilled()){

            console.log("all spaces have been filled");
            return 0;

        }

        return -1; //no winning move has been found

    }

 
    return{addToBoard,getBoard,resetBoard,printBoardOnscreen,checkWinningMove};

}());


var gameModule = (function() { //should control the flow of game and reflect that in the DOM

    let body = document.querySelector("body");
    let currentBoardState;

    let _playerOne = Player('X');
    let _playerTwo = Player('O');
    let compPlayer = Computer('O');

    let _currentPlayer;//default start

    const _changePlayer = function() { //changes the current player

        if(_currentPlayer == _playerOne){
            _currentPlayer = _playerTwo;
        }else if(_currentPlayer == _playerTwo){
            _currentPlayer = _playerOne;
        }

    }

    const startGame = function(){ //starts a game by setting player, resetting board of all moves and printing the board on screen

        _currentPlayer = _playerOne;
        boardModule.resetBoard();
        boardModule.printBoardOnscreen();

    }

    const removeWinnerText = function(){ //removes the winner text, used when resetting the board and visual

        let winnerText = document.getElementById("winner-text");

        if(winnerText!=null){

            winnerText.remove();
            
        }else{

            return;

        }
    
    }

    const displayWinner = function(endGameResult,player){ //displays the winner on winning move

        let parent = document.querySelector("body");
        let winner = document.createElement("p");

        winner.id = "winner-text"
        winner.classList.add(".game-winner");

        if(endGameResult == 1){

            winner.textContent = `player ${player} has WON!`;

        }else if(endGameResult ==0){

            winner.textContent = 'Game results in a draw!';

        }

        parent.appendChild(winner);

    }

    const playTurn = function(event){//retrieve coordinates from event and add that to board then change current player
        
        var coordinates = event.target.id;
        coordinates = coordinates.split(",");

        if(boardModule.addToBoard(coordinates,_currentPlayer.getSymbol())){ //add coordinate of player click to board x or y

            boardModule.printBoardOnscreen();

            if(boardModule.checkWinningMove() == 1){//checks if the most recent move is a winning one or draw, if so display winner if not change player and continue

                displayWinner(1,_currentPlayer.getSymbol());
                setTimeout(resetGame,2000); //resets the game after winning

            }

            if(boardModule.checkWinningMove() == 0){

                displayWinner(0,_currentPlayer.getSymbol());
                setTimeout(resetGame,2000);


            }

            // compPlayer.makeMove(boardModule.getBoard);


            _changePlayer();

        }

    }

    const resetGame = function(e){ //resets the board, removes the winner text if there was a winner and starts a new game

        boardModule.resetBoard();
        removeWinnerText();
        startGame();

    }

    let resetButton = document.createElement("button");
    resetButton.textContent = "reset game";
    
    resetButton.addEventListener("click", function(e){ //resets the game on click of reset button

        resetGame(e);

    })

    body.appendChild(resetButton);

    return{startGame,playTurn};

}());

gameModule.startGame(); //starts the game by round






