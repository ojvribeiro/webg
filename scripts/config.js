import { DOM } from './modules/dom.js'


const Config = {
  name: 'webg',
  domain: 'webg.io',
  localDomain: 'localhost/github/webg',
  protocol: 'http://',
  
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
    SPRITE_SHEET_PATH: '/sprites/Player/Player.png',
    SPRITE_SHEET_ROWS: 32,
    SPRITE_SHEET_COLS: 5,

    SHOW_HITBOX: false,
    SHOW_COLLISION_BOX: true,
    HITBOX_COLOR: 'rgba(245, 50, 28, 0.5)',
    COLLISION_BOX_COLOR: 'rgba(254, 212, 150, 0.5)',

    spriteMap: {
      down: 0,
      up: 1,
      left: 2,
      right: 3,
      
      upLeft: 4,
      upRight: 5,
      downLeft: 6,
      downRight: 7,

      downRunning: 8,
      upRunning: 9,
      leftRunning: 10,
      rightRunning: 11,

      downWalking: 12,
      upWalking: 13,
      leftWalking: 14,
      rightWalking: 15,

      upLeftWalkingBackwards: 16,
      upRightWalkingBackwards: 17,
      downLeftWalkingBackwards: 18,
      downRightWalkingBackwards: 19,

      downWalkingBackwards: 20,
      upWalkingBackwards: 21,
      leftWalkingBackwards: 22,
      rightWalkingBackwards: 23,

      downLeftRunning: 24,
      downRightRunning: 25,
      upLeftRunning: 26,
      upRightRunning: 27,

      downLeftWalking: 28,
      downRightWalking: 29,
      upLeftWalking: 30,
      upRightWalking: 31,
    }
  },

  projectiles: {
    SIZE: 3, // Projectile hitbox radius (default: 3)
    SPEED: 20, // Pixels per frame (default: 15)
    COLOR: '#fff'
  }
}


export { Config }
