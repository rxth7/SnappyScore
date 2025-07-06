const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
};
let dir = "RIGHT";

const scoreEl = document.getElementById("score");
const gameoverSound = document.getElementById("gameoverSound");

document.addEventListener("keydown", setDirection);

function setDirection(e) {
    if (e.key === "ArrowLeft" && dir !== "RIGHT") dir = "LEFT";
    else if (e.key === "ArrowUp" && dir !== "DOWN") dir = "UP";
    else if (e.key === "ArrowRight" && dir !== "LEFT") dir = "RIGHT";
    else if (e.key === "ArrowDown" && dir !== "UP") dir = "DOWN";
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00ff99" : "#00cc88";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "#ff0033";
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    let head = { x: snake[0].x, y: snake[0].y };
    if (dir === "LEFT") head.x -= box;
    if (dir === "UP") head.y -= box;
    if (dir === "RIGHT") head.x += box;
    if (dir === "DOWN") head.y += box;

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box,
        };
    } else {
        snake.pop();
    }

    // Game over
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(game);
        gameoverSound.play();
        setTimeout(() => {
            alert("💀 Game Over! Your score is " + score);
            location.reload();
        }, 100);
        return;
    }

    snake.unshift(head);
    scoreEl.textContent = score;
}

const game = setInterval(drawGame, 100);