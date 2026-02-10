import { playerConfig } from '../../objects/Player/Player'
import { DOM } from './dom'
import { State } from './states'

// Centralized key mapping
const GAME_KEYS = [
  playerConfig.KEYBOARD_CONTROLS.run,
  playerConfig.KEYBOARD_CONTROLS.up,
  playerConfig.KEYBOARD_CONTROLS.down,
  playerConfig.KEYBOARD_CONTROLS.left,
  playerConfig.KEYBOARD_CONTROLS.right,
]

// Utility: Check for diagonal movement
function isDiagonal() {
  return (
    (State.keyMap.up && State.keyMap.left) ||
    (State.keyMap.up && State.keyMap.right) ||
    (State.keyMap.down && State.keyMap.left) ||
    (State.keyMap.down && State.keyMap.right)
  )
}

// Debug utility
function updateDebug() {
  if (DOM && DOM.keysPressed) {
    DOM.keysPressed.innerText = `${State.keyMap.array.join(', ')} | Speed: ${State.player.speed}`
  }
}

// Event handler references for cleanup
const handlers = {
  keydown: null,
  keyup: null,
}

handlers.keydown = function (e) {
  if (!e.repeat) {
    // Prevent default for all game keys
    if (GAME_KEYS.includes(e.code)) {
      e.preventDefault()
    }

    switch (e.code) {
      case playerConfig.KEYBOARD_CONTROLS.run:
        State.keyMap.shift = true
        break
      case playerConfig.KEYBOARD_CONTROLS.up:
        State.keyMap.up = true
        break
      case playerConfig.KEYBOARD_CONTROLS.down:
        State.keyMap.down = true
        break
      case playerConfig.KEYBOARD_CONTROLS.left:
        State.keyMap.left = true
        break
      case playerConfig.KEYBOARD_CONTROLS.right:
        State.keyMap.right = true
        break
    }

    const index = State.keyMap.array.indexOf(e.code)
    if (index < 0) {
      State.keyMap.array.push(e.code)
    }

    // Diagonal movement check
    State.keyMap.diagonal = isDiagonal()

    updateDebug()
  }
}
document.addEventListener('keydown', handlers.keydown)

handlers.keyup = function (e) {
  if (GAME_KEYS.includes(e.code)) {
    e.preventDefault()
  }

  switch (e.code) {
    case playerConfig.KEYBOARD_CONTROLS.run:
      State.keyMap.shift = false
      break
    case playerConfig.KEYBOARD_CONTROLS.up:
      State.keyMap.up = false
      State.keyMap.upLeft = false
      State.keyMap.upRight = false
      break
    case playerConfig.KEYBOARD_CONTROLS.down:
      State.keyMap.down = false
      State.keyMap.downLeft = false
      State.keyMap.downRight = false
      break
    case playerConfig.KEYBOARD_CONTROLS.left:
      State.keyMap.left = false
      break
    case playerConfig.KEYBOARD_CONTROLS.right:
      State.keyMap.right = false
      break
  }

  const index = State.keyMap.array.indexOf(e.code)
  if (index > -1) {
    State.keyMap.array.splice(index, 1)
  }

  // Diagonal movement check
  State.keyMap.diagonal = isDiagonal()

  // Only set idle if no movement keys are pressed
  if (
    !State.keyMap.up &&
    !State.keyMap.down &&
    !State.keyMap.left &&
    !State.keyMap.right
  ) {
    State.player.state = 'idle'
  }

  updateDebug()
}
document.addEventListener('keyup', handlers.keyup)

// Cleanup function for event listeners
export function removeKeyboardListeners() {
  document.removeEventListener('keydown', handlers.keydown)
  document.removeEventListener('keyup', handlers.keyup)
}
