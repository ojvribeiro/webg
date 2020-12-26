import { Config } from '../scripts/config.js';
import { DOM } from '../scripts/modules/dom.js';
import { State } from '../scripts/modules/states.js';
import { Physics } from '../scripts/modules/physics.js';
import SpriteAnimation from '../scripts/modules/sprites.js';

DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;

const ctx = Config.ctx;



let playerSprite = new Image();
playerSprite.src = Config.root + Config.player.SPRITE_SHEET_PATH;


class Player {
  constructor() {
    this.sprite = new SpriteAnimation(
      playerSprite, // sprite image object
      State.player.x - (Config.player.WIDTH / 2), // sprite x
      State.player.y - (Config.player.HEIGHT / 2), // sprite y
      Config.player.SIZE * Config.player.SPRITE_SHEET_COLS, // sprite width
      Config.player.SIZE * Config.player.SPRITE_SHEET_ROWS, // sprite height
      100,
      Config.player.SPRITE_SHEET_COLS,
      Config.player.SPRITE_SHEET_ROWS,
      0
    );
  }


  draw(rowIndex, x, y) {
    const hitBox = {
      head: {
        x: State.player.x,
        y: State.player.y - (Config.player.HEIGHT / 4) + 2,
        radius: Config.player.HEIGHT / 4,
        color: (Config.player.SHOW_HITBOX === true) ? Config.player.HITBOX_COLOR : 'transparent'
      },

      body: {
        x: State.player.x - (Config.player.WIDTH / 4) + 2,
        y: State.player.y,
        width: (Config.player.WIDTH / 2),
        height: (Config.player.HEIGHT / 2),
        color: (Config.player.SHOW_HITBOX === true) ? Config.player.HITBOX_COLOR : 'transparent'
      },
    }


    // Modifies sprites.js
    this.sprite.draw(
      rowIndex, 
      x - (Config.player.SIZE / 2), 
      y - (Config.player.SIZE / 2)
    );
    
    
    // Draw hit box
    ctx.save();
    
    ctx.beginPath();
    ctx.fillStyle = hitBox.head.color;
    ctx.arc(
      hitBox.head.x, 
      hitBox.head.y, 
      hitBox.head.radius, 
      0, 
      (Math.PI * 2), 
      false
    );
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = hitBox.head.color;
    ctx.fillRect(
      hitBox.body.x, 
      hitBox.body.y, 
      hitBox.body.width, 
      hitBox.body.height
    );

    ctx.restore();
  }
  
  
  
  
  update() {
    // DOM.playerSpeed.innerHTML = State.player.speed;

    switch (State.player.facing) {
      case 'up':
        if (State.player.facing === 'up') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.upWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.upRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.up;
          }
        }

        break;
        
      case 'down':
        if (State.player.facing === 'down') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.downWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.downRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.down;
          }
        }
      break;
          
      case 'left':
        if (State.player.facing === 'left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.leftWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.leftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.left;
          }
        }
      break;
            
      case 'right':
        if (State.player.facing === 'right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.rightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.rightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.right;
          }
        }
      break;
      
      case 'up-left':
        if (State.player.facing === 'up-left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.upLeftWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.upLeftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.upLeft;
          }
        }
      break;
            
      case 'up-right':
        if (State.player.facing === 'up-right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.upRightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.upRightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.upRight;
          }
        }
      break;
      
      case 'down-left':
        if (State.player.facing === 'down-left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.downLeftWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.downLeftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.downLeft;
          }
        }
      break;
            
      case 'down-right':
        if (State.player.facing === 'down-right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteMap.downRightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteMap.downRightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteMap.downRight;
          }
        }
      break;
              
      default:
        State.player.currentRowIndex = Config.player.spriteMap.down;
    }


    
    // Run
    if (State.keyMap.shift) {
      
      if (State.keyMap.up || State.keyMap.down || State.keyMap.left || State.keyMap.right) {
        
        State.player.speed += 0.1;
        
        // Locks the speed when it hits the maximum defined
        if (State.player.speed >= Config.player.RUN_MAX_SPEED) {
          State.player.speed = Config.player.RUN_MAX_SPEED;
        }
        
        // Listens to movement keys (allows multi press)
        if (State.keyMap.up) {
          State.player.y -= Physics.speed.normalize();
        }
        
        if (State.keyMap.down) {
          State.player.y += Physics.speed.normalize();
        }
        
        if (State.keyMap.left) {
          State.player.x -= Physics.speed.normalize();
        }
        
        if (State.keyMap.right) {
          State.player.x += Physics.speed.normalize();
        }


        // Listens to movement keys (do not allow multi press)
        if (State.keyMap.up || State.keyMap.down || State.keyMap.left || State.keyMap.right) {
          if (State.keyMap.up && !State.keyMap.left && !State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteMap.upRunning;
          }
          else if (State.keyMap.down && !State.keyMap.left && !State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteMap.downRunning;
          }
          else if (State.keyMap.left && !State.keyMap.up && !State.keyMap.down) {
            State.player.currentRowIndex = Config.player.spriteMap.leftRunning;
          }
          else if (State.keyMap.right && !State.keyMap.up && !State.keyMap.down) {
            State.player.currentRowIndex = Config.player.spriteMap.rightRunning;
          }

          else if (State.keyMap.down && State.keyMap.left) {
            State.player.currentRowIndex = Config.player.spriteMap.downLeftRunning;
          }
          else if (State.keyMap.down && State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteMap.downRightRunning;
          }
          else if (State.keyMap.up && State.keyMap.left) {
            State.player.currentRowIndex = Config.player.spriteMap.upLeftRunning;
          }
          else if (State.keyMap.up && State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteMap.upRightRunning;
          }

          this.draw(
            State.player.currentRowIndex,
            State.player.x,
            State.player.y
          );
        }
        
        this.sprite.update();
      }
      else {
        this.draw(
          State.player.currentRowIndex, 
          State.player.x, 
          State.player.y
        );

        this.sprite.update();
      }
    }

    // Walk
    else if (
      !State.keyMap.shift  && 
      State.keyMap.up      || 
      State.keyMap.down    || 
      State.keyMap.left    || 
      State.keyMap.right) {
      
      // Increases the speed
      State.player.speed += 0.1;
      
      
      // Locks the velocity to the maximun allowed
      if (State.player.speed >= Config.player.WALK_MAX_SPEED) {
        State.player.speed = Config.player.WALK_MAX_SPEED;
      }
      
      
      if (State.keyMap.up) {
        State.player.y -= Physics.speed.normalize();
      }
      
      if (State.keyMap.down) {
        State.player.y += Physics.speed.normalize();
      }
      
      if (State.keyMap.left) {
        State.player.x -= Physics.speed.normalize();
      }
      
      if (State.keyMap.right) {
        State.player.x += Physics.speed.normalize();
      }


      if (State.keyMap.up) {
        walk(this);
      }
      
      else if (State.keyMap.down) {
        walk(this);
      }
      
      else if (State.keyMap.left) {
        walk(this);
      }
      
      else if (State.keyMap.right) {
        walk(this);
      }

      this.sprite.update();
    }

    // Stop
    else {
      State.player.speed -= 0.1;
      
      if (State.player.speed <= 0) {
        State.player.speed = 0;
      }

      this.draw(
        State.player.currentRowIndex, 
        State.player.x, 
        State.player.y
      );
      
      this.sprite.update();
    }


    function walk(playerObject) {
      if (State.player.facing === 'up') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.upWalking, 
      }

      else if (State.player.facing === 'down') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.downWalkingBackwards, 
          Config.player.spriteMap.leftWalking, 
          Config.player.spriteMap.rightWalking, 
          Config.player.spriteMap.upLeftWalking, 
      }
          Config.player.spriteMap.upRightWalking, 
          Config.player.spriteMap.upRightWalkingBackwards, 
          Config.player.spriteMap.upLeftWalkingBackwards, 

          Config.player.spriteMap.upWalkingBackwards, 
          Config.player.spriteMap.downWalking, 
      else if (State.player.facing === 'left') {
        if (State.keyMap.left) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.leftWalking, 
          Config.player.spriteMap.rightWalking, 
          Config.player.spriteMap.downRightWalkingBackwards, 
          Config.player.spriteMap.downLeftWalkingBackwards, 
          Config.player.spriteMap.downLeftWalking, 
          Config.player.spriteMap.downRightWalking, 
      }

          Config.player.spriteMap.upWalking, 
          Config.player.spriteMap.downWalking, 
          Config.player.spriteMap.leftWalking, 
      else if (State.player.facing === 'right') {
        if (State.keyMap.right) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.rightWalkingBackwards, 
      }
          Config.player.spriteMap.upLeftWalking, 
          Config.player.spriteMap.downLeftWalkingBackwards, 
          Config.player.spriteMap.downLeftWalking, 
          Config.player.spriteMap.upLeftWalkingBackwards, 


          Config.player.spriteMap.upWalking, 
          Config.player.spriteMap.downWalking, 
          Config.player.spriteMap.leftWalkingBackwards, 
          Config.player.spriteMap.rightWalking, 
      else if (State.player.facing === 'up-left') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.upRightWalking, 
          Config.player.spriteMap.upRightWalkingBackwards, 
          Config.player.spriteMap.downRightWalking, 
      }

          Config.player.spriteMap.upLeftWalking, 
      else if (State.player.facing === 'up-right') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.downLeftWalkingBackwards, 
          Config.player.spriteMap.downLeftWalking, 
          Config.player.spriteMap.upLeftWalkingBackwards, 
      }

          Config.player.spriteMap.downRightWalkingBackwards, 
          Config.player.spriteMap.upRightWalking, 
      else if (State.player.facing === 'down-left') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.upRightWalkingBackwards, 
      }
          Config.player.spriteMap.downRightWalking, 

          Config.player.spriteMap.downLeftWalking, 
      else if (State.player.facing === 'down-right') {
        if (State.keyMap.up) {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            State.player.x, 
            State.player.y
          );
        }
          Config.player.spriteMap.upLeftWalkingBackwards, 
          Config.player.spriteMap.upLeftWalking, 
          Config.player.spriteMap.downLeftWalkingBackwards, 
      }

          Config.player.spriteMap.upRightWalkingBackwards, 
          Config.player.spriteMap.downRightWalking, 
          Config.player.spriteMap.downRightWalkingBackwards, 
          Config.player.spriteMap.upRightWalking, 
    }
  }
}

export default Player;

