/*
Problem link : https://leetcode.com/problems/count-binary-substrings
------------------------------------------------------------------------------------
Description: 696. Count Binary Substrings
Given a binary string s, return the number of non-empty substrings that have the same number of 0's and 1's, 
and all the 0's and all the 1's in these substrings are grouped consecutively.

Substrings that occur multiple times are counted the number of times they occur.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: s = "00110011"
Output: 6
Explanation: There are 6 substrings that have equal number of consecutive 1's and 0's: "0011", "01", "1100", "10", "0011", and "01".
Notice that some of these substrings repeat and are counted the number of times they occur.
Also, "00110011" is not a valid substring because all the 0's (and 1's) are not grouped together.

Example 2:

Input: s = "10101"
Output: 4
Explanation: There are 4 substrings: "10", "01", "10", "01" that have equal number of consecutive 1's and 0's.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    1 <= s.length <= 105
    s[i] is either '0' or '1'.

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 refer to [Intuition](./count-binary-substrings.png)

 The valid substring forms for every 0---> 1 or 1--->0 transition
  From this boundary, we expand outward one pair at a time, matching symmetric pairs of contiguous block of 0s and 1s.

  When we hit another boundary/transition as we expand, the expansion stops.

  NOTE: As we observed, the number of balanced symmetric substrings is limited by each group's minimum contiguous (0 or 1) block length.
  Therefore, the final count of valid substrings is the total sum of each group's minimum.
 Time Complexity: 
 Space Complexity:
 Notes: 
  We can reduce the problem into counting consecutive elements.
  A valid substring exists as long as the current streak can be paired with characters from the previous streak.*
 */

  var countBinarySubstrings = function(s) {
    let streak = 1 // any character 0 or 1 will never have length 0 // to handle the initial start from 1
    let count = 0
    let previous = 0
    for(let i = 1; i < s.length; i++) {
      if(s[i] == s[i-1]) {
        streak++  // still the same group
                  // expand
      } else  {
        previous = streak // change of character , store the length
        streak = 1        // reset
      }
      // update the count
      if(streak <= previous) count++
    }
    return count
  };

// Driver code
 

var main = function () {
  const fn = countBinarySubstrings
  const input = [
    "00110011",
    "10101"
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