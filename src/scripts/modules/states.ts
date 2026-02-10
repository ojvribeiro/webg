import { DOM } from './dom'
import { playerConfig } from '../../objects/Player/Player'

const canvas = DOM.canvas

// @ts-ignore
canvas.width = window.innerWidth
// @ts-ignore
canvas.height = window.innerHeight

export interface State {
  player: {
    x: number
    y: number
    speed: number
    facing: string
    state: string
    currentRowIndex: number
    sprites: string
    hitBox: {
      head: object
      body: object
    }
    collisionBox: object
  }

  keyMap: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
    shift: boolean
    upLeft: boolean
    upRight: boolean
    downLeft: boolean
    downRight: boolean
    diagonal: boolean // Add this line

    array: string[]
  }

  projectiles: Projectile[]
}

export interface Projectile {
  x: number
  y: number
  radius: number
  color: string
  velocity: {
    x: number
    y: number
  }
}

// These defaults are automatically updated
let State: State = {
  player: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speed: 0,
    facing: 'down',
    state: 'idle',
    currentRowIndex: 0,
    sprites: playerConfig.SPRITE_SHEET_PATH,
    hitBox: {
      head: {},
      body: {},
    },
    collisionBox: {},
  },

  keyMap: {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,
    upLeft: false,
    upRight: false,
    downLeft: false,
    downRight: false,
    diagonal: false, // Add this line

    array: [] as string[],
  },

  projectiles: [],
}

export { State }
