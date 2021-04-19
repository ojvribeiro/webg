import Stats from '../node_modules/stats-js/src/Stats.js'

import { Config } from './config.js'
import { DOM } from './modules/dom.js'
import { State } from './modules/states.js'
import { Player } from '../objects/Player/Player.js'
import { Projectile } from '../objects/Projectile.js'
import { Box } from '../objects/Box.js'
import { Village } from '../objects/Maps/Village.js'
import { Render } from './modules/render.js'

import './modules/mouse.js'
import './modules/keyboard.js'


DOM.canvas.width = window.innerWidth
DOM.canvas.height = window.innerHeight

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

let game = {

  init: () => {
    const player = new Player()
    const projectile = Projectile
    const box = new Box(Village.objects)

    const village = new Image()
    village.src = Village.mapSprite
    
    ;(function update() {
      stats.begin()

      Config.ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height)
      
      // Draw background
      Render.image({
        image: village,
        clipX: 0,
        clipY: 0,
        clipWidth: DOM.canvas.width,
        clipHeight: DOM.canvas.height,
        x: 0,
        y: 0,
        width: DOM.canvas.width * 2,
        height: DOM.canvas.height * 2
      })

      box.render()
      player.render()
      
      // Pop on other edge
      if (State.player.y < 0) {
        State.player.y = DOM.canvas.height
      }
      else if (State.player.y > DOM.canvas.height) {
        State.player.y = 0
      }
      else if (State.player.x < 0) {
        State.player.x = DOM.canvas.width
      }
      else if (State.player.x > DOM.canvas.width) {
        State.player.x = 0
      }


      if (State.projectiles.length > 0) {
        projectile.update()
      }
      stats.end()

      requestAnimationFrame(update)
    })()
  }
}

export { game }

