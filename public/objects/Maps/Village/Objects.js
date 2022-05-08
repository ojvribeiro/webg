// @ts-check
import { Config } from '../../../scripts/config.js'


const __dir = Config.root
const filePath = `${__dir}/sprites/Maps/Village/`

const Objects = [
  {
    name: 'tree',
    isTangible: true,
    isBulletTangible: true,
    x: 335,
    y: 600,
    width: 80,
    height: 30,
    backgroundColor: 'transparent',
    borderColor: '#3cff00',
    sprite: {
      fileName: 'Tree_1.svg',
      x: 172,
      y: 120,
      width: 544,
      height: 520,
      clipWidth: 554,
      clipHeight: 520,
    },
  },

  {
    name: 'rock',
    isTangible: true,
    isBulletTangible: false,
    x: 200,
    y: 400,
    width: 53,
    height: 20,
    backgroundColor: 'transparent',
    borderColor: '#3cff00',
    sprite: {
      fileName: 'Rock_1.svg',
      x: 190,
      y: 380,
      width: 68,
      height: 45,
      clipWidth: 68,
      clipHeight: 50,
    },
  },

  {
    name: 'bush',
    isTangible: false,
    isBulletTangible: false,
    x: 220,
    y: 580,
    width: 80,
    height: 20,
    backgroundColor: 'transparent',
    borderColor: '#3cff00',
    sprite: {
      fileName: 'Bush_1.svg',
      x: 190,
      y: 530,
      width: 130,
      height: 100,
      clipWidth: 150,
      clipHeight: 100,
    },
  },
]


Objects.forEach(object => {
  object.sprite.image = new Image()
  object.sprite.image.src = filePath + object.sprite.fileName
})


export { Objects }
