const Player = (symbol) => { //player has a symbol X or O

    
    const getSymbol = function(){

        return symbol;

    }

    return{getSymbol}


}



var boardModule = (function() { //Module holding the board and methods around board population and move legality logic

    var boardArray = [['','',''],
                      ['','',''],
                      ['','','']];

    const gameGrid = document.querySelector(".game-grid"); //selects the game grid container
    
    const printBoardOnscreen = function(){ //adds the board to the DOM

        currentBoardState = boardModule.getBoard();

        var square;

        for(let i=0;i<currentBoardState.length;i++){//creates a square and fills it with content from the current board state
            
            for(let j=0;j<currentBoardState[0].length;j++){
                console.log("inside inner most for loop");
                square = document.createElement("div");
                square.classList.add("square");
                square.id = `${i},${j}`;
                square.textContent = currentBoardState[i][j];
                gameGrid.appendChild(square);

            }
        }


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

        console.log(boardArray);
        return boardArray;

    }

    const addToBoard = function(coordinates,symbol){ //adds symbol to board at specified coordinates

        if(checkLegalMove(coordinates)){
            boardArray[coordinates[0]][coordinates[1]] = symbol;
        }

        //ADD IF FALSE


    } 

    const checkLegalMove = function(coordinates){ //checks if that part of the board is already populated, if so return false

        if(boardArray[coordinates[0]][coordinates[1]] == 'X' || boardArray[coordinates[0]][coordinates[1]]=='O'){

            return false;

        }else{

            return true;

        }

    }

    return{addToBoard,getBoard,resetBoard,printBoardOnscreen};

}());



var gameModule = (function() { //should control the flow of game and reflect that in the DOM

    let _playerOne = Player('X');
    let _playerTwo = Player('O');
    let _currentPlayer;//default start

    let currentBoardState;
    
    const _changePlayer = function() {

        if(_currentPlayer == _playerOne){
            _currentPlayer = _playerTwo;
        }else if(_currentPlayer == _playerTwo){
            _currentPlayer = _playerOne;
        }

    }

    const startGame = function(){

        currentPlayer = _playerOne;
        boardModule.printBoardOnscreen();

    }

    const playTurn = function(event){//retrieve coordinates from event and add that to board then change current player
        
        var coordinates = event.target.id;

        coordinates = coordinates.split(",");

        console.log(coordinates);
        

        boardModule.addToBoard(parseInt(coordinates[0],parseInt(coordinates[1])));
        _changePlayer();

    }

    //NOT SURE WHAT BEST PRACTICE IS, just adding the event listener inside the grid module
   
    return{playTurn,startGame};

}());

gameModule.startGame();

let squares = document.querySelectorAll(".square"); 
    console.log("these are the squares,", squares);
    squares.forEach(element => {

        console.log(element);
        element.addEventListener("click", function(e){
            gameModule.playTurn(e);

        });

    });


