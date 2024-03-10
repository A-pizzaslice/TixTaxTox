document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('gameBoard');
    let cells = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = true;
    let playerName1 = '';
    let playerName2 = '';

    function createBoard() {
        // Create the board cells as before
    }

    function startGame() {
        playerName1 = document.getElementById('player1').value || 'Player 1';
        playerName2 = document.getElementById('player2').value || 'Player 2';
        // Display player names on top
        document.getElementById('player1Name').textContent = playerName1;
        document.getElementById('player2Name').textContent = playerName2;
        // Highlight the current player
        document.getElementById('player1Name').classList.toggle('active', currentPlayer === 'X');
        document.getElementById('player2Name').classList.toggle('active', currentPlayer === 'O');
        document.getElementById('playerSetup').classList.add('hidden'); // Hide setup
        createBoard();
    }

    function cellClicked() {
        // ... (existing code remains unchanged)

        // Toggle highlight between players
        document.getElementById('player1Name').classList.toggle('active', currentPlayer === 'X');
        document.getElementById('player2Name').classList.toggle('active', currentPlayer === 'O');
    }

    function checkWinner() {
        // Check for the winner as before
    }

    function checkDraw() {
        // Check for a draw as before
    }

    window.startGame = startGame; // Make startGame accessible globally
});
