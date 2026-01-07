export class Player {
    constructor({
        parent = document.body,
        width,
        height,
        frameCount,
        groundY,
        frameSpeed = 12,
        
    }) {
        console.log("kör Player");

        this.parent = parent;

        this.element = document.createElement("div");
        this.element.id = "OOPplayer";
        parent.appendChild(this.element);
        this.width = width;
        this.height = height;
        this.frameWidth = width;
        this.frameHeight = height;
        this.frameCount = frameCount;
        this.frameDuration = 1 / frameSpeed;
        this.frameDistance = 91;
        this.currentFrame = 0;
        this.frameTimer = 0;

        this.groundY = groundY - this.height;
        this.x = 200;
        this.y = this.groundY + this.height;
        this.yVelocity = 0;
        this.gravity = 220;
        this.jumpForce = -200;
        
        this.onGround = true;
        this.mouseDown = false;
        this.isHit = false;

        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;

        this.keys = {};
        document.addEventListener("keydown", (e) => (this.keys[e.code] = true));
        document.addEventListener("keyup", (e) => (this.keys[e.code] = false));
        document.addEventListener("mousedown", () => {this.mouseDown = true;});
        document.addEventListener("mouseup", () => {this.mouseDown = false;});

    }

    update(deltaTime, triangles) {
        this.xVelocity = 0;
        const containerWidth = this.parent.clientWidth;
        const containerHeight = this.parent.clientHeight;

        if ((this.keys["Space"] || this.mouseDown) && this.onGround) { 
            this.jump();
            /**ump(){
        this.yVelocity = this.jumpForce;
        this.onGround = false;
        this.moving = true;
    } */
        }

        this.x += this.xVelocity * deltaTime; // collision
        this.yVelocity += this.gravity * deltaTime;
        let y = this.y + (this.yVelocity * deltaTime);
        triangles.forEach((triangle) => {
            if (
                this.x + this.width > triangle.x 
                && this.x < triangle.x + triangle.width 
                && this.onGround 
                && !this.isHit
            ) {
                console.log("died")
                this.isHit = true;
            }
            
        })
        this.y = this.y + (this.yVelocity * deltaTime);
        
        this.x += this.xVelocity * deltaTime;
        this.yVelocity += this.gravity * deltaTime;
        this.y = this.y + (this.yVelocity * deltaTime);

        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.yVelocity = 0;
            this.onGround = true;
        }


        if (this.x < 0) this.x = 0;
        if (this.x + this.width > containerWidth)
            this.x = containerWidth - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > containerHeight)
            this.y = containerHeight - this.height;


        this.frameTimer += deltaTime;
        if (this.moving) {
            if (this.frameTimer >= this.frameDuration) {
                this.frameTimer = 0;
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
                if(this.currentFrame = 0){
                    this.currentFrame = 1;
                }
            }
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.moving = false;
    }

    loseLife() {
        this.lives--;
        console.log("Lives:", this.lives);

        if (this.lives <= 0) {
            console.log("gameover");
        }
    }


    jump(){
        this.yVelocity = this.jumpForce;
        this.onGround = false;
        this.moving = true;
    }
    draw() {
        this.element.style.backgroundPositionX = 
            this.currentFrame * (this.frameWidth + this.frameDistance) * -1 + "px";
    }
}
