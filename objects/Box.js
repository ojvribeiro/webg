import { State } from '../scripts/modules/states.js'
import { Physics } from '../scripts/modules/physics.js'
import { DOM } from '../scripts/modules/dom.js'
import { Render } from '../scripts/modules/render.js'

const showObjectsName = true
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
        Render.text({
          text: `${this.boxes[i].name} \n x: ${this.boxes[i].x} \n y: ${this.boxes[i].y}`,
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'lightgreen',
          borderWidth: 1,
          borderColor: 'black',
          x: this.boxes[i].x + this.boxes[i].width,
          y: this.boxes[i].y + this.boxes[i].height + 5
        })
      }

      // Enable collision
      Physics.collision.rectRect(State.player.collisionBox, object)
    }
  }
}

export { Box }
