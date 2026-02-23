/*
Problem link : https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation
------------------------------------------------------------------------------------
Description: 762. Prime Number of Set Bits in Binary Representation

Given two integers left and right, return the count of numbers in the inclusive range [left, right] having a prime number of set bits in their binary representation.

Recall that the number of set bits an integer has is the number of 1's present when written in binary.

    For example, 21 written in binary is 10101, which has 3 set bits.

------------------------------------------------------------------------------------
Example:

Example 1:

Input: left = 6, right = 10
Output: 4
Explanation:
6  -> 110 (2 set bits, 2 is prime)
7  -> 111 (3 set bits, 3 is prime)
8  -> 1000 (1 set bit, 1 is not prime)
9  -> 1001 (2 set bits, 2 is prime)
10 -> 1010 (2 set bits, 2 is prime)
4 numbers have a prime number of set bits.

Example 2:

Input: left = 10, right = 15
Output: 5
Explanation:
10 -> 1010 (2 set bits, 2 is prime)
11 -> 1011 (3 set bits, 3 is prime)
12 -> 1100 (2 set bits, 2 is prime)
13 -> 1101 (3 set bits, 3 is prime)
14 -> 1110 (3 set bits, 3 is prime)
15 -> 1111 (4 set bits, 4 is not prime)
5 numbers have a prime number of set bits.



------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:


    1 <= left <= right <= 106
    0 <= right - left <= 104

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity:  D = R - L : no of integers ; counting bits is log(N): so O(DLogD)
 Space Complexity: O(1)
 Notes: 
 */
var countPrimeSetBits = function(left, right) {
    var count = 0
    const primes = new Set([2,3,5,7,11,13,17,19]) // 2^20 > 10^6 : so at most we need 20 bits to represent the numbers
    for(let i = left ; i<= right;i++) {
      const bits = countSetBits(i)
      if (primes.has(bits)) count++
    }
    return count
};

//## Brian Kernighan's algorithm (count number of bits set)
const countSetBits = (n) => {
    let count = 0;
    while (n) {
        n = n & (n - 1); // clears the last significant bit  and 
        count++;
    }
    return count;
}
// Driver code
 

var main = function () {
  const fn = countPrimeSetBits
  const input = [
    [6, 10],
    [10, 15]
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