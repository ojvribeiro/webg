import { State } from './states.js';


const Physics = {

  velocity: function(angle, speed) {
    return {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed
    }
  },
  
  /**
   * Normalizes the diagonal speed
   */
  speed: {
    normalize: function() {
      if ( 
        State.keyMap.up && State.keyMap.left    ||
        State.keyMap.up && State.keyMap.right   ||
        State.keyMap.down && State.keyMap.left  ||
        State.keyMap.down && State.keyMap.right
      ) {
        return State.player.speed * 0.707;
      }
      else if (State.keyMap.shift) return State.player.speed * 1;
      else return State.player.speed * 1;
    }
  }
}

export { Physics };
