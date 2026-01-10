/**
https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
 */

var minCost = function(grid) {
  const r = grid.length
  const c = grid[0].length
  const visited = Array(r).fill().map(() => Array(c).fill(0))
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

  const isCoordinateValid = (i, j) => {
    if(i < 0 || j < 0  || i >= r || j >= c) return false
    return  true
  }

  console.info(`Rows: ${r} : Cols: ${c}`)
  const bfs = (i, j, _cost) => {
    const q = []
    q.push([i, j, _cost])

    while(q.length) {
      const curr = q.shift()
      const [x, y, cost] = curr
      // console.info('Processing node', x, y, cost)
      if(x == r - 1 && y == c - 1) return cost

      if(visited[x][y]) continue

      visited[x][y] = true
      // iterate over the direction and add to the queue
      for(let j = 1; j <= 4; j++) {
        const new_x = x + directions[j -1] [0]
        const new_y = y + directions[j -1] [1]
        if(!isCoordinateValid(new_x, new_y)) continue
        // check if we are diverging from the direction provided , if so add to the cost
        if(grid[x][y] == j) {
          q.unshift([new_x, new_y, cost])
        } else  {
          q.push([new_x, new_y, cost + 1])
        }
      }
    }
  }
  // start bfs from 0, 0 and if we reach 3,3 that means a path exists and return the computed cost
  // const _initCost = isValidPointer(0, 0) ? 0 : 1
  const cost = bfs(0,0,0)
  return cost
};

// Driver code
var main = function () {
  fn = minCost
  const input = [
    [[2,2,2],[2,2,2]], //3
    [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]], // 3
    [[1,1,3],[3,2,2],[1,1,4]], //0
    [[1,2],[4,3]] //1
  ]
  /**
   *  Fill the time complexity for each function
   */

  for (var i = 0; i < input.length; i++) {
      console.log(i + 1 + ".\t Input array:", input[i]);
      var result = fn(input[i]);
      console.log("\t ==>> Cost  is",result);
      console.log("-".repeat(100));
  }
}

main();