/*
Problem link : https://leetcode.com/problems/number-of-steps-to-reduce-a-number-in-binary-representation-to-one
------------------------------------------------------------------------------------
Description: 1404. Number of Steps to Reduce a Number in Binary Representation to One
Given the binary representation of an integer as a string s, return the number of steps to reduce it to 1 under the following rules:

    If the current number is even, you have to divide it by 2.

    If the current number is odd, you have to add 1 to it.

It is guaranteed that you can always reach one for all test cases.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: s = "1101"
Output: 6
Explanation: "1101" corressponds to number 13 in their decimal representation.
Step 1) 13 is odd, add 1 and obtain 14. 
Step 2) 14 is even, divide by 2 and obtain 7.
Step 3) 7 is odd, add 1 and obtain 8.
Step 4) 8 is even, divide by 2 and obtain 4.  
Step 5) 4 is even, divide by 2 and obtain 2. 
Step 6) 2 is even, divide by 2 and obtain 1.  

Example 2:

Input: s = "10"
Output: 1
Explanation: "10" corresponds to number 2 in their decimal representation.
Step 1) 2 is even, divide by 2 and obtain 1.  

Example 3:

Input: s = "1"
Output: 0

 
------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    1 <= s.length <= 500
    s consists of characters '0' or '1'
    s[0] == '1'

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 counter = 0
 while n > 1
   iterate 
   check if the num is odd : add 1 
   else divide by 2
 Time Complexity: 
 Space Complexity:
 Notes:  The above solution will not work because Number cannot hold decimal equivalent of 2^500
 So we need to operate on string manually and track it
 */
/**
 * @param {string} s
 * @return {number}
 */
var numStepsInt = function(s) {
    let count = 0
    let num = parseInt(s, 2)
    while(num > 1) {
      // check if it is odd
      if (num & 1 == 1) {
        num += 1 
      } else  {
        num >>>= 1 
      }
      count++
    }
    return count
};


/**
 Intuition: 
  we have two operation available 
   1. convert to even by adding 1
   2. divide by 2

   so for even numbers we need only one operation division by 2 
   but for odd numbers we need two operations : convert to even by adding 1 and divide by 2 : also if there is any carry , forward

   Algo:
   operation = 0
   N = length of string
  carry = 0
   iterate from right to left
   for(let i = N; i>=0; i--) {
    if((s[i] + carry) % 2 == 1) { // odd number
      operation +=2
      carry =1
    } else  {
      operations + 1
    }
   }
 
 Time Complexity: O(N)
 Space Complexity: O(1)
 Notes: 
 */
/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function(s) {
    let operations = 0
    let carry = 0
    let N = s.length -1

    for(let i =N; i> 0; i--) { // s[0] is always 1 , so we iterate until s[1] and check if there is a carry
      if((parseInt(s[i]) + carry) % 2 === 1) {
        operations += 2
        carry = 1
      } else {
        operations +=1
      }
    }
    // When we reach the leftmost bit, if carry is 1, it means that we will have to add it to the bit at index 0 and then apply one operation to remove the last 0. Hence, we will return operations + carry
    return operations + carry
};

// Driver code
 

var main = function () {
  const fn = numSteps
  const input = [
    "1101",
    "10",
    "1",
    "1111011110000011100000110001011011110010111001010111110001"
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