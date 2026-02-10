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
  const canvas = DOM.canvas

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

const Render = {
  /**
   * The rendering order.
   */
  chain: [] as { type: string; [key: string]: any }[],

  /**
   * Method that adds an object to the rendering chain.
   * @param props - The object to be added to the chain
   */
  add: (props: { type: string; [key: string]: any }) => {
    Render.chain.push(props)
  },

  loop: () => {
    // Instantiate game objects ONCE
    const player = new Player()
    const projectile = Projectile
    const village = new Village()
    new Box(village.objects)

    function update() {
      stats.begin()

      Config.ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height)

      // Update and render projectiles
      if (State.projectiles.length > 0) {
        projectile.render()
      }

      // Sort chain for correct rendering order
      Render.chain.sort((a, b) => a.bottomY - b.bottomY)

      // Render all objects in the chain
      for (let i = 0; i < Render.chain.length; i++) {
        const obj = Render.chain[i]
        if (obj.type === 'player') {
          player.render()
        } else if (obj.type === 'box') {
          village.render(obj)
        }
      }

      stats.end()
      requestAnimationFrame(update)
    }

    update()
  },

  /**
   * Method that renders a canvas rectangle (box).
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
   * Method that renders a canvas circle.
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
