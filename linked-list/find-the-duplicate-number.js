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
 Intuition: 
 Visualizing the Array as a Linked List (Approach 7)
Core Insight

Treat the array indices and values as a directed graph where each element points to another index:

    Index i → Value nums[i] → Next index to visit

This creates a linked list structure where:

    Each node = array index
    Each pointer = value at that index
    The duplicate number creates a cycle in this linked list
Example: nums = [1, 3, 4, 2, 2]

(n=4, indices 0-4, duplicate is 2)

1. Build the "linked list" by following index → nums[index]:

Start at index 0:
0 → nums[0]=1 → nums[1]=3 → nums[3]=2 → nums[2]=4 → nums[4]=2 → nums[2]=4 → ...
2. Draw it as nodes and pointers:
Index:   0   →   1   →   3   →   2   →   4
         ↓       ↓       ↓       ↓       ↓
Value:   1       3       2       4       2
                                      ↖___↙
                                        Cycle!
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    // Phase 1: Find the intersection point inside the cycle
    // Tortoise moves 1 step, hare moves 2 steps
    let tortoise = nums[0];
    let hare = nums[0];
    
    // Move until they meet inside the cycle
    do {
        tortoise = nums[tortoise];        // 1 step
        hare = nums[nums[hare]];          // 2 steps
    } while (tortoise !== hare);
    
    // Phase 2: Find the cycle entrance (duplicate number)
    // Reset tortoise to start, move both at same speed
    tortoise = nums[0];
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }
    
    // Meeting point is the duplicate number
    return tortoise;
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