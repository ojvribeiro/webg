import preload from './preload.js'
import create from './create.js'

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#728f85',
  scene: {
    preload: preload,
    create: create
  }
}

export {config}