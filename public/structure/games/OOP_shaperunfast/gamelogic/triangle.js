export class Triangle {
  constructor(
    parent = document.body, 
    speed,
    groundY
  ) {
    console.log("kör Triangle");

    this.parentSize = parent.getBoundingClientRect();
    this.height = 40;
    this.width = 50;
    this.x = this.parentSize.width + this.width;
    this.groundY = groundY - this.height;
    this.y = this.groundY;
    this.div = document.createElement("div");
    this.div.classList.add("OOPtriangle");
    parent.appendChild(this.div);

    this.speed = speed;
    this.gone = false;
  }

  resetPosition() {
    this.x = this.parentSize.width + this.width;
  }

  update(deltatime) {
    this.x += this.speed * deltatime;
    if (this.x < -50) {
      this.gone = true;
    }
  }

  draw() {
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
  }
}
