// https://leetcode.com/problems/minimum-path-sum/description/

/**
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.
 */

const minPathSumRec = (grid, rightindex, downIndex, dp) => {
  // console.log("Solving for: -", rightindex, downIndex)
  if (rightindex >= grid.length || downIndex >= grid[0].length) return Infinity
  if (rightindex == grid.length - 1 && downIndex == grid[0].length - 1) return grid[rightindex][downIndex]
  if (dp[rightindex][downIndex] !== -Infinity) return dp[rightindex][downIndex]
  // increase the right index and down index and sum the cost at the position and return
  const costRight = minPathSumRec(grid, rightindex + 1, downIndex, dp)
  const costDown = minPathSumRec(grid, rightindex, downIndex + 1, dp)
  const min = grid[rightindex][downIndex] + Math.min(costRight, costDown)
  dp[rightindex][downIndex] = min
  // console.info(`cost at index: costRight(${rightindex + 1},${downIndex}) `, "is", costRight,`costDown(${rightindex},${downIndex + 1})` ,costDown, min)
  return dp[rightindex][downIndex]
}

const minCostBottomUp = (grid, dp) => {
  const m = grid.length
  const n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i == 0 && j == 0) continue // since there is no cost yet do nothing
      if (i > 0 && j > 0) {
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]) // if both i and j are greater than zero than take the minimum right(left) and down(up) draw to visualize  and add to cost of current position
        continue
      }
      if (i > 0) {
        grid[i][j] += grid[i - 1][j]
      }
      if (j > 0) {
        grid[i][j] += grid[i][j - 1]
      }
    }
  }
  return grid[m - 1][n - 1]
}

/**
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
  /* base case
        when we reach either the bottom/right boundary to reach right bottom the cost is zero and return
    */
  const dp = [...Array(grid.length + 1)].map(() => Array(grid[0].length + 1).fill(0))
  // return minPathSumRec(grid, 0, 0, dp)
  return minCostBottomUp(grid, dp)
}

const print2DMatrix = (matrix) => {
  const length = matrix[0].length - 1
  console.info('_____'.repeat(length))
  for (let i = 0; i < matrix.length; i++) {
    console.info('| ' + matrix[i].join(' | ') + ' |')
  }
  console.info('-----'.repeat(length))
}

function main () {
  const grids = [
    [[1, 3, 1], [1, 5, 1], [4, 2, 1]],
    [[1, 2, 3], [4, 5, 6]]
  ]
  for (let i = 0; i < grids.length; ++i) {
    console.log(i + 1 + '. Find the path with minimum cost for the: ')
    print2DMatrix(grids[i])
    console.log('-'.repeat(30))
    const minCost = minPathSum(grids[i])
    console.info('Cost is : ', minCost)
    console.log('-'.repeat(100))
    console.log()
  }
}

main()
