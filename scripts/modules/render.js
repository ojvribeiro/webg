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


  /**
   * Method that renders a canvas text.
   * 
   * @param {Object} props - The text properties.
   * @param {string} props.text - The text to be rendered.
   * @param {number} props.x - The X position of the text.
   * @param {number} props.y - The Y position of the text.
   * @param {string} props.fontFamily - The font to be used (equivalent to font-family in CSS).
   * @param {string} props.fontSize - The size of the text (equivalent to font-size in CSS).
   * @param {string} props.color - The color of the text.
   * @param {number} props.borderWidth - The color of the text.
   * @param {string} props.borderColor - The color of the text.
   */
  text: (props) => {
    let lineheight = 10;
    let lines = props.text.split('\n');

    if (typeof props.text !== "undefined") {
      ctx.beginPath();
  
      ctx.font = `${props.fontSize} ${props.fontFamily}`
      ctx.fillStyle = props.color
      
      // If borderWidth or borderColor are defined then render a text stroke
      if (typeof props.borderWidth !== "undefined" || typeof props.borderColor !== "undefined") {
        ctx.save()
  
        ctx.strokeStyle = props.borderColor || 'black' // Defaults to black
        ctx.lineWidth = props.borderWidth * 2 || 2 // A doubled value produces a more accurate result (default: 2 [1px])
  
        for (let i in lines) {
          ctx.strokeText(
            lines[i], 
            props.x, 
            props.y + (i * lineheight)
          );
        }
  
        ctx.restore();
      }

      for (let i in lines) {
        ctx.fillText(
          lines[i], 
          props.x, 
          props.y + (i * lineheight)
        );
      }
  
      ctx.closePath()
    }
  },


  /**
   * Method that renders a canvas text.
   * 
   * @param {Object} props - The circle properties.
   * @param {string} props.backgroundColor - The background color of the circle.
   * @param {string} props.borderColor - The border color of the circle.
   * @param {string} props.borderWidth - The border width of the circle.
   * @param {number} props.x - The X position of the circle.
   * @param {number} props.y - The Y position of the circle.
   * @param {number} props.size - The size the circle.
   */
  circle: (props) => {
    ctx.beginPath()

    ctx.fillStyle = props.backgroundColor;

    // If borderWidth or borderColor are defined then render a stroke
    if (typeof props.borderWidth !== "undefined" || typeof props.borderColor !== "undefined") {
      ctx.save()

      ctx.strokeStyle = props.borderColor || 'black' // Defaults to black
      ctx.lineWidth = props.borderWidth * 2 || 2 // A doubled value produces a more accurate result (default: 2 [1px])

      ctx.stroke()

      ctx.restore()
    }

    ctx.arc(
      props.x, 
      props.y, 
      props.size,
      0, 
      (Math.PI * 2), 
      false
    );
    ctx.fill()

    ctx.closePath()
  },


  /**
   * Method that renders a image on canvas.
   * 
   * @param {Object} props - The image properties.
   * @param {string} props.image - The image object.
   * @param {number} props.clipX - The X position to clip the image.
   * @param {number} props.clipY - The Y position to clip the image.
   * @param {number} props.clipWidth - The width value to clip the image.
   * @param {number} props.clipHeight - The height value to clip the image.
   * @param {number} props.x - The X position of the image.
   * @param {number} props.y - The Y position of the image.
   * @param {number} props.width - The width the image.
   * @param {number} props.height - The height the image.
   */
  image: (props) => {
    ctx.drawImage(
      props.image,
      props.clipX,
      props.clipY,
      props.clipWidth,
      props.clipHeight,
      props.x,
      props.y,
      props.width,
      props.height
    )
  }
}

export { Render }