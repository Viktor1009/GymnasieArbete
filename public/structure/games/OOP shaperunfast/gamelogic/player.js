export class Player {
    constructor({
        parent = document.body,
        width,
        height,
        frameCount,
        frameSpeed = 24,
    }) {
        this.element = document.createElement("div");
        this.element.id = "player";
        parent.appendChild(this.element);
        this.width = width;
        this.height = height;
        this.frameWidth = width;
        this.frameHight = height;
        this.frameCount = frameCount;
        this.frameDuration = 1 / frameSpeed;
        this.frameDistance = 91;
        this.currentFrame = 0;
        this.frameTimer = 0;

        this.x;
        this.y;
        this.speed = 200;
    }
        update(deltaTime) {
            this.frameTimer += deltaTime;
            if (this.frameTimer >= this.frameDuration) {
                this.frameTimer = 0;
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            }

        }

        draw() {
            this.element.style.backgroundPositionX = (this.currentFrame * (this.frameWidth + this.frameDistance))* -1 + "px";
        }
    }


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImage = new Image();
playerImage.src = "/assets/img/logo.png";

const player = {
  x: 50,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  xSpeed: 0,
  ySpeed: 0,
  onGround: false,
  health: 3
};

const keys = {
  left: false,
  right: false,
  up: false
};

const gravity = 0.5;
const jumpStrength = -10;
const moveSpeed = 4;

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") keys.left = true;
  if (e.code === "ArrowRight") keys.right = true;
  if (e.code === "ArrowUp") keys.up = true;
});

document.addEventListener("keyup", (e) => {
  if (e.code === "ArrowLeft") keys.left = false;
  if (e.code === "ArrowRight") keys.right = false;
  if (e.code === "ArrowUp") keys.up = false;
});

function update() {

  if (keys.left) player.x -= moveSpeed;

  if (keys.right) player.x += moveSpeed;

  if (keys.up && player.onGround) {
    player.ySpeed = jumpStrength;
    player.onGround = false;
  }

  player.ySpeed += gravity;
  player.y += player.ySpeed;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.ySpeed = 0;
    player.onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

playerImage.onload = loop;