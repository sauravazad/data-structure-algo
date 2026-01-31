/*
Problem link : https://leetcode.com/problems/maximum-average-subarray-ii/
------------------------------------------------------------------------------------
Description:
You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is greater than or equal to k that has the maximum average value and return this value.
Any answer with a calculation error less than 10-5 will be accepted.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation:
- When the length is 4, averages are [0.5, 12.75, 10.5] and the maximum average is 12.75
- When the length is 5, averages are [10.4, 10.8] and the maximum average is 10.8
- When the length is 6, averages are [9.16667] and the maximum average is 9.16667
The maximum average is when we choose a subarray of length 4 (i.e., the sub array [12, -5, -6, 50]) which has the max average 12.75, so we return 12.75
Note that we do not consider the subarrays of length < 4.

Example 2:

Input: nums = [5], k = 1
Output: 5.00000

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 Time Complexity:
 Space Complexity:
 Notes:
 */
const findMaxAverage = function (nums, k) {

}

// Driver code

const main = function () {
  const fn = findMaxAverage
  const input = [
    [[1, 12, -5, -6, 50, 3], 4],
    [[5], 1]
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
