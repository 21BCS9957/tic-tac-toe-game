// DOM Elements
const boxes = document.querySelectorAll(".btn");
const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const startGameBtn = document.getElementById("startGameBtn");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("mg");
const nameInputSection = document.getElementById("nameInputSection");
const playerInfoSection = document.getElementById("playerInfo");
const gameStatusElement = document.getElementById("gameStatus");
const player1NameInput = document.getElementById("player1Name");
const player2NameInput = document.getElementById("player2Name");
const player1NameDisplay = document.getElementById("p1Name");
const player2NameDisplay = document.getElementById("p2Name");
const player1ScoreDisplay = document.getElementById("p1Score");
const player2ScoreDisplay = document.getElementById("p2Score");
const player1Element = document.getElementById("player1");
const player2Element = document.getElementById("player2");

// Audio elements
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

// Game state variables
let turnO = true;
let gameActive = false;
let moveCount = 0;
let scores = {
    O: 0,
    X: 0
};
let playerNames = {
    O: "Player O",
    X: "Player X"
};

// Winning patterns
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Game initialization
startGameBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetBoard);
newGameBtn.addEventListener("click", newGame);
playAgainBtn.addEventListener("click", resetBoard);

// Initialize box click listeners
boxes.forEach((box) => {
    box.addEventListener("click", () => handleBoxClick(box));
});

// Start the game with player names
function startGame() {
    // Get player names from inputs
    playerNames.O = player1NameInput.value || "Player O";
    playerNames.X = player2NameInput.value || "Player X";
    
    // Update the display names
    player1NameDisplay.textContent = playerNames.O;
    player2NameDisplay.textContent = playerNames.X;
    
    // Hide name input, show player info
    nameInputSection.classList.add("hide");
    playerInfoSection.classList.remove("hide");
    
    // Set game as active
    gameActive = true;
    updateGameStatus();
    updatePlayerHighlight();
}

// Handle box click
function handleBoxClick(box) {
    if (!gameActive || box.innerText !== "" || box.disabled) return;
    
    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play();
    
    // Add O or X based on turn
    const currentPlayer = turnO ? "O" : "X";
    box.innerText = currentPlayer;
    box.disabled = true;
    moveCount++;
    
    // Check for winner
    if (checkWinner()) {
        // Winner found
        endGame(false);
        return;
    }
    
    // Check for draw
    if (moveCount === 9) {
        // Game is a draw
        endGame(true);
        return;
    }
    
    // Switch turns
    turnO = !turnO;
    updateGameStatus();
    updatePlayerHighlight();
}

// Check for a winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const val1 = boxes[a].innerText;
        const val2 = boxes[b].innerText;
        const val3 = boxes[c].innerText;
        
        if (val1 !== "" && val1 === val2 && val2 === val3) {
            // Highlight winning boxes
            boxes[a].classList.add("winner", "winner-animation");
            boxes[b].classList.add("winner", "winner-animation");
            boxes[c].classList.add("winner", "winner-animation");
            return true;
        }
    }
    return false;
}

// End the game (draw or winner)
function endGame(isDraw) {
    gameActive = false;
    
    if (isDraw) {
        // It's a draw
        winnerText.innerText = "It's a Draw!";
        drawSound.currentTime = 0;
        drawSound.play();
    } else {
        // Someone won
        const winner = turnO ? "O" : "X";
        const winnerName = turnO ? playerNames.O : playerNames.X;
        
        // Update score
        scores[winner]++;
        updateScoreDisplay();
        
        // Show winner message
        winnerText.innerText = `${winnerName} Wins!`;
        
        // Play win sound
        winSound.currentTime = 0;
        winSound.play();
    }
    
    // Show winner message after a short delay
    setTimeout(() => {
        winnerMessage.classList.remove("hide");
    }, 500);
}

// Reset the board for a new round
function resetBoard() {
    // Clear all boxes
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("winner", "winner-animation");
    });
    
    // Reset game variables
    turnO = true;
    moveCount = 0;
    gameActive = true;
    
    // Update UI
    winnerMessage.classList.add("hide");
    updateGameStatus();
    updatePlayerHighlight();
}

// Start a completely new game with reset scores
function newGame() {
    // Reset scores
    scores.O = 0;
    scores.X = 0;
    updateScoreDisplay();
    
    // Show name input section again
    nameInputSection.classList.remove("hide");
    playerInfoSection.classList.add("hide");
    
    // Reset the board
    resetBoard();
    
    // Set game as inactive until new names are entered
    gameActive = false;
}

// Update the game status text
function updateGameStatus() {
    const currentPlayerName = turnO ? playerNames.O : playerNames.X;
    gameStatusElement.textContent = `${currentPlayerName}'s turn`;
}

// Update score display
function updateScoreDisplay() {
    player1ScoreDisplay.textContent = scores.O;
    player2ScoreDisplay.textContent = scores.X;
}

// Highlight the current player
function updatePlayerHighlight() {
    if (turnO) {
        player1Element.classList.add("active");
        player2Element.classList.remove("active");
    } else {
        player1Element.classList.remove("active");
        player2Element.classList.add("active");
    }
}

// Initialize the game on load
updateScoreDisplay();