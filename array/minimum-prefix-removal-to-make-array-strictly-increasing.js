/*
Problem link : https://leetcode.com/problems/minimum-prefix-removal-to-make-array-strictly-increasing
------------------------------------------------------------------------------------
Description: 3818. Minimum Prefix Removal to Make Array Strictly Increasing

You are given an integer array nums.

You need to remove exactly one prefix (possibly empty) from nums.

Return an integer denoting the minimum length of the removed prefix such that the remaining array is Strictly Increasing

------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [1,-1,2,3,3,4,5]

Output: 4

Explanation:

Removing the prefix = [1, -1, 2, 3] leaves the remaining array [3, 4, 5] which is strictly increasing.

Example 2:

Input: nums = [4,3,-2,-5]

Output: 3

Explanation:

Removing the prefix = [4, 3, -2] leaves the remaining array [-5] which is strictly increasing.

Example 3:

Input: nums = [1,2,3,4]

Output: 0

Explanation:

The array nums = [1, 2, 3, 4] is already strictly increasing so removing an empty prefix is sufficient.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= nums.length <= 105
-10^9 <= nums[i] <= 10^9
------------------------------------------------------------------------------------

*/

/**
 Intuition:  simply find the last occurrence of the condition where arr[i] > arr[i+1] moving from right ot left
  or if moving from right to left find the first occurrence arr[i-1] > arr[i+1]
 Time Complexity:
 Space Complexity:
 Notes:
 */
const minimumPrefixLength = function (nums) {
  let lastIndex = 0

  for (let i = 0; i < nums.length - 1; i++) {
    const current = nums[i]
    const next = nums[i + 1]
    if (current >= next) {
      lastIndex = i + 1
    }
  }
  return lastIndex
}
// Driver code

const main = function () {
  const fn = minimumPrefixLength
  const input = [
    [1, -1, 2, 3, 3, 4, 5],
    [4, 3, -2, -5],
    [1, 2, 3, 4]
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
