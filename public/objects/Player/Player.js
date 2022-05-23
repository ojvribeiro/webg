// @ts-check
import { Config } from '../../scripts/config.js'
import { State } from '../../scripts/modules/states.js'
import { Physics } from '../../scripts/modules/physics.js'
import { SpriteAnimation } from '../../scripts/modules/sprites.js'
import { Render } from '../../scripts/modules/render.js'
import { Calc } from '../../scripts/modules/math.js'
import { playerConfig } from './config.js'

import { basicAnimationKeyframes } from './animation/basic.js'

const basicAnimation = basicAnimationKeyframes


const playerSprite = new Image()
playerSprite.src = Config.root + playerConfig.SPRITE_SHEET_PATH

class Player {
  constructor() {
    this.hitBox = {}

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
      hitBox: {
        head: this.hitBox.head,
        body: this.hitBox.body,
        collisionBox: this.hitBox.enviroment,
      },
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
    this.hitBox = {
      head: {
        x: State.player.x + 2,
        y: State.player.y - (playerConfig.HEIGHT / 4) + 3,
        radius: playerConfig.HEIGHT / 4,
        backgroundColor: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_BACKGROUND_COLOR : 'transparent',
        borderColor: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_BORDER_COLOR : 'transparent',
      },

      body: {
        x: State.player.x - (playerConfig.WIDTH / 4) + 2,
        y: State.player.y,
        width: (playerConfig.WIDTH / 2),
        height: (playerConfig.HEIGHT / 2),
        backgroundColor: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_BACKGROUND_COLOR : 'transparent',
        borderColor: (playerConfig.SHOW_HITBOX === true) ? playerConfig.HITBOX_BORDER_COLOR : 'transparent',
      },

      enviroment: {
        x: State.player.x - (playerConfig.WIDTH / 4) + 2,
        y: State.player.y + (playerConfig.HEIGHT / 4) + 5,
        width: playerConfig.WIDTH / 2,
        height: playerConfig.HEIGHT / 5,
        backgroundColor: (playerConfig.SHOW_COLLISION_BOX === true) ? playerConfig.COLLISION_BOX_BACKGROUND_COLOR : 'transparent',
        borderColor: (playerConfig.SHOW_COLLISION_BOX === true) ? playerConfig.COLLISION_BOX_BORDER_COLOR : 'transparent',
      }
    }

    // Render player shadow
    Render.circle({
      x: State.player.x,
      y: State.player.y + 45,
      size: this.hitBox.head.radius / 2,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    })

    if (playerConfig.SHOW_SPRITE === true) {
      // Modifies sprites.js
      this.sprite.render(
        animationName,
        x - (playerConfig.SIZE / 2),
        y - (playerConfig.SIZE / 2)
      )
    }

    if (playerConfig.SHOW_HITBOX) {
      // Render head hitbox
      Render.circle({
        x: this.hitBox.head.x,
        y: this.hitBox.head.y,
        size: this.hitBox.head.radius,
        backgroundColor: this.hitBox.head.backgroundColor,
        borderColor: this.hitBox.head.borderColor,
        borderWidth: 1
      })

      // Render body hitbox
      Render.box({
        x: this.hitBox.body.x,
        y: this.hitBox.body.y,
        width: this.hitBox.body.width,
        height: this.hitBox.body.height,
        backgroundColor: this.hitBox.head.backgroundColor,
        borderColor: this.hitBox.head.borderColor,
        borderWidth: 1
      })
    }

    if (playerConfig.SHOW_COLLISION_BOX) {
      // Render enviroment collision box
      Render.box({
        x: this.hitBox.enviroment.x,
        y: this.hitBox.enviroment.y,
        width: this.hitBox.enviroment.width,
        height: this.hitBox.enviroment.height,
        backgroundColor: this.hitBox.enviroment.backgroundColor,
        borderColor: this.hitBox.enviroment.borderColor,
      })
    }

    if (playerConfig.SHOW_OBJECT_INFO) {
      Render.text({
        text: `
          player
          x: ${String(Calc.round(this.hitBox.enviroment.x))}
          y: ${String(Calc.round(this.hitBox.enviroment.y))}
        `,
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        color: 'lime',
        borderWidth: 1,
        borderColor: 'black',
        x: this.hitBox.enviroment.x + this.hitBox.enviroment.width,
        y: this.hitBox.enviroment.y + this.hitBox.enviroment.height,
      })
    }


    // Pop on other edge
    if (State.player.y < 0) {
      // @ts-ignore
      State.player.y = DOM.canvas.height
    }
    // @ts-ignore
    else if (State.player.y > DOM.canvas.height) {
      State.player.y = 0
    }
    else if (State.player.x < 0) {
      // @ts-ignore
      State.player.x = DOM.canvas.width
    }
    // @ts-ignore
    else if (State.player.x > DOM.canvas.width) {
      State.player.x = 0
    }


    const renderChain = Render.chain
    const renderChainLen = renderChain.length

    for (let i = 0; i < renderChainLen; i++) {
      let player
      if (renderChain[i].type === 'player') {
        player = renderChain[i]

        player.x = State.player.x
        player.y = this.hitBox.enviroment.y
        player.bottomY = this.hitBox.enviroment.y + this.hitBox.enviroment.height

        for (let j = 0; j < renderChainLen; j++) {
          const box = Render.chain[j]

          if (box.type === 'box') {
            // Enable collision
            if (box.isTangible === true) {
              Physics.collision.resolve.rectRect(this.hitBox.enviroment, box)
            }
            else {
              Physics.collision.detect.rectRect(this.hitBox.enviroment, box)
            }
          }
        }

        break
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
      State.player.speed += 0.03


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
    const idle = !State.keyMap.up && !State.keyMap.down && !State.keyMap.left && !State.keyMap.right && !State.keyMap.shift

    const walkingUp = State.keyMap.up && !State.keyMap.down && !State.keyMap.shift
    const walkingDown = State.keyMap.down && !State.keyMap.up && !State.keyMap.shift
    const walkingLeft = State.keyMap.left && !State.keyMap.right && !State.keyMap.shift
    const walkingRight = State.keyMap.right && !State.keyMap.left && !State.keyMap.shift

    const runningUp = State.keyMap.shift && State.keyMap.up && !State.keyMap.down && !State.keyMap.left && !State.keyMap.right
    const runningDown = State.keyMap.shift && State.keyMap.down && !State.keyMap.up && !State.keyMap.left && !State.keyMap.right
    const runningLeft = State.keyMap.shift && State.keyMap.left && !State.keyMap.right && !State.keyMap.up && !State.keyMap.down
    const runningRight = State.keyMap.shift && State.keyMap.right && !State.keyMap.left && !State.keyMap.up && !State.keyMap.down

    const runningUpLeft = State.keyMap.shift && State.keyMap.up && State.keyMap.left && !State.keyMap.right && !State.keyMap.down
    const runningUpRight = State.keyMap.shift && State.keyMap.up && State.keyMap.right && !State.keyMap.left && !State.keyMap.down
    const runningDownLeft = State.keyMap.shift && State.keyMap.down && State.keyMap.left && !State.keyMap.right && !State.keyMap.up
    const runningDownRight = State.keyMap.shift && State.keyMap.down && State.keyMap.right && !State.keyMap.left && !State.keyMap.up


    if (idle) {
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

    else if (walkingUp) {
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
          'walk-up-backwards',
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

    else if (walkingDown) {
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

    else if (walkingLeft) {
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

    else if (walkingRight) {
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



    else if (runningUp) {
      this.draw(
        'run-up',
        State.player.x,
        State.player.y
      )
    }

    else if (runningDown) {
      this.draw(
        'run-down',
        State.player.x,
        State.player.y
      )
    }

    else if (runningLeft) {
      this.draw(
        'run-left',
        State.player.x,
        State.player.y
      )
    }

    else if (runningRight) {
      this.draw(
        'run-right',
        State.player.x,
        State.player.y
      )
    }

    else if (runningUpLeft) {
      this.draw(
        'run-up-left',
        State.player.x,
        State.player.y
      )
    }

    else if (runningUpRight) {
      this.draw(
        'run-up-right',
        State.player.x,
        State.player.y
      )
    }

    else if (runningDownLeft) {
      this.draw(
        'run-down-left',
        State.player.x,
        State.player.y
      )
    }

    else if (runningDownRight) {
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

      State.player.speed = 0
    }
  }
}

export { Player, playerConfig }
