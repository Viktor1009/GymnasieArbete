import {Manager} from "./manager.js";
import {Player} from "./player.js";

export class GameEngine {
  constructor({ targetFps = 60, targetEl = document.body } = {}) {
    console.log("kör Game");
    
    this.targetFps = targetFps;
    this.targetEl = targetEl;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.isRunning = false;
    this.frameRequest = null;
    this.gametime = 30000;
    this.#init();

    this.manager; 
    this.player;

  }

  #init() {
    this.groundPercent = 0.8;
    this.groundY = this.targetEl.clientHeight * this.groundPercent;
    
    this.manager = new Manager(this.targetEl, this.groundY);
    this.player = new Player({
      parent: this.targetEl, 
      frameCount: 10, 
      width: 50, 
      height: 50, 
      groundY: this.groundY
    });
    this.start();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastTime = performance.now();
      this.#gameLoop(this.lastTime);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }

  #gameLoop(currentTime) {
    if (!this.isRunning) return;

    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update(this.deltaTime);
    this.draw(); 

    this.frameRequest = requestAnimationFrame((t) => this.#gameLoop(t));
  }

  update(deltaTime) {
    this.manager.update(deltaTime);
    this.player.update(deltaTime, this.manager.triangles);
  }

  draw() {
    this.manager.draw();
    this.player.draw();
  }
}

