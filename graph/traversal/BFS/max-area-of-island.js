// https://leetcode.com/problems/max-area-of-island/
const maxAreaOfIsland = (grid) => {
const r = grid.length
const c = grid[0].length
let maxAreaOfIsland = 0
const visited = new Array(r).fill().map(() => new Array(c).fill(false))
const parents = {}

const paths = [[-1, 0], [1, 0], [0, 1], [0, -1]]

const isValid = (i, j, val) => {
  if(i < 0 || j < 0 || i >= r || j >= c) return false
  return grid[i][j] == val
}

const findIslandArea = (i, j, char)  => {
  let distance = 0
  const queue = []
  visited[i][j] = true
  queue.push([i, j])
  while(queue.length) {
    const current = queue.shift()
    distance++
    const [x, y] = current
    // iterate through the paths
    for(let p of paths) {
      const new_x = x + p[0]
      const new_y = y + p[1]
      if(isValid(new_x, new_y, char)) {
        if(!visited[new_x][new_y]) {
          visited[new_x][new_y] = true
          queue.push([new_x, new_y])
        }
      }
    }
  }
  return distance
}

for(let i = 0; i < r; i++) {
  for(let j = 0; j < c; j++) {
    if(grid[i][j] === 0) continue
    if(!visited[i][j] && grid[i][j] == 1) {
      const area = findIslandArea(i, j, grid[i][j])
      // console.log(i, j, '->>', area)
      maxAreaOfIsland = Math.max(maxAreaOfIsland, area)
    }
  }
}
return maxAreaOfIsland
}

const main = () => {
  const g = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
  console.log(maxAreaOfIsland(g)) // 6
  console.log(maxAreaOfIsland([[0,0,0,0,0,0,0,0]])) // 0
  console.log(maxAreaOfIsland([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]])) // 0
}

main()