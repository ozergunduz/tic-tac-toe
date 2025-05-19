const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');

//Win conditions
const winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6]  // diagonal top-right to bottom-left
  ];

//Player sign
let playerSign = '';


//Game start function

const gameStart = function () {
  const start = document.getElementById('startButton');

  // Only add the listener once
  if (!start.classList.contains('initialized')) {
    start.classList.add('initialized');
    start.addEventListener("click", function () {
      document.querySelector('.chooseYourSignContainer').style.display = 'flex';
      start.style.display = 'none'; // Hide, don't remove
    });
  }

  const chooseX = document.getElementById('X');
  const chooseO = document.getElementById('O');

  // Same: add only once
  if (!chooseX.classList.contains('initialized')) {
    chooseX.classList.add('initialized');
    chooseX.addEventListener("click", () => handleSignChoice('X'));
  }

  if (!chooseO.classList.contains('initialized')) {
    chooseO.classList.add('initialized');
    chooseO.addEventListener("click", () => handleSignChoice('O'));
  }
};

//Handle sign
function handleSignChoice(sign) {
  playerSign = sign;
  document.querySelector('.board').style.display = 'flex';
  document.querySelector('.chooseYourSignContainer').style.display = 'none';
  activateCells();
  updateTurn();
}


//Function to activate the board after choosing X or O 
    function activateCells(){
        cells.forEach(cell => {
        cell.addEventListener("click", function(){
            if (cell.textContent === ''){
                cell.textContent = playerSign;

                if(checkWin(playerSign)){
                status.textContent = `${playerSign} wins!`;
                status.className = `status ${playerSign.toLowerCase()}`; // Add class
                disableBoard();
                document.getElementById('restartButton').style.display = 'inline'; // Show restart
                return;
                }

            if(checkDraw()) {
               status.textContent = "It's a draw!";
               status.className = 'status'; // Add class
               document.getElementById('restartButton').style.display = 'inline'; // Show restart
               return;
               }
                playerSign = playerSign === 'X' ? 'O' : 'X';
                updateTurn();
            }
        });
        });
    }

//Show turn -
function updateTurn(){
    const status = document.getElementById('status');
    status.textContent = playerSign === 'X' ? "X's turn!" : "O's turn!";
    status.className = 'status';
    
}
//Function to check the winner
function checkWin(sign) {
    return winConditions.some(condition => {
      return condition.every(index => cells[index].textContent === sign);
    });
  }

  //Function for draw
function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
  }

  //Disable board when its over
function disableBoard() {
    const board = document.querySelector(".board");
    board.style.display = 'none'; // ✅ Just hide it
}


//Restart button function
document.getElementById('restartButton').addEventListener('click', function () {
  // Clear board
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Reset UI
  document.querySelector('.board').style.display = 'none';
  document.querySelector('.chooseYourSignContainer').style.display = 'flex';
  status.textContent = '';
  this.style.display = 'none'; // Hide restart
  playerSign = '';
});


gameStart();




