import {playerKeyFrames} from './Objects/Player/main.js'


export default function create() {

  playerKeyFrames.forEach((key, index) => {
    this.anims.create({
      key: key.name,
      frames: this.anims.generateFrameNumbers('player', {
        frames: key.frames
      }),
      frameRate: key.frameRate,
      repeat: -1
    })
  })


  const cody = this.add.sprite(100, 200)
  cody.play('idle-down')


  


  let c = 0
  this.input.on('pointerdown', function() {
    c++

    if (c === playerKeyFrames.length) {
      c = 0;
    }

    cody.play(playerKeyFrames[c].name)
  })
}