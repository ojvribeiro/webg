const METER_SCALE = 50; // 1 meter = 50 pixels

const playerConfig = {
  PX_PER_METER: METER_SCALE,
  // All measurements below are in meters, converted to pixels
  SIZE: 2 * METER_SCALE, // 2m tall sprite
  WIDTH: 1 * METER_SCALE, // 1m wide
  HEIGHT: 2 * METER_SCALE, // 2m tall
  WALK_MAX_SPEED: 4 * METER_SCALE, // 4 m/s walk speed
  RUN_MAX_SPEED: 8 * METER_SCALE, // 8 m/s run speed

  SHOW_SPRITE: true,
  SPRITE_SHEET_PATH: '/sprites/Player/Player.svg',
  SPRITE_SHEET_ROWS: 32,
  SPRITE_SHEET_COLS: 5,

  SHOW_HITBOX: true,
  SHOW_OBJECT_INFO: true,
  SHOW_COLLISION_BOX: true,
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
