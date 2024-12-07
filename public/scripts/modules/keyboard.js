// @ts-check
// import { DOM } from './dom.js'
import { playerConfig } from '../../objects/Player/Player.js'
import { State } from './states.js'

document.addEventListener('keydown', (e) => {
  // Fires the keydown event only once
  if (!e.repeat) {
    // Disable Alt key
    if (e.code === 'AltLeft') {
      e.preventDefault()
    }

    if (e.code === playerConfig.KEYBOARD_CONTROLS.run) {
      State.keyMap.shift = true
    }

    if (e.code === playerConfig.KEYBOARD_CONTROLS.up) {
      State.keyMap.up = true
    }

    if (e.code === playerConfig.KEYBOARD_CONTROLS.down) {
      State.keyMap.down = true
    }

    if (e.code === playerConfig.KEYBOARD_CONTROLS.left) {
      State.keyMap.left = true
    }

    if (e.code === playerConfig.KEYBOARD_CONTROLS.right) {
      State.keyMap.right = true
    }

    const index = State.keyMap.array.indexOf(e.code)

    if (index < 0) {
      State.keyMap.array.push(e.code)
    }

    /**
     * @todo Make a better front-end debug system
     */
    // DOM.keysPressed.innerText = State.keyMap.array, State.player.speed
  }
})

document.addEventListener('keyup', (e) => {
  if (e.code === playerConfig.KEYBOARD_CONTROLS.run) {
    State.keyMap.shift = false
  }

  if (e.code === playerConfig.KEYBOARD_CONTROLS.up) {
    State.keyMap.up = false
    State.keyMap.upLeft = false
    State.keyMap.upRight = false

    State.player.state = 'idle'
  }

  if (e.code === playerConfig.KEYBOARD_CONTROLS.down) {
    State.keyMap.down = false
    State.keyMap.downLeft = false
    State.keyMap.downRight = false

    State.player.state = 'idle'
  }

  if (e.code === playerConfig.KEYBOARD_CONTROLS.left) {
    State.keyMap.left = false

    State.player.state = 'idle'
  }

  if (e.code === playerConfig.KEYBOARD_CONTROLS.right) {
    State.keyMap.right = false

    State.player.state = 'idle'
  }

  const index = State.keyMap.array.indexOf(e.code)

  if (index > -1) {
    State.keyMap.array.splice(index, 1)
  }

  /**
   * @todo Make a better front-end debug system
   */
  // DOM.keysPressed.innerText = State.keyMap.array
})
