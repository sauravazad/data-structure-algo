const assert = require('node:assert');
/*
Problem link : https://leetcode.com/problems/minimum-window-substring
------------------------------------------------------------------------------------
Description: 76. Minimum Window Substring
Given two strings s and t of lengths m and n respectively, return the minimum window of s such 
that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.


------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    m == s.length
    n == t.length
    1 <= m, n <= 105
    s and t consist of uppercase and lowercase English letters.

------------------------------------------------------------------------------------

*/


/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var minWindow = function(s, t) {
    
};

// Driver code
 

var main = function () {
  const fn = minWindow
  const input = [
    ["ADOBECODEBANC", "ABC"],
    ["a", "a"],
    ["a", "aa"]
  ]
const expected = ["BANC", "a", ""]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is \t: ",result);
      // assert.deepStrictEqual(result, expected[i], 'Failed !')
      console.log("-".repeat(100));
  }
}

main();