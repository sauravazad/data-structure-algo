/**
https://leetcode.com/problems/minimum-falling-path-sum-ii

Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from each row of grid such 
that no two elements chosen in adjacent rows are in the same column.
**/

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}

var minFallingPathSum = function(grid) {
    // solving using tabulation method , we will need an DP matrix with 1 more row to store the value
    const dp = [...Array(grid.length )].map(() => Array(grid[0].length).fill(0))
    /**
     Time complexity = N^3 // this can be further reduced by suing two min value intead of iterating over all the values
     space complexity = : N^2
     */
    /**
      To solve we need to think about the recursive silution with top down apporach , where the solution of the leaf node 
      will lead to solution of node above it
      DP[row][col] = min(dp[row+1][0], dp[row+1][1], dp[row+1][n]) + grid[row][col]
      Special condition is : we cannot slect the element from next row with same column index
      so for every row index , column index , find the min
      ie: iterate from rows n to 0
          for every column from 0 to n
            find the minimum element from next row where current column !== next column
      
     */

        // Fill the base case
        for (let col = 0; col < grid.length; col++) {
            dp[grid.length - 1][col] = grid[grid.length - 1][col];
        }

    for(let row = grid.length -2; row >=0; row-- ) {
        for(let col = 0; col< grid[0].length; col++) {
            let minNextRow = Infinity
            for(let nextCol = 0 ; nextCol < grid[0].length; nextCol ++) {
                // find the min of the lelemnt from the next row where column are not same
                // console.info(`computing for [${row+1}][${nextCol}]`)
                if (nextCol!== col) {
                    minNextRow = Math.min(minNextRow, dp[row+1][nextCol])
                }
            }
             // fill the DP
            dp[row][col] = grid[row][col] + minNextRow
            
        }
    }
    // iterate over the columns of first row and get the minimum
    let min = Infinity
    for(let i = 0; i < grid[0].length; i++) {
        min = Math.min(min, dp[0][i])
    }

    return min
    
};



// Driver code
var main = function () {
  const fn = minFallingPathSum
  const input = [
    [[1,2,3],[4,5,6],[7,8,9]],
    [[7]],
    [[-73,61,43,-48,-36],[3,30,27,57,10],[96,-76,84,59,-15],[5,-49,76,31,-7],[97,91,61,-46,67]] // -192
  ]
  const expectOutput = [13, 7, -192]
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