import { Config } from '../config.js'

const ctx = Config.ctx


let Render = {
  /**
   * Method that renders a canvas rectangle (box).
   * 
   * @param {Object} props - The box properties
   * @param {!number} props.x - The X position of the box
   * @param {!number} props.y - The Y position of the box
   * @param {!number} props.width - The width of the box
   * @param {!number} props.height - The height of the box
   * @param {?string} props.backgroundColor - The background color of the box
   * @param {?string} props.borderColor - The border color of the box
   */
  box: (props) => {
    ctx.beginPath()

    ctx.fillStyle = props.backgroundColor || 'transparent'
    ctx.strokeStyle = props.borderColor || 'transparent'

    ctx.rect(props.x, props.y, props.width, props.height)

    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  },
}

export { Render }