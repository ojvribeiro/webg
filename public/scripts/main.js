// @ts-check
import { Render } from './modules/render.js'

import './modules/mouse.js'
import './modules/keyboard.js'


let game = {
  init: () => {
    Render.loop()
  }
}


export { game }

