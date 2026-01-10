/**
 * https://leetcode.com/problems/grid-game/
 */

const prefixSum = (input) => {
  const prefixSum = []
  let sum =0
  for(let i=0; i < input.length; i++) {
      sum+=input[i]
      prefixSum.push(sum)
  }
  return prefixSum
}
const gridGame = (grid) => {
  const N = grid[0].length
  const prefix0 = prefixSum(grid[0])
  const prefix1 = prefixSum(grid[1])
  let res = Infinity
  for(let i=0; i <N; i++) {
      const second0 = prefix0[N-1] - prefix0[i]
      const second1 = prefix1[i -1] || 0
      const second = Math.max(second0, second1)
      res = Math.min(res, second)
  }
  return res
}

// Driver code
var main = function () {
  const input = [
    [[2,5,4],[1,5,1]],
    [[3,3,1],[8,5,2]]
  ]
  /**
   *  Fill the time complexity for each function
   */
  const fn = gridGame
  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();