// @ts-check
import { Render } from './render.js'

/**
* Class utility to animate sprites.
* @class
* */
class SpriteAnimation {

  /**
  * @constructs
  * @param {object} spritesheet - The spritesheet image object (created with the `new` contructor).
  * @param {array} keyframes - The keyframes array.
  * @param {!number} x - The X coordinate of the object.
  * @param {!number} y - The Y coordinate of the object.
  * @param {!number} width - Width of spritesheet.
  * @param {!number} height - Height of spritesheet.
  * @param {!String} animationName - The animation row to be executed.
  * @param {number} [numberOfColumns=1] - The number of columns (frames) in the spritesheet.
  * @param {number} [numberOfRows=1] - The number of rows (animations) in the spritesheet.
  * */
  constructor(spritesheet, keyframes, x, y, width, height, animationName, numberOfColumns = 1, numberOfRows = 1) {
    this.spritesheet = spritesheet
    this.keyframes = keyframes
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.numberOfColumns = numberOfColumns || 1
    this.numberOfRows = numberOfRows || 1
    this.animationName = animationName

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
    let rowIndex
    const _x = x === undefined ? this.x : x
    const _y = y === undefined ? this.y : y

    for (let i = 0; i < this.keyframes.length; i++) {
      const keyframe = this.keyframes[i]

      if (keyframe.name === animationName) {
        this.animationLength = keyframe.frames.length
        this.animationFrameRate = keyframe.frameRate

        rowIndex = keyframe.id

        break
      }
    }

    const props = {
      spritesheet: this.spritesheet,
      clipX: (this.frameIndex * this.width / this.numberOfColumns),
      clipY: (rowIndex > 0) ? ((this.height / this.numberOfRows)) * rowIndex : 0,
      clipWidth: (this.width / this.numberOfColumns),
      clipHeight: (this.height / this.numberOfRows),
      x: _x,
      y: _y,
      width: (this.width / this.numberOfColumns),
      height: (this.height / this.numberOfRows),
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
