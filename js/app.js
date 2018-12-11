let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let gradient = context.createLinearGradient(0, 0, 800, 0);

let elementSize = 20;

let directionX = 1;
let directionY = 0;

let isAppRunning = false;
let gameOn = true;

let snake = [
    {x: 2, y: 0},
    {x: 1, y: 0},
    {x: 0, y: 0}
];

let apple = generateApplePosition();

let result = document.getElementById("result");
let score = 0;

result.innerText = "Press enter to start.";

gradient.addColorStop(0, "magenta");
gradient.addColorStop(0.5, "blue");
gradient.addColorStop(1, "red");


function update() {
    if (gameOn) {
        result.innerText = "SCORE: " + score;
        clearCanvas();
        drawSnake();
        drawApple();
        updateSnake();
        isAppleEaten();
        validate();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function updateSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
    }
    snake[0].x += directionX;
    snake[0].y += directionY;
}

function drawSnake() {
    context.fillStyle = "black";
    context.fillRect(snake[0].x * elementSize, snake[0].y * elementSize, elementSize, elementSize);
    if (snake.length > 1) {
        for (let i = 1; i < snake.length; i++) {
            context.fillStyle = gradient;
            context.fillRect(snake[i].x * elementSize, snake[i].y * elementSize, elementSize, elementSize);
        }
    }
}

function validate() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            endGame();
        }
    }
    if (snake[0].x < 0
        || snake[0].x >= canvas.width / elementSize
        || snake[0].y < 0
        || snake[0].y >= canvas.height / elementSize) {
        endGame()
    }
}

function endGame() {
    result.innerText = "You lose! Your score: " + score + ". Press enter to restart.";
    gameOn = false;
    canvas.style.border = "5px solid red";
}

function logPressedKey(event) {
    let key = event.key;
    if (isAppRunning) {
        moveSnake(key);
        if (key === "Enter") {
            restartGame();
        }
    } else {
        if (key === "Enter") {
            isAppRunning = true;
            setInterval(update, 100);
        }
    }
}

function restartGame() {
    directionX = 1;
    directionY = 0;
    gameOn = true;
    snake = [
        {x: 2, y: 0},
        {x: 1, y: 0},
        {x: 0, y: 0}
    ];
    canvas.style.border = "5px solid black";
    apple = generateApplePosition();
    score = 0;
}

function moveSnake(key) {
    if (key === "ArrowUp" && directionY < 1) {
        directionX = 0;
        directionY = -1;
    } else if (key === "ArrowDown" && directionY > -1) {
        directionX = 0;
        directionY = 1;
    } else if (key === "ArrowLeft" && directionX < 1) {
        directionX = -1;
        directionY = 0;
    } else if (key === "ArrowRight" && directionX > -1) {
        directionX = 1;
        directionY = 0;
    }
}

function drawApple() {
    context.strokeStyle = 'green';
    context.strokeRect(apple.x * elementSize, apple.y * elementSize, elementSize, elementSize);
}

function generateApplePosition() {
    let randomX = Math.floor(Math.random() * 40);
    let randomY = Math.floor(Math.random() * 20);
    for (let i = 0; i < snake.length; i++) {
        if (randomX === snake[i].x && randomY === snake[i].y) {
            return generateApplePosition();
        }
    }
    return {x: randomX, y: randomY};
}

function isAppleEaten() {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        apple = generateApplePosition();
        snake.push({});
        score++;
    }
}


document.addEventListener("keydown", logPressedKey);
