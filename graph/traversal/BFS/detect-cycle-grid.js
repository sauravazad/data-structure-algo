// https://leetcode.com/problems/detect-cycles-in-2d-grid/

const containsCycle = (grid) => {
  const r = grid.length
  const c = grid[0].length
  const visited = Array(r).fill().map(() => Array(c).fill(false))
  const parents = {}

  const isValidPosNValue = (x, y, val) => {
    if (x < 0 || y < 0 || x >= r || y >= c) return false
    if (grid[x][y] == val) return true
    return false
  }

  const paths = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  const detectCycle = (i, j, char) => {
    visited[i][j] = true
    const queue = []
    queue.push([i, j])
    parents[`${i}-${j}`] = [-1, -1]
    while (queue.length) {
      const current = queue.shift()
      const [x, y] = current
      // iterate though the paths
      for (const p of paths) {
        const new_x = p[0] + x
        const new_y = p[1] + y
        if (isValidPosNValue(new_x, new_y, char)) {
          if (!visited[new_x][new_y]) {
            parents[`${new_x}-${new_y}`] = [x, y]
            visited[new_x][new_y] = true
            queue.push([new_x, new_y])
          } else
          // check if their parents are not same as current
            if (new_x != parents[`${x}-${y}`][0] || new_y != parents[`${x}-${y}`][1]) {
              return true
            }
        }
      }
    }
    return false
  }

  // iterate through all the element and call detect cycle
  for (let i = 1; i < r; i++) {
    for (let j = 1; j < c; j++) {
      console.log(`Checking cycle at location i = ${i} j = ${j}`)
      if (!visited[i][j]) {
        const hasCycle = detectCycle(i, j, grid[i][j])
        if (hasCycle) return true
      }
    }
  }
  return false
}

const main = () => {
  grid = [
    ['c', 'c', 'c', 'a'],
    ['c', 'd', 'c', 'c'],
    ['c', 'c', 'e', 'c'],
    ['f', 'c', 'c', 'c']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['a', 'b', 'b'],
    ['b', 'z', 'b'],
    ['b', 'b', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['b', 'b'], ['b', 'b']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['a', 'a', 'a', 'a'], ['a', 'b', 'b', 'a'], ['a', 'b', 'b', 'a'], ['a', 'a', 'a', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [['b', 'c', 'd', 'e', 'a', 'a', 'a'], ['a', 'a', 'a', 'f', 'a', 'g', 'a'], ['a', 'h', 'a', 'a', 'a', 'i', 'a'], ['a', 'j', 'k', 'l', 'm', 'n', 'a'], ['a', 'a', 'a', 'a', 'a', 'a', 'a']]
  console.log('is there a cycle ? ', containsCycle(grid))

  grid = [
    ['b', 'a', 'c'],
    ['c', 'a', 'c'],
    ['d', 'd', 'c'],
    ['b', 'c', 'c']]
  console.log('is there a cycle ? ', containsCycle(grid))
}

main()
