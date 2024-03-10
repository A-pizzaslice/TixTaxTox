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
