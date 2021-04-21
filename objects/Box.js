import { State } from '../scripts/modules/states.js'
import { Physics } from '../scripts/modules/physics.js'
import { Render } from '../scripts/modules/render.js'
import { Config } from '../scripts/config.js'

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
    const boxes = JSON.parse(JSON.stringify(props))

    const boxesLen = boxes.length

    for (let i = 0; i < boxesLen; i++) {
      boxes[i].type = 'box'
      boxes[i].bottomY = boxes[i].y + boxes[i].height

      Render.add(boxes[i])
    }
  }

  render(object) {
    let boxProps = {
      x: object.x,
      y: object.y,
      bottomY: object.bottomY,
      width: object.width,
      height: object.height,
      backgroundColor: object.backgroundColor,
      borderColor: Config.objects.SHOW_COLLISION_BOX === true ? object.borderColor : 'transparent',
    }

    // Render loop
    if (object.type === 'box') {
      Render.box(boxProps)

      if (Config.showObjectInfo) {
        Render.text({
          text: `${object.name} \n x: ${boxProps.x} \n y: ${boxProps.y}`,
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'lightgreen',
          borderWidth: 1,
          borderColor: 'black',
          x: boxProps.x + boxProps.width,
          y: boxProps.y + boxProps.height + 5
        })
      }

      // Enable collision
      Physics.collision.rectRect(State.player.collisionBox, object)
    }
  }
}

export { Box }
