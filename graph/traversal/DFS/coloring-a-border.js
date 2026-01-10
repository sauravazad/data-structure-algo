/**
https://leetcode.com/problems/coloring-a-border

https://leetcode.com/problems/coloring-a-border/solutions/283262/java-python-3-bfs-and-dfs-codes-w-brief-explanation-and-analysis/
 */
const print2DMatrix = (matrix) => {
  const length = matrix[0].length -1
  console.info('_____'.repeat(length))
  for(let i = 0; i < matrix.length; i++) {
    console.info('| ' +matrix[i].join(" | ") + ' |')
  }
  console.info('-----'.repeat(length))
}

var colorBorder = function(grid, row, col, color) {
  /**
   * https://leetcode.com/problems/coloring-a-border/solutions/282847/c-with-picture-dfs/
    - Do DFS traversal from the given source
    - lip the cell color to negative to track visited cells
    - call DFS for the paths [[1,0], [-1,0], [0,-1], [0,1]]
    - check if this cell is inside ie not on the boundary -> flip back the nodes to positive
   */

  const r = grid.length
  const c = grid[0].length
  const visited = Array(r).fill().map(() => Array(c).fill(false))
  const dfsHelper = (row, col, color) => {
    // Base case
    if(row < 0 || col < 0 || row >= r || col >= c || grid[row][col] != color) return
    if(visited[row][col]) return

    // Flip the color
    grid[row][col] = -color
    visited[row][col] = 1
    dfsHelper(row + 1, col + 0, color)
    dfsHelper(row - 1, col + 0, color)
    dfsHelper(row + 0, col + 1, color)
    dfsHelper(row + 0, col - 1, color)
    if(row > 0 && row < r - 1 && col > 0 && col < c -1 // grid bounds
        && Math.abs(grid[row - 1][col]) == color // check the color of the neighbor  if it is same as color
        && Math.abs(grid[row + 1][col]) == color
        && Math.abs(grid[row][col -1]) == color
        && Math.abs(grid[row][col + 1]) == color
        && visited[row][col] !== 2
      ) {
        visited[row][col] = 2
        grid[row][col] = color
      }
  }
  dfsHelper(row, col, grid[row][col], color)
  console.info('DONE with DFS')
  // iterate through the gird and color the negative nodes
  for(let i = 0 ; i < r; i++) {
    for (let j = 0 ; j < c; j++) {
      if(grid[i][j] < 0) grid[i][j] = color
    }
  }
  return grid
};
// Driver code
var main = function () {
  const fn = colorBorder
  const input = [
    [[[1,1],[1,2]], 0, 0, 3],
    [[[1,2,2],[2,3,2]], 0, 1, 3],
    [[[1,1,1],[1,1,1],[1,1,1]], 1,1, 2],
    [[[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],
      0,0,3]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      console.info(`X:${input[i][1]} Y: ${input[i][2]} color: ${input[i][2]} ,\n Grid:`)
      print2DMatrix(input[i][0])
      var result = fn(...input[i]);
      console.log("\t Result is \n");
      print2DMatrix(result)
      console.log("-".repeat(50));
  }
}

main();