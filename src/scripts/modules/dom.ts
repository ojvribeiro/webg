const doc = document

interface IDom {
  canvas: HTMLCanvasElement | null
  keysPressed: HTMLElement | null
  playerSpeed: HTMLElement | null
  playerPosition: HTMLElement | null
  mousePosition: {
    x: number | null
    y: number | null
  }
}

const DOM: IDom = {
  canvas: doc.getElementById('canvas') as HTMLCanvasElement | null,
  keysPressed: doc.getElementById('keys'),
  playerSpeed: doc.getElementById('speed'),
  playerPosition: doc.getElementById('player-pos'),
  mousePosition: {
    x: null,
    y: null,
  },
}

export { DOM }
