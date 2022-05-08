// @ts-check
import { DOM } from './dom.js'
import { Config } from '../config.js'

const canvas = DOM.canvas

// @ts-ignore
canvas.width = window.innerWidth
// @ts-ignore
canvas.height = window.innerHeight

// These defaults are automatically updated
let State = {
  player: {
    // @ts-ignore
    x: canvas.width / 2,
    // @ts-ignore
    y: canvas.height / 2,
    speed: 0,
    facing: 'down',
    state: 'idle',
    currentRowIndex: 0,
    sprites: Config.player.SPRITE_SHEET_PATH,
    hitBox: {
      head: {},
      body: {}
    },
    collisionBox: {}
  },

  keyMap: {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,

    array: []
  },

  projectiles: [],
}


export { State }
