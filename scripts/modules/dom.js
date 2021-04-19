
const d = document;

const DOM = {
  canvas: d.getElementById('canvas'),
  keysPressed: d.getElementById('keys'),
  playerSpeed: d.getElementById('speed'),
  playerPosition: d.getElementById('player-pos'),
  mousePosition: {
    x: null,
    y: null
  }
}

export { DOM }
