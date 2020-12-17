
const config = {
  name: 'webg',
  
  get __DIR__() {
    return location.host === 'localhost' ? `${location.origin}/${this.name}` : location.origin;
  }
}

export const canvas = document.getElementById('canvas');
export const DOMKeys = document.getElementById('keys');
export const DOMSpeed = document.getElementById('speed');
export const ctx = canvas.getContext('2d');

export { config };
