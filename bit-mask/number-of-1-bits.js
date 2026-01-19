/*
Problem link : https://leetcode.com/problems/number-of-1-bits/description/
------------------------------------------------------------------------------------
Description: 191. Number of 1 Bits

Given a positive integer n, write a function that returns the number of in its binary representation (also known as the Hamming weight).

------------------------------------------------------------------------------------
Example:
Example 1:

Input: n = 11

Output: 3

Explanation:

The input binary string 1011 has a total of three set bits.

Example 2:

Input: n = 128

Output: 1

Explanation:

The input binary string 10000000 has a total of one set bit.

Example 3:

Input: n = 2147483645

Output: 30

Explanation:

The input binary string 1111111111111111111111111111101 has a total of thirty set bits.


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
var hammingWeight = function(n) {
    let count = 0
    while(n) {
        if(n%2 == 1) count++
        n = parseInt(n / 2, 10)
    }
    return count
};

// Driver code
 

var main = function () {
  const fn = hammingWeight
  const input = [11, 28, 2147483645]
  const expectedOutput = [3, 1, 30]
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