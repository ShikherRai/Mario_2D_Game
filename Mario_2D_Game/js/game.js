const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 40,
    color: 'red',
    speed: 5,
    velocityY: 0,
    gravity: 0.5,
    jumping: false
};

const ground = { x: 0, y: 350, width: canvas.width, height: 50, color: 'green' };

function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function update() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    if (player.y + player.height >= ground.y) {
        player.y = ground.y - player.height;
        player.jumping = false;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(ground);
    drawRect(player);
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') player.x += player.speed;
    if (event.key === 'ArrowLeft') player.x -= player.speed;
    if (event.key === 'ArrowUp' && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

update();