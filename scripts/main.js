import Stats from '../node_modules/stats-js/src/Stats.js';

import { Config } from './config.js';
import { DOM } from './modules/dom.js';
import { State } from './modules/states.js';
import { Physics } from './modules/physics.js';
import { Player } from '../objects/Player/Player.js';
import { Projectile } from '../objects/Projectile.js';
import { Box } from '../objects/Box.js';
import { Village } from '../objects/Maps/Village.js';
import { Render } from './modules/render.js';


DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

let game = {

  init: () => {
    const player = new Player();
    const projectile = Projectile;
    const box = new Box(Village.objects);

    const village = new Image();
    village.src = Village.mapSprite;
    
    (function update() {
      stats.begin();

      Config.ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
      
      // Draw background
      Render.image({
        image: village,
        clipX: 0,
        clipY: 0,
        clipWidth: DOM.canvas.width,
        clipHeight: DOM.canvas.height,
        x: 0,
        y: 0,
        width: DOM.canvas.width * 2,
        height: DOM.canvas.height * 2
      })

      box.render();
      
      // Pop on other edge
      if (State.player.y < 0) {
        State.player.y = DOM.canvas.height;
      }
      else if (State.player.y > DOM.canvas.height) {
        State.player.y = 0;
      }
      else if (State.player.x < 0) {
        State.player.x = DOM.canvas.width;
      }
      else if (State.player.x > DOM.canvas.width) {
        State.player.x = 0;
      }

      player.update();
      if (State.projectiles.length > 0) {
        projectile.update();
      }
      stats.end();

      requestAnimationFrame(update);
    })();




    document.addEventListener('keydown', function (e) {
      // Disable Alt key
      if (e.code === 'AltLeft') {
        e.preventDefault();
      }
      
      if (e.code === Config.player.KEYBOARD_CONTROLS.run) {
        State.keyMap.shift = true;
      }
      


      if (e.code === Config.player.KEYBOARD_CONTROLS.up) {
        State.keyMap.up = true;

        changeRunningState();
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.down) {
        State.keyMap.down = true;

        changeRunningState();
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.left) {
        State.keyMap.left = true;

        changeRunningState();
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.right) {
        State.keyMap.right = true;

        changeRunningState();
      }



      const index = State.keyMap.array.indexOf(e.code);

      if (index < 0) {
        State.keyMap.array.push(e.code);
      }




      function changeRunningState() {
        if (e.code === Config.player.KEYBOARD_CONTROLS.run) {
          State.player.state = 'running';
        }
        else {
          State.player.state = 'walking';
        }
      }

      //console.log(State.keyMap);

      DOM.keysPressed.innerText = State.keyMap.array, State.player.speed;
    });






    document.addEventListener('keyup', function (e) {
      if (e.code === Config.player.KEYBOARD_CONTROLS.run) {
        State.keyMap.shift = false;
      }
      
      if (e.code === Config.player.KEYBOARD_CONTROLS.up) {
        State.keyMap.up = false;
        State.keyMap.upLeft = false;
        State.keyMap.upRight = false;

        State.player.state = 'idle';
        
        State.player.currentRowIndex = Config.player.spriteMap.up;
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.down) {
        State.keyMap.down = false;
        State.keyMap.downLeft = false;
        State.keyMap.downRight = false;

        State.player.state = 'idle';
        
        State.player.currentRowIndex = Config.player.spriteMap.down;
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.left) {
        State.keyMap.left = false;

        State.player.state = 'idle';
        
        State.player.currentRowIndex = Config.player.spriteMap.left;
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.right) {
        State.keyMap.right = false;

        State.player.state = 'idle';
        
        State.player.currentRowIndex = Config.player.spriteMap.right;
      }


      const index = State.keyMap.array.indexOf(e.code);

      if (index > -1) {
        State.keyMap.array.splice(index, 1);
      }

      //console.log(State.keyMap);

      DOM.keysPressed.innerText = State.keyMap.array;
    });





    document.addEventListener('mousedown', function (e) {
      DOM.mousePosition.x = e.clientX;
      DOM.mousePosition.y = e.clientY;

      const angle = Math.atan2(DOM.mousePosition.y - State.player.y, DOM.mousePosition.x - State.player.x);
      const velocity = Physics.velocity(angle, Config.projectiles.SPEED);

      const projectile = {
        x: State.player.x, 
        y: State.player.y, 
        radius: Config.projectiles.SIZE, 
        color: Config.projectiles.COLOR, 
        velocity: velocity
      };

      Projectile.shoot(projectile);
      Projectile.update();
    });




    let playerSprite = new Image();
    playerSprite.src = Config.root + Config.player.SPRITE_SHEET_PATH;

    document.addEventListener('mousemove', function (e) {
      DOM.mousePosition.x = e.clientX;
      DOM.mousePosition.y = e.clientY;
      
      const angle = Math.atan2(DOM.mousePosition.y - State.player.y, DOM.mousePosition.x - State.player.x);

      const direction = {
        get up() { return angle <= -1.17 && angle >= -1.97 },
        get down() { return angle <= 1.97 && angle >= 1.17 },
        get left() { return angle <= 3.14 && angle >= 2.74 || angle >= -3.14 && angle <= -2.74 },
        get right() { return angle > 0.01 && angle <= 0.4 || angle >= -0.4 && angle <= 0.01 },
        get upLeft() { return angle > -2.74 && angle < -1.97 },
        get upRight() { return angle > -1.17 && angle < -0.4 },
        get downLeft() { return angle < 2.74 && angle > 1.97 },
        get downRight() { return angle < 1.17 && angle > 0.4 },
      }
      
      /** 
       * The looking direction only changes if previous direction is different.
       */

      // Looking up ⬆️
      if (direction.up) {
        if (State.player.facing !== 'up') {
          State.player.facing = 'up';
        }
      }

      // Looking down ⬇️
      else if (direction.down) {
        if (State.player.facing !== 'down') {
          State.player.facing = 'down';
        }
      }

      // Looking left ⬅️
      else if (direction.left) {
        if (State.player.facing !== 'left') {
          State.player.facing = 'left';
        }
      }

      // Looking right ➡️
      else if (direction.right) {
        if (State.player.facing !== 'right') {
          State.player.facing = 'right';
        }
      }
      
      // Looking up-left ↖️
      else if (direction.upLeft) {
        if (State.player.facing !== 'up-left') {
          State.player.facing = 'up-left';
        }
      }

      // Looking up-right ↗️
      else if (direction.upRight) {
        if (State.player.facing !== 'up-right') {
          State.player.facing = 'up-right';
        }
      }

      // Looking down-left ↙️
      else if (direction.downLeft) {
        if (State.player.facing !== 'down-left') {
          State.player.facing = 'down-left';
        }
      }

      // Looking down-right ↘️
      else if (direction.downRight) {
        if (State.player.facing !== 'down-right') {
          State.player.facing = 'down-right';
        }
      }

      // DOM.keysPressed.innerText = angle;
    });

  }
}

export { game };

