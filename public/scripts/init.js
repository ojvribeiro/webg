import { Config } from './config.js'
import { game } from './main.js'

(() => {
  let localDomain
  let found = false

  for (let i in Config.localDomain) {
    if (location.host === Config.localDomain[i]) {
      localDomain = Config.localDomain[i]
      found = true

      break
    }
  }

  if (!found) {
    return Config.protocol + Config.domain
  }
  else {
    if (localDomain.indexOf('gitpod.io') !== -1) {
      location.href = Config.protocol + localDomain + '/public'
    }
  }
})()


document.addEventListener('DOMContentLoaded', function () {
  game.init()
})


