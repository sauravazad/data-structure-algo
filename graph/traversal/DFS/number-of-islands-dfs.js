/**
https://leetcode.com/problems/number-of-islands/description/
 */
const numIslands = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = new Array(r).fill().map(() => new Array(c).fill(false))
  const paths = [[0,1], [0,-1], [1, 0], [-1, 0]]
  const isValid = (i, j) => {
    if(i < 0 || j < 0 || i >= r|| j >= c) return false
    return grid[i][j] == 1
  }
  let islands = 0

  const hasIslandRec = (i, j , parent_x, parent_y, distanceTraveled) => {
    visited[i][j] = true
    distanceTraveled++
    for(let p of paths) {
      const new_x = i + p[0]
      const new_y = j + p[1]
      if(isValid(new_x, new_y)) {
        if(!visited[new_x][new_y]) {
          if (hasIsland(new_x, new_y, i, j, distanceTraveled)) return distanceTraveled
        } else if (new_x != parent_x || new_y != parent_y) { // if it is visited and nodes are not its parent then we have a cycle
          return distanceTraveled
        }
      }
    }
    return distanceTraveled
  }

  const hasIsland = (i, j) => {
    let distance = 0
    const stack = []
    stack.push([i, j])
    visited[i][j] = true
    while(stack.length) {
      const current = stack.pop()
      distance++
      const [x, y] = current
      for(let p of paths) {
        const new_x = x + p[0]
        const new_y = y + p[1]
        if(isValid(new_x, new_y)) {
          if(!visited[new_x][new_y]) {
            stack.push([new_x, new_y])
            visited[new_x][new_y] = true
          }
        }
      }
    }
    return distance
  }

  for(let i = 0 ; i < r; i++) {
    for(let j = 0; j < c; j++) {
      if(grid[i][j] == 1 && !visited[i][j]) {
        const ans = hasIsland(i, j, -1, -1, 0)
        console.info(i, j , '->>', ans)
        if(ans) islands++
      }
    }
  }
  return islands
}


// Driver code
var main = function () {
  const fn = numIslands
  const input = [
    [
      ["1","1","1","1","0"],
      ["1","1","0","1","0"],
      ["1","1","0","0","0"],
      ["0","0","0","0","0"]],
    [
      ["1","1","0","0","0"],
      ["1","1","0","0","0"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]],
    [["1","1","1","1","1","0","1","1","1","1"],["1","0","1","0","1","1","1","1","1","1"],["0","1","1","1","0","1","1","1","1","1"],["1","1","0","1","1","0","0","0","0","1"],["1","0","1","0","1","0","0","1","0","1"],["1","0","0","1","1","1","0","1","0","0"],["0","0","1","0","0","1","1","1","1","0"],["1","0","1","1","1","0","0","1","1","1"],["1","1","1","1","1","1","1","1","0","1"],["1","0","1","1","1","1","1","1","1","0"]]
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(input[i]);
      console.log("\t Result is",result);
      console.log("-".repeat(100));
  }
}

main();