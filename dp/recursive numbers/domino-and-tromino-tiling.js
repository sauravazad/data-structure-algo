/**
https://leetcode.com/problems/domino-and-tromino-tiling/
 */

/**
write the recurrence relation by filling the first element and then solve for base cases
*/
const numTilings = (n) => {
  const g = Array(n).fill(0)
  const f = Array(n).fill(0)
  // base cases
  f[1] = 1
  g[1] = 1

  f[2] = 2
  g[2] = 2

  for (let i = 3; i < n; i++) {
    f[i] = f[i - 1] + f[i - 2] + 2 * (g[i - 1])
    g[i] = g[i - 1] + f[i - 1]
  }
  return f[n]
}

// Driver code
const main = function () {
  const input = [3, 5]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = numTilings(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
