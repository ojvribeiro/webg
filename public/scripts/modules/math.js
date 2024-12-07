// @ts-check
let Calc = {
  /**
   * Rounds a number in a more efficient way than Math.round().
   * @param {number} number
   * @returns
   */
  round: (number) => {
    let rounded

    rounded = (0.5 + number) | 0
    rounded = ~~(0.5 + number)
    rounded = (0.5 + number) << 0

    return rounded
  },
}

export { Calc }
