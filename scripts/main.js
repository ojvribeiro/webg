import { config, canvas, DOMKeys, DOMSpeed, ctx } from './config.js';
import Player, { playerConfig } from '../objects/Player.js';
import Projectile from '../objects/Projectile.js';



const __DIR__ = config.__DIR__;

let game = {

  init: () => {
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const player = new Player();


    const village = new Image();
    village.src = __DIR__ + '/sprites/Maps/Village/Village.png';




    let projectiles = [];




    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.drawImage(village, 0, 0, canvas.width, canvas.height);
      
      const projectile = new Projectile();
      projectile.shoot(projectiles)
      
        
      // Pop on other edge
      if (player.props.y < 0) {
        player.props.y = canvas.height;
      }
      else if (player.props.y > canvas.height) {
        player.props.y = 0;
      }
      else if (player.props.x < 0) {
        player.props.x = canvas.width;
      }
      else if (player.props.x > canvas.width) {
        player.props.x = 0;
      }
      
      player.update();

      requestAnimationFrame(update);
    }
      
    update();









    document.addEventListener('keydown', function (e) {
      if (e.code === 'AltLeft') {
        e.preventDefault();
      }
      
      if (e.code === player.props.controls.run) {
        player.keyMap.shift = true;
      }
      
      if (e.code === player.props.controls.up) {
        player.keyMap.up = true;
        player.props.moving = true;
      }
      if (e.code === player.props.controls.down) {
        player.keyMap.down = true;
        player.props.moving = true;
      }
      if (e.code === player.props.controls.left) {
        player.keyMap.left = true;
        player.props.moving = true;
      }
      if (e.code === player.props.controls.right) {
        player.keyMap.right = true;
        player.props.moving = true;
      }



      const index = player.keyMap.array.indexOf(e.code);

      if (index < 0) {
        player.keyMap.array.push(e.code);
      }

      DOMKeys.innerText = player.keyMap.array, player.props.speed;
    });






    document.addEventListener('keyup', function (e) {
      player.props.currentRowIndex = 0;
      
      if (e.code === player.props.controls.run) {
        player.keyMap.shift = false;
      }
      
      if (e.code === player.props.controls.up) {
        player.keyMap.up = false;
        player.keyMap.upLeft = false;
        player.keyMap.upRight = false;

        player.props.moving = false;
      }

      if (e.code === player.props.controls.down) {
        player.keyMap.down = false;
        player.keyMap.downLeft = false;
        player.keyMap.downRight = false;

        player.props.moving = false;
      }

      if (e.code === player.props.controls.left) {
        player.keyMap.left = false;

        player.props.moving = false;
      }

      if (e.code === player.props.controls.right) {
        player.keyMap.right = false;

        player.props.moving = false;
      }


      const index = player.keyMap.array.indexOf(e.code);

      if (index > -1) {
        player.keyMap.array.splice(index, 1);
      }

      DOMKeys.innerText = player.keyMap.array;
    });





    document.addEventListener('mousedown', function (e) {
      const angle = Math.atan2(e.clientY - player.props.y, e.clientX - player.props.x);
      const speed = {
        x: Math.cos(angle) * 30,
        y: Math.sin(angle) * 30
      }
      
      projectiles.push(
        new Projectile(
          player.props.x,
          player.props.y,
          5,
          '#fff',
          speed
        )
      );
    });




    let playerSprite = new Image();
    playerSprite.src = playerConfig.SPRITE_SHEET;

    document.addEventListener('mousemove', function (e) {
      const angle = Math.atan2(e.clientY - player.props.y, e.clientX - player.props.x);
      

      // Looking up
      if (angle <= -1.17 && angle >= -1.97) {
        if (player.props.facing !== 'up') {
          player.props.facing = 'up';
        }
      }
      // Looking down
      else if (angle <= 1.97 && angle >= 1.17) {
        if (player.props.facing !== 'down') {
          player.props.facing = 'down';
        }
      }
      // Looking left
      else if (angle <= 3.14 && angle >= 2.74 || angle >= -3.14 && angle <= -2.74) {
        if (player.props.facing !== 'left') {
          player.props.facing = 'left';
        }
      }
      // Looking right
      else if (angle >= 0.01 && angle <= 0.4 || angle >= -0.4 && angle <= 0.01) {
        if (player.props.facing !== 'right') {
          player.props.facing = 'right';
        }
      }
      
      // Looking up-left
      else if (angle > -2.74 && angle < -1.97) {
        if (player.props.facing !== 'up-left') {
          player.props.facing = 'up-left';
        }
      }
      // Looking up-right
      else if (angle > -1.17 && angle < -0.4) {
        if (player.props.facing !== 'up-right') {
          player.props.facing = 'up-right';
        }
      }
      // Looking down-left
      else if (angle < 2.74 && angle > 1.97) {
        if (player.props.facing !== 'down-left') {
          player.props.facing = 'down-left';
        }
      }
      // Looking down-right
      else {
        if (player.props.facing !== 'down-right') {
          player.props.facing = 'down-right';
        }
      }

      DOMKeys.innerText = angle;
    });

  }
}

export { game };

