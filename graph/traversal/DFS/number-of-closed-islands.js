// https://leetcode.com/problems/number-of-closed-islands/

var closedIsland = function(grid) {
  const rows = grid.length
  const cols = grid[0].length
  const isValid = (x, y) => {
    if(x < 0 || x >= rows || y <0 || y >= cols) return false
    return true
  }

  const DFSHelper = (current, color) => {
    const [x,y] = current
    if(!isValid(x, y)) return
    if(grid[x][y] !== 0) return
    // fill the cell
    grid[x][y] = color

    DFSHelper([x + 1, y], color)
    DFSHelper([x - 1, y], color)
    DFSHelper([x, y + 1], color)
    DFSHelper([x, y - 1], color)

  }

  // fill the grid with 1, for all the o labeled cells through DFS , starting from left corner (0,0), (0,cols), (rows, 0), (rows, cols)
  // then again  fill all the with color 2 and increasing  for the grid
  // calculate the difference that is the number of island
  for(let i = 0 ; i < rows; i++) {
    if(grid[i][0] === 0) DFSHelper([i,0], 1)
    if(grid[i][cols-1] === 0) DFSHelper([i,cols-1], 1)
  }

  for(let j = 0 ; j < cols; j++) {
    if(grid[0][j] === 0) DFSHelper([0,j], 1)
    if(grid[rows-1][j] === 0) DFSHelper([rows-1,j], 1)
  }

  let count = 2

  for(let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if(grid[i][j] === 0) {
        DFSHelper([i,j], ++count)
      }
    }
  }

  const islands = count - 2
  return islands
};



// Driver code
var main = function () {
  const fn = closedIsland
  const input = [
    [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]],
    [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]],
    [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]]
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