/*
Problem link : https://leetcode.com/problems/find-minimum-in-rotated-sorted-array
------------------------------------------------------------------------------------
Description: 153. Find Minimum in Rotated Sorted Array
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

    [4,5,6,7,0,1,2] if it was rotated 4 times.
    [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

 

------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:

Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:

Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
n == nums.length
1 <= n <= 5000
-5000 <= nums[i] <= 5000
All the integers of nums are unique.
nums is sorted and rotated between 1 and n times.
------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 original : [0,1,2,4,5,6,7]
 after rotations:  [4,5,6,7,0,1,2]

 Observation : the array can be split in two parts and it retains its original sorting order in those parts
 We have find the smallest number , so we will use lower bound in range pattern
 
  condition : if mid < right ==> smaller number lies to the left : move the right bound to left
    else if mid > right that means there is a rotated part on the right side  so we move the left bound ahead

 Time Complexity: O(log(N))
 Space Complexity: O(1)
 Notes: 
 */
var findMin = function(nums) {
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2)
    // if mid elem is small than right then shift right to mid else shift left to mid + 1
    if (nums[mid] < nums[right]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return nums[left]
    
};
// Driver code
 

var main = function () {
  const fn = findMin
  const input = [
    [3,4,5,1,2],
    [4,5,6,7,0,1,2],
    [11,13,15,17]
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