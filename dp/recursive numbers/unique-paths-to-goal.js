/**
 * https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/description/
Given a robot located at the top-left corner of an m×n matrix,
determine the number of unique paths the robot can take from start to finish while avoiding all obstacles on the matrix.

The robot can only move either down or right at any time. The robot tries to reach the bottom-right corner of the matrix.

 */

const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}
const findUniquePathRec = (matrix, right, down) => {
  // we have reached either of the bounds of the matrix
  if(right>= matrix[0].length || down>= matrix.length) return 0
  // encountered an obstacle
  if(matrix[right][down] === 1) return 0
  // base cases we have reached the bottom
  if(down === matrix.length -1 &&  right=== matrix[0].length -1) return 1
  return findUniquePathRec(matrix, right +1 , down) + findUniquePathRec(matrix, right, down + 1)

}

const findUniquePathRecMemo = (matrix, rows, columns, right, down, dp) => {
  // base cases
  if(right >= columns || down >= rows) return 0
  if(matrix[down][right] === 1) return 0
  if(down === rows -1 && right === columns -1) return 1
  if(dp[down][right] === -1) {
    const result = findUniquePathRecMemo(matrix, rows, columns, right +1 , down, dp) + findUniquePathRecMemo(matrix, rows, columns, right, down +1 , dp)
    dp[down][right] = result
  }
  return dp[down][right]
}


const findUniquePathRecBottomUp = (matrix) => {
  const rows = matrix.length
  const columns = matrix[0].length
  if(matrix[0][0] === 1) return 0
  // Number of ways of reaching the starting cell = 1.
  matrix[0][0] = 1;

  // base case lets fill the 1 row
  const row = 0
  for(let c = 1;c < columns; c++) {
    // if previous cell is not 1 and current cell is zero that means we can pass through it we will set it to 1
    if(matrix[row][c] === 0 && matrix[row][c-1] === 1) {
      matrix[row][c] = 1
    } else  {
      matrix[row][c] = 0
    }
  }
  // base case lets fill the 1st column
  const column = 0
  for(let r = 1;r < rows; r++) {
    // if previous cell is not 1 and current cell is zero that means we can pass through it we will set it to 1
    if(matrix[r][column] === 0 && matrix[r-1][column] === 1) {
      matrix[r][column] = 1
    } else  {
      matrix[r][column] = 0
    }
  }

  for(let r =1; r< rows; r++) {
    for(let c= 1; c< columns; c++) {
      // path is blocked
      if(matrix[r][c] === 1) {
        matrix[r][c] = 0
      } else {
        matrix[r][c] = matrix[r-1][c] + matrix[r][c - 1]
      }
    }
  }
  // console.info(rows, columns)
  // print2DMatrix(matrix)
  return matrix[rows -1] [columns -1]
}
function findUniquePath(matrix){
  // write your code here
  // const result = findUniquePathRec(matrix, 0, 0)
  const columns = matrix[0].length
  const rows = matrix.length
  const dp = [...Array(rows)].map(() => Array(columns).fill(-1))
  const result = findUniquePathRecBottomUp(matrix, rows, columns, 0, 0, dp)
  // print2DMatrix(dp)
  return result;
}

// Driver code
var main = function () {
  const input = [
    [[0,1], [0,0]],
    [[0,0,0], [0,0,0], [0,0,0]],
    [[0,0,0], [0,1,0], [0,0,0]],
    [[0,0,0], [1,1,1], [0,0,0]],
    [[0,0,0,0],[1,0,1,0],[1,0,0,0],[0,1,0,0]]
    ];
    // You can uncomment the lines below and check how this recursive solution causes a time-out

    // input.push([[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = findUniquePath(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();