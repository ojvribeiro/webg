// @ts-check
import { State } from '../scripts/modules/states.js'
import { Physics } from '../scripts/modules/physics.js'
import { Render } from '../scripts/modules/render.js'

/**
 * Class of a box
 * @class
 */
class Box {
  /**
   * The box properties
   * @param {array} props
   */
  constructor(props) {
    const boxes = props

    const boxesLen = boxes.length

    for (let i = 0; i < boxesLen; i++) {
      boxes[i].type = 'box'
      boxes[i].bottomY = boxes[i].y + boxes[i].height

      Render.add(boxes[i])
    }
  }

  render(props) {
    // Render loop
    if (props.type === 'box') {
      Render.box(props)

      if (Config.showObjectInfo) {
        Render.text({
          text: `
            ${props.name}
            x: ${props.x}
            y: ${props.y}
          `,
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'lime',
          borderWidth: 1,
          borderColor: 'black',
          x: props.x + props.width,
          y: props.y + props.height + 5
        })
      }

      // Enable collision
      if (props.isTangible === true) {
        Physics.collision.rectRect(State.player.collisionBox, props)
      }
    }
  }
}

export { Box }
