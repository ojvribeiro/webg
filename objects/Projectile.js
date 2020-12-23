import { Config } from '../scripts/config.js';
import { DOM } from '../scripts/modules/dom.js';
import { State } from '../scripts/modules/states.js';

const ctx = Config.ctx;

DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;


let Projectile = {
  shoot: (arr) => {
    State.projectiles.push(arr);
  },


  draw: (x, y, radius, color) => {
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    
    ctx.restore();
  },
  
  
  update: () => {
    const padding = 5;

    State.projectiles.forEach((projectile, index) => {
      projectile.x += projectile.velocity.x;
      projectile.y += projectile.velocity.y;

      // Remove projectile if outside the canvas plus 50px.
      if (projectile.x - projectile.radius < -50 ||
        projectile.x + projectile.radius > DOM.canvas.width + 50 ||
        projectile.y - projectile.radius < -50 ||
        projectile.y + projectile.radius > DOM.canvas.height + 50) {

        State.projectiles.splice(index, 1);
      }
  
      Projectile.draw(projectile.x, projectile.y, projectile.radius, projectile.color);
  
      // console.log(State.projectiles);
    });
  }
}


export { Projectile };
