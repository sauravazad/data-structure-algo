/*
Problem link : https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
------------------------------------------------------------------------------------
Description: 167. Two Sum II - Input Array Is Sorted
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that
 they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

Example 2:

Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Example 3:

Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    2 <= numbers.length <= 3 * 104
    -1000 <= numbers[i] <= 1000
    numbers is sorted in non-decreasing order.
    -1000 <= target <= 1000
    The tests are generated such that there is exactly one solution.


------------------------------------------------------------------------------------

*/

/**
 Intuition:  First hint is to get to the right pointer at a point where left + right < target
 ie: if the if the sum if left and right > target move the right pointer , else move the left pointer;
 Essentially Binary search algorithm 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var twoSum = function(numbers, target) {
    let left = 0
    let right = numbers.length -1
    while(left < right) {
      const sum = numbers[left] + numbers[right]
      if(sum === target) {
        return [left+1, right+ 1]
      }
      else if(sum < target) {
        left++
      } else  {
        right--
      }
    }
     // In case there is no solution, return [-1, -1].
    return [-1, -1];
};
// Driver code
 

var main = function () {
  const fn = twoSum
  const input = [
    [[2,7,11,15],9],
    [[2,3,4], 6],
    [[-1, 0], -1]
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