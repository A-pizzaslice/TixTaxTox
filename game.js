document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('gameBoard');
    let cells = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameActive = false;
    let playerName1 = '';
    let playerName2 = '';
    const winAudio = document.getElementById('winAudio');
    const bgMusic = document.getElementById('bgMusic');

    function createBoard() {
        board.innerHTML = '';
        cells = Array(9).fill(null); // Reset cells for a new game
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
        document.getElementById('playerSetup').style.display = 'none';
        document.getElementById('playerInfo').style.display = 'block';
        updatePlayerNames();
        updateCurrentPlayer(playerName1);
        gameActive = true;
        createBoard();
        bgMusic.play();
    }

    function updatePlayerNames() {
        document.getElementById('player1Name').textContent = playerName1;
        document.getElementById('player2Name').textContent = playerName2;
    }

    function updateCurrentPlayer(playerName) {
        document.getElementById('currentPlayer').textContent = `Current turn: ${playerName}`;
        document.getElementById('player1Name').classList.toggle('highlight', playerName === playerName1);
        document.getElementById('player2Name').classList.toggle('highlight', playerName === playerName2);
    }

    function cellClicked() {
        const index = this.dataset.index;
        if (cells[index] || !gameActive) {
            return;
        }
        cells[index] = currentPlayer;
        let img = document.createElement('img');
        img.src = currentPlayer === 'X' ? 'yash.jpeg' : 'pritsy.jpeg';
        img.alt = currentPlayer;
        img.classList.add('player-img');
        this.appendChild(img);
        let winnerCombination = checkWinner();
        let isDraw = checkDraw();
        if (winnerCombination || isDraw) {
            setTimeout(() => {
                gameActive = false; // Stop the game
                bgMusic.pause();
                bgMusic.currentTime = 0;
                if (winnerCombination) {
                    const playerName = currentPlayer === 'X' ? playerName1 : playerName2;
                    document.getElementById('winMessage').textContent = `${playerName} Wins!`;
                    document.getElementById('winModal').style.display = 'block';
                    winAudio.play();
                    winnerCombination.forEach(index => {
                        const winningCell = document.querySelector(`.game-cell[data-index='${index}']`);
                        winningCell.classList.add('highlight-win');
                    });
                } else {
                    alert("It's a draw!");
                }
                document.getElementById('playAgain').style.display = 'block';
            }, 10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer(currentPlayer === 'X' ? playerName1 : playerName2);
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return combination;
            }
        }
        return null;
    }

    function checkDraw() {
        return cells.every(cell => cell !== null);
    }

    function resetGame() {
        winAudio.pause();
        winAudio.currentTime = 0;
        bgMusic.pause();
        bgMusic.currentTime = 0;
    
        cells = Array(9).fill(null);
        currentPlayer = 'X';
        gameActive = false; // The game should be set to inactive until "Start Game" is clicked again
    
        createBoard();
        document.getElementById('playAgain').style.display = 'none';
        document.getElementById('winModal').style.display = 'none';
        document.getElementById('playerInfo').style.display = 'none'; // Hide player info
        document.getElementById('playerSetup').style.display = 'block'; // Show player setup for new names
        document.getElementById('player1').value = ''; // Clear previous player names
        document.getElementById('player2').value = '';
    }
    
    document.getElementById('playAgain').addEventListener('click', resetGame);
    

    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('playAgain').addEventListener('click', resetGame);

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function() {
        document.getElementById('winModal').style.display = 'none';
        document.getElementById('playAgain').style.display = 'block';
        bgMusic.pause(); // Stop background music
        bgMusic.currentTime = 0;
        gameActive = false;
    });
});
