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

    function startGame() {
        playerName1 = document.getElementById('player1').value || 'Player 1';
        playerName2 = document.getElementById('player2').value || 'Player 2';
        document.getElementById('playerSetup').style.display = 'none'; // Hide setup
        document.getElementById('playerInfo').style.display = 'block'; // Show player info
        updatePlayerNames(); // Update and display player names
        updateCurrentPlayer(playerName1); // Initial currentPlayer is player1
        createBoard();
    }

    function updatePlayerNames() {
        document.getElementById('player1Name').textContent = playerName1;
        document.getElementById('player2Name').textContent = playerName2;
    }

    function updateCurrentPlayer(playerName) {
        document.getElementById('currentPlayer').textContent = playerName;
        document.getElementById('player1Name').classList.toggle('highlight', playerName === playerName1);
        document.getElementById('player2Name').classList.toggle('highlight', playerName === playerName2);
    }

    function cellClicked() {
        const index = this.dataset.index;
        if (cells[index] || !gameActive) {
            return;
        }
        cells[index] = currentPlayer;
        this.textContent = currentPlayer;
        let winner = checkWinner();
        let isDraw = checkDraw();

        if (winner || isDraw) {
            setTimeout(() => {
                if (winner) {
                    alert(`${currentPlayer === 'X' ? playerName1 : playerName2} wins!`);
                } else if (isDraw) {
                    alert("It's a draw!");
                }
                document.getElementById('playAgain').style.display = 'block'; // Show play again button
                gameActive = false;
            }, 10); // Short delay before alert
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer(currentPlayer === 'X' ? playerName1 : playerName2); // Update current player display
        }
    }


    // ... other functions ...
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
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return cells.every(cell => cell !== null);
    }


    window.startGame = startGame; // Make startGame accessible globally
});
