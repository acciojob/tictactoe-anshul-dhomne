//your JS code here. If required.
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameArea = document.getElementById('game-area');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let players = { X: '', O: '' };
let board = Array(9).fill(null);
let gameActive = true;

// Submit button click → show game board
submitButton.addEventListener('click', () => {
  const player1Name = player1Input.value.trim();
  const player2Name = player2Input.value.trim();

  if (!player1Name || !player2Name) {
    alert('Please enter both player names.');
    return;
  }

  players.X = player1Name;
  players.O = player2Name;

  document.getElementById('player-inputs').style.display = 'none';
  gameArea.style.display = 'block';

  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;

    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      messageDiv.textContent = `${players[currentPlayer]}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell)) {
      messageDiv.textContent = `It's a draw!`;
      gameActive = false;
    } else {
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    }
  });
});

// Check win
function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}
