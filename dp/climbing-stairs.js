// https://leetcode.com/problems/climbing-stairs/description/
/**
70. Climbing Stairs
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

*/

const climb_Stairs = (step, target, dp) => {
  if (step > target) return 0 // overshot
  if (step == target) return 1
  if (dp[step] > 0) return dp[step]
  dp[step] = climb_Stairs(step + 1, target, dp) + climb_Stairs(step + 2, target, dp)
  return dp[step]
}
const climbStairs = function (n) {
  const memo = new Array(n + 1).fill(0)
  return climb_Stairs(0, n, memo)
}

// Driver code
const main = function () {
  const fn = climbStairs
  const input = [2, 3]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
