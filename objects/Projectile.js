import { Config } from '../scripts/config.js';
import { DOM } from '../scripts/modules/dom.js';


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



  shoot(arr) {
    arr.forEach((projectile, index) => {
      projectile.movement();
      
      if (
        projectile.x - projectile.radius < 0 ||
        projectile.x + projectile.radius > canvas.width ||
        projectile.y - projectile.radius < 0 ||
        projectile.y + projectile.radius > canvas.height
      )
      {
        arr.splice(index, 1);
      }
    });
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  movement() {
    this.draw();
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
}



