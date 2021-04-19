import { State } from '../scripts/modules/states.js';
import { Physics } from '../scripts/modules/physics.js';
import { Render } from '../scripts/modules/render.js';

const showObjectsName = true

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
    this.boxes = props
  }

  render() {
    // Render loop
    for (let i in this.boxes) {
      Render.box({
        x: this.boxes[i].x,
        y: this.boxes[i].y,
        width: this.boxes[i].width,
        height: this.boxes[i].height,
        backgroundColor: this.boxes[i].backgroundColor,
        borderColor: this.boxes[i].borderColor
      })

      if (showObjectsName === true) {
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
      Physics.collision.rectRect(State.player.collisionBox, this.boxes[i])
    }
  }
}

export default Box;
