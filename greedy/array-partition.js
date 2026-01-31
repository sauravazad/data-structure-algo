/*
Problem link : https://leetcode.com/problems/array-partition
------------------------------------------------------------------------------------
Description: 561. Array Partition
Given an integer array nums of 2n integers, group these integers into n pairs (a1, b1), (a2, b2), ..., (an, bn) such that the sum of min(ai, bi) for all i is maximized. Return the maximized sum.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,4,3,2]
Output: 4
Explanation: All possible pairings (ignoring the ordering of elements) are:
1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
So the maximum possible sum is 4.

Example 2:

Input: nums = [6,2,6,5,1,2]
Output: 9
Explanation: The optimal pairing is (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= n <= 104
    nums.length == 2 * n
    -104 <= nums[i] <= 104

------------------------------------------------------------------------------------

*/

/**
 Intuition:
  Observe tat we need to maximize the  min values of a pair , How to do that ?
  one way to approach the problem is to think how can you ensure that you try to get the largest value picked when you pair elements
  ie: 1,2,3,4,5,6,8,7
  In order to get the maximum sum. we need to try and pair the closed elements together , so that we at least pick the a second largest value of a pair.
  Why would you that work ? ie: if you pair the number closed your average would go up as you are always trying to maximize the min(elem1, elem, 2)

 Time Complexity: sorting : O(NlogN) + loop: O(N) = O(NlogN)
 Space Complexity: LogN: if in pace sorting is used , else O(N)
 Notes:
 */
const arrayPairSum = function (nums) {
  /**
   - sort the array , so that it is easy to pair the closed element together
   - iterate through the elements and get the min and sum up toi get the final result
   */
  const sorted = nums.sort((a, b) => a - b)
  let maxSum = 0
  for (let i = 0; i < nums.length; i += 2) {
    maxSum += Math.min(nums[i], nums[i + 1])
  }
  return maxSum
}
// Driver code

const main = function () {
  const fn = arrayPairSum
  const input = [
    [1, 4, 3, 2],
    [6, 2, 6, 5, 1, 2]
  ]

  const expected = [4, 9]
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
