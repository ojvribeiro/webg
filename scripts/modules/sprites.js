import { Config } from '../config.js';


/** Class utility to animate sprites. */
class SpriteAnimation {
  constructor(spritesheet, x, y, width, height, timePerFrame, numberOfColumns, numberOfRows, rowIndex) {
    this.spritesheet = spritesheet;             // the spritesheet image
    this.x = x;                                 // the x coordinate of the object
    this.y = y;                                 // the y coordinate of the object
    this.width = width;                         // width of spritesheet
    this.height = height;                       // height of spritesheet
    this.timePerFrame = timePerFrame;           // time in(ms) given to each frame
    this.numberOfColumns = numberOfColumns || 1;  // number of frames(sprites) in the spritesheet, default 1
    this.numberOfRows = numberOfRows || 1;  // number of frames(sprites) in the spritesheet, default 1
    this.rowIndex = rowIndex;

    //current frame index pointer
    this.frameIndex = 0;

    //time the frame index was last updated
    this.lastUpdate = Date.now();

  }


  /**
   * @param ctx - The canvas rendering context
   * @param {number} rowIndex - The index of the row to animate on the sprite sheet.
   * @param {*} x - The X position of the object on the screen.
   * @param {*} y - The Y position of the object on the screen.
   */
  draw(ctx, rowIndex, x, y) {
    const _x = x === undefined ? this.x : x;
    const _y = y === undefined ? this.y : y;
    const _rowIndex = rowIndex === undefined ? this.rowIndex : rowIndex;
    
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

    Config.ctx.drawImage(
      props.spritesheet,
      props.clipX,
      props.clipY,
      props.clipWidth,
      props.clipHeight,
      props.x,
      props.y,
      props.width,
      props.height
    );
  }


  //to update
  update() {
    if (Date.now() - this.lastUpdate >= this.timePerFrame) {
      this.frameIndex++;
      if (this.frameIndex >= this.numberOfColumns) {
        this.frameIndex = 0;
      }
      this.lastUpdate = Date.now();
    }
  }
}

export default SpriteAnimation;
