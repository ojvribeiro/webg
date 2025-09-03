const playerConfig = {
  SIZE: 100,
  WIDTH: 50,
  HEIGHT: 100,
  WALK_MAX_SPEED: 1.5, // Pixels per frame
  RUN_MAX_SPEED: 5, // Pixels per frame

  SHOW_SPRITE: true,
  SPRITE_SHEET_PATH: '/sprites/Player/Player.svg',
  SPRITE_SHEET_ROWS: 32,
  SPRITE_SHEET_COLS: 5,

  SHOW_HITBOX: false,
  SHOW_OBJECT_INFO: false,
  SHOW_COLLISION_BOX: false,
  HITBOX_BACKGROUND_COLOR: 'rgba(245, 28, 28, 0.281)',
  HITBOX_BORDER_COLOR: '#ff0000',
  COLLISION_BOX_BACKGROUND_COLOR: 'rgba(254, 212, 150, 0.5)',
  COLLISION_BOX_BORDER_COLOR: '#FEA',

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
}

export { playerConfig }
