/*
Problem link : https://leetcode.com/problems/binary-gap
------------------------------------------------------------------------------------
Description:  868. Binary Gap
Given a positive integer n, find and return the longest distance between any two adjacent 1's in the binary representation of n. 
If there are no two adjacent 1's, return 0.

Two 1's are adjacent if there are only 0's separating them (possibly no 0's).
 The distance between two 1's is the absolute difference between their bit positions. For example, the two 1's in "1001" have a distance of 3.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: n = 22
Output: 2
Explanation: 22 in binary is "10110".
The first adjacent pair of 1's is "10110" with a distance of 2.
The second adjacent pair of 1's is "10110" with a distance of 1.
The answer is the largest of these two distances, which is 2.
Note that "10110" is not a valid pair since there is a 1 separating the two 1's underlined.

Example 2:

Input: n = 8
Output: 0
Explanation: 8 in binary is "1000".
There are not any adjacent pairs of 1's in the binary representation of 8, so we return 0.

Example 3:

Input: n = 5
Output: 2
Explanation: 5 in binary is "101".

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= n <= 10^9

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function(n) {
    let last = undefined
    let ans = 0
    for(let i = 0 ; i <= 32; i++) {
      if((n>>i) & 1) {
      if (last !== undefined) {
        ans = Math.max(ans, i - last)
        last = i
      }
      }
    }
    return ans
};

// Driver code
 

var main = function () {
  const fn = binaryGap
  const input = [22,8,5]
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