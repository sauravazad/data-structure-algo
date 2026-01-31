/**
https://leetcode.com/problems/house-robber-ii/

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle.
That means the first house is the neighbor of the last one.
Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
*/

const rob = (houses) => {
  if (houses.length === 1) { return houses[0] }
  const memo = Array(houses.length - 1)
  const memo2 = Array(houses.length - 1)
  // base case fill the 1st
  memo[0] = houses[0]

  for (let i = 1; i < houses.length - 1; i++) {
    // for 2 , max(we can rob with 2 and 0 or we can rob 1)
    const robCurrent = houses[i] + (memo[i - 2] || 0)
    const doNotRobCurrent = memo[i - 1]
    memo[i] = Math.max(robCurrent, doNotRobCurrent)
  }

  const reversed = houses.toReversed()
  memo2[0] = reversed[0]
  for (let i = 1; i < reversed.length - 1; i++) {
    // for 2 , max(we can rob with 2 and 0 or we can rob 1)
    const robCurrent = reversed[i] + (memo2[i - 2] || 0)
    const doNotRobCurrent = memo2[i - 1]
    memo2[i] = Math.max(robCurrent, doNotRobCurrent)
  }
  return Math.max(memo[houses.length - 2], memo2[reversed.length - 2])
}

// Driver code
const main = function () {
  const input = [
    [0],
    [2, 3, 2],
    [2, 3, 2, 5]
    // [ 5, 2, 3, 2 ]
    // [1, 2, 3, 1],
    // [2, 7, 9, 3, 1],
  ]
  /**
	 *  Fill the time complexity for each function
	 */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = rob(input[i])
    console.log('\t Result is', result)
    console.log('-'.repeat(100))
  }
}

main()
