import { Config } from '../../../scripts/config.js'

const __dir = Config.root + '/sprites/Maps/Village/'

let Objects = [
  {
    name: 'arvore',
    x: 335,
    y: 600,
    width: 80,
    height: 30,
    backgroundColor: 'transparent',
    borderColor: '#3cff00',
    sprite: {
      image: 'Tree_1.svg',
      x: 80,
      y: 348,
      width: 544,
      height: 520,
      clipWidth: 554,
      clipHeight: 550,
    },
  },

  {
    name: 'rocha',
    x: 200,
    y: 400,
    width: 53,
    height: 20,
    backgroundColor: 'transparent',
    borderColor: '#3cff00',
    sprite: {
      image: 'Rock_1.svg',
      x: 190,
      y: 380,
      width: 68,
      height: 45,
      clipWidth: 68,
      clipHeight: 50,
    },
  },
]

Objects.forEach(function(el) {
  el.sprite.image = __dir + el.sprite.image
})


export { Objects }