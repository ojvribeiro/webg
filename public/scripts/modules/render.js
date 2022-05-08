// @ts-check
import Stats from '../../node_modules/stats-js/src/Stats.js'

import { Config } from '../config.js'
import { DOM } from './dom.js'
import { State } from './states.js'
import { Player } from '../../objects/Player/Player.js'
import { Projectile } from '../../objects/Projectile.js'
import { Village } from '../../objects/Maps/Village/Village.js'
import { Box } from '../../objects/Box.js'


const ctx = Config.ctx

// @ts-ignore
DOM.canvas.width = window.innerWidth
// @ts-ignore
DOM.canvas.height = window.innerHeight

// @ts-ignore
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)


let Render = {
  /**
   * The rendering order.
   * @todo Every element to be drawn on screen should be here to be swaped when needed
   * @type {array}
  */
  chain: [],

  add: (props) => {
    Render.chain.push(props)
  },

  loop: () => {
    const player = new Player()
    const projectile = Projectile
    const village = new Village()
    const boxes = new Box(village.objects)

    const chainLen = Render.chain.length

    ;(function update() {
      stats.begin()

      // @ts-ignore
      Config.ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height)

      if (State.projectiles.length > 0) {
        projectile.render()
      }


      Render.chain.sort((a, b) => a.bottomY - b.bottomY)


      for (let i = 0; i < chainLen; i++) {
        const obj = Render.chain[i]

        if (obj.type === 'player') {
          player.render()
        }

        else if (obj.type === 'box') {
          village.render(obj)
          boxes.render(obj)
        }
      }


      if (Config.showObjectInfo === true) {
        Render.text({
          text: `
            mouse
            x: ${DOM.mousePosition.x}
            y: ${DOM.mousePosition.y}
          `,
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: 'lime',
          borderWidth: 1,
          borderColor: 'black',
          x: DOM.mousePosition.x + 20,
          y: DOM.mousePosition.y + 20,
        })
      }


      // Pop on other edge
      if (State.player.y < 0) {
        // @ts-ignore
        State.player.y = DOM.canvas.height
      }
      // @ts-ignore
      else if (State.player.y > DOM.canvas.height) {
        State.player.y = 0
      }
      else if (State.player.x < 0) {
        // @ts-ignore
        State.player.x = DOM.canvas.width
      }
      // @ts-ignore
      else if (State.player.x > DOM.canvas.width) {
        State.player.x = 0
      }

      stats.end()

      requestAnimationFrame(update)
    })()
  },


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
    const lineHeight = 10
    const lineBreaks = props.text.split('\n')

    if (typeof props.text !== 'undefined') {
      ctx.beginPath()

      ctx.font = `${props.fontSize} ${props.fontFamily}`
      ctx.fillStyle = props.color

      // If borderWidth or borderColor are defined then render a text stroke
      if (typeof props.borderWidth !== 'undefined' || typeof props.borderColor !== 'undefined') {
        ctx.save()

        ctx.strokeStyle = props.borderColor || 'black' // Defaults to black
        ctx.lineWidth = props.borderWidth * 2 || 2 // A doubled value produces a more accurate result (default: 2 [1px])

        for (let i = 0; i < lineBreaks.length; i++) {
          ctx.strokeText(
            lineBreaks[i].trim(),
            props.x,
            props.y + (i * lineHeight)
          )
        }

        ctx.restore()
      }

      for (let i = 0; i < lineBreaks.length; i++) {
        ctx.fillText(
          lineBreaks[i].trim(),
          props.x,
          props.y + (i * lineHeight)
        )
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
   * @param {number} props.borderWidth - The border width of the circle.
   * @param {number} props.x - The X position of the circle.
   * @param {number} props.y - The Y position of the circle.
   * @param {number} props.size - The size the circle.
   */
  circle: (props) => {
    ctx.beginPath()

    ctx.fillStyle = props.backgroundColor

    // If borderWidth or borderColor are defined then render a stroke
    if (typeof props.borderWidth !== 'undefined' || typeof props.borderColor !== 'undefined') {
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
    )
    ctx.fill()

    ctx.closePath()
  },


  /**
   * Method that renders a image on canvas.
   *
   * @param {Object} props - The image properties.
   * @param {Object} props.image - The image object.
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
    function render() {
      ctx.globalCompositeOperation = 'source-over'

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

    render()

    props.image.addEventListener('load', render, false)
  }
}

export { Render }
