import { State } from './states.js';


const Physics = {

  collision: {
    rectRect: (rectA, rectB) => {
      // Get the vectors to check against
      const vectorX = (rectA.x + (rectA.width / 2)) - (rectB.x + (rectB.width / 2));
      const vectorY = (rectA.y + (rectA.height / 2)) - (rectB.y + (rectB.height / 2));

      // Half widths and half heights of the objects
      const ABMiddleHorizontal = (rectA.width / 2) + (rectB.width / 2);
      const ABMiddleVertical = (rectA.height / 2) + (rectB.height / 2);
    
      // If the x and y vector are less than the half width or half height,
      // They we must be inside the object, causing a collision
      if (Math.abs(vectorX) < ABMiddleHorizontal && Math.abs(vectorY) < ABMiddleVertical) {
        // Figures out on which side we are colliding (top, bottom, left, or right)
        const oX = ABMiddleHorizontal - Math.abs(vectorX);
        const oY = ABMiddleVertical - Math.abs(vectorY);

        if (oX >= oY) {
          if (vectorY > 0) {
            State.player.y += oY;
          }
          else {
            State.player.y -= oY;
          }
        }
        else {
          if (vectorX > 0) {
            State.player.x += oX;
          }
          else {
            State.player.x -= oX;
          }
        }
      }
    },
  },


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
