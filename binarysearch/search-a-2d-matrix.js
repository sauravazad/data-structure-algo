/*
Problem link : https://leetcode.com/problems/search-a-2d-matrix
------------------------------------------------------------------------------------
Description: 74. Search a 2D Matrix
You are given an m x n integer matrix matrix with the following two properties:

    Each row is sorted in non-decreasing order.
    The first integer of each row is greater than the last integer of the previous row.

Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

------------------------------------------------------------------------------------
Example:
Example 1:

Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true

Example 2:

Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

------------------------------------------------------------------------------------
Input:

------------------------------------------------------------------------------------
Constraints:
m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
------------------------------------------------------------------------------------

*/

/**
 Intuition:  since the rows and its elements both are sorted , we can simply assume it as a single array of length m*n and execute binary search
 Think how to map from col  and row to array index  ?
 for any index m of an array 
  row = m // cols
  col = m % cols
 Time Complexity: 
 Space Complexity:
 Notes: 
 */
var searchMatrix = function(matrix, target) {
  const COLS = matrix[0].length
  const ROWS = matrix.length

  let lo = 0
  let hi = ROWS * COLS -1
  // exact match
  while(lo <= hi) {
    const mid = lo + Math.floor((hi - lo)/ 2)
    let row = Math.floor(mid/COLS)
    let col = mid % COLS
    if(matrix[row][col] == target) {
      return true
    } else if (target > matrix[row][col]) {
      lo = mid +1
    } else {
      hi = mid -1
    }
  }
  
  return false
};
// Driver code
 

var main = function () {
  const fn = searchMatrix
  const input = [
    [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3],
    [[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array: \t", input[i]);
      var result = fn(...input[i]);
      console.log("\t Result is \t: ",result);
      console.log("-".repeat(100));
  }
}

main();