const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

//Player sign
let playerSign = '';

//Game start function

const gameStart = function(){
    
//Start button function
const start = document.getElementById('startButton');
start.addEventListener("click", function () {
   
    document.querySelector('.chooseYourSignContainer').style.display = 'flex';
    // Remove the button
    start.remove();
});


//Choose sign function

const chooseX = document.getElementById('X'); 
chooseX.addEventListener("click", function(){
    //Player sign 
    playerSign = 'X';
    // Show the board
    document.querySelector('.board').style.display = 'flex';
    //Remove choose sign buttons
    document.querySelector('.chooseYourSignContainer').remove();
    activateCells();
    updateTurn();
});

const chooseO = document.getElementById('O');
chooseO.addEventListener("click", function(){
    //PLayer sign 
    playerSign = 'O';
    // Show the board
    document.querySelector('.board').style.display = 'flex';
    //Remove choose sign buttons
    document.querySelector('.chooseYourSignContainer').remove();
    activateCells();
    updateTurn();
});

}


gameStart();


//Function to activate the board after choosing X or O 
    function activateCells(){
        cells.forEach(cell => {
        cell.addEventListener("click", function(){
            if (cell.textContent === ''){
                cell.textContent = playerSign;
                playerSign = playerSign === 'X' ? 'O' : 'X';
            }
        });
        });
        updateTurn();
    }

//Show turn - start from here - 
function updateTurn(){
    status.textContent = `${playerSign}'s turn`;
}