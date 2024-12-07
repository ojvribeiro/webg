const doc = document

const DOM = {
  canvas: doc.getElementById('canvas'),
  keysPressed: doc.getElementById('keys'),
  playerSpeed: doc.getElementById('speed'),
  playerPosition: doc.getElementById('player-pos'),
  mousePosition: {
    x: null,
    y: null,
  },
}

export { DOM }
