import { Render } from './modules/render'

import './modules/mouse'
import './modules/keyboard'

let game = {
  init: () => {
    Render.loop()
  },
}

export { game }
