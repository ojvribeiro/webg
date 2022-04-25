import { DOM } from '../scripts/modules/dom.js'
import { State } from '../scripts/modules/states.js'
import { Render } from '../scripts/modules/render.js'
import { Physics } from '../scripts/modules/physics.js'

DOM.canvas.width = window.innerWidth
DOM.canvas.height = window.innerHeight


let Projectile = {
  shoot: (arr) => {
    State.projectiles.push(arr)

    Projectile.render()
  },


  draw: (x, y, radius, color) => {
    Render.circle({
      x: x,
      y: y,
      size: radius,
      backgroundColor: color
    })
  },


  delete: (index) => {
    State.projectiles.splice(index, 1)
  },
  
  
  render: () => {
    State.projectiles.forEach((projectile, index) => {
      projectile.x += projectile.velocity.x
      projectile.y += projectile.velocity.y

      // Remove projectile if outside the canvas plus 50px.
      if (projectile.x - projectile.radius < -50 ||
        projectile.x + projectile.radius > DOM.canvas.width + 50 ||
        projectile.y - projectile.radius < -50 ||
        projectile.y + projectile.radius > DOM.canvas.height + 50) {

        Projectile.delete(index)
      }
  
      Projectile.draw(projectile.x, projectile.y, projectile.radius, projectile.color)

      const renderChain = Render.chain
      const renderChainLen = renderChain.length

      for (let i = 0; i < renderChainLen; i++) {
        if (Render.chain[i].type === 'box') {
          // Enable collision
          if (Physics.collision.circleRect(projectile, Render.chain[i])) {
            // Destroy bullet
            Projectile.delete(index)
          }
        }
      }
  
      // console.log(State.projectiles)
    })
  }
}


export { Projectile }