/*
Problem link : https://leetcode.com/problems/first-missing-positive
------------------------------------------------------------------------------------
Description: 41. First Missing Positive
Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums.

You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

------------------------------------------------------------------------------------
Example:
 

Example 1:

Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.

Example 2:

Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.

Example 3:

Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= nums.length <= 105
    -231 <= nums[i] <= 231 - 1


------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Negative Marking:  Solve using cycle Sort
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  const N = nums.length
 
};
// Driver code
 

var main = function () {
  const fn = firstMissingPositive
  const input = [
    [1],
    [1,2,0],
    [3,4,-1,1],
    [7,8,9,11,12]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();