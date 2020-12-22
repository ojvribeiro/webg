import { Config } from '../scripts/config.js';
import { DOM } from '../scripts/modules/dom.js';
import { State } from '../scripts/modules/states.js';
import SpriteAnimation from '../scripts/modules/sprites.js';

DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;

// Constants
let playerConfig = {
  
  // Define player keyboard controls
  KEYBOARD_CONTROLS: {
    up: 'W',
    down: 'S',
    left: 'A',
    right: 'D',
    run: 'ShiftLeft',
  },
  
  SPRITE_SHEET: config.__DIR__ + '/sprites/Player/Player.png',
  SPRITE_SHEET_ROWS: 8,
  SPRITE_SHEET_COLS: 5,
  BOUNDING_BOX_COLOR: 'rgba(255, 255, 255, 0.2)',
  INITIAL_X_POS: (canvas.width / 2),
  INITIAL_Y_POS: (canvas.height / 2),
  RADIUS: 100,
  WALK_VELOCITY: 1.5,
  RUN_VELOCITY: 3
}




let playerSprite = new Image();
playerSprite.src = playerConfig.SPRITE_SHEET;


class Player {
  constructor() {
    
    
    this.hero = new SpriteAnimation(
      playerSprite, // sprite image object
      State.player.x - (Config.player.WIDTH / 2), // sprite x
      State.player.y - (Config.player.HEIGHT / 2), // sprite y
      Config.player.SIZE * Config.player.SPRITE_SHEET_COLS, // sprite width
      Config.player.SIZE * Config.player.SPRITE_SHEET_ROWS, // sprite height
      100,
      playerConfig.SPRITE_SHEET_COLS,
      playerConfig.SPRITE_SHEET_ROWS,
      0
    );
  }


  gameLogic() {
    /**
     * 
     * @param {Object} playerInstance - The player object instance
     */
    function diagonalSpeed(playerInstance) {
      if ( (playerInstance.keyMap.up && playerInstance.keyMap.left) ||
        (playerInstance.keyMap.up && playerInstance.keyMap.right) ||
        (playerInstance.keyMap.down && playerInstance.keyMap.left) ||
        (playerInstance.keyMap.down && playerInstance.keyMap.right) ) {
        return 0.75;
      }
      else if (playerInstance.keyMap.shift) {
        return 1;
      }
      else {
        return 1;
      }
        x: State.player.x,
        y: State.player.y - (Config.player.HEIGHT / 4) + 2,
        x: State.player.x - (Config.player.WIDTH / 4) + 2,
        y: State.player.y,
    }



    switch (State.player.facing) {
      case 'up':
        if (State.player.facing === 'up') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.up;
          }
        }

        break;
        
      case 'down':
        if (State.player.facing === 'down') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.down;
          }
        }
      break;
          
      case 'left':
        if (State.player.facing === 'left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.leftWalking;
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.leftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.left;
          }
        }
      break;
            
      case 'right':
        if (State.player.facing === 'right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.rightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.rightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.right;
          }
        }
      break;
      
      case 'up-left':
        if (State.player.facing === 'up-left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upLeftWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upLeftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upLeft;
          }
        }
      break;
            
      case 'up-right':
        if (State.player.facing === 'up-right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRight;
          }
        }
      break;
      
      case 'down-left':
        if (State.player.facing === 'down-left') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downLeftWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downLeftRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downLeft;
          }
        }
      break;
            
      case 'down-right':
        if (State.player.facing === 'down-right') {
          if (State.player.state === 'walking') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRightWalking;  
          }
          else if (State.player.state === 'running') {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRightRunning;
          }
          else {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRight;
          }
        }
      break;
              
      default:
        State.player.currentRowIndex = Config.player.spriteRowIndex.down;
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
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRunning;
          }
          else if (State.keyMap.down && !State.keyMap.left && !State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRunning;
          }
          else if (State.keyMap.left && !State.keyMap.up && !State.keyMap.down) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.leftRunning;
          }
          else if (State.keyMap.right && !State.keyMap.up && !State.keyMap.down) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.rightRunning;
          }

          else if (State.keyMap.down && State.keyMap.left) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downLeftRunning;
          }
          else if (State.keyMap.down && State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.downRightRunning;
          }
          else if (State.keyMap.up && State.keyMap.left) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upLeftRunning;
          }
          else if (State.keyMap.up && State.keyMap.right) {
            State.player.currentRowIndex = Config.player.spriteRowIndex.upRightRunning;
          }

          this.draw(
            State.player.currentRowIndex,
            State.player.x,
            State.player.y
          );
        }
        
        this.hero.update();
      }
      else {
        this.draw(
          State.player.currentRowIndex, 
          State.player.x, 
          State.player.y
        );

        this.hero.update();
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

      this.hero.update();
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
      
    }


    function walk(playerObject) {
      if (State.player.facing === 'up') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.upWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.upWalkingBackwards, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'down') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.downWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.downWalkingBackwards, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'left') {
        if (State.keyMap.left) {
          playerObject.draw(
            Config.player.spriteRowIndex.leftWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.leftWalkingBackwards, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'right') {
        if (State.keyMap.right) {
          playerObject.draw(
            Config.player.spriteRowIndex.rightWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.rightWalkingBackwards, 
            State.player.x, 
            State.player.y
          );
        }
      }


      else if (State.player.facing === 'up-left') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.upLeftWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.upLeftWalking, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'up-right') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.upRightWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.upRightWalking, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'down-left') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.downLeftWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.downLeftWalking, 
            State.player.x, 
            State.player.y
          );
        }
      }

      else if (State.player.facing === 'down-right') {
        if (State.keyMap.up) {
          playerObject.draw(
            Config.player.spriteRowIndex.downRightWalking, 
            State.player.x, 
            State.player.y
          );
        }
        else {
          playerObject.draw(
            Config.player.spriteRowIndex.downRightWalking, 
            State.player.x, 
            State.player.y
          );
        }
      }

    }
  }
}

export { playerConfig };
export default Player;

