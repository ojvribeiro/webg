// @ts-check
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
}

export { Box }
