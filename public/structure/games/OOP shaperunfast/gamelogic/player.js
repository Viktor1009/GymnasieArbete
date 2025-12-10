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

