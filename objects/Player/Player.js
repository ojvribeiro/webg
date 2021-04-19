import { Config } from '../../scripts/config.js'
import { DOM } from '../../scripts/modules/dom.js'
import { State } from '../../scripts/modules/states.js'
import { Physics } from '../../scripts/modules/physics.js'
import { SpriteAnimation } from '../../scripts/modules/sprites.js'
import { Render } from '../../scripts/modules/render.js'

DOM.canvas.width = window.innerWidth
DOM.canvas.height = window.innerHeight


let playerSprite = new Image()
playerSprite.src = Config.root + Config.player.SPRITE_SHEET_PATH


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
    )
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

    State.player.hitBox.head = hitBox.head
    State.player.hitBox.body = hitBox.body
    State.player.collisionBox = hitBox.enviroment

    // Render player shadow
    Render.circle({
      x: State.player.x,
      y: State.player.y + 45,
      size: hitBox.head.radius / 2,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderColor: 'black',
      borderWidth: 1
    })

    if (Config.player.SHOW_SPRITE === true) {
      // Modifies sprites.js
      this.sprite.render(
        rowIndex, 
        x - (Config.player.SIZE / 2), 
        y - (Config.player.SIZE / 2)
      )
    }
    
    // Render head hitbox
    Render.circle({
      x: hitBox.head.x,
      y: hitBox.head.y,
      size: hitBox.head.radius,
      backgroundColor: hitBox.head.color,
      borderColor: 'black',
      borderWidth: 1
    })

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
  
  
  
  
  render() {
    
    // Run
    if (State.keyMap.shift) {
      if (State.keyMap.up || State.keyMap.down || State.keyMap.left || State.keyMap.right) {
        State.player.state = 'running'
        
        State.player.speed += 0.1
        
        // Locks the speed when it hits the maximum defined
        if (State.player.speed >= Config.player.RUN_MAX_SPEED) {
          State.player.speed = Config.player.RUN_MAX_SPEED
        }
        
        // Listens to movement keys (allows multi press)
        if (State.keyMap.up) {
          State.player.y -= Physics.speed.normalize()
        }
        
        if (State.keyMap.down) {
          State.player.y += Physics.speed.normalize()
        }
        
        if (State.keyMap.left) {
          State.player.x -= Physics.speed.normalize()
        }
        
        if (State.keyMap.right) {
          State.player.x += Physics.speed.normalize()
        }

        this.changeSprite()

        this.sprite.update()
      }
      else {
        this.changeSprite()

        this.sprite.update()
      }
    }

    // Walk
    else if (
      !State.keyMap.shift  && 
      State.keyMap.up      || 
      State.keyMap.down    || 
      State.keyMap.left    || 
      State.keyMap.right) {

      State.player.state = 'walking'
      
      // Increases the speed
      State.player.speed += 0.1
      
      
      // Locks the velocity to the maximun allowed
      if (State.player.speed >= Config.player.WALK_MAX_SPEED) {
        State.player.speed = Config.player.WALK_MAX_SPEED
      }
      
      
      if (State.keyMap.up) {
        State.player.y -= Physics.speed.normalize()
      }
      
      if (State.keyMap.down) {
        State.player.y += Physics.speed.normalize()
      }
      
      if (State.keyMap.left) {
        State.player.x -= Physics.speed.normalize()
      }
      
      if (State.keyMap.right) {
        State.player.x += Physics.speed.normalize()
      }


      this.changeSprite()

      this.sprite.update()
    }

    // Idle
    else {
      State.player.state = 'idle'

      State.player.speed -= 0.1
      
      if (State.player.speed <= 0) {
        State.player.speed = 0
      }

      this.changeSprite()
      
      this.sprite.update()
    }
  }



  changeSprite() {
    /**
     * Idle
     * */
    if (
      !State.keyMap.up && 
      !State.keyMap.down && 
      !State.keyMap.left && 
      !State.keyMap.right && 
      !State.keyMap.shift
    ) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.up, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.down, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.left, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.right, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeft, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRight, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeft, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRight, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking up
     * */
    else if (State.keyMap.up && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking down
     * */
    else if (State.keyMap.down && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
    }
    
    /**
     * Walking left
     * */
    else if (State.keyMap.left && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking right
     * */
    else if (State.keyMap.right && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          Config.player.spriteMap.upWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          Config.player.spriteMap.downWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          Config.player.spriteMap.leftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          Config.player.spriteMap.rightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking up-left
     * */
    else if (State.keyMap.up && State.keyMap.left && !State.keyMap.shift) {
      // Facing up-left
      if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking up-right
     * */
    else if (State.keyMap.up && State.keyMap.right && !State.keyMap.shift) {
      // Facing up-left
      if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking down-left
     * */
    else if (State.keyMap.down && State.keyMap.left && !State.keyMap.shift) {
      // Facing down-left
      if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.downLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.upLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.upLeftWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.downLeftWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
    }

    /**
     * Walking down-right
     * */
    else if (State.keyMap.down && State.keyMap.right && !State.keyMap.shift) {
      // Facing down-left
      if (State.player.facing === 'down-left') {
        this.draw(
          Config.player.spriteMap.upRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          Config.player.spriteMap.downRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          Config.player.spriteMap.downRightWalkingBackwards, 
          State.player.x, 
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          Config.player.spriteMap.upRightWalking, 
          State.player.x, 
          State.player.y
        )
      }
    }


    
    /**
     * Running up
     * */
    else if (State.keyMap.shift && State.keyMap.up && !State.keyMap.left && !State.keyMap.right) {
      this.draw(
        Config.player.spriteMap.upRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down
     * */
    else if (State.keyMap.shift && State.keyMap.down && !State.keyMap.left && !State.keyMap.right) {
      this.draw(
        Config.player.spriteMap.downRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running left
     * */
    else if (State.keyMap.shift && State.keyMap.left && !State.keyMap.up && !State.keyMap.down) {
      this.draw(
        Config.player.spriteMap.leftRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running right
     * */
    else if (State.keyMap.shift && State.keyMap.right && !State.keyMap.up && !State.keyMap.down) {
      this.draw(
        Config.player.spriteMap.rightRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running up-left
     * */
    else if (State.keyMap.shift && State.keyMap.up && State.keyMap.left) {
      this.draw(
        Config.player.spriteMap.upLeftRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running up-right
     * */
    else if (State.keyMap.shift && State.keyMap.up && State.keyMap.right) {
      this.draw(
        Config.player.spriteMap.upRightRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down-left
     * */
    else if (State.keyMap.shift && State.keyMap.down && State.keyMap.left) {
      this.draw(
        Config.player.spriteMap.downLeftRunning,
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down-right
     * */
    else if (State.keyMap.shift && State.keyMap.down && State.keyMap.right) {
      this.draw(
        Config.player.spriteMap.downRightRunning,
        State.player.x,
        State.player.y
      )
    }
    
    else {
      this.draw(
        Config.player.spriteMap.down,
        State.player.x,
        State.player.y
      )
    }
  }
}

export { Player }