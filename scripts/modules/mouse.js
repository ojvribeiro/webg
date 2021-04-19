
import { DOM } from './dom.js'
import { Config } from '../config.js'
import { State } from './states.js'
import { Projectile } from '../../objects/Projectile.js'
import { Physics } from './physics.js'


document.addEventListener('mousedown', function (e) {
  let angle, velocity

  // console.log(State.player.state)

  if (State.player.state !== 'running') {
    DOM.mousePosition.x = e.clientX
    DOM.mousePosition.y = e.clientY

    angle = Math.atan2(DOM.mousePosition.y - State.player.y, DOM.mousePosition.x - State.player.x)
    velocity = Physics.velocity(angle, Config.projectiles.SPEED)

    const projectile = {
      x: State.player.x, 
      y: State.player.y, 
      radius: Config.projectiles.SIZE, 
      color: Config.projectiles.COLOR, 
      velocity: velocity
    }

    Projectile.shoot(projectile)
  }
})




let playerSprite = new Image()
playerSprite.src = Config.root + Config.player.SPRITE_SHEET_PATH

document.addEventListener('mousemove', function (e) {
  DOM.mousePosition.x = e.clientX
  DOM.mousePosition.y = e.clientY
  
  const angle = Math.atan2(DOM.mousePosition.y - State.player.y, DOM.mousePosition.x - State.player.x)

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
      State.player.facing = 'up'
    }
  }

  // Looking down ⬇️
  else if (direction.down) {
    if (State.player.facing !== 'down') {
      State.player.facing = 'down'
    }
  }

  // Looking left ⬅️
  else if (direction.left) {
    if (State.player.facing !== 'left') {
      State.player.facing = 'left'
    }
  }

  // Looking right ➡️
  else if (direction.right) {
    if (State.player.facing !== 'right') {
      State.player.facing = 'right'
    }
  }
  
  // Looking up-left ↖️
  else if (direction.upLeft) {
    if (State.player.facing !== 'up-left') {
      State.player.facing = 'up-left'
    }
  }

  // Looking up-right ↗️
  else if (direction.upRight) {
    if (State.player.facing !== 'up-right') {
      State.player.facing = 'up-right'
    }
  }

  // Looking down-left ↙️
  else if (direction.downLeft) {
    if (State.player.facing !== 'down-left') {
      State.player.facing = 'down-left'
    }
  }

  // Looking down-right ↘️
  else if (direction.downRight) {
    if (State.player.facing !== 'down-right') {
      State.player.facing = 'down-right'
    }
  }

  // DOM.keysPressed.innerText = angle
})
