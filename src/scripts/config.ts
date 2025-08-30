import { DOM } from './modules/dom'

const Config = {
  name: 'webg',
  domain: 'webg.vercel.app',
  localDomain: ['webg.test', '127.0.0.1:5500'],
  protocol: 'https://',
  localProtocol: 'http://',

  ctx: (DOM.canvas as HTMLCanvasElement | null)?.getContext('2d'),

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
      return this.protocol + this.domain
    }

    return this.localProtocol + currentDomain
  },

  projectiles: {
    /**
     * @property The projectile's size in pixels
     */
    SIZE: 3, // Projectile hitbox radius (default: 3)

    /**
     * @property The projectile's speed in pixels per frame
     */
    SPEED: 20, // Pixels per frame (default: 15)

    /**
     * @property The projectile's color
     */
    COLOR: '#fff',
  },
}

export { Config }
