/*
Problem link : https://leetcode.com/problems/binary-search
------------------------------------------------------------------------------------
Description: 704. Binary Search
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. 
If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= nums.length <= 104
    -104 < nums[i], target < 104
    All the integers in nums are unique.
    nums is sorted in ascending order.

------------------------------------------------------------------------------------

*/

/**
 Intuition: Using mid comparison with = to find an exact  match
 Time Complexity: O(log(N))
 Space Complexity: O(1)
 Notes: 
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let lo = 0
  let hi = nums.length -1
  
  while(lo <= hi) {
    const mid = hi - Math.floor((hi -lo) / 2)
    if(nums[mid] ==target) {
      return mid
    } 
    if(nums[mid] < target) {
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return -1
};

/**
 Intuition: Using lower bound to find the first occurrence
 Time Complexity: O(log(N))
 Space Complexity: O(1)
 Notes: 
 */
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
  const fn = findLast
  const input = [
    [[-1,0,3,5,9,9, 9,12], 9],
    [[-1,0,3,5,9,12], 2]
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