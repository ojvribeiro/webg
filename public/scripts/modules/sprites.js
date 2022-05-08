import { Render } from './render.js'


/**
 * Class utility to animate sprites.
 * @class
 * */
class SpriteAnimation {
  /**
   * @constructs
   * @param {object} spritesheet - The spritesheet image object (created with the `new` contructor).
   * @param {!number} x - The X coordinate of the object.
   * @param {!number} y - The Y coordinate of the object.
   * @param {!number} width - Width of spritesheet.
   * @param {!number} height - Height of spritesheet.
   * @param {!number} timePerFrame - Time in milliseconds given to each frame.
   * @param {number} [numberOfColumns=1] - The number of columns (frames) in the spritesheet.
   * @param {number} [numberOfRows=1] - The number of rows (animations) in the spritesheet.
   * @param {!number} rowIndex - The animation row to be executed.
   * */
  constructor(spritesheet, x, y, width, height, timePerFrame, numberOfColumns = 1, numberOfRows = 1, rowIndex) {
    this.spritesheet = spritesheet
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.timePerFrame = timePerFrame
    this.numberOfColumns = numberOfColumns || 1
    this.numberOfRows = numberOfRows || 1
    this.rowIndex = rowIndex

    // Current frame index pointer
    this.frameIndex = 0

    // Time the frame index was last updated
    this.lastUpdate = Date.now()
  }


  /**
   * The render method
   * @method
   * @param {!number} rowIndex - The index of the row to animate on the sprite sheet.
   * @param {!number} x - The X position of the object on the screen.
   * @param {!number} y - The Y position of the object on the screen.
   */
  render(rowIndex, x, y) {
    const _x = x === undefined ? this.x : x
    const _y = y === undefined ? this.y : y
    const _rowIndex = rowIndex === undefined ? this.rowIndex : rowIndex

    const props = {
      spritesheet: this.spritesheet,
      clipX: (this.frameIndex * this.width / this.numberOfColumns),
      clipY: (_rowIndex > 0) ? ((this.height / this.numberOfRows)) * _rowIndex : 0,
      clipWidth: (this.width / this.numberOfColumns),
      clipHeight: (this.height / this.numberOfRows),
      x: _x,
      y: _y,
      width: (this.width / this.numberOfColumns),
      height: (this.height / this.numberOfRows),
    }

    const image = new Image()
    image.src = props.spritesheet

    Render.image({
      image: image,
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
    if (Date.now() - this.lastUpdate >= this.timePerFrame) {
      this.frameIndex++

      if (this.frameIndex >= this.numberOfColumns) {
        this.frameIndex = 0
      }

      this.lastUpdate = Date.now()
    }
  }
}

export { SpriteAnimation }
