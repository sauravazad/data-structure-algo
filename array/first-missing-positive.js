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
 Negative Marking:  If it is guaranteed that there are number in a range ie: 1 - n , then we can use array index as a visited marker to identify if the number has been seen before to find duplicates or missing number
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
  let hasOne = false
  // 1. we do not care about negative number , zero or number greater than N, so lest mark then with 1
  // check for 1 as a boundary condition as we are using 1 as marker
  for(let i = 0; i < N; i++) {
    if(nums[i] == 1) hasOne = true
    if(nums[i] <= 0 || nums[i] > N) {
      nums[i] = 1
    }
  }
  console.log(nums)
  // if we have not seen 1 by now , we return 1
  if(hasOne == false) return 1
  
  // 2.  iterate through the numbers and mark the corresponding index with its negative value
  for(let i = 0; i < N; i++) {
     let value = Math.abs(nums[i]);
     if (value !== N) {
      nums[value] = -Math.abs(nums[value]);
     } else {
      nums[0] = -Math.abs(nums[0]);
     }
      
    
  }
  console.log(nums)
  // now all the present number index position will consist of a negative value, we can stop at the first positive value in the array , the index will be the minimum missing positive index
    for (let i = 1; i < N; i++) {
        if (nums[i] > 0) return i;
    }
    if (nums[0] > 0) return N;
    return N + 1;
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