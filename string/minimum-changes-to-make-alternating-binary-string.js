/*
Problem link : https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string
------------------------------------------------------------------------------------
Description: 1758. Minimum Changes To Make Alternating Binary String

You are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.

Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.

Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= s.length <= 104
s[i] is either '0' or '1'.

------------------------------------------------------------------------------------

*/

/**
 Intuition:  count the changes between when teh string starts with 1 and when it starts with 0 , min one is the ans
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var minOperations = function(s) {
  let start0 = 0
  let start1 = 0

  for(let i = 0 ; i < s.length; i++) {
    // for start with zero
    // even are 0 and odd are 1
    if (i % 2 == 0) {
      if(s[i] != '0') {
        start0++
      } else {
        start1++
      }
      
    }
    if (i % 2 != 0) {
      if(s[i] != '1') {
        start0++
      } else {
        start1++
      }
    }
  }
  return Math.min(start0, start1)
};

// Driver code
 

var main = function () {
  const fn = minOperations
  const input = [
    "0100", "10", "1111"
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