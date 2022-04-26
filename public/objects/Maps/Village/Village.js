import { Objects } from './Objects.js'
import { Render } from '../../../scripts/modules/render.js'
import { Config } from '../../../scripts/config.js'
import { SpriteAnimation } from '../../../scripts/modules/sprites.js'


const __dir = Config.root + '/sprites/Maps/Village/'

class Village {
  constructor() {
    this.objects = Objects
  }

  render(props) {
    Render.image({
      image: __dir + props.sprite.image,
      clipX: 0,
      clipY: 0,
      clipWidth: props.sprite.clipWidth,
      clipHeight: props.sprite.height,
      x: props.sprite.x,
      y: props.y - props.sprite.height + props.height + 10,
      width: props.sprite.width,
      height: props.sprite.height,
    })
  }
}


export { Village }