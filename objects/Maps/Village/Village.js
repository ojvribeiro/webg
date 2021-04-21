import { Render } from '../../../scripts/modules/render.js'

class Village {
  render(props) {
    Render.image({
      image: props.sprite.image,
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