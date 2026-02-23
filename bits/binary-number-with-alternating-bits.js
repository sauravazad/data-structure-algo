/*
Problem link : https://leetcode.com/problems/binary-number-with-alternating-bits
------------------------------------------------------------------------------------
Description:  693. Binary Number with Alternating Bits

Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.
------------------------------------------------------------------------------------
Example:

Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.

 

Example 1:

Input: n = 5
Output: true
Explanation: The binary representation of 5 is: 101

Example 2:

Input: n = 7
Output: false
Explanation: The binary representation of 7 is: 111.

Example 3:

Input: n = 11
Output: false
Explanation: The binary representation of 11 is: 1011.

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
1 <= n <= 231 - 1

------------------------------------------------------------------------------------

*/

/**
 Intuition:  we can get the last bit by module division and if the last operations last bit is equal to current last bit it doe snot has alternating bits 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function(n) {
    let current = n % 2
    n = parseInt(n / 2, 10)
    while(n) {
      // compare last bit to current last bit
      if(current == n %2) return false
      current = n %2
      n = parseInt(n /2, 10)
    }
    return true
};

// Driver code
 

var main = function () {
  const fn = hasAlternatingBits
  const input = [5, 7, 11]
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