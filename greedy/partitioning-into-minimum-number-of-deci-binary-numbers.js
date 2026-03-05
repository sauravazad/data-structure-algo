/*
Problem link : https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers
------------------------------------------------------------------------------------
Description: 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.

Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: n = "32"
Output: 3
Explanation: 10 + 11 + 11 = 32

Example 2:

Input: n = "82734"
Output: 8

Example 3:

Input: n = "27346209830709182346"
Output: 9

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= n.length <= 105
n consists of only digits.
n does not contain any leading zeros and represents a positive integer

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  Deci-Binary : has only 1 or 0
 So let's say number 3761

    1111
    Note that we already have 1 at the last position, so from now on we can add only 0 to it
    1110
    1110
    Note that the first position already contains 3, so from now on we can add only 0 to it
    0110
    0110
    0110
    Note that the second to the end position already contains 6, so from now on we can add only 0 to it
    0100
    Note that at the second position we already have 7 and it was the last digit that didn't have its original value until this step, so we can stop.
  So the observation is that you can simply solve for each character and get the max 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var minPartitions = function(n) {
    let max = 0
    for (let i = 0; i < n.length; i++) {
      max = Math.max(parseInt(n[i]), max)
    }
    return max
};

// Driver code
 

var main = function () {
  const fn = minPartitions
  const input = [
    "32",
    "82734",
    "27346209830709182346"
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