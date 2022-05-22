// @ts-check
import { Config } from '../../scripts/config.js'
import { State } from '../../scripts/modules/states.js'
import { Physics } from '../../scripts/modules/physics.js'
import { SpriteAnimation } from '../../scripts/modules/sprites.js'
import { Render } from '../../scripts/modules/render.js'
import { Calc } from '../../scripts/modules/math.js'

import { basicAnimationKeyframes } from './animation/basic.js'

const basicAnimation = basicAnimationKeyframes

const playerConfig = {
  SIZE: 100,
  WIDTH: 50,
  HEIGHT: 100,
  WALK_MAX_SPEED: 3, // Pixels per frame
  RUN_MAX_SPEED: 5, // Pixels per frame

  SHOW_SPRITE: true,
  SPRITE_SHEET_PATH: '/sprites/Player/Player.svg',
  SPRITE_SHEET_ROWS: 32,
  SPRITE_SHEET_COLS: 5,

  SHOW_HITBOX: false,
  SHOW_COLLISION_BOX: false,
  HITBOX_COLOR: 'rgba(245, 50, 28, 0.5)',
  COLLISION_BOX_COLOR: 'rgba(254, 212, 150, 0.5)',

  /**
  * Define player keyboard controls
  * Uses `event.code` to capture key codes on `keydown`
  */
  KEYBOARD_CONTROLS: {
    up: 'KeyW',
    down: 'KeyS',
    left: 'KeyA',
    right: 'KeyD',
    run: 'ShiftLeft',
  },

}

const playerSprite = new Image()
playerSprite.src = Config.root + playerConfig.SPRITE_SHEET_PATH

class Player {
  constructor() {
    this.sprite = new SpriteAnimation({
      spriteImageObject: playerSprite,
      keyframes: basicAnimation,
      xPosition: State.player.x - (playerConfig.WIDTH / 2),
      yPosition: State.player.y - (playerConfig.HEIGHT / 2),
      width: playerConfig.SIZE,
      height: playerConfig.SIZE,
      animationName: 'idle-down',
    })

    this.player = {
      type: 'player',
      x: State.player.x - (playerConfig.WIDTH / 4) + 2,
      y: State.player.y + (playerConfig.HEIGHT / 4) + 5,
      bottomY: State.player.y + (playerConfig.HEIGHT / 4) + 5,
      width: playerConfig.WIDTH / 2,
      height: playerConfig.HEIGHT / 5,
    }

    Render.add(this.player)
  }


  /**
   *
   * @param {string} animationName - Name of the animation to play
   * @param {number} x - X position of the sprite
   * @param {number} y - Y position of the sprite
   */
  draw(animationName, x, y) {
    const hitBox = {
      head: {
        x: State.player.x + 2,
        y: State.player.y - (playerConfig.HEIGHT / 4) + 3,
        radius: playerConfig.HEIGHT / 4,
        color: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_COLOR : 'transparent'
      },

      body: {
        x: State.player.x - (playerConfig.WIDTH / 4) + 2,
        y: State.player.y,
        width: (playerConfig.WIDTH / 2),
        height: (playerConfig.HEIGHT / 2),
        color: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_COLOR : 'transparent'
      },

      enviroment: {
        x: State.player.x - (playerConfig.WIDTH / 4) + 2,
        y: State.player.y + (playerConfig.HEIGHT / 4) + 5,
        width: playerConfig.WIDTH / 2,
        height: playerConfig.HEIGHT / 5,
        color: (playerConfig.SHOW_COLLISION_BOX === true) ? playerConfig.COLLISION_BOX_COLOR : 'transparent'
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
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderColor: 'black',
      borderWidth: 1
    })

    if (playerConfig.SHOW_SPRITE === true) {
      // Modifies sprites.js
      this.sprite.render(
        animationName,
        x - (playerConfig.SIZE / 2),
        y - (playerConfig.SIZE / 2)
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
      borderColor: hitBox.enviroment.color,
    })

    if (Config.showObjectInfo) {
      Render.text({
        text: `
          player
          x: ${String(Calc.round(hitBox.enviroment.x))}
          y: ${String(Calc.round(hitBox.enviroment.y))}
        `,
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        color: 'lime',
        borderWidth: 1,
        borderColor: 'black',
        x: hitBox.enviroment.x + hitBox.enviroment.width,
        y: hitBox.enviroment.y + hitBox.enviroment.height,
      })
    }


    const renderChain = Render.chain
    const renderChainLen = renderChain.length

    for (let i = 0; i < renderChainLen; i++) {
      let player
      if (renderChain[i].type === 'player') {
        player = renderChain[i]

        player.x = State.player.x
        player.y = hitBox.enviroment.y
        player.bottomY = hitBox.enviroment.y + hitBox.enviroment.height
      }
    }
  }




  render() {

    // Run
    if (State.keyMap.shift) {
      if (State.keyMap.up || State.keyMap.down || State.keyMap.left || State.keyMap.right) {
        State.player.state = 'running'

        State.player.speed += 0.1

        // Locks the speed when it hits the maximum defined
        if (State.player.speed >= playerConfig.RUN_MAX_SPEED) {
          State.player.speed = playerConfig.RUN_MAX_SPEED
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
      }
      else {
        this.changeSprite()
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
      if (State.player.speed >= playerConfig.WALK_MAX_SPEED) {
        State.player.speed = playerConfig.WALK_MAX_SPEED
      }


      if (State.keyMap.up) {
        State.player.y -= Physics.speed.normalize()
      }

      if (State.keyMap.down) {
        State.player.y += Physics.speed.normalize()
      }

      if (State.keyMap.up && State.keyMap.down) {
        State.player.y += 0
      }

      if (State.keyMap.left) {
        State.player.x -= Physics.speed.normalize()
      }

      if (State.keyMap.right) {
        State.player.x += Physics.speed.normalize()
      }

      if (State.keyMap.left && State.keyMap.right) {
        State.player.y += 0
      }

      this.changeSprite()
    }

    // Idle
    else {
      State.player.state = 'idle'

      State.player.speed -= 0.1

      if (State.player.speed <= 0) {
        State.player.speed = 0
      }

      this.changeSprite()
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
      switch (State.player.facing) {
        case State.player.facing:
          this.draw(
            'idle-' + State.player.facing,
            State.player.x,
            State.player.y
          )

        break

        default:
          throw new Error(`Well, that's weird`)
      }
    }

    /**
     * Walking up
     * */
    else if (State.keyMap.up && !State.keyMap.down && !State.keyMap.shift) {
      const direction = 'up'

      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          'walk-' + direction,
          State.player.x,
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          'walk-' + direction + '-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          'walk-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          'walk-right',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          'walk-up-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          'walk-up-right',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          'walk-up-right-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          'walk-up-left-backwards',
          State.player.x,
          State.player.y
        )
      }

    }

    /**
     * Walking down
     * */
    else if (State.keyMap.down && !State.keyMap.up && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          'walk-down-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {

        this.draw(
          'walk-down',
          State.player.x,
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          'walk-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          'walk-right',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          'walk-down-right-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          'walk-down-left-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          'walk-down-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          'walk-down-right',
          State.player.x,
          State.player.y
        )
      }
    }

    /**
     * Walking left
     * */
    else if (State.keyMap.left && !State.keyMap.right && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          'walk-up',
          State.player.x,
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          'walk-down',
          State.player.x,
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          'walk-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          'walk-left-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          'walk-up-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          'walk-down-left-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          'walk-down-left',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          'walk-up-left-backwards',
          State.player.x,
          State.player.y
        )
      }
    }

    /**
     * Walking right
     * */
    else if (State.keyMap.right && !State.keyMap.left && !State.keyMap.shift) {
      // Facing up
      if (State.player.facing === 'up') {
        this.draw(
          'walk-up',
          State.player.x,
          State.player.y
        )
      }
      // Facing down
      else if (State.player.facing === 'down') {
        this.draw(
          'walk-down',
          State.player.x,
          State.player.y
        )
      }
      // Facing left
      else if (State.player.facing === 'left') {
        this.draw(
          'walk-right-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing right
      else if (State.player.facing === 'right') {
        this.draw(
          'walk-right',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-left
      else if (State.player.facing === 'up-left') {
        this.draw(
          'walk-down-right-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing up-right
      else if (State.player.facing === 'up-right') {
        this.draw(
          'walk-up-right',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-left
      else if (State.player.facing === 'down-left') {
        this.draw(
          'walk-up-right-backwards',
          State.player.x,
          State.player.y
        )
      }
      // Facing down-right
      else if (State.player.facing === 'down-right') {
        this.draw(
          'walk-down-right',
          State.player.x,
          State.player.y
        )
      }
    }



    /**
     * Running up
     * */
    else if (State.keyMap.shift && State.keyMap.up && !State.keyMap.down && !State.keyMap.left && !State.keyMap.right) {
      this.draw(
        'run-up',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down
     * */
    else if (State.keyMap.shift && State.keyMap.down && !State.keyMap.up && !State.keyMap.left && !State.keyMap.right) {
      this.draw(
        'run-down',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running left
     * */
    else if (State.keyMap.shift && State.keyMap.left && !State.keyMap.right && !State.keyMap.up && !State.keyMap.down) {
      this.draw(
        'run-left',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running right
     * */
    else if (State.keyMap.shift && State.keyMap.right && !State.keyMap.left && !State.keyMap.up && !State.keyMap.down) {
      this.draw(
        'run-right',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running up-left
     * */
    else if (State.keyMap.shift && State.keyMap.up && State.keyMap.left && !State.keyMap.right) {
      this.draw(
        'run-up-left',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running up-right
     * */
    else if (State.keyMap.shift && State.keyMap.up && State.keyMap.right) {
      this.draw(
        'run-up-right',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down-left
     * */
    else if (State.keyMap.shift && State.keyMap.down && State.keyMap.left) {
      this.draw(
        'run-down-left',
        State.player.x,
        State.player.y
      )
    }

    /**
     * Running down-right
     * */
    else if (State.keyMap.shift && State.keyMap.down && State.keyMap.right) {
      this.draw(
        'run-down-right',
        State.player.x,
        State.player.y
      )
    }

    else {
      this.draw(
        'idle-down',
        State.player.x,
        State.player.y
      )
    }

  }
}

export { Player, playerConfig }
