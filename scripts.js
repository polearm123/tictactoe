const Player = (symbol) => { //player has a symbol X or O

    
    const getSymbol = function(){

        return symbol;

    }

    return{getSymbol}


}



var boardModule = (function() { //Module holding the board and methods around board population and move legality logic

    var boardArray = [[0,0,0],
                      [0,0,0],
                      [0,0,0]];
    

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

    return{addToBoard,getBoard,resetBoard};



}());

var gameModule = (function() { //should control the flow of game and reflect that in the DOM

    let playerOne = Player('X');
    let playerTwo = Player('O');

    let currentBoardState;
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

    const reset = function(){//resets the board and starts play

        console.log("not yet implemented")


    }

    const play = function(){
        
        printBoardOnscreen();
        console.log("not yet implemented")

    }


    return{play};



}());



gameModule.play();