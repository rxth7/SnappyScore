const grid = document.getElementById("grid");
const statusEl = document.querySelector(".status");
const playerScoreEl = document.getElementById("playerScore");
const aiScoreEl = document.getElementById("aiScore");

const colors = ["#f54242", "#f5a142", "#f5d142", "#8df542", "#42f554", "#42f5cb", "#42c5f5", "#4275f5", "#8e42f5"];
let aiChoice = "";
let playerScore = 0;
let aiScore = 0;

function initGame() {
    grid.innerHTML = "";
    shuffle(colors);
    aiChoice = colors[Math.floor(Math.random() * colors.length)];

    colors.forEach((color, index) => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.style.background = color;
        tile.dataset.color = color;
        tile.addEventListener("click", () => handleChoice(color));
        grid.appendChild(tile);
    });

    statusEl.textContent = "Guess AI's hidden tile 🎯";
}

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");


function handleChoice(selectedColor) {
    const selectedTile = [...grid.children].find(tile => tile.dataset.color === selectedColor);

    if (selectedColor === aiChoice) {
        playerScore++;
        statusEl.textContent = `🎉 Correct! You found AI's color.`;
        selectedTile.classList.add("correct");
        winSound.play();
    } else {
        aiScore++;
        const hint = selectedColor < aiChoice ? "Try a warmer color 🔥" : "Try a cooler color ❄️";
        statusEl.textContent = `❌ Wrong! Hint: ${hint}`;
        selectedTile.classList.add("wrong");
        loseSound.play();
    }

    playerScoreEl.textContent = playerScore;
    aiScoreEl.textContent = aiScore;

    setTimeout(() => {
        selectedTile.classList.remove("correct", "wrong");
        initGame();
    }, 2000);
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
window.addEventListener("DOMContentLoaded", () => {
    const bgm = document.getElementById("bgm");
    // Wait a short time to improve autoplay success
    setTimeout(() => {
        bgm.muted = false;
        bgm.play().catch(err => {
            console.log("Autoplay failed:", err);
        });
    }, 500);
});


initGame();