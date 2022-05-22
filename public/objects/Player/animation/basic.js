// @ts-check
// 'sprites/Player/Player.svg'

/**
 * @type {array}
 */
const basicAnimationKeyframes = [
  {
    name: 'idle-down',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-up',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-left',
    frames: [0, 1, 2, 1, 0],
    frameRate: 5,
  },

  {
    name: 'idle-right',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-up-left',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-up-right',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-down-left',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'idle-down-right',
    frames: [0, 1, 2, 1],
    frameRate: 5,
  },

  {
    name: 'run-down',
    frames: [0, 1, 2, 3, 4, 5],
    frameRate: 20,
  },

  {
    name: 'run-up',
    frames: [0, 1, 2, 3, 4],
    frameRate: 20,
  },

  {
    name: 'run-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },

  {
    name: 'run-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },

  {
    name: 'walk-down',
    frames: [0, 1, 2, 3, 4],
    frameRate: 8,
  },

  {
    name: 'walk-up',
    frames: [0, 1, 2, 3, 4, 3, 2, 1],
    frameRate: 12,
  },

  {
    name: 'walk-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 14,
  },

  {
    name: 'walk-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-down-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-down-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-up-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-up-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-up-left-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-up-right-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-down-left-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-down-right-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-up-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-down-backwards',
    frames: [0, 1, 2, 3, 4, 3, 2, 1],
    frameRate: 12,
  },

  {
    name: 'walk-right-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'walk-left-backwards',
    frames: [0, 1, 2, 3, 4],
    frameRate: 12,
  },

  {
    name: 'run-down-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },

  {
    name: 'run-down-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },

  {
    name: 'run-up-left',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },

  {
    name: 'run-up-right',
    frames: [0, 1, 2, 3, 4],
    frameRate: 30,
  },
]


export { basicAnimationKeyframes }
