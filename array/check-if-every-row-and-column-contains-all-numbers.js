/*
Problem link : https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers
------------------------------------------------------------------------------------
Description: 
2133. Check if Every Row and Column Contains All Numbers
An n x n matrix is valid if every row and every column contains all the integers from 1 to n (inclusive).

Given an n x n integer matrix matrix, return true if the matrix is valid. Otherwise, return false.
------------------------------------------------------------------------------------
Example:
Example 1:

Input: matrix = [[1,2,3],[3,1,2],[2,3,1]]
Output: true
Explanation: In this case, n = 3, and every row and column contains the numbers 1, 2, and 3.
Hence, we return true.

Example 2:

Input: matrix = [[1,1,1],[1,2,3],[1,2,3]]
Output: false
Explanation: In this case, n = 3, but the first row and the first column do not contain the numbers 2 or 3.
Hence, we return false.

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:

    n == matrix.length == matrix[i].length
    1 <= n <= 100
    1 <= matrix[i][j] <= n

------------------------------------------------------------------------------------

*/

/**
 Intuition: 
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function(matrix) {
  const N = matrix.length
  
  // Check each row contains all numbers 1..N
  for(let row = 0 ; row < N ; row++) {
    const check = Array(N + 1).fill(0) // FIX: Reset for each row
    for(let col = 0 ; col < N; col++) {
      check[matrix[row][col]] = 1 // FIX: Mark presence
    }
    // FIX: Verify all numbers 1..N are present in this row
    for(let i = 1; i <= N; i++) {
      if(check[i] !== 1) return false
    }
  }
  
  // Check each column contains all numbers 1..N
  for(let col = 0 ; col < N ; col++) {
    const check = Array(N + 1).fill(0) // FIX: Reset for each column
    for(let row = 0 ; row < N; row++) {
      check[matrix[row][col]] = 1 // FIX: Mark presence
    }
    // FIX: Verify all numbers 1..N are present in this column
    for(let i = 1; i <= N; i++) {
      if(check[i] !== 1) return false
    }
  }
  
  return true // FIX: All rows and columns validated successfully
};
// Driver code
 

var main = function () {
  const fn = checkValid
  const input = [
    [[1,2,3],[3,1,2],[2,3,1]],
    [[1,1,1],[1,2,3],[1,2,3]],
    [[15,7,18,11,19,10,14,16,8,2,3,6,5,1,17,12,9,4,13],[17,15,9,8,11,13,7,6,5,1,3,16,12,19,10,2,4,14,18],[19,14,12,10,8,9,17,16,4,3,13,18,1,5,7,11,2,15,6],[4,2,10,15,19,16,8,9,5,3,1,11,13,14,6,18,12,17,7],[13,19,9,16,5,8,6,12,14,11,18,10,7,2,3,4,15,17,1],[4,7,18,11,17,16,5,12,10,1,15,13,14,6,19,2,3,9,8],[14,5,15,1,18,6,12,7,8,9,3,13,2,10,19,4,11,16,17],[10,3,1,8,14,19,11,18,15,13,9,12,16,17,7,4,5,2,6],[14,13,19,18,7,2,4,8,10,17,12,5,15,1,6,9,11,3,16],[19,8,10,18,16,12,11,17,4,9,7,2,5,13,15,3,6,1,14],[1,10,6,14,7,18,3,9,4,16,5,11,13,17,15,8,19,2,12],[13,10,5,16,1,19,17,3,9,11,7,8,12,6,4,2,14,15,18],[17,2,1,6,9,19,18,14,4,11,12,13,16,5,8,7,3,10,15],[1,4,10,5,13,6,18,11,3,2,15,14,16,12,17,19,8,9,7],[2,14,3,12,16,17,11,9,1,6,5,19,10,13,4,18,7,15,8],[15,9,8,18,14,13,4,12,5,17,6,1,11,16,19,3,7,2,10],[15,8,12,16,13,2,6,19,18,14,10,5,11,9,7,1,3,17,4],[15,6,17,7,5,3,1,9,19,12,10,11,16,14,18,8,2,13,4],[6,11,10,14,2,13,16,1,9,15,8,19,17,3,5,18,7,4,12]],
    [[1,1],[2,2]]
  ]

  const expect = [true, false, false]
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