import { Config } from '../config'
import { DOM } from './dom'
import { State } from './states'
import { Player } from '../../objects/Player/Player'
import { Projectile } from '../../objects/Projectile'
import { Village } from '../../objects/Maps/Village/Village'
import { Box } from '../../objects/Box'
import Stats from 'stats.js'

const ctx = Config.ctx

if (DOM.canvas) {
  const canvas = DOM.canvas as HTMLCanvasElement

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const Render = {
  /**
   * The rendering order.
   * @todo Every element to be drawn on screen should be here to be swaped when needed
   */
  chain: [] as { type: string; [key: string]: any }[],

  /**
   *
   * @param props - The object to be added to the chain
   */
  add: (props: { type: string; [key: string]: any }) => {
    Render.chain.push(props)
  },

  loop: () => {
    const player = new Player()
    const projectile = Projectile
    const village = new Village()

    new Box(village.objects)

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
        } else if (obj.type === 'box') {
          village.render(obj)
        }
      }

      stats.end()

      requestAnimationFrame(update)
    })()
  },

  /**
   * Method that renders a canvas rectangle (box).
   *
   * @param props - The box properties
   * @param props.x - The X position of the box
   * @param props.y - The Y position of the box
   * @param props.width - The width of the box
   * @param props.height - The height of the box
   * @param props.backgroundColor - The background color of the box
   * @param props.borderColor - The border color of the box
   * @param props.borderWidth - The border width of the circle.
   */
  box: (props: {
    x: number
    y: number
    width: number
    height: number
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
  }) => {
    if (!ctx) return

    ctx.beginPath()

    ctx.fillStyle = props.backgroundColor
      ? props.backgroundColor
      : 'transparent'

    ctx.strokeStyle = props.borderColor ? props.borderColor : 'transparent'
    ctx.lineWidth = props.borderWidth ? props.borderWidth : 0

    ctx.rect(props.x, props.y, props.width, props.height)

    ctx.stroke()
    ctx.fill()
    ctx.closePath()
  },

  /**
   * Method that renders a canvas text.
   *
   * @param props - The text properties.
   * @param props.text - The text to be rendered.
   * @param props.x - The X position of the text.
   * @param props.y - The Y position of the text.
   * @param props.fontFamily - The font to be used (equivalent to font-family in CSS).
   * @param props.fontSize - The size of the text (equivalent to font-size in CSS).
   * @param props.color - The color of the text.
   * @param props.borderWidth - The color of the text.
   * @param props.borderColor - The color of the text.
   */
  text: (props: {
    text: string
    x: number
    y: number
    fontFamily: string
    fontSize: string
    color: string
    borderWidth: number
    borderColor: string
  }) => {
    const lineHeight = 10
    const lineBreaks = props.text.split('\n')

    if (!ctx) return

    if (typeof props.text !== 'undefined') {
      ctx.beginPath()

      ctx.font = `${props.fontSize} ${props.fontFamily}`
      ctx.fillStyle = props.color

      // If borderWidth or borderColor are defined then render a text stroke
      if (
        typeof props.borderWidth !== 'undefined' ||
        typeof props.borderColor !== 'undefined'
      ) {
        ctx.save()

        ctx.strokeStyle = props.borderColor || 'black' // Defaults to black
        ctx.lineWidth = props.borderWidth * 2 || 2 // A doubled value produces a more accurate result (default: 2 [1px])

        for (let i = 0; i < lineBreaks.length; i++) {
          ctx.strokeText(
            lineBreaks[i].trim(),
            props.x,
            props.y + i * lineHeight
          )
        }

        ctx.restore()
      }

      for (let i = 0; i < lineBreaks.length; i++) {
        ctx.fillText(lineBreaks[i].trim(), props.x, props.y + i * lineHeight)
      }

      ctx.closePath()
    }
  },

  /**
   * Method that renders a canvas text.
   *
   * @param props - The circle properties.
   * @param props.x - The X position of the circle.
   * @param props.y - The Y position of the circle.
   * @param props.size - The size the circle.
   * @param props.backgroundColor - The background color of the circle.
   * @param props.borderColor - The border color of the circle.
   * @param props.borderWidth - The border width of the circle.
   */
  circle: (props: {
    x: number
    y: number
    size: number
    backgroundColor?: string
    borderColor?: string
    borderWidth?: number
  }) => {
    if (!ctx) return

    ctx.beginPath()

    ctx.fillStyle = props.backgroundColor
      ? props.backgroundColor
      : 'transparent'

    ctx.arc(props.x, props.y, props.size, 0, Math.PI * 2, false)

    ctx.fill()

    if (props.borderWidth || props.borderColor) {
      ctx.strokeStyle = props.borderColor ? props.borderColor : 'transparent'
      ctx.lineWidth = props.borderWidth ? props.borderWidth : 0

      ctx.stroke()
    }

    ctx.closePath()
  },

  /**
   * Method that renders a image on canvas.
   *
   * @param props - The image properties.
   * @param props.image - The image object.
   * @param props.clipX - The X position to clip the image.
   * @param props.clipY - The Y position to clip the image.
   * @param props.clipWidth - The width value to clip the image.
   * @param props.clipHeight - The height value to clip the image.
   * @param props.x - The X position of the image.
   * @param props.y - The Y position of the image.
   * @param props.width - The width the image.
   * @param props.height - The height the image.
   */
  image: (props: {
    image: HTMLImageElement
    clipX: number
    clipY: number
    clipWidth: number
    clipHeight: number
    x: number
    y: number
    width: number
    height: number
  }) => {
    function render() {
      if (!ctx) return

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
  },
}

export { Render }
