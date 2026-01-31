/*
Problem link : https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/
------------------------------------------------------------------------------------
Description:

------------------------------------------------------------------------------------
Example:

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition:  the problem says the cards are arranged in a row , on every turn you can only pick from start or end .
 that means the if you have to pick k cards , it will always be left with a contiguous (n-k) cards on the table.
 If we choose i cards from the start (where i <= k) then we must choose k - i cards from the end.
 There are k different lengths the first array could be.

 This means we can select i cards from beginning and k-i from the end . The sum of these card needs to be maximized

  Since we are targeting sum of card values , we can use prefix sum.
  create two pre fixsum array
  - start to end
  - end to start

 Time Complexity: O(K)
 Space Complexity: O(K)
 Notes:
 */
const maxScore = function (cardPoints, k) {
  const n = cardPoints.length
  const frontSetOfCards = Array(k + 1).fill(0)
  const rearSetOfCards = Array(k + 1).fill(0)
  let maxScore = 0

  // compute the prefix sum
  for (let i = 0; i < k; i++) {
    frontSetOfCards[i + 1] = frontSetOfCards[i] + cardPoints[i]
    rearSetOfCards[i + 1] = rearSetOfCards[i + 1] + cardPoints[n - i - 1] // storing in reverse as we need the sum from the ith to end
  }
  // for each i get the sum of i front cards  and (rear to end) and maximize
  for (let i = 0; i < k; i++) {
    maxScore = Math.max(maxScore, frontSetOfCards[i] + rearSetOfCards[k - i])
  }
  return maxScore
}

// Driver code

const main = function () {
  const fn = maxScore
  const input = [
    [[100, 40, 17, 9, 73, 75], 3],
    [[1, 2, 3, 4, 5, 6, 1], 3],
    [[2, 2, 2], 2],
    [[9, 7, 7, 9, 7, 7, 9], 7]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array: \t', input[i])
    const result = fn(...input[i])
    console.log('\t Result is \t: ', result)
    console.log('-'.repeat(100))
  }
}

main()
