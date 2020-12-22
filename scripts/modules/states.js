import { DOM } from './dom.js';
import { Config } from '../config.js';

DOM.canvas.width = window.innerWidth;
DOM.canvas.height = window.innerHeight;

// These defaults are automatically updated
let State = {
  player: {
    x: DOM.canvas.width / 2,
    y: DOM.canvas.height / 2,
    speed: 0,
    facing: 'down',
    currentRowIndex: 0,
    sprites: Config.player.SPRITE_SHEET_PATH,
  },

  keyMap: {
    up: false,
    down: false,
    left: false,
    right: false,
    shift: false,

    array: []
  },

  projectiles: []
}


export { State };
