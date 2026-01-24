/*
Problem link : https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii
------------------------------------------------------------------------------------
Description:  3315. Construct the Minimum Bitwise Array II

You are given an array nums consisting of n integers.

You need to construct an array ans of length n, such that, for each index i, the bitwise OR of ans[i] and ans[i] + 1 is equal to nums[i], i.e. ans[i] OR (ans[i] + 1) == nums[i].

Additionally, you must minimize each value of ans[i] in the resulting array.

If it is not possible to find such a value for ans[i] that satisfies the condition, then set ans[i] = -1.
------------------------------------------------------------------------------------
Example:

Example 1:

Input: nums = [2,3,5,7]

Output: [-1,1,4,3]

Explanation:

    For i = 0, as there is no value for ans[0] that satisfies ans[0] OR (ans[0] + 1) = 2, so ans[0] = -1.
    For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 3 is 1, because 1 OR (1 + 1) = 3.
    For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 5 is 4, because 4 OR (4 + 1) = 5.
    For i = 3, the smallest ans[3] that satisfies ans[3] OR (ans[3] + 1) = 7 is 3, because 3 OR (3 + 1) = 7.

Example 2:

Input: nums = [11,13,31]

Output: [9,12,15]

Explanation:

    For i = 0, the smallest ans[0] that satisfies ans[0] OR (ans[0] + 1) = 11 is 9, because 9 OR (9 + 1) = 11.
    For i = 1, the smallest ans[1] that satisfies ans[1] OR (ans[1] + 1) = 13 is 12, because 12 OR (12 + 1) = 13.
    For i = 2, the smallest ans[2] that satisfies ans[2] OR (ans[2] + 1) = 31 is 15, because 15 OR (15 + 1) = 31.


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var minBitwiseArray = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        let x = nums[i];
        let res = -1;
        let d = 1;
        while ((x & d) !== 0) { // run until we encounter a bit set to zero
            res = x - d;
            d <<= 1;
        }
        nums[i] = res;
    }
    return nums;
};
// Driver code
 

var main = function () {
  const fn = minBitwiseArray
  const input = [
    [2,3,5,7],
    [11,13,31]
  ]
  const expected = [
    [-1,1,4,3],
    [9,12,15]
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