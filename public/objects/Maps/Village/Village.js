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


    if (mapConfig.SHOW_OBJECT_INFO) {
      Render.text({
        text: `
          ${props.name}
          x: ${props.x}
          y: ${props.y}
        `,
        fontFamily: 'Arial, sans-serif',
        fontSize: '10px',
        color: 'lime',
        borderWidth: 1,
        borderColor: 'black',
        x: props.x + props.width,
        y: props.y + props.height + 5
      })
    }

    if (mapConfig.SHOW_COLLISION_BOX) {
      Render.box(props)
    }
  }
}


export { Village }
