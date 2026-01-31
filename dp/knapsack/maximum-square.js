/**
https://leetcode.com/problems/maximal-square/
Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.
*/
const maximalSquare = function (matrix) {
  /*
    R = no of rows
    C = no of columns
    Time Complexity = O(R*C)
    Space Complexity = O(R*C) // which can be reduced to O(R) by using 1D array for solving the DP
  */
  const rows = matrix.length
  const columns = matrix[0].length
  const dp = [...Array(rows + 1)].map(() => Array(columns + 1).fill(0))
  let largestSide = 0
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = columns - 1; c >= 0; c--) {
      if (parseInt(matrix[r][c]) === 1) {
        const right = parseInt(dp[r][c + 1])
        const bottom = parseInt(dp[r + 1][c])
        const diagonal = parseInt(dp[r + 1][c + 1])
        dp[r][c] = 1 + Math.min(right, bottom, diagonal)
        if (largestSide < dp[r][c]) {
          largestSide = dp[r][c]
        }
      }
    }
  }
  return (largestSide * largestSide)
}

// Driver code
const main = function () {
  const input1 = [['1', '0', '1', '0', '0'], ['1', '0', '1', '1', '1'], ['1', '1', '1', '1', '1'], ['1', '0', '0', '1', '0']]
  const input2 = [['0', '1'], ['1', '0']]
  const input3 = [['0']]
  const input = [
    input1,
    input2,
    input3
  ]
  const expectedOutput = [4, 1, 0]

  /**
   *  Fill the time complexity for each function
   */

  for (let i = 0; i < input.length; i++) {
    console.log(i + 1 + '.\t Input array:', input[i])
    const result = maximalSquare(input[i])
    console.log('\t Result is',
      result)
    console.log('-'.repeat(100))
  }
}

main()
