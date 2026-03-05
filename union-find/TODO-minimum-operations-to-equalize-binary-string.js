/*
Problem link : https://leetcode.com/problems/minimum-operations-to-equalize-binary-string
------------------------------------------------------------------------------------
Description: 3666. Minimum Operations to Equalize Binary String
You are given a binary string s, and an integer k.

In one operation, you must choose exactly k different indices and flip each '0' to '1' and each '1' to '0'.

Return the minimum number of operations required to make all characters in the string equal to '1'. If it is not possible, return -1.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "110", k = 1

Output: 1

Explanation:

    There is one '0' in s.
    Since k = 1, we can flip it directly in one operation.

Example 2:

Input: s = "0101", k = 3

Output: 2

Explanation:

One optimal set of operations choosing k = 3 indices in each operation is:

    Operation 1: Flip indices [0, 1, 3]. s changes from "0101" to "1000".
    Operation 2: Flip indices [1, 2, 3]. s changes from "1000" to "1111".

Thus, the minimum number of operations is 2.

Example 3:

Input: s = "101", k = 2

Output: -1

Explanation:

Since k = 2 and s has only one '0', it is impossible to flip exactly k indices to make all '1'. Hence, the answer is -1.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= s.length <= 10​​​​​​​5
s[i] is either '0' or '1'.
1 <= k <= s.length
------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minOperations = function(s, k) {
    
};

// Driver code
 

var main = function () {
  const fn = minOperations
  const input = []
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