/**
https://leetcode.com/problems/minimum-falling-path-sum/

Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.

A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right. 
Specifically, the next element from position (row, col) will be (row + 1, col - 1), (row + 1, col), or (row + 1, col + 1).
 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}
const minFallingPathSumRec = (matrix, row, col, dp) => {
    console.info(`checking index dp: ${row}${col}`, dp)
// base case if we go beyond the matrix bound return 0
    if( col == matrix.length || col <0  ) return Infinity
    // if we have reached the last row stop and return the value 
    if(row === matrix.length -1) return matrix[row][col]
    //// check if the results are calculated before
    if(dp[row][col] !== 0) {
        return dp[row][col]
    }
    // get the minimum of row+1 , col, col+ 1, col -1 and add to the current positions value
    // ie: i= 0; j = 0; result = matrix[0][0] + Math.min(minFallingPathSumRec(matrix, 1, j-1))
    const result = matrix[row][col]
    const min = Math.min(
    minFallingPathSumRec(matrix, row + 1, col, dp),
    minFallingPathSumRec(matrix, row + 1, col - 1, dp),
    minFallingPathSumRec(matrix, row + 1, col + 1, dp))
    console.info(`result[${row}][${col}]: ${result}, min([${row+1}, ${col}], [${row+1}, ${col -1 }], [${row+1}, ${col+ 1}]):${min}`)
    dp[row][col] = result + min
    return dp[row][col]

}

const minFallingPathSumTab = (matrix) => {
    const dp = [...Array(matrix.length+ 1)].map(() => Array(matrix[0].length + 1).fill(0))
    /**
      We can either follow 
      1. bottom up approach similar to recursive problem 
        - in order to solve the problem we need the solution for the next step. 
        - so Identify the smallest problem , ie : if you look at the tree representation it would be leaf node 
        - So we iterate in reverse order from last row to 0th row , as we know the solution for last row
        ie: Min(dp[row+1][col], dp[row+1][col- 1], dp[row+1][col+ 1]) + dp[row][col]
      2. top down aporach
        - in order to solve the problem we need the solution for the previous step. 
        - identify the smallest problem , ie: begening of the tree , where we know the current solution eg : start node as other nodes above it are non existent
        - so we iterate from first row to nth row but the condition of comaprision would be different
        ie: Min(dp[row-1][col], dp[row-1][col- 1], dp[row-1][col+ 1]) + dp[row][col]
     */

    // bottom-up
    // iterate the row from n to 0
    for (let row = matrix.length -1; row>=0; row--) {
        for(let col = 0 ; col < matrix[0].length; col++) {
            // handle the edge cases of reaching boundary or exceeding it
            if(col === 0) {
                // dp[row + 1][col -1] : would result in negative index so remove
                dp[row][col] = Math.min(dp[row + 1][col], dp[row + 1][col + 1]) + matrix[row][col]
            }
            else if(col === matrix[0].length -1) {
                // dp[row + 1][col + 1]: would result in exceeding the column, so remove it
                dp[row][col] = Math.min(dp[row + 1][col], dp[row + 1][col -1]) + matrix[row][col]

            } else  {
                dp[row][col] = Math.min(dp[row + 1][col], dp[row + 1][col -1], dp[row + 1][col + 1]) + matrix[row][col]
            }
            
        
        }
    }
    // print2DMatrix(dp)
    // we have build the solution for every column start position
    // run a loop to find the minimum amongst the column start
    let min = Infinity
    for(let i = 0 ; i < matrix[0].length; i++) {
       min = Math.min(min, dp[0][i])
    }
    return min
}

const minFallingPathSumTabTopDown = (matrix) => {
    const dp = [...Array(matrix.length + 1)].map(() => Array(matrix[0].length+ 1).fill(0))
    // topdown
    // iterate from 0 to n for row
    for(let row = 1; row < matrix.length; row++) {
        for(let col = 0; col < matrix[0].length; col++) {
            if(col === 0) {
                //  dp[row-1][col -1] : would result in negative col so remove it.
                dp[row][col] = Math.min(dp[row-1][col], dp[row-1][col + 1]) + matrix [row][col]
            }
            else if(col === matrix[0].length -1) {
                // dp[row-1][col + 1]: would rsult in exceeding the bound of col , so remove it.
                dp[row][col] = Math.min(dp[row-1][col], dp[row-1][col -1]) + matrix [row][col]
            }
            else {
                dp[row][col] = Math.min(dp[row-1][col], dp[row-1][col + 1], dp[row-1][col -1]) + matrix [row][col]
            }
            
        }
    }
    // iterate through each colum and get the min .
    let min = Infinity
    const lastRow = matrix.length - 1
    for(let i = 0 ; i < matrix[0].length; i++) {
        min = Math.min(dp[lastRow][i], min)
    }
    return min
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function(matrix) {
    let result = Infinity
    // const dp = [...Array(matrix.length)].map(() => Array(matrix[0].length).fill(0))
    // for(let startCol = 0; startCol < matrix[0].length; startCol++ ) {
        
    //  result = Math.min(result, minFallingPathSumRec(matrix, 0, startCol, dp))
    // }
    result = Math.min(result, minFallingPathSumTab(matrix))
    return result
};




// Driver code
var main = function () {
  const fn = minFallingPathSum
  const input = [
    [[2,1,3],[6,5,4],[7,8,9]],
    [[-19,57],[-40,-5]]
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