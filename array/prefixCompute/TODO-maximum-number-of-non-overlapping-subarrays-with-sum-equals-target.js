/*
Problem link : https://leetcode.com/problems/maximum-number-of-non-overlapping-subarrays-with-sum-equals-target
------------------------------------------------------------------------------------
Description: 1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target

Given an array nums and an integer target, return the maximum number of non-empty non-overlapping subarrays
such that the sum of values in each subarray is equal to target.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,1,1,1,1], target = 2
Output: 2
Explanation: There are 2 non-overlapping subarrays [1,1,1,1,1] with sum equals to target(2).

Example 2:

Input: nums = [-1,3,5,1,4,2,-9], target = 6
Output: 2
Explanation: There are 3 subarrays with sum equal to 6.
([5,1], [4,2], [3,5,1,4,2,-9]) but only the first 2 are non-overlapping.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    0 <= target <= 106

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 Time Complexity:
 Space Complexity:
 Notes:
 */
const maxNonOverlapping = function (nums, target) {

}

// Driver code

const main = function () {
  const fn = maxNonOverlapping
  const input = [
    [[1, 1, 1, 1, 1], 2],
    [[-1, 3, 5, 1, 4, 2, -9], 6]
  ]
  expected = [2, 2]
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
