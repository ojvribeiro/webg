import type { BasicAnimationName } from '../../objects/Player/animation/basic'
import { Render } from './render'

interface Props {
  spriteImageObject: object
  keyframes: any[]
  xPosition: number
  yPosition: number
  width: number
  height: number
  animationName: BasicAnimationName
}

/**
 * Class utility to animate sprites.
 * */
class SpriteAnimation {
  private lastUpdate: number
  private props: Props
  private iterator: number
  private currentAnimation: any
  private animationLength: number
  private animationFrameRate: number
  private currentFrameValue: number

  constructor(props: Props) {
    // Time the frame index was last updated
    this.lastUpdate = Date.now()
    this.props = props

    this.iterator = 0
  }

  /**
   * The render method
   * @method
   * @param animationName - The animation
   * @param x - The X position of the object on the screen.
   * @param y - The Y position of the object on the screen.
   */
  render(animationName: string, x: number, y: number) {
    const _x = x === undefined ? this.props.xPosition : x
    const _y = y === undefined ? this.props.yPosition : y

    for (
      let animationIndex = 0;
      animationIndex < this.props.keyframes.length;
      animationIndex++
    ) {
      if (this.props.keyframes[animationIndex].name === animationName) {
        this.currentAnimation = this.props.keyframes[animationIndex]
        this.animationLength = this.currentAnimation.frames.length
        this.animationFrameRate = this.currentAnimation.frameRate

        this.props.width =
          (this.props.width * this.animationLength) / this.animationLength
        this.props.height =
          (this.props.height * this.props.keyframes.length) /
          this.props.keyframes.length

        const props = {
          spritesheet: this.props.spriteImageObject,
          clipX:
            this.currentFrameValue <= this.animationLength - 1
              ? this.props.width *
                this.currentAnimation.frames[this.currentFrameValue]
              : 0,
          clipY: animationIndex > 0 ? this.props.height * animationIndex : 0,
          clipWidth: this.props.width,
          clipHeight: this.props.height,
          x: _x,
          y: _y,
          width: this.props.width,
          height: this.props.height,
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
          height: props.height,
        })

        this.update()

        break
      }
    }
  }

  // To update
  update() {
    if (Date.now() - this.lastUpdate > 1000 / this.animationFrameRate) {
      this.lastUpdate = Date.now()

      if (this.iterator < this.animationLength) {
        this.currentFrameValue = this.currentAnimation.frames[this.iterator]

        this.iterator++
      } else {
        this.iterator = 0
        this.currentFrameValue = this.currentAnimation.frames[0]
      }
    }
  }
}

export { SpriteAnimation }
