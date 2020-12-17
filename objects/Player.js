import { config, canvas, DOMSpeed, ctx } from '../scripts/config.js';
import SpriteAnimation from '../scripts/modules/sprites.js';


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
    this.props = {
      x: playerConfig.INITIAL_X_POS,
      y: playerConfig.INITIAL_Y_POS,
      speed: 0,
      facing: 'up',
      currentRowIndex: undefined,
      sprites: playerConfig.SPRITE_SHEET,
      controls: {
        up: `Key${playerConfig.KEYBOARD_CONTROLS.up}`,
        down: `Key${playerConfig.KEYBOARD_CONTROLS.down}`,
        left: `Key${playerConfig.KEYBOARD_CONTROLS.left}`,
        right: `Key${playerConfig.KEYBOARD_CONTROLS.right}`,
        run: `${playerConfig.KEYBOARD_CONTROLS.run}`
      }
    }
    
    this.keyMap = {
      up: false,
      down: false,
      left: false,
      right: false,
      shift: false,
      
      array: []
    }
    
    
    this.hero = new SpriteAnimation(
      playerSprite, // sprite image object
      this.props.x - (playerConfig.RADIUS / 2), // sprite x
      this.props.y - (playerConfig.RADIUS / 2), // sprite y
      playerConfig.RADIUS * playerConfig.SPRITE_SHEET_COLS, // sprite width
      playerConfig.RADIUS * playerConfig.SPRITE_SHEET_ROWS, // sprite height
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
    }

    switch (this.props.facing) {
      case 'up':
        if (this.props.facing === 'up') {
          if (this.props.moving) {
            console.log('facing', this.props.facing);

            this.props.currentRowIndex = 13;

            this.props.facing = undefined;
          }
          else {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 1;

            this.props.facing = undefined;
          }
        }
        break;
        
      case 'down':
        if (this.props.facing === 'down') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 12;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 0;

            this.props.facing = undefined;
          }
        }
        break;
          
      case 'left':
        if (this.props.facing === 'left') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 14;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 2;

            this.props.facing = undefined;
          }
        }
        break;
            
      case 'right':
        if (this.props.facing === 'right') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 15;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 3;

            this.props.facing = undefined;
          }
        }
        break;
      
      case 'up-left':
        if (this.props.facing === 'up-left') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 14;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 2;

            this.props.facing = undefined;
          }
        }
        break;
            
      case 'up-right':
        if (this.props.facing === 'up-right') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 15;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 3;

            this.props.facing = undefined;
          }
        }
        break;
      
      case 'down-left':
        if (this.props.facing === 'down-left') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 14;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 2;

            this.props.facing = undefined;
          }
        }
        break;
            
      case 'down-right':
        if (this.props.facing === 'down-right') {
          if (this.props.moving) {
            // console.log('facing', this.props.facing);

            this.props.currentRowIndex = 15;

            this.props.facing = undefined;
          }
          else {
            this.props.currentRowIndex = 3;

            this.props.facing = undefined;
          }
        }
        break;
              
      default:
    }


    
    // Run
    if (this.keyMap.shift) {
      
      if (this.keyMap.up || this.keyMap.down || this.keyMap.left || this.keyMap.right) {
        
        this.props.speed += 0.1;
        
        // Locks the speed when it hits the maximum defined
        if (this.props.speed >= playerConfig.RUN_VELOCITY) {
          this.props.speed = playerConfig.RUN_VELOCITY;
        }
        
        // Listens to movement keys (allows multi press)
        if (this.keyMap.up) {
          this.props.y -= (this.props.speed * diagonalSpeed(this));
        }
        
        if (this.keyMap.down) {
          this.props.y += (this.props.speed * diagonalSpeed(this));
        }
        
        if (this.keyMap.left) {
          this.props.x -= (this.props.speed * diagonalSpeed(this));
        }
        
        if (this.keyMap.right) {
          this.props.x += (this.props.speed * diagonalSpeed(this));
        }


        // Listens to movement keys (do not allow multi press)
        if (this.keyMap.up || this.keyMap.down || this.keyMap.left || this.keyMap.right) {
          if (this.keyMap.up) {
            this.props.currentRowIndex = 9;
          }
          else if (this.keyMap.down) {
            this.props.currentRowIndex = 8;
          }
          else if (this.keyMap.left) {
            this.props.currentRowIndex = 10;
          }
          else if (this.keyMap.right) {
            this.props.currentRowIndex = 11;
          }

          this.draw(
            ctx,
            this.props.currentRowIndex,
            this.props.x,
            this.props.y
          );
        }
        
        this.hero.update();
      }
      else {
        this.draw(
          ctx, 
          this.props.currentRowIndex, 
          this.props.x, 
          this.props.y
        );

        this.hero.update();
      }
    }

    // Walk
    else if (!this.keyMap.shift && this.keyMap.up || this.keyMap.down || this.keyMap.left || this.keyMap.right) {
      
      // Increases the speed
      this.props.speed += 0.1;
      
      
      // Locks the velocity to the maximun allowed
      if (this.props.speed >= playerConfig.WALK_VELOCITY) {
        this.props.speed = playerConfig.WALK_VELOCITY;
      }
      
      
      if (this.keyMap.up) {
        this.props.y -= (this.props.speed * diagonalSpeed(this));
      }
      
      if (this.keyMap.down) {
        this.props.y += (this.props.speed * diagonalSpeed(this));
      }
      
      if (this.keyMap.left) {
        this.props.x -= (this.props.speed * diagonalSpeed(this));
      }
      
      if (this.keyMap.right) {
        this.props.x += (this.props.speed * diagonalSpeed(this));
      }


      if (this.keyMap.up) {
        this.draw(ctx, this.props.currentRowIndex, this.props.x, this.props.y);
      }
      
      else if (this.keyMap.down) {
        this.draw(ctx, this.props.currentRowIndex, this.props.x, this.props.y);
      }
      
      else if (this.keyMap.left) {
        this.draw(ctx, this.props.currentRowIndex, this.props.x, this.props.y);
      }
      
      else if (this.keyMap.right) {
        this.draw(ctx, this.props.currentRowIndex, this.props.x, this.props.y);
      }

      this.hero.update();
    }

    // Stop
    else {
      this.draw(ctx, this.props.currentRowIndex, this.props.x, this.props.y);
      this.hero.update();

      this.props.speed -= 0.1;
      
      if (this.props.speed <= 0) {
        this.props.speed = 0;
      }
    }


    
  }



  draw(_ctx, rowIndex, x, y) {
    // Draw hit box
    _ctx.save();
    _ctx.beginPath();
    _ctx.arc(this.props.x, this.props.y, (playerConfig.RADIUS / 2), 0, (Math.PI * 2), false);
    _ctx.fillStyle = playerConfig.BOUNDING_BOX_COLOR;
    _ctx.fill();
    _ctx.closePath();
    _ctx.restore();

    this.hero.draw(_ctx, rowIndex, x - (playerConfig.RADIUS / 2), y - (playerConfig.RADIUS / 2));
  }
  
  
  
  
  update() {
    DOMSpeed.innerHTML = this.props.speed;

    this.gameLogic();
  }
}

export { playerConfig };
export default Player;

