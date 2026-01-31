/*
Problem link : https://leetcode.com/problems/minimum-cost-of-buying-candies-with-discount/
------------------------------------------------------------------------------------
Description: 2144. Minimum Cost of Buying Candies With Discount
A shop is selling candies at a discount. For every two candies sold, the shop gives a third candy for free.

The customer can choose any candy to take away for free as long as the cost of the chosen candy is less than or equal to the minimum cost of the two candies bought.

    For example, if there are 4 candies with costs 1, 2, 3, and 4, and the customer buys candies with costs 2 and 3, they can take the candy with cost 1 for free, but not the candy with cost 4.

Given a 0-indexed integer array cost, where cost[i] denotes the cost of the ith candy, return the minimum cost of buying all the candies.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: cost = [1,2,3]
Output: 5
Explanation: We buy the candies with costs 2 and 3, and take the candy with cost 1 for free.
The total cost of buying all candies is 2 + 3 = 5. This is the only way we can buy the candies.
Note that we cannot buy candies with costs 1 and 3, and then take the candy with cost 2 for free.
The cost of the free candy has to be less than or equal to the minimum cost of the purchased candies.

Example 2:

Input: cost = [6,5,7,9,2,2]
Output: 23
Explanation: The way in which we can get the minimum cost is described below:
- Buy candies with costs 9 and 7
- Take the candy with cost 6 for free
- We buy candies with costs 5 and 2
- Take the last remaining candy with cost 2 for free
Hence, the minimum cost to buy all candies is 9 + 7 + 5 + 2 = 23.

Example 3:

Input: cost = [5,5]
Output: 10
Explanation: Since there are only 2 candies, we buy both of them. There is not a third candy we can take for free.
Hence, the minimum cost to buy all candies is 5 + 5 = 10.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= cost.length <= 100
    1 <= cost[i] <= 100

------------------------------------------------------------------------------------

*/

/**
 Intuition: to get the max free on the third purchase , we should buy the two costliest items first , then we can request the third item for free to maximize
  sort the array
  add the cost of two consecutive items and skip the third item
 Time Complexity:
 Space Complexity:
 Notes:
 */
const minimumCost = function (cost) {
  const sorted = cost.sort((a, b) => b - a)
  console.info(sorted)
  let index = 0
  let totalCost = 0
  while (index < sorted.length) {
    const first = sorted[index] ?? 0
    const second = sorted[index + 1] ?? 0
    totalCost += first + second
    index += 3
  }
  return totalCost
}
// Driver code

const main = function () {
  const fn = minimumCost
  const input = [
    [1, 2, 3],
    [6, 5, 7, 9, 2, 2],
    [5, 5]
  ]
  const expected = [
    5, 23, 10
  ]
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
