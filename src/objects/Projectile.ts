import { DOM } from '../scripts/modules/dom'
import { State } from '../scripts/modules/states'
import { Render } from '../scripts/modules/render'
import { Physics } from '../scripts/modules/physics'

// Define the projectile type if not already imported
type ProjectileType = {
  x: number
  y: number
  velocity: { x: number; y: number }
  radius: number
  color: string
}

const Projectile = {
  /**
   * Add a projectile to the state and render it
   * @param proj - The projectile object to be added
   */
  shoot: (proj: ProjectileType) => {
    State.projectiles.push(proj)
    Projectile.render()
  },

  draw: (x: number, y: number, radius: number, color: string) => {
    Render.circle({
      x: x,
      y: y,
      size: radius,
      backgroundColor: color,
      borderColor: null,
      borderWidth: 0,
    })
  },

  delete: (index: number) => {
    State.projectiles.splice(index, 1)
  },

  render: () => {
    // Use a copy of the array to avoid issues when deleting
    State.projectiles
      .slice()
      .forEach((projectile: ProjectileType, index: number) => {
        projectile.x += projectile.velocity.x
        projectile.y += projectile.velocity.y

        // Remove projectile if outside the canvas plus 50px.
        if (
          projectile.x - projectile.radius < -50 ||
          projectile.x + projectile.radius > DOM.canvas.width + 50 ||
          projectile.y - projectile.radius < -50 ||
          projectile.y + projectile.radius > DOM.canvas.height + 50
        ) {
          Projectile.delete(index)
          return
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
            const rect = {
              x: object.x,
              y: object.y,
              width: object.width,
              height: object.height,
            }
            if (Physics.collision.detect.circleRect(projectile, rect)) {
              // Destroy bullet
              Projectile.delete(index)
              break
            }
          }
        }
      })
  },
}

export { Projectile }
