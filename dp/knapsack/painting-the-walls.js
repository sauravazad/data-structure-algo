// https://leetcode.com/problems/painting-the-walls

const  paintWalls = function(cost, time) {

  let solve = (idx, limit) => {
    // base case
    if(idx <= 0) return 0 // we have reached

    if(idx >= cost.length) return Infinity // we have exceeded the bound and cannot solve

    // recursion

    const paint = cost[idx] + solve(idx + 1, limit - 1 - time[idx]) // free worker can work in parallel with no cost
    const skip = solve(idx + 1)
    return Math.min(paint, skip)

  }
  return solve(0, cost.length)
}

// Driver code
var main = function () {
  const fn = paintWalls
  const input = [
    [[1,2,3,2], [1,2,3,2]],
    [[2,3,4,2], [1,1,1,1]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();