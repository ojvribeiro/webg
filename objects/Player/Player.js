import { Config } from '../../scripts/config.js';
import { DOM } from '../../scripts/modules/dom.js';
import { State } from '../../scripts/modules/states.js';
import { Physics } from '../../scripts/modules/physics.js';
import SpriteAnimation from '../../scripts/modules/sprites.js';
import { Render } from '../../scripts/modules/render.js';

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
        x: State.player.x + 2,
        y: State.player.y - (Config.player.HEIGHT / 4) + 3,
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

      enviroment: {
        x: State.player.x - (Config.player.WIDTH / 4) + 2,
        y: State.player.y + (Config.player.HEIGHT / 4) + 5,
        width: Config.player.WIDTH / 2,
        height: Config.player.HEIGHT / 5,
        color: (Config.player.SHOW_COLLISION_BOX === true) ? Config.player.COLLISION_BOX_COLOR : 'transparent'
      }
    }

    State.player.hitBox.head = hitBox.head;
    State.player.collisionBox = hitBox.enviroment;

    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.arc(
      this.x, 
      this.y, 
      hitBox.head.radius, 
      0, 
      (Math.PI * 2), 
      false
    );
    ctx.fill();
    ctx.closePath();

    if (Config.player.SHOW_SPRITE === true) {
      // Modifies sprites.js
      this.sprite.draw(
        rowIndex, 
        x - (Config.player.SIZE / 2), 
        y - (Config.player.SIZE / 2)
      );
    }
    
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

    // Render body hitbox
    Render.box({
      x: hitBox.body.x,
      y: hitBox.body.y,
      width: hitBox.body.width,
      height: hitBox.body.height,
      backgroundColor: hitBox.head.color,
      borderColor: 'transparent'
    })

    // Render enviroment collision box
    Render.box({
      x: hitBox.enviroment.x,
      y: hitBox.enviroment.y,
      width: hitBox.enviroment.width,
      height: hitBox.enviroment.height,
      backgroundColor: hitBox.enviroment.color,
      borderColor: 'transparent'
    })
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
        State.player.state === 'running'
        
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


      if (State.keyMap.up || State.keyMap.down || State.keyMap.left || State.keyMap.right) {
        this.changeSprite();
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
  }



  changeSprite() {
    // Walking up
    if (State.keyMap.up) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
    }



    // Walking down
    else if (State.keyMap.down) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
    }



    // Walking left
    else if (State.keyMap.left) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
    }




    // Walking right
    else if (State.keyMap.right) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
    }








    // Walking up-left
    else if (State.keyMap.up && State.keyMap.left) {
      // Facing up-left
      if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
    }

    // Walking up-right
    else if (State.keyMap.up && State.keyMap.right) {
      // Facing up-left
      if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
    }

    // Walking down-left
    else if (State.keyMap.down && State.keyMap.left) {
      // Facing down-left
      if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
    }

    else if (State.keyMap.down && State.keyMap.right) {
      // Facing down-left
      if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        );
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        );
      }
    }

  }
}

export default Player;

