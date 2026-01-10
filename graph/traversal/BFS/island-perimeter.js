/**
https://leetcode.com/problems/island-perimeter/description/
 */

const islandPerimeter = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = Array(r).fill().map(() => Array(c).fill(0))
  const paths = [[0,1], [0,-1], [1,0], [-1,0]]
  const isValid = (i, j) => {
    if(i < 0 || j < 0 || i >= r|| j >= c) return false
    return grid[i][j] == 1
  }

  const getPerimeter = (i, j) => {
    let perimeter = 0
    const queue = []
    queue.push([i, j])
    visited[i][j] = 1
    while(queue.length) {
      const current = queue.shift()
      const [x, y] = current
      let neighborCount = 0
      for( let p of paths) {
        const new_x = p[0] + x
        const new_y = p[1] + y
        if(isValid(new_x, new_y)) {
          ++neighborCount
          // console.info(`new_x: ${new_x} new_y : ${new_y} , count: ${neighborCount}`)
          if(!visited[new_x][new_y]) {
            queue.push([new_x, new_y])
            visited[new_x][new_y] = 1
          }
        }
      }
      perimeter += (4 - neighborCount)
      // console.info(`x: ${x} y : ${y} , neighborCount: ${neighborCount}, perimeter: ${perimeter}`)
    }
    return perimeter
  }

  // iterate over the grid and call getPerimeter
  let perimeter = 0
  for(let i = 0; i < r; i++) {
    for(let j = 0 ; j < c; j++) {
      if(!visited[i][j] && grid[i][j] == 1) {
        perimeter = getPerimeter(i, j)
        return perimeter
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
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(input[i]);
      console.log("\t Perimeter is",result);
      console.log("-".repeat(100));
  }
}

main();