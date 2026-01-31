/**
https://leetcode.com/problems/last-stone-weight-ii/description/

You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose any two stones and smash them together. Suppose the stones have weights x and y with x <= y.
 The result of this smash is:

    If x == y, both stones are destroyed, and
    If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left.

Return the smallest possible weight of the left stone. If there are no stones left, return 0.
*/

/**
Solution : https://leetcode.com/problems/last-stone-weight-ii/solutions/7441470/2approch-dp-memoisation-tabulation-by-ag-2nhn/

 */
const dfs = (index, total, target, dp, stones, totalSum) => {
  // base case
  if ((total >= target) || index == stones.length) {
    // return the difference between both knapsack
    return Math.abs(total - (totalSum - total))
  }
  if (dp.has(`${index}-${total}`)) return dp.get(`${index}-${total}`)

  // we either include the stone or not for the index and accordingly increse the current total
  const include = dfs(index + 1, total + stones[index], target, dp, stones, totalSum)
  const exclude = dfs(index + 1, total, target, dp, stones, totalSum)
  const currentMin = Math.min(include, exclude)
  dp.set(`${index}-${total}`, currentMin)
  return dp.get(`${index}-${total}`, currentMin)
}

/**
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeightII = function (stones) {
  /**
    Intution: think about the problem as creating two piles of knapsack , now the problem becomes what to fill in these so that the
    difference is minimal.
    There are some scenarios
    1. we are able to create the knpsack with equal value , so no stones are left and we return 0
    2. we are left withon 1 stone and that would be minimum , when we generate all the combination

    Two ways to proceed from here either we want to compute only one pile and the value for next pile would be total of all stones - current pile
    So we want to create a pile whoes value is close to the (total-weight/2)
    lets now try to implemnt the resursion for the same
  */
  let totalSum = 0
  const dp = new Map()
  stones.forEach(stone => totalSum += stone)
  const target = Math.ceil(totalSum / 2) // we want ceiling case in case of odd number so that we do not miss the value
  const result = dfs(0, 0, target, dp, stones, totalSum)
  return result
}

// Driver code
const main = function () {
  const fn = lastStoneWeightII
  const input = [
    [2, 7, 4, 1, 8, 1],
    [31, 26, 33, 21, 40]
  ]
  const expectedOutput = [1, 5]
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
