export default function create() {
  this.anims.create({
    key: 'idle-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [0, 1, 2, 3, 4]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-up',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [5, 6, 7, 8, 9]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [10, 11, 12, 13, 14]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [15, 16, 17, 18, 19]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-up-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [20, 21, 22, 23, 24]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-up-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [25, 26, 27, 28, 29]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-down-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [30, 31, 32, 33, 34]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'idle-down-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [35, 36, 37, 38, 39]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [40, 41, 42, 43, 44]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-up',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [45, 46, 47, 48, 49]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [50, 51, 52, 53, 54]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-up-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [65, 66, 67, 68, 69]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-up-left',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [70, 71, 72, 73, 74]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [75, 76, 77, 78, 79]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [80, 81, 82, 83, 84]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [85, 86, 87, 88, 89]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'running-right',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [55, 56, 57, 58, 59]
    }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', {
      frames: [60, 61, 62, 63, 64]
    }),
    frameRate: 10,
    repeat: -1
  })



  const cody = this.add.sprite(100, 200)
  cody.play('walk-down')


  const keys = [
    'idle-down',
    'idle-up',
    'idle-left',
    'idle-right',
    'idle-up-left',
    'idle-up-right',
    'idle-down-left',
    'idle-down-right',
    'walk-down',
  ]


  let c = 0
  this.input.on('pointerdown', function() {
    c++

    if (c === keys.length) {
      c = 0;
    }

    cody.play(keys[c])
  })
}