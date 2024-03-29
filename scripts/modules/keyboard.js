import { Config } from '../config.js'
import { State } from './states.js'

document.addEventListener('keydown', function (e) {
  // Fires the keydown event only once
  if (!e.repeat) {
    // Disable Alt key
    if (e.code === 'AltLeft') {
      e.preventDefault()
    }
      
      if (e.code === Config.player.KEYBOARD_CONTROLS.run) {
        State.keyMap.shift = true
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.up) {
        State.keyMap.up = true
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.down) {
        State.keyMap.down = true
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.left) {
        State.keyMap.left = true
      }

      if (e.code === Config.player.KEYBOARD_CONTROLS.right) {
        State.keyMap.right = true
      }

      const index = State.keyMap.array.indexOf(e.code)

      if (index < 0) {
        State.keyMap.array.push(e.code)
      }

      //console.log(State.keyMap)

      // DOM.keysPressed.innerText = State.keyMap.array, State.player.speed
      
      // console.log('keydown')
  }

})






document.addEventListener('keyup', function (e) {
  if (e.code === Config.player.KEYBOARD_CONTROLS.run) {
    State.keyMap.shift = false
  }
  
  if (e.code === Config.player.KEYBOARD_CONTROLS.up) {
    State.keyMap.up = false
    State.keyMap.upLeft = false
    State.keyMap.upRight = false

    State.player.state = 'idle'
    
    State.player.currentRowIndex = Config.player.spriteMap.up
  }

  if (e.code === Config.player.KEYBOARD_CONTROLS.down) {
    State.keyMap.down = false
    State.keyMap.downLeft = false
    State.keyMap.downRight = false

    State.player.state = 'idle'
    
    State.player.currentRowIndex = Config.player.spriteMap.down
  }

  if (e.code === Config.player.KEYBOARD_CONTROLS.left) {
    State.keyMap.left = false

    State.player.state = 'idle'
    
    State.player.currentRowIndex = Config.player.spriteMap.left
  }

  if (e.code === Config.player.KEYBOARD_CONTROLS.right) {
    State.keyMap.right = false

    State.player.state = 'idle'
    
    State.player.currentRowIndex = Config.player.spriteMap.right
  }


  const index = State.keyMap.array.indexOf(e.code)

  if (index > -1) {
    State.keyMap.array.splice(index, 1)
  }

  // console.log(State.keyMap.array)

  // DOM.keysPressed.innerText = State.keyMap.array
})
