/*
Problem link : https://leetcode.com/problems/search-in-rotated-sorted-array
------------------------------------------------------------------------------------
Description: 33. Search in Rotated Sorted Array
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Example 3:

Input: nums = [1], target = 0
Output: -1

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0
  let right = nums.length - 1
  while(left <= right ) {
    let mid = Math.floor(left + (right - left) / 2)
    if(nums[mid] === target) {
      return mid
    } else if(nums[mid] >= nums[left]) {
      if(target >= nums[left] && target <= nums[mid]) {
        right = mid - 1
      } else  {
        left = mid + 1
      }
    } else {
      if(target >= nums[mid] && target <= nums[right] ) {
        left = mid + 1
      } else  {
        right = mid - 1
      }
    }
  }
  return -1
};

// Driver code
 

var main = function () {
  const fn = search
  const input = []
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