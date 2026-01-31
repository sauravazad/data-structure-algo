/**
  https://leetcode.com/problems/last-stone-weight/description/

  You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together.
Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

    If x == y, both stones are destroyed, and
    If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.

At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.
 */

const lastStoneWeight = function (stones) {
  /**
     Intution: sort the stones array and pick the top two and smash and reinsert into the array
     repeat until the stones has only one element or is empty
     */
  const sorted = stones.sort((a, b) => a - b)
  console.log(`Stones: ${sorted}`)
  if (stones.length == 0) return 0
  if (stones.length == 1) return stones[0]

  const first = sorted.pop()
  const second = sorted.pop()
  const smash = Math.abs(first - second)
  console.log(`first: ${first}, second: ${second}`)
  if (smash > 0) sorted.push(smash)
  return lastStoneWeight(sorted)
}

// Driver code
const main = function () {
  const fn = lastStoneWeight
  const input = [
    [2, 7, 4, 1, 8, 1],
    [1],
    [8, 10, 4]
  ]
  const expectedOutput = [1, 1]
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
