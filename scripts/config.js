import { DOM } from './modules/dom.js'


const Config = {
  name: 'webg',
  domain: 'webg.io',
  localDomain: 'localhost/github/webg',
  protocol: 'http://',

  showObjectInfo: false,
  
  ctx: DOM.canvas.getContext('2d'),
  
  get root() {
    return (
      location.host === 'localhost' ? this.protocol + this.localDomain : this.protocol + this.domain
    )
  },

  player: {
  
    /**
     * Define player keyboard controls
     * Uses `event.code` to capture key codes on `keydown`
     */
    KEYBOARD_CONTROLS: {
      up: 'KeyW',
      down: 'KeyS',
      left: 'KeyA',
      right: 'KeyD',
      run: 'ShiftLeft',
    },

    SIZE: 100,
    WIDTH: 50,
    HEIGHT: 100,
    WALK_MAX_SPEED: 2, // Pixels per frame
    RUN_MAX_SPEED: 4, // Pixels per frame
    
    SHOW_SPRITE: true,
    SPRITE_SHEET_PATH: '/sprites/Player/Player.svg',
    SPRITE_SHEET_ROWS: 32,
    SPRITE_SHEET_COLS: 5,

    SHOW_HITBOX: false,
    SHOW_COLLISION_BOX: false,
    HITBOX_COLOR: 'rgba(245, 50, 28, 0.5)',
    COLLISION_BOX_COLOR: 'rgba(254, 212, 150, 0.5)',

    spriteMap: {
      'down': 0,
      'up': 1,
      'left': 2,
      'right': 3,
      
      'up-left': 4,
      'up-right': 5,
      'down-left': 6,
      'down-right': 7,

      'down-running': 8,
      'up-running': 9,
      'left-running': 10,
      'right-running': 11,

      'down-walking': 12,
      'up-walking': 13,
      'left-walking': 14,
      'right-walking': 15,

      'up-left-walking-backwards': 16,
      'up-right-walking-backwards': 17,
      'down-left-walking-backwards': 18,
      'down-right-walking-backwards': 19,

      'down-walking-backwards': 20,
      'up-walking-backwards': 21,
      'left-walking-backwards': 22,
      'right-walking-backwards': 23,

      'down-left-running': 24,
      'down-right-running': 25,
      'up-left-running': 26,
      'up-right-running': 27,

      'down-left-walking': 28,
      'down-right-walking': 29,
      'up-left-walking': 30,
      'up-right-walking': 31,
    }
  },

  projectiles: {
    SIZE: 3, // Projectile hitbox radius (default: 3)
    SPEED: 20, // Pixels per frame (default: 15)
    COLOR: '#fff'
  },

  objects: {
    SHOW_COLLISION_BOX: false,
  },
}


export { Config }
