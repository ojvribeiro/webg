import { Config } from '../../scripts/config.js'

let Village = {
  mapSprite: Config.root + '/sprites/Maps/Village/Village.png',

  objects: [
    {
      name: 'tronco',
      x: 335,
      y: 425,
      width: 20,
      height: 25,
      backgroundColor: 'red',
      borderColor: '#3cff00'
    },

    {
      name: 'rocha',
      x: 130,
      y: 368,
      width: 25,
      height: 25,
      backgroundColor: 'blue',
      borderColor: '#3cff00'
    },

    {
      name: 'feno',
      x: 79,
      y: 297,
      width: 76,
      height: 50,
      backgroundColor: 'yellow',
      borderColor: '#3cff00'
    },

    {
      name: 'cerca',
      x: 0,
      y: 446,
      width: 120,
      height: 15,
      backgroundColor: 'brown',
      borderColor: '#3cff00'
    }
  ]
}


export { Village }