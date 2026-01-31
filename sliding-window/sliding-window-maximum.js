/*
Problem link : https://leetcode.com/problems/sliding-window-maximum
------------------------------------------------------------------------------------
Description: You are given an array of integers nums, there is a sliding window of size k
which is moving from the very left of the array to the very right. You can only see the k numbers in the window.
Each time the sliding window moves right by one position.

Return the max sliding window.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:

Input: nums = [1], k = 1
Output: [1]

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
Constraints:

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    1 <= k <= nums.length

------------------------------------------------------------------------------------

*/

/**
 Intuition:
 Time Complexity:
 Space Complexity:
 Notes:
 */
const maxSlidingWindow = function (nums, k) {
  const maxArray = []
  let currentMax = Number.MIN_SAFE_INTEGER
  let left = 0

  for (let right = 0; right < nums.length; right++) {
    // keep track of current max while the window is not achieved
    if (right - left + 1 < k) {
      currentMax = Math.max(currentMax, nums[right])
    }
    // when window is achieved
    if (right - left + 1 == k) {
      currentMax = Math.max(currentMax, nums[right])
      maxArray.push(currentMax)
      // move the left
      /**
        the current max could be the current left most element in the window if so then recompute the max after
       */
      if (currentMax === nums[left]) {
        currentMax = Number.MIN_SAFE_INTEGER
        // re compute the current max
        for (let i = left + 1; i <= right; i++) {
          currentMax = Math.max(currentMax, nums[i])
        }
      }
      left++
    }
  }

  return maxArray
}

// Driver code

const main = function () {
  const fn = maxSlidingWindow
  const input = [
    [[1, 3, -1, -3, 5, 3, 6, 7], 3],
    [[1, -1], 1]
  ]
  const expected = [
    [3, 3, 5, 5, 6, 7]
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
