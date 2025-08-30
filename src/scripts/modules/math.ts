let Calc = {
  /**
   * Rounds a number in a more efficient way than Math.round().
   * @param number - The number to round.
   * @returns The rounded number.
   */
  round: (number: number) => {
    let rounded: number

    rounded = (0.5 + number) | 0
    rounded = ~~(0.5 + number)
    rounded = (0.5 + number) << 0

    return rounded
  },
}

export { Calc }
