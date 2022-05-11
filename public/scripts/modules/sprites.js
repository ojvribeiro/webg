// @ts-check
import { Render } from './render.js'

/**
* Class utility to animate sprites.
* @class
* */
class SpriteAnimation {

  /**
  * @constructs
  * @param {object} props - The properties of the object.
  * @param {object} props.spriteImageObject - The spritesheet image object (created with the `new` contructor).
  * @param {array} props.keyframes - The keyframes array.
  * @param {number} props.xPosition - The X coordinate of the object.
  * @param {number} props.yPosition - The Y coordinate of the object.
  * @param {number} props.width - Width of spritesheet.
  * @param {number} props.height - Height of spritesheet.
  * @param {string} props.animationName - The animation row to be executed.
  * @param {number} [props.numberOfColumns=1] - The number of columns (frames) in the spritesheet.
  * @param {number} [props.numberOfRows=1] - The number of rows (animations) in the spritesheet.
  * */
  constructor(props) {
    this.props = props

    // Current frame index pointer
    this.frameIndex = 0

    // Time the frame index was last updated
    this.lastUpdate = Date.now()
  }


  /**
   * The render method
   * @method
   * @param {!String} animationName - The animation
   * @param {!number} x - The X position of the object on the screen.
   * @param {!number} y - The Y position of the object on the screen.
   */
  render(animationName, x, y) {
    const _x = x === undefined ? this.props.xPosition : x
    const _y = y === undefined ? this.props.yPosition : y

    for (let i = 0; i < this.props.keyframes.length; i++) {
      this.currentAnimation = this.props.keyframes[i]

      if (this.currentAnimation.name === animationName) {
        this.animationLength = this.currentAnimation.frames.length
        this.animationFrameRate = this.currentAnimation.frameRate

        break
      }
    }

    const props = {
      spritesheet: this.props.spriteImageObject,
      clipX: (this.frameIndex * this.props.width / this.props.numberOfColumns),
      clipY: (this.currentAnimation.id > 0) ? ((this.props.height / this.props.numberOfRows)) * this.currentAnimation.id : 0,
      clipWidth: (this.props.width / this.props.numberOfColumns),
      clipHeight: (this.props.height / this.props.numberOfRows),
      x: _x,
      y: _y,
      width: (this.props.width / this.props.numberOfColumns),
      height: (this.props.height / this.props.numberOfRows),
    }

    Render.image({
      image: props.spritesheet,
      clipX: props.clipX,
      clipY: props.clipY,
      clipWidth: props.clipWidth,
      clipHeight: props.clipHeight,
      x: props.x,
      y: props.y,
      width: props.width,
      height: props.height
    })
  }


  // To update
  update() {
    if (Date.now() - this.lastUpdate > (1000 / this.animationFrameRate)) {
      this.frameIndex++

      if (this.frameIndex >= this.animationLength) {
        this.frameIndex = 0
      }

      this.lastUpdate = Date.now()
    }
  }
}

export { SpriteAnimation }
