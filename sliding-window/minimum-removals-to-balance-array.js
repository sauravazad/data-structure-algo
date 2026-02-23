/*
Problem link : https://leetcode.com/problems/minimum-removals-to-balance-array
------------------------------------------------------------------------------------
Description: 3634. Minimum Removals to Balance Array

You are given an integer array nums and an integer k.

An array is considered balanced if the value of its maximum element is at most k times the minimum element.

You may remove any number of elements from nums​​​​​​​ without making it empty.

Return the minimum number of elements to remove so that the remaining array is balanced.

Note: An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [2,1,5], k = 2

Output: 1

Explanation:

    Remove nums[2] = 5 to get nums = [2, 1].
    Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.

Example 2:

Input: nums = [1,6,2,9], k = 3

Output: 2

Explanation:

    Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
    Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.

Example 3:

Input: nums = [4,6], k = 2

Output: 0

Explanation:

    Since nums is already balanced as 6 <= 4 * 2, no elements need to be removed.


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    1 <= nums.length <= 105
    1 <= nums[i] <= 109
    1 <= k <= 105

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 sort the array in ascending order 
 use two pointer and move the right pointer until the condition is satisfied
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var minRemoval = function(nums, k) {
    const n = nums.length;
    nums.sort((a, b) => a - b);

    let ans = n;
    let right = 0;

    for (let left = 0; left < n; left++) {
        while (right < n && nums[right] <= nums[left] * k) {
            right++;
        }
        ans = Math.min(ans, n - (right - left));
    }

    return ans;
};
// Driver code
 

var main = function () {
  const fn = minRemoval
  const input = [
    [[2,1,5], 2],
    [[1,6,2,9], 3],
    [[4,6], 2]
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