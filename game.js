document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('gameBoard');
    let cells = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    let playerName1 = '';
    let playerName2 = '';

    function createBoard() {
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.dataset.index = i;
            cell.addEventListener('click', cellClicked);
            board.appendChild(cell);
        }
    }

    function cellClicked() {
        const index = this.dataset.index;
        if (cells[index] || !gameActive) {
            return;
        }
        cells[index] = currentPlayer;
        this.textContent = currentPlayer;
        checkGameStatus();
        switchPlayer();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('player1Name').classList.toggle('active', currentPlayer === 'X');
        document.getElementById('player2Name').classList.toggle('active', currentPlayer === 'O');
    }

    function checkGameStatus() {
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            gameActive = false;
        } else if (checkDraw()) {
            alert("It's a draw!");
            gameActive = false;
        }
        updatePlayAgainButton();
    }

    function updatePlayAgainButton() {
        const playAgainButton = document.getElementById('playAgain');
        playAgainButton.classList.remove('hidden');
    }


    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return true

    function checkDraw() {
       // Check if all cells are filled
    const isBoardFull = cells.every(cell => cell !== null);
    
    // If all cells are filled and there's no winner, then it's a draw
    return isBoardFull && !checkWinner();
}

document.getElementById('startGame').addEventListener('click', function() {
    playerName1 = document.getElementById('player1').value || 'Player 1';
    playerName2 = document.getElementById('player2').value || 'Player 2';
    
    // Update display with player names
    document.getElementById('player1Name').textContent = playerName1;
    document.getElementById('player2Name').textContent = playerName2;

    // Hide the setup area and show the active player
    document.getElementById('playerSetup').classList.add('hidden');
    document.getElementById('player1Name').classList.add('active'); // Assuming X (player 1) starts

    // Clear any previous board (if you're allowing restarts without refreshing)
    const board = document.getElementById('gameBoard');
    board.innerHTML = ''; // Removes any existing cells
    
    // Create and display the game board
    createBoard();
    
    // Optionally, you might want to hide the 'Start Game' button to prevent restarting without refreshing
    // document.getElementById('startGame').classList.add('hidden');

    // Show the 'Play Again' button if it should be visible after the game starts
    // document.getElementById('playAgain').classList.remove('hidden');
});

