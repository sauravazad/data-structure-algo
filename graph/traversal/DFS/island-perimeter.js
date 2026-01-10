// https://leetcode.com/problems/island-perimeter/

const islandPerimeter = (grid) => {
  const rows = grid.length
  const cols = grid[0].length
  const visited = Array(rows).fill().map(() => Array(cols).fill(false))

  const getPerimeter = (i, j) => {

    // base case it out of bound return 1
    if(i < 0 || j < 0  || i >= rows || j >= cols) return 1

    // or if we have hit water then return 1
    if(grid[i][j] === 0) return 1

    // if visited return 0
    if(visited[i][j]) return 0

    visited[i][j] = true

    let perimeter = 0
    perimeter += getPerimeter(i, j +1)
    perimeter += getPerimeter(i, j -1)
    perimeter += getPerimeter(i-1, j)
    perimeter += getPerimeter(i+1, j)
    return perimeter

  }
  for(let r =0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if(grid[r][c] == 1) {
        // there is only one island so we can return
        return getPerimeter(r,c)
      }
    }
  }
}
// Driver code
var main = function () {
  const fn = islandPerimeter
  const input = [
    [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]],
    [[1]],
    [[1,0]]
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