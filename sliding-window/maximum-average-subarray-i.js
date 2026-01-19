/*
Problem link : https://leetcode.com/problems/maximum-average-subarray-i
------------------------------------------------------------------------------------
Description: 643. Maximum Average Subarray I

You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. 
Any answer with a calculation error less than 10-5 will be accepted.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

Example 2:

Input: nums = [5], k = 1
Output: 5.00000


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    n == nums.length
    1 <= k <= n <= 105
    -104 <= nums[i] <= 104


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var findMaxAverage = function(nums, k) {
  let left = 0
  let maxAvg = Number.MIN_SAFE_INTEGER
  let sum = 0
  for(let right = 0 ; right < nums.length; right++) {
    sum += nums[right]
    if(right - left + 1 == k) {
      // window fulfilled compare the average
      maxAvg = Math.max(maxAvg, sum/k)
      // remove the number left most sum
      sum-= nums[left]
      left++
    }
  }
  return maxAvg
};
// Driver code
 

var main = function () {
  const fn = findMaxAverage
  const input = [
    [[1,12,-5,-6,50,3], 4],
    [[5], 1],
    [[-1], 1]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();