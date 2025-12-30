
import {Manager} from "./manager.js";
import {Player} from "./player.js";

export class GameEngine {
  constructor({ targetFps = 60, targetEl = document.body } = {}) {
    this.targetFps = targetFps;
    this.targetEl = targetEl;
    this.deltaTime = 0;
    this.lastTime = 0;
    this.isRunning = false;
    this.frameRequest = null;
    this.#init();

    this.manager; 
    this.player;

  }

  #init() {
    this.manager = new Manager(this.targetEl);
    this.player = new Player({parent:this.targetEl, frameCount: 10, width:29, height:39});
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
    this.player.update(deltaTime);
  }

  draw() {
    this.manager.draw();
    this.player.draw();
  }
}
