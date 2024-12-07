// @ts-check
import { DOM } from '../scripts/modules/dom.js'
import { State } from '../scripts/modules/states.js'
import { Render } from '../scripts/modules/render.js'
import { Physics } from '../scripts/modules/physics.js'

let Projectile = {
  /**
   * @param {Object} arr - The array of projectiles to be rendered
   */
  shoot: (arr) => {
    State.projectiles.push(arr)

    Projectile.render()
  },

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @param {string} color
   */
  draw: (x, y, radius, color) => {
    Render.circle({
      x: x,
      y: y,
      size: radius,
      backgroundColor: color,
      borderColor: null,
      borderWidth: 0,
    })
  },

  /**
   *
   * @param {number} index
   */
  delete: (index) => {
    State.projectiles.splice(index, 1)
  },

  render: () => {
    State.projectiles.forEach((projectile, index) => {
      projectile.x += projectile.velocity.x
      projectile.y += projectile.velocity.y

      // Remove projectile if outside the canvas plus 50px.
      if (
        projectile.x - projectile.radius < -50 ||
        // @ts-ignore
        projectile.x + projectile.radius > DOM.canvas.width + 50 ||
        projectile.y - projectile.radius < -50 ||
        // @ts-ignore
        projectile.y + projectile.radius > DOM.canvas.height + 50
      ) {
        Projectile.delete(index)
      }

      Projectile.draw(
        projectile.x,
        projectile.y,
        projectile.radius,
        projectile.color
      )

      const renderChain = Render.chain
      const renderChainLen = renderChain.length

      for (let i = 0; i < renderChainLen; i++) {
        const object = renderChain[i]

        if (object.type === 'box' && object.isBulletTangible === true) {
          // Enable collision
          if (Physics.collision.detect.circleRect(projectile, object)) {
            // Destroy bullet
            Projectile.delete(index)
          }
        }
      }
    })
  },
}

export { Projectile }
