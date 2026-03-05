/*
Problem link : https://leetcode.com/problems/find-the-duplicate-number
------------------------------------------------------------------------------------
Description: 287. Find the Duplicate Number
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and using only constant extra space.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: nums = [1,3,4,2,2]
Output: 2

Example 2:

Input: nums = [3,1,3,4,2]
Output: 3

Example 3:

Input: nums = [3,3,3,3,3]
Output: 3


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= n <= 105
    nums.length == n + 1
    1 <= nums[i] <= n
    All the integers in nums appear only once except for precisely one integer which appears two or more times.

------------------------------------------------------------------------------------

*/

/**
 Intuition: This approach temporarily modifies individual elements and thus does not satisfy the problem constraints. However, this approach is intuitive and utilizes a technique that is useful to know
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var findDuplicate = function(nums) {
  // iterate over the number and mark the index value with its negative value 
  // if we see a negative value that means we have already see the  number
  let duplicate 
  for(let i = 0 ; i < nums.length; i++) {
    const value = Math.abs(nums[i])
    if(nums[value] < 0) {
      duplicate = value
      break
    }
    nums[value] = -nums[value]
  }
    return duplicate
};
// Driver code
 

var main = function () {
  const fn = findDuplicate
  const input = [
    [1,3,4,2,2],
    [3,1,3,4,2],
    [3,3,3,3,3]
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