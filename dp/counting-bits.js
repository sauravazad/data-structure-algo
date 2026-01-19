/*
Problem link : https://leetcode.com/problems/counting-bits/editorial/
------------------------------------------------------------------------------------
Description: 
Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), 
ans[i] is the number of 1's in the binary representation of i.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: n = 2
Output: [0,1,1]
Explanation:
0 --> 0
1 --> 1
2 --> 10

Example 2:

Input: n = 5
Output: [0,1,1,2,1,2]
Explanation:
0 --> 000
1 --> 001
2 --> 010
3 --> 011
4 --> 100
5 --> 101 
------------------------------------------------------------------------------------
Input: 0 <= n <= 105

------------------------------------------------------------------------------------
Constraints:

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
  carefully observe the bit pattern for every 2^x -1: when a new bit is required to represent the next set of number
  the next set exactly differs in only the most significant bit.
  ie: if 
  x = 1 1 bit can be used to represent two number ie: 0 and 1
    0 = 0
    1 = 1
  
    x= 2 using 2 bit we can further represent next 3 number ie: 2, 3
    2 = 10
    3 = 11

    Now if you notice  most significant bit has changed for both 2 and 3 from last 0,1 , So on every next bit required to represent the number 
    it is required to set 1 extra bit

     (x & x-1) we can right most set bit 
     ie: 
     2 & 1 = 0
     3 & 2 = 1 

     since we require one extra bit when moving up to next 2^x power add 1
     so to get the number of set bit 
     DP(x & x-1) + 1

 Time Complexity: O(N)
 Space Complexity: O(N)
 Notes: 
 */
var countBitsBitManipulation = function(n) {
  let result = Array(n+1).fill(0)
  for(let i = 1; i <= n; i++) {
    // get the right most set bits

    result[i] = result[(i & i - 1)] + 1
  }
  return result
    
};

var countBits = (n) => {
  /*
  Intuition: 
  carefully observe the bit pattern for every 2^x -1: when a new bit is required to represent the next set of number
  the next set exactly differs in only the most significant bit.
  ie: if 
  x = 1 1 bit can be used to represent two number ie: 0 and 1
    0 = 0
    1 = 1
  
    x= 2 using 2 bit we can further represent next 3 number ie: 2, 3
    2 = 10
    3 = 11
    
    So when ever we reach the next power of 2 we need to subtract that from the number to get the last substring 
  */

    var dp = Array(n+1).fill(0)
    var subString = 1 // or power of 2
    for(let i = 1; i <= n; i++) {
      if (subString * 2 == i) { // means it is an power of 2
        subString = i
      }
      dp[i] = dp[i -subString] + 1
    }

}
// Driver code
 

var main = function () {
  const fn = countBits
  const input = [2, 5, 7]
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