// @ts-check
import { DOM } from './modules/dom.js'


const Config = {
  name: 'webg',
  domain: 'webg.io',
  localDomain: ['webg.test'],
  protocol: 'https://',

  // @ts-ignore
  ctx: DOM.canvas.getContext('2d'),

  get root() {
    const currentDomain = location.host

    let found = false

    for (let i in this.localDomain) {
      if (location.host === this.localDomain[i]) {
        found = true

        break
      }
    }

    if (found === false) {
      if (currentDomain.indexOf('gitpod.io') !== -1) {
        return this.protocol + currentDomain
      }
      else {
        return this.protocol + this.domain
      }
    }
    else {
      return this.protocol + currentDomain + '/public'
    }
  },

  projectiles: {
    /**
      * @type {number} - The projectile's size in pixels
    */
    SIZE: 3, // Projectile hitbox radius (default: 3)

    /**
      * @type {number} - The projectile's speed in pixels per frame
    */
    SPEED: 20, // Pixels per frame (default: 15)

    /**
      * @type {string} - The projectile's color
    */
    COLOR: '#fff'
  },

}


export { Config }
