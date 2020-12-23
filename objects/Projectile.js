import { Config } from '../scripts/config.js';
import { DOM } from '../scripts/modules/dom.js';
import { State } from '../scripts/modules/states.js';

const ctx = Config.ctx;

export default class Projectile {
  constructor(x, y, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }
DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;


  shoot: (arr) => {
    State.projectiles.push(arr);
  },

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
    State.projectiles.forEach((projectile, index) => {
      projectile.x += projectile.velocity.x;
      projectile.y += projectile.velocity.y;

  movement() {
    this.draw();
    this.x += this.speed.x;
    this.y += this.speed.y;
        State.projectiles.splice(index, 1);
  }
}



