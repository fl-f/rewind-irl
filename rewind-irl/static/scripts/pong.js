// Canvas setup
const canvas = document.getElementById('pongCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');

// Game variables
let offset = 0;
let frameCount = 0;
const defaultSpeed = 8;

// Sound effects
const hitSound = new Audio('../pong/sounds/hit.mp3');
const scoreSound = new Audio('../pong/sounds/score.mp3');
const wallSound = new Audio('../pong/sounds/wall.mp3');


// Game objects
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 10, dx: 8, dy: 8 };
const paddleWidth = 10;
const paddleHeight = 130;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 12 };
const ai = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, dy: 16 };

// Score tracking
let playerScore = 0;
let aiScore = 0;

// Keyboard input tracking
const keys = {};

// Event listeners
window.addEventListener('keydown', (event) => keys[event.key] = true);
window.addEventListener('keyup', (event) => keys[event.key] = false);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ai.x = canvas.width - paddleWidth;
});

// Drawing functions
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = color;
    context.fill();
}

function drawMiddleLine() {
    context.beginPath();
    context.setLineDash([5, 15]);
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.strokeStyle = 'white';
    context.stroke();
    context.setLineDash([]);
}

// Paddle movement function
function movePaddle(paddle, upKey, downKey) {
    document.addEventListener('keydown', (event) => {
        if (event.keyCode === upKey) paddle.y -= paddle.dy;
        if (event.keyCode === downKey) paddle.y += paddle.dy;
    });
}

// Collision detection
function collision(ball, paddle) {
    const extendedPaddleWidth = paddle.width + Math.abs(ball.dx);
    if (ball.x - ball.radius < paddle.x + extendedPaddleWidth && ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height && ball.y + ball.radius > paddle.y) {
        hitSound.play(); 
        ball.dx *= 1.05;
        ball.dy *= 1.05;
        return true;
    }
    return false;
}

// Ball reset function
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = -defaultSpeed;
    ball.dy = -defaultSpeed;
}

// Game update function
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (frameCount % 20 === 0) offset = Math.random() * 30 - 15;

    frameCount++;
    drawMiddleLine();
    drawRect(player.x, player.y, player.width, player.height, 'white');
    drawRect(ai.x, ai.y, ai.width, ai.height, 'white');
    drawCircle(ball.x, ball.y, ball.radius, 'white');

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        wallSound.play();
        ball.dy = -ball.dy;
    }

    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        scoreSound.play();
        resetBall();
    }
    if (ball.x - ball.radius < 0) {
        aiScore++;
        scoreSound.play();
        resetBall();
    }

    if (collision(ball, player) || collision(ball, ai)) ball.dx = -ball.dx;

    if (keys['w']) player.y -= player.dy;
    if (keys['s']) player.y += player.dy;
    player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
    if (ai.y < ball.y - offset) ai.y += ai.dy;
    if (ai.y > ball.y - offset) ai.y -= ai.dy;
    ai.y = Math.max(0, Math.min(ai.y, canvas.height - ai.height));

    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('aiScore').innerText = aiScore;
}


setInterval(update, 1000 / 60);
movePaddle(player, 87, 83);