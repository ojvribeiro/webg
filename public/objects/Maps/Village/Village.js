// @ts-check
import { Objects } from './Objects.js'
import { Render } from '../../../scripts/modules/render.js'
import { mapConfig } from './config.js'


class Village {
  constructor() {
    this.objects = Objects
  }

  render(props) {
    Render.image({
      image: props.sprite.image,
      clipX: 0,
      clipY: 0,
      clipWidth: props.sprite.clipWidth,
      clipHeight: props.sprite.height,
      x: props.sprite.x,
      y: props.sprite.y,
      width: props.sprite.width,
      height: props.sprite.height,
    })
  }
}


export { Village }
