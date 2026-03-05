/*
Problem link : https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array
------------------------------------------------------------------------------------
Description: 34. Find First and Last Position of Element in Sorted Array

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:

Input: nums = [], target = 0
Output: [-1,-1]

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
    nums is a non-decreasing array.
    -109 <= target <= 109

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var searchRange = function(nums, target) {
    const first = findFirst(nums, target)
    const last = findLast(nums, target)
    return [first, last]
};

const findFirst = (nums, target) => {
  let lo = 0
  let hi = nums.length -1
  
  while(lo < hi) {
    const mid = lo + Math.floor((hi - lo) /2) // we are trying to find the lower bound
    if(nums[mid] < target) {
      lo = mid + 1
    } else  {
      hi = mid
    }
  }
  return nums[lo] == target ? lo   : -1
}


const findLast = (nums, target) => {
  let lo = 0
  let hi = nums.length -1
  while(lo < hi) {
    const mid = lo + Math.floor((hi - lo + 1)/ 2) // we are trying to find the upper bound
    if(nums[mid] > target) {
      hi = mid - 1
    } else {
      lo = mid
    }
  }
  return nums[lo] == target ? lo : -1
}
// Driver code
 

var main = function () {
  const fn = searchRange
  const input = [
    [[5,7,7,8,8,10], 8],
    [[5,7,7,8,8,10], 6],
    [[], 0]
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